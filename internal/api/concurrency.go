package api

var mailSendSlots = make(chan struct{}, mailSendConcurrencyLimit)

func tryAcquireSlot(slots chan struct{}) bool {
	select {
	case slots <- struct{}{}:
		return true
	default:
		return false
	}
}

func releaseSlot(slots chan struct{}) {
	select {
	case <-slots:
	default:
	}
}
