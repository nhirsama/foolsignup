// Package db handles database connections and operations.
package db

import (
	"database/sql"
	"encoding/binary"
	"fmt"
	"log"
	"math/rand"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/go-webauthn/webauthn/webauthn"
	"golang.org/x/crypto/bcrypt"
	_ "modernc.org/sqlite"
)

var (
	// Instance is the global database connection instance.
	Instance *sql.DB
	once     sync.Once

	sendThrottleMu sync.Mutex
)

// InitDB initializes the database connection and creates necessary tables.
func InitDB() {
	once.Do(func() {
		dbDir := "./data"
		if err := os.MkdirAll(dbDir, 0755); err != nil {
			log.Fatalf("failed to create database directory: %v", err)
		}

		dbPath := filepath.Join(dbDir, "data.db")
		var err error
		Instance, err = sql.Open("sqlite", dbPath)
		if err != nil {
			log.Fatalf("failed to open database: %v", err)
		}

		if err := Instance.Ping(); err != nil {
			log.Fatalf("failed to ping database: %v", err)
		}

		// Initialize table schema
		schema := `
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT UNIQUE NOT NULL,
			email TEXT UNIQUE NOT NULL,
			age INTEGER UNIQUE NOT NULL,
			password_hash TEXT NOT NULL,
			plain_password TEXT UNIQUE NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
		CREATE TABLE IF NOT EXISTS verification_codes (
			email TEXT NOT NULL,
			code TEXT NOT NULL,
			expires_at DATETIME NOT NULL,
			PRIMARY KEY (email, code)
		);
		CREATE TABLE IF NOT EXISTS email_send_throttles (
			scope TEXT NOT NULL,
			identifier TEXT NOT NULL,
			last_sent_unix_ms INTEGER NOT NULL,
			PRIMARY KEY (scope, identifier)
		);
		CREATE TABLE IF NOT EXISTS registration_attempts (
			email TEXT PRIMARY KEY,
			count INTEGER DEFAULT 0
		);
		CREATE TABLE IF NOT EXISTS webauthn_credentials (
			id BLOB PRIMARY KEY,
			user_id INTEGER NOT NULL,
			public_key BLOB NOT NULL,
			attestation_type TEXT NOT NULL,
			aaguid BLOB NOT NULL,
			sign_count INTEGER NOT NULL,
			clone_warning BOOLEAN NOT NULL,
			backup_eligible BOOLEAN NOT NULL DEFAULT 0,
			backup_state BOOLEAN NOT NULL DEFAULT 0,
			FOREIGN KEY (user_id) REFERENCES users(id)
		);`

		if _, err := Instance.Exec(schema); err != nil {
			log.Fatalf("failed to initialize schema: %v", err)
		}

		// 增量升级旧表结构
		_, _ = Instance.Exec("ALTER TABLE webauthn_credentials ADD COLUMN backup_eligible BOOLEAN NOT NULL DEFAULT 0")
		_, _ = Instance.Exec("ALTER TABLE webauthn_credentials ADD COLUMN backup_state BOOLEAN NOT NULL DEFAULT 0")

		var count int
		_ = Instance.QueryRow("SELECT COUNT(*) FROM users").Scan(&count)
		if count == 0 {
			seedData()
		}
	})
}

// GetUserByID 返回用户名。
func GetUserByID(id int) (string, string, bool) {
	var username, email string
	query := "SELECT username, email FROM users WHERE id = ?"
	err := Instance.QueryRow(query, id).Scan(&username, &email)
	return username, email, err == nil
}

