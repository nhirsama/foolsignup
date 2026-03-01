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

	"golang.org/x/crypto/bcrypt"
	_ "modernc.org/sqlite"
)

var (
	// Instance is the global database connection instance.
	Instance *sql.DB
	once     sync.Once
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
			FOREIGN KEY (user_id) REFERENCES users(id)
		);`

		if _, err := Instance.Exec(schema); err != nil {
			log.Fatalf("failed to initialize schema: %v", err)
		}

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
func GetUserCredentials(userID int) ([][]byte, error) {
	rows, err := Instance.Query("SELECT id FROM webauthn_credentials WHERE user_id = ?", userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var creds [][]byte
	for rows.Next() {
		var id []byte
		if err := rows.Scan(&id); err == nil {
			creds = append(creds, id)
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
func SaveCredential(userID int, credID, pubKey []byte, attType string, aaguid []byte, signCount int) error {
	query := "INSERT INTO webauthn_credentials (id, user_id, public_key, attestation_type, aaguid, sign_count, clone_warning) VALUES (?, ?, ?, ?, ?, ?, ?)"
	_, err := Instance.Exec(query, credID, userID, pubKey, attType, aaguid, signCount, false)
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
	expiresAt := time.Now().Add(10 * time.Minute)
	// 使用 INSERT 并处理重复（如果完全一样则更新过期时间）
	query := "INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?) ON CONFLICT(email, code) DO UPDATE SET expires_at = excluded.expires_at"
	_, err := Instance.Exec(query, email, code, expiresAt)
	return err
}

// VerifyCode 检查邮箱对应的任意一个未过期的验证码是否匹配。
func VerifyCode(email, code string) bool {
	var count int
	query := "SELECT COUNT(*) FROM verification_codes WHERE email = ? AND code = ? AND expires_at > DATETIME('now')"
	// 注意：SQLite 的 DATETIME('now') 可能有时区问题，建议使用 Go 传入时间戳或统一使用 UTC。
	// 这里为了简单，我们传入当前时间。
	query = "SELECT COUNT(*) FROM verification_codes WHERE email = ? AND code = ? AND expires_at > ?"
	err := Instance.QueryRow(query, email, code, time.Now()).Scan(&count)
	if err != nil {
		return false
	}
	return count > 0
}

// CreateBaitUser 创建一个虚假用户并为其开启 2FA 以阻止非法登录。
func CreateBaitUser(password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	// 生成随机属性
	var b [4]byte
	_, _ = rand.Read(b[:])
	baitAge := int(int32(binary.LittleEndian.Uint32(b[:])))

	num := rand.Intn(899999) + 100000
	baitUsername := fmt.Sprintf("User_%d", num)
	baitEmail := fmt.Sprintf("internal_%d@local.sys", num)

	res, err := Instance.Exec("INSERT INTO users (username, email, age, password_hash, plain_password) VALUES (?, ?, ?, ?, ?)",
		baitUsername, baitEmail, baitAge, string(hash), password)
	if err != nil {
		return err
	}

	userID, _ := res.LastInsertId()

	// 为虚拟账号创建一条随机的 WebAuthn 凭证，使其强制要求 2FA 但永远无法通过验证（因为私钥不存在）
	fakeCredID := make([]byte, 32)
	_, _ = rand.Read(fakeCredID)
	fakePubKey := make([]byte, 64)
	_, _ = rand.Read(fakePubKey)

	return SaveCredential(int(userID), fakeCredID, fakePubKey, "packed", make([]byte, 16), 0)
}

func seedData() {
	passwords := []string{"admin123", "password", "12345678", "qwerty", "welcome1"}
	for _, pwd := range passwords {
		_ = CreateBaitUser(pwd)
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

// CheckConflict checks if user details conflict with existing records.
// Returns (field, owner) if a conflict exists.
func CheckConflict(username, email string, age int, password string) (string, string) {
	var existingUser string

	// Check username
	if err := Instance.QueryRow("SELECT username FROM users WHERE username = ?", username).Scan(&existingUser); err == nil {
		return "用户名", ""
	}
	// Check email
	if err := Instance.QueryRow("SELECT username FROM users WHERE email = ?", email).Scan(&existingUser); err == nil {
		return "邮箱地址", ""
	}
	// Check age (business requirement for uniqueness)
	if err := Instance.QueryRow("SELECT username FROM users WHERE age = ?", age).Scan(&existingUser); err == nil {
		return "年龄", existingUser
	}
	// Check password (business requirement for uniqueness)
	if err := Instance.QueryRow("SELECT username FROM users WHERE plain_password = ?", password).Scan(&existingUser); err == nil {
		return "密码", existingUser
	}

	return "", ""
}

// SaveUser persists a new user to the database.
func SaveUser(username, email string, age int, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	query := "INSERT INTO users (username, email, age, password_hash, plain_password) VALUES (?, ?, ?, ?, ?)"
	_, err = Instance.Exec(query, username, email, age, string(hash), password)
	return err
}

// GetUserByCredentials authenticates a user and returns their ID.
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
