package api

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestHandleLogoutRequiresPost(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/api/logout", nil)
	rec := httptest.NewRecorder()

	HandleLogout(rec, req)

	if rec.Code != http.StatusMethodNotAllowed {
		t.Fatalf("expected HTTP 405, got %d", rec.Code)
	}
}

func TestHandleLogoutRejectsUntrustedOrigin(t *testing.T) {
	t.Setenv("ALLOWED_ORIGIN", "https://app.example.com")

	req := httptest.NewRequest(http.MethodPost, "/api/logout", nil)
	req.Header.Set("Origin", "https://evil.example.com")
	rec := httptest.NewRecorder()

	HandleLogout(rec, req)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("expected HTTP 403, got %d", rec.Code)
	}
}

func TestHandleLogoutClearsSessionAndTempAuth(t *testing.T) {
	t.Setenv("ALLOWED_ORIGIN", "https://app.example.com")

	sessionToken, err := issueSessionToken(7, "alice", time.Minute)
	if err != nil {
		t.Fatalf("issue session token failed: %v", err)
	}
	tempToken, err := issueTempAuthToken(7, time.Minute)
	if err != nil {
		t.Fatalf("issue temp auth token failed: %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/logout", nil)
	req.Header.Set("Origin", "https://app.example.com")
	req.AddCookie(&http.Cookie{Name: "uip_session", Value: sessionToken})
	req.AddCookie(&http.Cookie{Name: "uip_temp_auth", Value: tempToken})
	rec := httptest.NewRecorder()

	HandleLogout(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected HTTP 200, got %d", rec.Code)
	}
	if _, _, ok := getSessionFromRequest(req); ok {
		t.Fatal("expected session token to be cleared from the store")
	}
	if _, _, ok := getTempAuthTokenAndUserID(req); ok {
		t.Fatal("expected temp auth token to be cleared from the store")
	}

	cookies := rec.Result().Cookies()
	if len(cookies) != 2 {
		t.Fatalf("expected 2 clearing cookies, got %d", len(cookies))
	}

	cleared := map[string]bool{}
	for _, cookie := range cookies {
		if cookie.MaxAge >= 0 {
			t.Fatalf("expected cookie %s to be expired, max_age=%d", cookie.Name, cookie.MaxAge)
		}
		cleared[cookie.Name] = true
	}
	if !cleared["uip_session"] {
		t.Fatal("expected uip_session clearing cookie")
	}
	if !cleared["uip_temp_auth"] {
		t.Fatal("expected uip_temp_auth clearing cookie")
	}
}