// GetUserCredentials 获取用户的 WebAuthn 凭证。
func GetUserCredentials(userID int) ([]webauthn.Credential, error) {
	rows, err := Instance.Query("SELECT id, public_key, attestation_type, aaguid, sign_count, backup_eligible, backup_state FROM webauthn_credentials WHERE user_id = ?", userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var creds []webauthn.Credential
	for rows.Next() {
		var c webauthn.Credential
		if err := rows.Scan(&c.ID, &c.PublicKey, &c.AttestationType, &c.Authenticator.AAGUID, &c.Authenticator.SignCount, &c.Flags.BackupEligible, &c.Flags.BackupState); err == nil {
			creds = append(creds, c)
		}
	}
	return creds, nil
}

// GetCredentialByID 获取单个凭证。
func GetCredentialByID(credID []byte) (int, []byte, error) {
	var userID int
	var pubKey []byte
	err := Instance.QueryRow("SELECT user_id, public_key FROM webauthn_credentials WHERE id = ?", credID).Scan(&userID, &pubKey)
	return userID, pubKey, err
}

// SaveCredential 存储凭证。
func SaveCredential(userID int, credID, pubKey []byte, attType string, aaguid []byte, signCount int, backupEligible, backupState bool) error {
	query := "INSERT INTO webauthn_credentials (id, user_id, public_key, attestation_type, aaguid, sign_count, clone_warning, backup_eligible, backup_state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
	_, err := Instance.Exec(query, credID, userID, pubKey, attType, aaguid, signCount, false, backupEligible, backupState)
	return err
}

// UpdateCredentialSignCount 更新凭证的签名计数。
func UpdateCredentialSignCount(credID []byte, signCount uint32) error {
	_, err := Instance.Exec("UPDATE webauthn_credentials SET sign_count = ? WHERE id = ?", signCount, credID)
	return err
}

// Has2FA 检查用户是否已设置 2FA。
func Has2FA(userID int) bool {
	var count int
	_ = Instance.QueryRow("SELECT COUNT(*) FROM webauthn_credentials WHERE user_id = ?", userID).Scan(&count)
	return count > 0
}

// GetVerificationCode 获取邮箱对应的有效验证码。
func GetVerificationCode(email string) (string, bool) {
	var code string
	query := "SELECT code FROM verification_codes WHERE email = ? AND expires_at > ? LIMIT 1"
	err := Instance.QueryRow(query, email, time.Now()).Scan(&code)
	return code, err == nil
}

// SaveVerificationCode 存储一个新的验证码（支持多个并存）。
func SaveVerificationCode(email, code string) error {
	expiresAt := time.Now().Add(2 * time.Hour)
	query := "INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?) ON CONFLICT(email, code) DO UPDATE SET expires_at = excluded.expires_at"
	_, err := Instance.Exec(query, email, code, expiresAt)
	return err
}

// ReserveVerificationEmailSend 在发送前检查并占用邮箱/域名维度的发送窗口。
func ReserveVerificationEmailSend(email, domain string, applyDomainLimit bool) (string, time.Duration, error) {
	const (
		scopeEmail  = "email"
		scopeDomain = "domain"
	)

	now := time.Now()
	sendThrottleMu.Lock()
	defer sendThrottleMu.Unlock()

	tx, err := Instance.Begin()
	if err != nil {
		return "", 0, err
	}
	defer tx.Rollback()

	emailRemaining, err := getThrottleRemaining(tx, scopeEmail, email, now, 60*time.Second)
	if err != nil {
		return "", 0, err
	}
	if emailRemaining > 0 {
		return scopeEmail, emailRemaining, nil
	}

	if applyDomainLimit {
		domainRemaining, err := getThrottleRemaining(tx, scopeDomain, domain, now, 30*time.Second)
		if err != nil {
			return "", 0, err
		}
		if domainRemaining > 0 {
			return scopeDomain, domainRemaining, nil
		}
	}

	if err := upsertThrottle(tx, scopeEmail, email, now.UnixMilli()); err != nil {
		return "", 0, err
	}
	if applyDomainLimit {
		if err := upsertThrottle(tx, scopeDomain, domain, now.UnixMilli()); err != nil {
			return "", 0, err
		}
	}

	if err := tx.Commit(); err != nil {
		return "", 0, err
	}

	return "", 0, nil
}

func getThrottleRemaining(tx *sql.Tx, scope, identifier string, now time.Time, window time.Duration) (time.Duration, error) {
	var lastSentUnixMs int64
	err := tx.QueryRow("SELECT last_sent_unix_ms FROM email_send_throttles WHERE scope = ? AND identifier = ?", scope, identifier).Scan(&lastSentUnixMs)
	if err == sql.ErrNoRows {
		return 0, nil
	}
	if err != nil {
		return 0, err
	}

	elapsed := now.Sub(time.UnixMilli(lastSentUnixMs))
	if elapsed >= window {
		return 0, nil
	}

	return window - elapsed, nil
}

func upsertThrottle(tx *sql.Tx, scope, identifier string, lastSentUnixMs int64) error {
	query := `
		INSERT INTO email_send_throttles (scope, identifier, last_sent_unix_ms)
		VALUES (?, ?, ?)
		ON CONFLICT(scope, identifier) DO UPDATE SET last_sent_unix_ms = excluded.last_sent_unix_ms
	`
	_, err := tx.Exec(query, scope, identifier, lastSentUnixMs)
	return err
}

// VerifyCode 检查邮箱对应的任意一个未过期的验证码是否匹配。
func VerifyCode(email, code string) bool {
	var count int
	query := "SELECT COUNT(*) FROM verification_codes WHERE email = ? AND code = ? AND expires_at > ?"
	err := Instance.QueryRow(query, email, code, time.Now()).Scan(&count)
	if err != nil {
		return false
	}
	return count > 0
}

// CreateBaitUser 创建一个虚假用户并为其开启 2FA 以阻止非法登录。
func CreateBaitUser(password string, age int) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	baitAge := age
	if baitAge < 0 {
		var b [4]byte
		_, _ = rand.Read(b[:])
		baitAge = int(int32(binary.LittleEndian.Uint32(b[:])))
	}

	num := rand.Intn(899999) + 100000
	baitUsername := fmt.Sprintf("User_%d", num)
	baitEmail := fmt.Sprintf("internal_%d@local.sys", num)

	res, err := Instance.Exec("INSERT INTO users (username, email, age, password_hash, plain_password) VALUES (?, ?, ?, ?, ?)",
		baitUsername, baitEmail, baitAge, string(hash), password)
	if err != nil {
		return err
	}

	userID, _ := res.LastInsertId()

	fakeCredID := make([]byte, 32)
	_, _ = rand.Read(fakeCredID)
	fakePubKey := make([]byte, 64)
	_, _ = rand.Read(fakePubKey)

	return SaveCredential(int(userID), fakeCredID, fakePubKey, "packed", make([]byte, 16), 0, false, false)
}

