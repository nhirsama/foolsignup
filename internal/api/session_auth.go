package api

import (
	"net/http"
	"time"
)

type sessionState struct {
	UserID    int
	Username  string
	ExpiresAt time.Time
}

var sessionAuthStore = newExpiringStore[sessionState](sessionAuthStoreMaxEntries)

func issueSessionToken(userID int, username string, ttl time.Duration) (string, error) {
	token, err := generateSecureToken(32)
	if err != nil {
		return "", err
	}

	state := sessionState{
		UserID:    userID,
		Username:  username,
		ExpiresAt: time.Now().Add(ttl),
	}
	if err := sessionAuthStore.Set(token, state, state.ExpiresAt); err != nil {
		return "", err
	}

	return token, nil
}

func getSessionFromRequest(r *http.Request) (int, string, bool) {
	cookie, err := r.Cookie("uip_session")
	if err != nil || cookie.Value == "" {
		return 0, "", false
	}

	state, ok := sessionAuthStore.Get(cookie.Value)
	if !ok {
		return 0, "", false
	}

	return state.UserID, state.Username, true
}

func clearSessionToken(token string) {
	if token == "" {
		return
	}
	sessionAuthStore.Delete(token)
}
