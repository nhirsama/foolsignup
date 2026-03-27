package api

import (
	"database/sql"
	"net/http"
	"net/http/httptest"
	"testing"

	"foolsignup/internal/db"

	_ "modernc.org/sqlite"
)

func newCaptchaThrottleDB(t *testing.T) *sql.DB {
	t.Helper()

	testDB, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}

	schema := `
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

func TestHandleGetCaptchaRateLimitsSpoofedXFFByRemoteIP(t *testing.T) {
	newCaptchaThrottleDB(t)

	previousStore := CaptchaStore
	CaptchaStore = newBoundedCaptchaStore(captchaStoreMaxEntries, captchaStoreExpiration)
	t.Cleanup(func() {
		CaptchaStore = previousStore
	})

	req1 := httptest.NewRequest(http.MethodGet, "/api/captcha", nil)
	req1.RemoteAddr = "203.0.113.10:1001"
	req1.Header.Set("X-Forwarded-For", "198.51.100.1")
	rec1 := httptest.NewRecorder()
	HandleGetCaptcha(rec1, req1)
	if rec1.Code != http.StatusOK {
		t.Fatalf("first request code = %d, want %d", rec1.Code, http.StatusOK)
	}

	req2 := httptest.NewRequest(http.MethodGet, "/api/captcha", nil)
	req2.RemoteAddr = "203.0.113.10:1002"
	req2.Header.Set("X-Forwarded-For", "198.51.100.2")
	rec2 := httptest.NewRecorder()
	HandleGetCaptcha(rec2, req2)
	if rec2.Code != http.StatusTooManyRequests {
		t.Fatalf("second request code = %d, want %d", rec2.Code, http.StatusTooManyRequests)
	}
}

func TestHandleGetCaptchaRateLimitsIPv6BySlash64(t *testing.T) {
	newCaptchaThrottleDB(t)

	previousStore := CaptchaStore
	CaptchaStore = newBoundedCaptchaStore(captchaStoreMaxEntries, captchaStoreExpiration)
	t.Cleanup(func() {
		CaptchaStore = previousStore
	})

	req1 := httptest.NewRequest(http.MethodGet, "/api/captcha", nil)
	req1.RemoteAddr = "[2001:db8:1:2::1]:1001"
	rec1 := httptest.NewRecorder()
	HandleGetCaptcha(rec1, req1)
	if rec1.Code != http.StatusOK {
		t.Fatalf("first request code = %d, want %d", rec1.Code, http.StatusOK)
	}

	req2 := httptest.NewRequest(http.MethodGet, "/api/captcha", nil)
	req2.RemoteAddr = "[2001:db8:1:2::abcd]:1002"
	rec2 := httptest.NewRecorder()
	HandleGetCaptcha(rec2, req2)
	if rec2.Code != http.StatusTooManyRequests {
		t.Fatalf("second request code = %d, want %d", rec2.Code, http.StatusTooManyRequests)
	}
}
