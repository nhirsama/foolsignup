package api

import (
	"net"
	"net/http"
	"net/netip"
	"os"
	"strings"
)

func getClientIP(r *http.Request) string {
	if r == nil {
		return ""
	}

	remoteIP, ok := parseRequestIP(r.RemoteAddr)
	if !ok {
		return ""
	}

	clientIP := remoteIP
	if isTrustedProxy(remoteIP) {
		if forwardedIP, ok := parseXForwardedFor(r.Header.Get("X-Forwarded-For")); ok {
			clientIP = forwardedIP
		} else if realIP, ok := parseRequestIP(r.Header.Get("X-Real-IP")); ok {
			clientIP = realIP
		}
	}

	return canonicalizeRateLimitIP(clientIP)
}

func parseRequestIP(raw string) (netip.Addr, bool) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return netip.Addr{}, false
	}

	if addrPort, err := netip.ParseAddrPort(raw); err == nil {
		return addrPort.Addr().Unmap(), true
	}

	if host, _, err := net.SplitHostPort(raw); err == nil {
		if ip, err := netip.ParseAddr(strings.TrimSpace(host)); err == nil {
			return ip.Unmap(), true
		}
	}

	ip, err := netip.ParseAddr(raw)
	if err != nil {
		return netip.Addr{}, false
	}
	return ip.Unmap(), true
}

func parseXForwardedFor(raw string) (netip.Addr, bool) {
	parts := strings.Split(raw, ",")
	ips := make([]netip.Addr, 0, len(parts))
	for _, part := range parts {
		ip, ok := parseRequestIP(part)
		if ok {
			ips = append(ips, ip)
		}
	}
	if len(ips) == 0 {
		return netip.Addr{}, false
	}

	for i := len(ips) - 1; i >= 0; i-- {
		if !isTrustedProxy(ips[i]) {
			return ips[i], true
		}
	}

	return ips[0], true
}

func canonicalizeRateLimitIP(ip netip.Addr) string {
	ip = ip.Unmap()
	if !ip.IsValid() {
		return ""
	}
	if ip.Is4() {
		return ip.String()
	}

	prefix, err := ip.Prefix(64)
	if err != nil {
		return ip.String()
	}
	return prefix.Masked().String()
}

func isTrustedProxy(ip netip.Addr) bool {
	ip = ip.Unmap()
	if !ip.IsValid() {
		return false
	}
	if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() {
		return true
	}

	for _, prefix := range trustedProxyPrefixes() {
		if prefix.Contains(ip) {
			return true
		}
	}
	return false
}

func trustedProxyPrefixes() []netip.Prefix {
	raw := strings.TrimSpace(os.Getenv("TRUSTED_PROXY_CIDRS"))
	if raw == "" {
		return nil
	}

	parts := strings.Split(raw, ",")
	prefixes := make([]netip.Prefix, 0, len(parts))
	for _, part := range parts {
		prefix, err := netip.ParsePrefix(strings.TrimSpace(part))
		if err == nil {
			prefixes = append(prefixes, prefix.Masked())
		}
	}
	return prefixes
}
