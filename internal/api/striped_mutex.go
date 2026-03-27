package api

import (
	"hash/fnv"
	"sort"
	"sync"
)

type stripedMutex struct {
	locks []sync.Mutex
}

func newStripedMutex(size int) *stripedMutex {
	if size <= 0 {
		size = 64
	}
	return &stripedMutex{locks: make([]sync.Mutex, size)}
}

func (s *stripedMutex) LockKeys(keys ...string) func() {
	if len(keys) == 0 {
		return func() {}
	}

	indexSet := make(map[int]struct{}, len(keys))
	for _, key := range keys {
		indexSet[s.index(key)] = struct{}{}
	}

	indexes := make([]int, 0, len(indexSet))
	for idx := range indexSet {
		indexes = append(indexes, idx)
	}
	sort.Ints(indexes)

	for _, idx := range indexes {
		s.locks[idx].Lock()
	}

	return func() {
		for i := len(indexes) - 1; i >= 0; i-- {
			s.locks[indexes[i]].Unlock()
		}
	}
}

func (s *stripedMutex) TryLockKey(key string) bool {
	if key == "" {
		return true
	}
	return s.locks[s.index(key)].TryLock()
}

func (s *stripedMutex) UnlockKey(key string) {
	if key == "" {
		return
	}
	s.locks[s.index(key)].Unlock()
}

func (s *stripedMutex) index(key string) int {
	h := fnv.New32a()
	_, _ = h.Write([]byte(key))
	return int(h.Sum32() % uint32(len(s.locks)))
}
