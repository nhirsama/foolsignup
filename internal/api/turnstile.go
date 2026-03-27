package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"
)

const defaultTurnstileVerifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

var (
	errTurnstileTokenMissing = errors.New("turnstile token missing")
	errTurnstileRejected     = errors.New("turnstile token rejected")
	errTurnstileUnavailable  = errors.New("turnstile unavailable")
)

var turnstileHTTPClient = &http.Client{
	Timeout: 5 * time.Second,
	Transport: &http.Transport{
		Proxy:                 http.ProxyFromEnvironment,
		MaxIdleConns:          16,
		MaxIdleConnsPerHost:   4,
		IdleConnTimeout:       30 * time.Second,
		TLSHandshakeTimeout:   5 * time.Second,
		ResponseHeaderTimeout: 5 * time.Second,
		ExpectContinueTimeout: time.Second,
	},
}

type turnstileVerifyResponse struct {
	Success    bool     `json:"success"`
	ErrorCodes []string `json:"error-codes"`
	Hostname   string   `json:"hostname"`
}

func verifyRegistrationTurnstile(r *http.Request, token string) error {
	secret := strings.TrimSpace(os.Getenv("TURNSTILE_SECRET_KEY"))
	if secret == "" {
		return nil
	}

	trimmedToken := strings.TrimSpace(token)
	if trimmedToken == "" {
		return errTurnstileTokenMissing
	}

	form := url.Values{}
	form.Set("secret", secret)
	form.Set("response", trimmedToken)
	if ip := strings.TrimSpace(getClientIP(r)); ip != "" {
		form.Set("remoteip", ip)
	}

	endpoint := strings.TrimSpace(os.Getenv("TURNSTILE_VERIFY_ENDPOINT"))
	if endpoint == "" {
		endpoint = defaultTurnstileVerifyEndpoint
	}

	req, err := http.NewRequest(http.MethodPost, endpoint, strings.NewReader(form.Encode()))
	if err != nil {
		return fmt.Errorf("%w: create request: %v", errTurnstileUnavailable, err)
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := turnstileHTTPClient.Do(req)
	if err != nil {
		return fmt.Errorf("%w: request failed: %v", errTurnstileUnavailable, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("%w: unexpected status %d", errTurnstileUnavailable, resp.StatusCode)
	}

	var result turnstileVerifyResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return fmt.Errorf("%w: decode failed: %v", errTurnstileUnavailable, err)
	}

	if !result.Success {
		return fmt.Errorf("%w: %s", errTurnstileRejected, strings.Join(result.ErrorCodes, ","))
	}

	if expectedHostname, ok := allowedOriginHostname(); ok && result.Hostname != "" && !strings.EqualFold(result.Hostname, expectedHostname) {
		return fmt.Errorf("%w: hostname mismatch", errTurnstileRejected)
	}

	return nil
}

func allowedOriginHostname() (string, bool) {
	origin := strings.TrimSpace(allowedOrigin())
	if origin == "" {
		return "", false
	}

	parsed, err := url.Parse(origin)
	if err != nil {
		return "", false
	}

	hostname := strings.TrimSpace(parsed.Hostname())
	return hostname, hostname != ""
}

func turnstileErrorResponse(err error) (int32, string) {
	switch {
	case err == nil:
		return http.StatusOK, ""
	case errors.Is(err, errTurnstileTokenMissing):
		return http.StatusForbidden, "请先完成 Cloudflare 人机验证"
	case errors.Is(err, errTurnstileRejected):
		return http.StatusForbidden, "Cloudflare 人机验证失败，请重试"
	default:
		return http.StatusServiceUnavailable, "Cloudflare 验证服务繁忙，请稍后重试"
	}
}
