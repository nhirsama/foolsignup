package api

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"
	"sync"
	"time"
)

type tempAuthState struct {
	UserID    int
	ExpiresAt time.Time
}

var (
	tempAuthStore = make(map[string]tempAuthState)
	tempAuthMu    sync.RWMutex
)

func issueTempAuthToken(userID int, ttl time.Duration) (string, error) {
	token, err := generateSecureToken(32)
	if err != nil {
		return "", err
	}

	tempAuthMu.Lock()
	tempAuthStore[token] = tempAuthState{
		UserID:    userID,
		ExpiresAt: time.Now().Add(ttl),
	}
	tempAuthMu.Unlock()

	return token, nil
}

func getTempAuthTokenAndUserID(r *http.Request) (string, int, bool) {
	cookie, err := r.Cookie("uip_temp_auth")
	if err != nil || cookie.Value == "" {
		return "", 0, false
	}

	tempAuthMu.RLock()
	state, ok := tempAuthStore[cookie.Value]
	tempAuthMu.RUnlock()
	if !ok || time.Now().After(state.ExpiresAt) {
		if ok {
			clearTempAuthToken(cookie.Value)
		}
		return "", 0, false
	}

	return cookie.Value, state.UserID, true
}

func clearTempAuthToken(token string) {
	if token == "" {
		return
	}
	tempAuthMu.Lock()
	delete(tempAuthStore, token)
	tempAuthMu.Unlock()
}

func generateSecureToken(n int) (string, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}
