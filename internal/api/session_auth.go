package api

import (
	"net/http"
	"sync"
	"time"
)

type sessionState struct {
	UserID    int
	Username  string
	ExpiresAt time.Time
}

var (
	sessionAuthStore = make(map[string]sessionState)
	sessionAuthMu    sync.RWMutex
)

func issueSessionToken(userID int, username string, ttl time.Duration) (string, error) {
	token, err := generateSecureToken(32)
	if err != nil {
		return "", err
	}

	sessionAuthMu.Lock()
	sessionAuthStore[token] = sessionState{
		UserID:    userID,
		Username:  username,
		ExpiresAt: time.Now().Add(ttl),
	}
	sessionAuthMu.Unlock()

	return token, nil
}

func getSessionFromRequest(r *http.Request) (int, string, bool) {
	cookie, err := r.Cookie("uip_session")
	if err != nil || cookie.Value == "" {
		return 0, "", false
	}

	sessionAuthMu.RLock()
	state, ok := sessionAuthStore[cookie.Value]
	sessionAuthMu.RUnlock()
	if !ok || time.Now().After(state.ExpiresAt) {
		if ok {
			clearSessionToken(cookie.Value)
		}
		return 0, "", false
	}

	return state.UserID, state.Username, true
}

func clearSessionToken(token string) {
	if token == "" {
		return
	}
	sessionAuthMu.Lock()
	delete(sessionAuthStore, token)
	sessionAuthMu.Unlock()
}
