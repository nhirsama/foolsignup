package api

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"time"
)

type tempAuthState struct {
	UserID    int
	ExpiresAt time.Time
}

var tempAuthStore = newExpiringStore[tempAuthState](tempAuthStoreMaxEntries)

func issueTempAuthToken(userID int, ttl time.Duration) (string, error) {
	token, err := generateSecureToken(32)
	if err != nil {
		return "", err
	}

	state := tempAuthState{
		UserID:    userID,
		ExpiresAt: time.Now().Add(ttl),
	}
	if err := tempAuthStore.Set(token, state, state.ExpiresAt); err != nil {
		return "", err
	}

	return token, nil
}

func getTempAuthTokenAndUserID(r *http.Request) (string, int, bool) {
	cookie, err := r.Cookie("uip_temp_auth")
	if err != nil || cookie.Value == "" {
		return "", 0, false
	}

	state, ok := tempAuthStore.Get(cookie.Value)
	if !ok {
		return "", 0, false
	}

	return cookie.Value, state.UserID, true
}

func clearTempAuthToken(token string) {
	if token == "" {
		return
	}
	tempAuthStore.Delete(token)
}

func generateSecureToken(n int) (string, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}
