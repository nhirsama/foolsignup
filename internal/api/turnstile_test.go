package api

import (
	"bytes"
	authpb "foolsignup/internal/pb/auth/v1"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"google.golang.org/protobuf/proto"
)

func TestVerifyTurnstileSuccess(t *testing.T) {
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
	if err := verifyTurnstile(req, "token-1"); err != nil {
		t.Fatalf("verifyTurnstile() error = %v", err)
	}
}

func TestVerifyTurnstileRejectsHostnameMismatch(t *testing.T) {
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
	if err := verifyTurnstile(req, "token-1"); err == nil {
		t.Fatal("expected hostname mismatch to fail")
	}
}

func TestVerifyTurnstileUsesLiteralIPv6RemoteIP(t *testing.T) {
	t.Setenv("TURNSTILE_SECRET_KEY", "secret")
	t.Setenv("ALLOWED_ORIGIN", "https://signup.example.com")

	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if err := r.ParseForm(); err != nil {
			t.Fatalf("parse form: %v", err)
		}
		if got := r.Form.Get("remoteip"); got != "2001:db8:1:2::1234" {
			t.Fatalf("remoteip = %q, want %q", got, "2001:db8:1:2::1234")
		}
		w.Header().Set("Content-Type", "application/json")
		_, _ = io.WriteString(w, `{"success":true,"hostname":"signup.example.com"}`)
	}))
	defer server.Close()
	t.Setenv("TURNSTILE_VERIFY_ENDPOINT", server.URL)

	req := httptest.NewRequest(http.MethodPost, "/api/send-code", nil)
	req.RemoteAddr = "[2001:db8:1:2::1234]:4321"
	if err := verifyTurnstile(req, "token-1"); err != nil {
		t.Fatalf("verifyTurnstile() error = %v", err)
	}
}

func TestHandleSendCodeRejectsMissingTurnstileTokenWhenConfigured(t *testing.T) {
	newSendCodeHandlerDB(t)
	t.Setenv("TURNSTILE_SECRET_KEY", "secret")

	previousStore := CaptchaStore
	CaptchaStore = newBoundedCaptchaStore(captchaStoreMaxEntries, captchaStoreExpiration)
	t.Cleanup(func() {
		CaptchaStore = previousStore
	})
	if err := CaptchaStore.Set("captcha-1", "123456"); err != nil {
		t.Fatalf("set captcha: %v", err)
	}

	payload, err := proto.Marshal(&authpb.SendEmailCodeRequest{
		Email:        "user@example.com",
		CaptchaKey:   "captcha-1",
		CaptchaValue: "123456",
	})
	if err != nil {
		t.Fatalf("marshal send-code request: %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/send-code", bytes.NewReader(payload))
	req.RemoteAddr = "203.0.113.20:1234"
	rec := httptest.NewRecorder()

	HandleSendCode(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("expected HTTP 403, got %d", rec.Code)
	}

	var res authpb.SendEmailCodeResponse
	if err := proto.Unmarshal(rec.Body.Bytes(), &res); err != nil {
		t.Fatalf("unmarshal response: %v", err)
	}
	if res.Code != http.StatusForbidden {
		t.Fatalf("expected protobuf code 403, got %d", res.Code)
	}
}
