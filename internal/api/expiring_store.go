package api

import (
	"errors"
	"sync"
	"time"
)

var errStoreCapacityExceeded = errors.New("store capacity exceeded")

type expiringValue[T any] struct {
	value     T
	expiresAt time.Time
}

type expiringStore[T any] struct {
	mu         sync.RWMutex
	items      map[string]expiringValue[T]
	maxEntries int
	now        func() time.Time
}

func newExpiringStore[T any](maxEntries int) *expiringStore[T] {
	return &expiringStore[T]{
		items:      make(map[string]expiringValue[T]),
		maxEntries: maxEntries,
		now:        time.Now,
	}
}

func (s *expiringStore[T]) Set(key string, value T, expiresAt time.Time) error {
	if key == "" {
		return errors.New("empty key")
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	now := s.now()
	s.cleanupExpiredLocked(now)

	if _, exists := s.items[key]; !exists && len(s.items) >= s.maxEntries {
		return errStoreCapacityExceeded
	}

	s.items[key] = expiringValue[T]{
		value:     value,
		expiresAt: expiresAt,
	}
	return nil
}

func (s *expiringStore[T]) Get(key string) (T, bool) {
	var zero T
	if key == "" {
		return zero, false
	}

	now := s.now()

	s.mu.RLock()
	item, ok := s.items[key]
	s.mu.RUnlock()
	if !ok {
		return zero, false
	}
	if !now.Before(item.expiresAt) {
		s.Delete(key)
		return zero, false
	}

	return item.value, true
}

func (s *expiringStore[T]) Delete(key string) {
	if key == "" {
		return
	}

	s.mu.Lock()
	delete(s.items, key)
	s.mu.Unlock()
}

func (s *expiringStore[T]) Len() int {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return len(s.items)
}

func (s *expiringStore[T]) PurgeExpired() int {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.cleanupExpiredLocked(s.now())
}

func (s *expiringStore[T]) cleanupExpiredLocked(now time.Time) int {
	removed := 0
	for key, item := range s.items {
		if !now.Before(item.expiresAt) {
			delete(s.items, key)
			removed++
		}
	}
	return removed
}
