package db

import (
	"database/sql"
	"testing"
	"time"
)

func newThrottleTestDB(t *testing.T) *sql.DB {
	t.Helper()

	testDB, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}

	schema := `
	CREATE TABLE email_send_throttles (
		scope TEXT NOT NULL,
		identifier TEXT NOT NULL,
		last_sent_unix_ms INTEGER NOT NULL,
		PRIMARY KEY (scope, identifier)
	);`
	if _, err := testDB.Exec(schema); err != nil {
		t.Fatalf("create schema: %v", err)
	}

	previous := Instance
	previousDialect := dialect
	Instance = testDB
	dialect = dbTypeSQLite
	t.Cleanup(func() {
		Instance = previous
		dialect = previousDialect
		_ = testDB.Close()
	})

	return testDB
}

func newRegistrationAttemptsTestDB(t *testing.T) *sql.DB {
	t.Helper()

	testDB, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}

	schema := `
	CREATE TABLE registration_attempts (
		email TEXT PRIMARY KEY,
		"count" INTEGER DEFAULT 0
	);`
	if _, err := testDB.Exec(schema); err != nil {
		t.Fatalf("create schema: %v", err)
	}

	previous := Instance
	previousDialect := dialect
	Instance = testDB
	dialect = dbTypeSQLite
	t.Cleanup(func() {
		Instance = previous
		dialect = previousDialect
		_ = testDB.Close()
	})

	return testDB
}

func TestReserveVerificationEmailSendCommonDomainOnlyLimitsPerEmail(t *testing.T) {
	newThrottleTestDB(t)

	scope, retryAfter, err := ReserveVerificationEmailSend("user@gmail.com", "gmail.com", false)
	if err != nil {
		t.Fatalf("first reserve failed: %v", err)
	}
	if scope != "" || retryAfter != 0 {
		t.Fatalf("expected first reserve to pass, got scope=%q retry_after=%v", scope, retryAfter)
	}

	scope, retryAfter, err = ReserveVerificationEmailSend("user@gmail.com", "gmail.com", false)
	if err != nil {
		t.Fatalf("second reserve failed: %v", err)
	}
	if scope != "email" {
		t.Fatalf("expected per-email throttle, got %q", scope)
	}
	if retryAfter <= 0 || retryAfter > 60*time.Second {
		t.Fatalf("unexpected retry_after for email throttle: %v", retryAfter)
	}

	scope, retryAfter, err = ReserveVerificationEmailSend("other@gmail.com", "gmail.com", false)
	if err != nil {
		t.Fatalf("third reserve failed: %v", err)
	}
	if scope != "" || retryAfter != 0 {
		t.Fatalf("expected different email on common domain to pass, got scope=%q retry_after=%v", scope, retryAfter)
	}
}

func TestReserveVerificationEmailSendUncommonDomainAlsoLimitsDomain(t *testing.T) {
	newThrottleTestDB(t)

	scope, retryAfter, err := ReserveVerificationEmailSend("first@example.dev", "example.dev", true)
	if err != nil {
		t.Fatalf("first reserve failed: %v", err)
	}
	if scope != "" || retryAfter != 0 {
		t.Fatalf("expected first reserve to pass, got scope=%q retry_after=%v", scope, retryAfter)
	}

	scope, retryAfter, err = ReserveVerificationEmailSend("second@example.dev", "example.dev", true)
	if err != nil {
		t.Fatalf("second reserve failed: %v", err)
	}
	if scope != "domain" {
		t.Fatalf("expected per-domain throttle, got %q", scope)
	}
	if retryAfter <= 0 || retryAfter > 30*time.Second {
		t.Fatalf("unexpected retry_after for domain throttle: %v", retryAfter)
	}

	scope, retryAfter, err = ReserveVerificationEmailSend("first@example.dev", "example.dev", true)
	if err != nil {
		t.Fatalf("third reserve failed: %v", err)
	}
	if scope != "email" {
		t.Fatalf("expected same email to hit email throttle first, got %q", scope)
	}
	if retryAfter <= 0 || retryAfter > 60*time.Second {
		t.Fatalf("unexpected retry_after for email throttle: %v", retryAfter)
	}
}

func TestIncrementRegistrationCount(t *testing.T) {
	newRegistrationAttemptsTestDB(t)

	const email = "user@example.com"

	got, err := GetRegistrationCount(email)
	if err != nil {
		t.Fatalf("get initial count failed: %v", err)
	}
	if got != 0 {
		t.Fatalf("expected initial count to be 0, got %d", got)
	}

	if err := IncrementRegistrationCount(email); err != nil {
		t.Fatalf("first increment failed: %v", err)
	}
	got, err = GetRegistrationCount(email)
	if err != nil {
		t.Fatalf("get count after first increment failed: %v", err)
	}
	if got != 1 {
		t.Fatalf("expected count after first increment to be 1, got %d", got)
	}

	if err := IncrementRegistrationCount(email); err != nil {
		t.Fatalf("second increment failed: %v", err)
	}
	got, err = GetRegistrationCount(email)
	if err != nil {
		t.Fatalf("get count after second increment failed: %v", err)
	}
	if got != 2 {
		t.Fatalf("expected count after second increment to be 2, got %d", got)
	}
}
