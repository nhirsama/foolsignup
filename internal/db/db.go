// Package db handles database connections and operations.
package db

import (
	"database/sql"
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
			email TEXT PRIMARY KEY,
			code TEXT NOT NULL,
			expires_at DATETIME NOT NULL
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

// SaveVerificationCode stores a verification code for a given email.
func SaveVerificationCode(email, code string) error {
	expiresAt := time.Now().Add(10 * time.Minute)
	query := "INSERT OR REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)"
	_, err := Instance.Exec(query, email, code, expiresAt)
	return err
}

// VerifyCode checks if a verification code is valid for a given email.
func VerifyCode(email, code string) bool {
	var storedCode string
	var expiresAt time.Time
	query := "SELECT code, expires_at FROM verification_codes WHERE email = ?"
	err := Instance.QueryRow(query, email).Scan(&storedCode, &expiresAt)
	if err != nil {
		return false
	}
	if time.Now().After(expiresAt) {
		return false
	}
	return storedCode == code
}

func seedData() {
	passwords := []string{"admin123", "password", "12345678", "qwerty", "welcome1"}
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	ages := r.Perm(100)

	for i, pwd := range passwords {
		username := fmt.Sprintf("User_%06d", r.Intn(899999)+100000)
		hash, err := bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost)
		if err != nil {
			continue
		}
		query := "INSERT INTO users (username, email, age, password_hash, plain_password) VALUES (?, ?, ?, ?, ?)"
		_, _ = Instance.Exec(query, username, fmt.Sprintf("entity_%d@internal.sys", i), ages[i]+1, string(hash), pwd)
	}
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
