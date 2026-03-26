package api

import (
	"net/http/httptest"
	"testing"
)

func TestGetClientIPIgnoresSpoofedForwardedHeadersFromUntrustedPeer(t *testing.T) {
	req := httptest.NewRequest("GET", "/", nil)
	req.RemoteAddr = "203.0.113.10:1234"
	req.Header.Set("X-Forwarded-For", "198.51.100.20")
	req.Header.Set("X-Real-IP", "198.51.100.30")

	if got := getClientIP(req); got != "203.0.113.10" {
		t.Fatalf("getClientIP() = %q, want %q", got, "203.0.113.10")
	}
}

func TestGetClientIPUsesTrustedProxyHeaders(t *testing.T) {
	t.Setenv("TRUSTED_PROXY_CIDRS", "198.51.100.0/24")

	req := httptest.NewRequest("GET", "/", nil)
	req.RemoteAddr = "198.51.100.10:443"
	req.Header.Set("X-Forwarded-For", "2001:db8:1:2::1234, 198.51.100.20")

	if got := getClientIP(req); got != "2001:db8:1:2::/64" {
		t.Fatalf("getClientIP() = %q, want %q", got, "2001:db8:1:2::/64")
	}
}

func TestCanonicalizeRateLimitIPUsesIPv6Slash64(t *testing.T) {
	reqA := httptest.NewRequest("GET", "/", nil)
	reqA.RemoteAddr = "[2001:db8:1:2::1]:1234"

	reqB := httptest.NewRequest("GET", "/", nil)
	reqB.RemoteAddr = "[2001:db8:1:2::abcd]:5678"

	gotA := getClientIP(reqA)
	gotB := getClientIP(reqB)
	if gotA != "2001:db8:1:2::/64" {
		t.Fatalf("getClientIP(reqA) = %q, want %q", gotA, "2001:db8:1:2::/64")
	}
	if gotA != gotB {
		t.Fatalf("expected IPv6 /64 bucketing to match, got %q and %q", gotA, gotB)
	}
}
