package api

import (
	"database/sql"
	"testing"
	"time"

	"foolsignup/internal/db"
)

func newRegisterVerificationDB(t *testing.T) *sql.DB {
	t.Helper()

	testDB, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}

	schema := `
	CREATE TABLE verification_codes (
		email TEXT NOT NULL,
		code TEXT NOT NULL,
		expires_at DATETIME NOT NULL,
		PRIMARY KEY (email, code)
	);`
	if _, err := testDB.Exec(schema); err != nil {
		t.Fatalf("create schema: %v", err)
	}

	previous := db.Instance
	db.Instance = testDB
	t.Cleanup(func() {
		db.Instance = previous
		_ = testDB.Close()
	})

	return testDB
}

func TestIsValidRegistrationPoWUsesChallengePrefixMatch(t *testing.T) {
	testDB := newRegisterVerificationDB(t)
	now := time.Now()

	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "user@example.com", "bbbbbbbbbbbbbbbb", now.Add(time.Hour)); err != nil {
		t.Fatalf("insert challenge failed: %v", err)
	}
	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "user@example.com", "aaaaaaaaaaaaaaaa", now.Add(time.Hour)); err != nil {
		t.Fatalf("insert challenge failed: %v", err)
	}

	// sha256("aaaaaaaaaaaaaaaa113608") 以 "00000" 开头。
	proof := "aaaaaaaaaaaaaaaa113608"
	if !isValidRegistrationPoW("user@example.com", proof) {
		t.Fatal("expected proof to pass")
	}
	if isValidRegistrationPoW("other@example.com", proof) {
		t.Fatal("expected proof to fail for a different email")
	}
}

func TestIsValidRegistrationPoWRejectsMalformedProof(t *testing.T) {
	if isValidRegistrationPoW("user@example.com", "short") {
		t.Fatal("expected short proof to fail")
	}
	if isValidRegistrationPoW("user@example.com", "aaaaaaaaaaaaaaaa-not-pow") {
		t.Fatal("expected non-pow proof to fail")
	}
}

func TestIsValidRegistrationPoWDoesNotConsumeChallenge(t *testing.T) {
	testDB := newRegisterVerificationDB(t)

	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "user@example.com", "aaaaaaaaaaaaaaaa", time.Now().Add(time.Hour)); err != nil {
		t.Fatalf("insert challenge failed: %v", err)
	}

	proof := "aaaaaaaaaaaaaaaa113608"
	if !isValidRegistrationPoW("user@example.com", proof) {
		t.Fatal("expected first proof validation to pass")
	}
	if !isValidRegistrationPoW("user@example.com", proof) {
		t.Fatal("expected proof to remain reusable for the same challenge")
	}
}