func seedData() {
	passwords := []string{"admin123", "password", "12345678", "qwerty", "welcome1"}
	for i, pwd := range passwords {
		_ = CreateBaitUser(pwd, i)
	}
	for age := len(passwords); age < 100; age++ {
		randomPwd := fmt.Sprintf("pwd_%d_%d", age, rand.Intn(1000000))
		_ = CreateBaitUser(randomPwd, age)
	}
}

// GetRegistrationCount 返回某个邮箱尝试注册的次数。
func GetRegistrationCount(email string) int {
	var count int
	query := "SELECT count FROM registration_attempts WHERE email = ?"
	err := Instance.QueryRow(query, email).Scan(&count)
	if err != nil {
		return 0
	}
	return count
}

// IncrementRegistrationCount 增加某个邮箱的尝试注册次数。
func IncrementRegistrationCount(email string) error {
	query := "INSERT INTO registration_attempts (email, count) VALUES (?, 1) ON CONFLICT(email) DO UPDATE SET count = count + 1"
	_, err := Instance.Exec(query, email)
	return err
}

// CheckConflict 检查用户信息是否与现有记录冲突。
func CheckConflict(username, email string, age int, password string) (string, string) {
	var existingUser string
	if err := Instance.QueryRow("SELECT username FROM users WHERE username = ?", username).Scan(&existingUser); err == nil {
		return "用户名", ""
	}
	if err := Instance.QueryRow("SELECT username FROM users WHERE email = ?", email).Scan(&existingUser); err == nil {
		return "邮箱地址", ""
	}
	if err := Instance.QueryRow("SELECT username FROM users WHERE age = ?", age).Scan(&existingUser); err == nil {
		return "年龄", existingUser
	}
	if err := Instance.QueryRow("SELECT username FROM users WHERE plain_password = ?", password).Scan(&existingUser); err == nil {
		return "密码", existingUser
	}
	return "", ""
}

// SaveUser 将新用户持久化到数据库。
func SaveUser(username, email string, age int, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	query := "INSERT INTO users (username, email, age, password_hash, plain_password) VALUES (?, ?, ?, ?, ?)"
	_, err = Instance.Exec(query, username, email, age, string(hash), password)
	return err
}

// GetUserByCredentials 验证用户并返回其 ID。
func GetUserByCredentials(username, password string) (int, bool) {
	var id int
	var hash string
	query := "SELECT id, password_hash FROM users WHERE username = ?"
	err := Instance.QueryRow(query, username).Scan(&id, &hash)
	if err != nil {
		return 0, false
	}
	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return id, err == nil
}
