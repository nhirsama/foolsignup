package api

import (
	"bytes"
	"database/sql"
	"net/http"
	"net/http/httptest"
	"testing"

	"foolsignup/internal/db"
	authpb "foolsignup/internal/pb/auth/v1"

	"google.golang.org/protobuf/proto"
	_ "modernc.org/sqlite"
)

func newSendCodeHandlerDB(t *testing.T) *sql.DB {
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
	);
	CREATE TABLE verification_codes (
		email TEXT NOT NULL,
		code TEXT NOT NULL,
		expires_at DATETIME NOT NULL,
		PRIMARY KEY (email, code)
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

func sendCodeRequest(t *testing.T, email, captchaKey, captchaValue, remoteAddr string) *authpb.SendEmailCodeResponse {
	t.Helper()

	payload, err := proto.Marshal(&authpb.SendEmailCodeRequest{
		Email:        email,
		CaptchaKey:   captchaKey,
		CaptchaValue: captchaValue,
	})
	if err != nil {
		t.Fatalf("marshal request: %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/send-code", bytes.NewReader(payload))
	req.RemoteAddr = remoteAddr
	rec := httptest.NewRecorder()

	HandleSendCode(rec, req)

	var res authpb.SendEmailCodeResponse
	if err := proto.Unmarshal(rec.Body.Bytes(), &res); err != nil {
		t.Fatalf("unmarshal response: %v", err)
	}
	if int(res.Code) != rec.Code {
		t.Fatalf("http status %d and protobuf code %d differ", rec.Code, res.Code)
	}
	return &res
}

func TestHandleSendCodeSkipsDomainThrottleForCommonDomains(t *testing.T) {
	newSendCodeHandlerDB(t)

	previousStore := CaptchaStore
	CaptchaStore = newBoundedCaptchaStore(captchaStoreMaxEntries, captchaStoreExpiration)
	t.Cleanup(func() {
		CaptchaStore = previousStore
	})

	if err := CaptchaStore.Set("captcha-1", "123456"); err != nil {
		t.Fatalf("set captcha-1: %v", err)
	}
	first := sendCodeRequest(t, "first@gmail.com", "captcha-1", "123456", "203.0.113.10:1001")
	if first.Code != http.StatusOK {
		t.Fatalf("expected first request to pass, got code=%d msg=%q", first.Code, first.Msg)
	}

	if err := CaptchaStore.Set("captcha-2", "123456"); err != nil {
		t.Fatalf("set captcha-2: %v", err)
	}
	second := sendCodeRequest(t, "second@gmail.com", "captcha-2", "123456", "198.51.100.20:1002")
	if second.Code != http.StatusOK {
		t.Fatalf("expected second request to pass for common domains, got code=%d msg=%q", second.Code, second.Msg)
	}
}
