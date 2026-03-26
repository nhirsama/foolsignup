package api

import (
	"errors"
	"testing"
	"time"
)

func TestBoundedCaptchaStoreRejectsEntriesAtCapacity(t *testing.T) {
	now := time.Now()
	store := newBoundedCaptchaStore(1, time.Minute)
	store.now = func() time.Time { return now }

	if err := store.Set("first", "123456"); err != nil {
		t.Fatalf("Set(first) failed: %v", err)
	}
	if err := store.Set("second", "654321"); !errors.Is(err, errCaptchaStoreCapacityExceeded) {
		t.Fatalf("Set(second) error = %v, want %v", err, errCaptchaStoreCapacityExceeded)
	}
}

func TestBoundedCaptchaStoreExpiresEntries(t *testing.T) {
	now := time.Now()
	store := newBoundedCaptchaStore(1, time.Minute)
	store.now = func() time.Time { return now }

	if err := store.Set("first", "AbCd"); err != nil {
		t.Fatalf("Set(first) failed: %v", err)
	}
	if !store.Verify("first", "aBcD", false) {
		t.Fatal("expected captcha verification to be case-insensitive")
	}

	now = now.Add(2 * time.Minute)
	if got := store.Get("first", false); got != "" {
		t.Fatalf("Get(first) = %q, want empty string after expiration", got)
	}
	if got := store.Len(); got != 0 {
		t.Fatalf("Len() = %d, want 0 after expiration", got)
	}
}
