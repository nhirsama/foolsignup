package api

import (
	"bytes"
	"database/sql"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"foolsignup/internal/db"
	authpb "foolsignup/internal/pb/auth/v1"

	"google.golang.org/protobuf/proto"
	_ "modernc.org/sqlite"
)

func TestVerifyRegistrationTurnstileSuccess(t *testing.T) {
	t.Setenv("TURNSTILE_SECRET_KEY", "secret")
	t.Setenv("ALLOWED_ORIGIN", "https://signup.example.com")

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			t.Fatalf("parse form: %v", err)
		}
		if got := r.Form.Get("secret"); got != "secret" {
			t.Fatalf("secret = %q, want %q", got, "secret")
		}
		if got := r.Form.Get("response"); got != "token-1" {
			t.Fatalf("response token = %q, want %q", got, "token-1")
		}
		if got := r.Form.Get("remoteip"); got != "203.0.113.10" {
			t.Fatalf("remoteip = %q, want %q", got, "203.0.113.10")
		}
		w.Header().Set("Content-Type", "application/json")
		_, _ = io.WriteString(w, `{"success":true,"hostname":"signup.example.com"}`)
	}))
	defer server.Close()
	t.Setenv("TURNSTILE_VERIFY_ENDPOINT", server.URL)

	req := httptest.NewRequest(http.MethodPost, "/api/register", nil)
	req.RemoteAddr = "203.0.113.10:1234"
	if err := verifyRegistrationTurnstile(req, "token-1"); err != nil {
		t.Fatalf("verifyRegistrationTurnstile() error = %v", err)
	}
}

func TestVerifyRegistrationTurnstileRejectsHostnameMismatch(t *testing.T) {
	t.Setenv("TURNSTILE_SECRET_KEY", "secret")
	t.Setenv("ALLOWED_ORIGIN", "https://signup.example.com")

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_, _ = io.WriteString(w, `{"success":true,"hostname":"evil.example.com"}`)
	}))
	defer server.Close()
	t.Setenv("TURNSTILE_VERIFY_ENDPOINT", server.URL)

	req := httptest.NewRequest(http.MethodPost, "/api/register", nil)
	req.RemoteAddr = "203.0.113.10:1234"
	if err := verifyRegistrationTurnstile(req, "token-1"); err == nil {
		t.Fatal("expected hostname mismatch to fail")
	}
}

func newRegisterTurnstileTestDB(t *testing.T) *sql.DB {
	t.Helper()

	testDB, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}

	schema := `
	CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		email TEXT UNIQUE NOT NULL,
		age INTEGER UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		plain_password TEXT UNIQUE NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE verification_codes (
		email TEXT NOT NULL,
		code TEXT NOT NULL,
		expires_at DATETIME NOT NULL,
		PRIMARY KEY (email, code)
	);
	CREATE TABLE email_send_throttles (
		scope TEXT NOT NULL,
		identifier TEXT NOT NULL,
		last_sent_unix_ms INTEGER NOT NULL,
		expires_at DATETIME,
		PRIMARY KEY (scope, identifier)
	);
	CREATE TABLE registration_attempts (
		email TEXT PRIMARY KEY,
		"count" INTEGER DEFAULT 0,
		expires_at DATETIME
	);
	CREATE TABLE webauthn_credentials (
		id BLOB PRIMARY KEY,
		user_id INTEGER NOT NULL,
		public_key BLOB NOT NULL,
		attestation_type TEXT NOT NULL,
		aaguid BLOB NOT NULL,
		sign_count INTEGER NOT NULL,
		clone_warning BOOLEAN NOT NULL,
		backup_eligible BOOLEAN NOT NULL DEFAULT 0,
		backup_state BOOLEAN NOT NULL DEFAULT 0
	);`
	if _, err := testDB.Exec(schema); err != nil {
		t.Fatalf("create schema: %v", err)
	}

	previousDB := db.Instance
	db.Instance = testDB
	t.Cleanup(func() {
		db.Instance = previousDB
		_ = testDB.Close()
	})

	return testDB
}

func TestHandleRegisterRejectsMissingTurnstileTokenWhenConfigured(t *testing.T) {
	testDB := newRegisterTurnstileTestDB(t)
	t.Setenv("TURNSTILE_SECRET_KEY", "secret")

	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "user@example.com", "aaaaaaaaaaaaaaaa", time.Now().Add(time.Hour)); err != nil {
		t.Fatalf("insert verification code failed: %v", err)
	}

	payload, err := proto.Marshal(&authpb.RegisterRequest{
		Username: "User_100001",
		Email:    "user@example.com",
		Age:      123,
		Password: "Qx7!mR2@pL9#sV4$kN8%tH3^wC6&yBAF",
		Code:     "aaaaaaaaaaaaaaaa113608",
	})
	if err != nil {
		t.Fatalf("marshal register request: %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/register", bytes.NewReader(payload))
	req.RemoteAddr = "203.0.113.20:1234"
	rec := httptest.NewRecorder()

	HandleRegister(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("expected HTTP 403, got %d", rec.Code)
	}

	var res authpb.RegisterResponse
	if err := proto.Unmarshal(rec.Body.Bytes(), &res); err != nil {
		t.Fatalf("unmarshal response: %v", err)
	}
	if res.Code != http.StatusForbidden {
		t.Fatalf("expected protobuf code 403, got %d", res.Code)
	}
}
