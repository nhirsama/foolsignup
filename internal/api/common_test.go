package api

import "testing"

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
