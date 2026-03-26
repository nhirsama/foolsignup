package mail

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestAPISenderUsesClientTimeout(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(100 * time.Millisecond)
		w.WriteHeader(http.StatusOK)
	}))
	defer server.Close()

	sender := &APISender{
		Endpoint: server.URL,
		APIKey:   "secret",
		From:     "noreply@example.com",
		Client: &http.Client{
			Timeout: 20 * time.Millisecond,
		},
	}

	start := time.Now()
	err := sender.Send("user@example.com", "subject", "<p>hello</p>")
	if err == nil {
		t.Fatal("expected timeout error")
	}
	if !strings.Contains(err.Error(), "网络请求失败") {
		t.Fatalf("unexpected error: %v", err)
	}
	if elapsed := time.Since(start); elapsed > 200*time.Millisecond {
		t.Fatalf("Send() took too long: %v", elapsed)
	}
}
