package api

import (
	"errors"
	"strings"
	"sync"
	"time"
)

var errCaptchaStoreCapacityExceeded = errors.New("captcha store capacity exceeded")

type captchaEntry struct {
	value     string
	expiresAt time.Time
}

type boundedCaptchaStore struct {
	mu         sync.RWMutex
	items      map[string]captchaEntry
	maxEntries int
	expiration time.Duration
	now        func() time.Time
}

func newBoundedCaptchaStore(maxEntries int, expiration time.Duration) *boundedCaptchaStore {
	return &boundedCaptchaStore{
		items:      make(map[string]captchaEntry),
		maxEntries: maxEntries,
		expiration: expiration,
		now:        time.Now,
	}
}

func (s *boundedCaptchaStore) Set(id string, value string) error {
	if id == "" {
		return errors.New("empty captcha id")
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	now := s.now()
	s.cleanupExpiredLocked(now)

	if _, exists := s.items[id]; !exists && len(s.items) >= s.maxEntries {
		return errCaptchaStoreCapacityExceeded
	}

	s.items[id] = captchaEntry{
		value:     value,
		expiresAt: now.Add(s.expiration),
	}
	return nil
}

func (s *boundedCaptchaStore) Get(id string, clear bool) string {
	if id == "" {
		return ""
	}

	now := s.now()
	s.mu.Lock()
	defer s.mu.Unlock()

	item, ok := s.items[id]
	if !ok {
		return ""
	}
	if !now.Before(item.expiresAt) {
		delete(s.items, id)
		return ""
	}
	if clear {
		delete(s.items, id)
	}
	return item.value
}

func (s *boundedCaptchaStore) Verify(id, answer string, clear bool) bool {
	if id == "" || answer == "" {
		return false
	}
	return strings.EqualFold(s.Get(id, clear), answer)
}

func (s *boundedCaptchaStore) Len() int {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return len(s.items)
}

func (s *boundedCaptchaStore) cleanupExpiredLocked(now time.Time) int {
	removed := 0
	for key, item := range s.items {
		if !now.Before(item.expiresAt) {
			delete(s.items, key)
			removed++
		}
	}
	return removed
}
