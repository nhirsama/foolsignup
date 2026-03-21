package api

import (
	"bytes"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	authpb "foolsignup/internal/pb/auth/v1"

	"google.golang.org/protobuf/proto"
)

func TestNormalizeEmailAddress(t *testing.T) {
	email, domain, ok := normalizeEmailAddress("  User.Name+tag@GMAIL.com  ")
	if !ok {
		t.Fatal("expected email to be normalized successfully")
	}
	if email != "user.name+tag@gmail.com" {
		t.Fatalf("unexpected normalized email: %q", email)
	}
	if domain != "gmail.com" {
		t.Fatalf("unexpected domain: %q", domain)
	}
}

func TestNormalizeEmailAddressRejectsInvalidInput(t *testing.T) {
	cases := []string{
		"",
		"plainaddress",
		"user@",
		"@example.com",
		"user@@example.com",
	}

	for _, tc := range cases {
		if _, _, ok := normalizeEmailAddress(tc); ok {
			t.Fatalf("expected %q to be rejected", tc)
		}
	}
}

func TestIsCommonEmailDomain(t *testing.T) {
	if !isCommonEmailDomain("gmail.com") {
		t.Fatal("expected gmail.com to be treated as a common domain")
	}
	if isCommonEmailDomain("mailinator.com") {
		t.Fatal("expected mailinator.com to be treated as an uncommon domain")
	}
}

func TestReadProtoRejectsOversizedBody(t *testing.T) {
	payload, err := proto.Marshal(&authpb.LoginRequest{
		Username: strings.Repeat("a", int(maxProtoBodyBytes)+1),
	})
	if err != nil {
		t.Fatalf("marshal oversized request: %v", err)
	}
	if int64(len(payload)) <= maxProtoBodyBytes {
		t.Fatalf("expected payload to exceed limit, got %d bytes", len(payload))
	}

	req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(payload))
	var decoded authpb.LoginRequest
	err = readProto(req, &decoded)
	if !errors.Is(err, errProtoBodyTooLarge) {
		t.Fatalf("expected oversized body error, got %v", err)
	}
}

func TestHandleLoginRejectsOversizedBody(t *testing.T) {
	payload, err := proto.Marshal(&authpb.LoginRequest{
		Username: strings.Repeat("a", int(maxProtoBodyBytes)+1),
	})
	if err != nil {
		t.Fatalf("marshal oversized request: %v", err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/login", bytes.NewReader(payload))
	rec := httptest.NewRecorder()

	HandleLogin(rec, req)

	if rec.Code != http.StatusRequestEntityTooLarge {
		t.Fatalf("expected HTTP 413, got %d", rec.Code)
	}

	var res authpb.LoginResponse
	if err := proto.Unmarshal(rec.Body.Bytes(), &res); err != nil {
		t.Fatalf("unmarshal response: %v", err)
	}
	if res.Code != http.StatusRequestEntityTooLarge {
		t.Fatalf("expected protobuf code 413, got %d", res.Code)
	}
	if res.Msg != "请求体过大" {
		t.Fatalf("unexpected response message: %q", res.Msg)
	}
}
