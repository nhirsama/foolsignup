package api

import (
	"errors"
	"testing"
	"time"
)

func TestExpiringStoreRejectsNewEntriesAtCapacity(t *testing.T) {
	now := time.Now()
	store := newExpiringStore[int](1)
	store.now = func() time.Time { return now }

	if err := store.Set("a", 1, now.Add(time.Minute)); err != nil {
		t.Fatalf("Set(a) failed: %v", err)
	}
	if err := store.Set("b", 2, now.Add(time.Minute)); !errors.Is(err, errStoreCapacityExceeded) {
		t.Fatalf("Set(b) error = %v, want %v", err, errStoreCapacityExceeded)
	}
}

func TestExpiringStorePurgesExpiredEntriesBeforeNewWrites(t *testing.T) {
	now := time.Now()
	store := newExpiringStore[int](1)
	store.now = func() time.Time { return now }

	if err := store.Set("expired", 1, now.Add(-time.Second)); err != nil {
		t.Fatalf("Set(expired) failed: %v", err)
	}
	if err := store.Set("fresh", 2, now.Add(time.Minute)); err != nil {
		t.Fatalf("Set(fresh) failed: %v", err)
	}

	if _, ok := store.Get("expired"); ok {
		t.Fatal("expected expired key to be gone")
	}
	if got := store.Len(); got != 1 {
		t.Fatalf("Len() = %d, want 1", got)
	}
}
