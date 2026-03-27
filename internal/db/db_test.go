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
		expires_at DATETIME,
		PRIMARY KEY (scope, identifier)
	);
	CREATE TABLE registration_attempts (
		email TEXT PRIMARY KEY,
		"count" INTEGER DEFAULT 0,
		expires_at DATETIME
	);`
	if _, err := testDB.Exec(schema); err != nil {
		t.Fatalf("create schema: %v", err)
	}

	previous := Instance
	previousDialect := dialect
	Instance = testDB
	dialect = dbTypeSQLite
	nextTransientCleanup.Store(0)
	t.Cleanup(func() {
		Instance = previous
		dialect = previousDialect
		nextTransientCleanup.Store(0)
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
	CREATE TABLE email_send_throttles (
		scope TEXT NOT NULL,
		identifier TEXT NOT NULL,
		last_sent_unix_ms INTEGER NOT NULL,
		expires_at DATETIME,
		PRIMARY KEY (scope, identifier)
	);
	CREATE TABLE registration_attempts (
		email TEXT PRIMARY KEY,
		"count" INTEGER DEFAULT 0,
		expires_at DATETIME
	);`
	if _, err := testDB.Exec(schema); err != nil {
		t.Fatalf("create schema: %v", err)
	}

	previous := Instance
	previousDialect := dialect
	Instance = testDB
	dialect = dbTypeSQLite
	nextTransientCleanup.Store(0)
	t.Cleanup(func() {
		Instance = previous
		dialect = previousDialect
		nextTransientCleanup.Store(0)
		_ = testDB.Close()
	})

	return testDB
}

func newLegacySchemaTestDB(t *testing.T) *sql.DB {
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
	);
	CREATE TABLE registration_attempts (
		email TEXT PRIMARY KEY,
		"count" INTEGER DEFAULT 0
	);`
	if _, err := testDB.Exec(schema); err != nil {
		t.Fatalf("create legacy schema: %v", err)
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

func newVerificationCodeTestDB(t *testing.T) *sql.DB {
	t.Helper()

	testDB, err := sql.Open("sqlite", ":memory:")
	if err != nil {
		t.Fatalf("open sqlite: %v", err)
	}

	schema := `
	CREATE TABLE verification_codes (
		email TEXT NOT NULL,
		code TEXT NOT NULL,
		expires_at DATETIME NOT NULL,
		PRIMARY KEY (email, code)
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

func TestInitializeSchemaHandlesLegacyTransientTables(t *testing.T) {
	testDB := newLegacySchemaTestDB(t)

	if err := initializeSchema(); err != nil {
		t.Fatalf("initialize schema failed: %v", err)
	}

	if _, err := testDB.Exec(
		`INSERT INTO email_send_throttles (scope, identifier, last_sent_unix_ms, expires_at) VALUES (?, ?, ?, ?)`,
		"ip:send_code",
		"203.0.113.5",
		time.Now().UnixMilli(),
		time.Now().Add(time.Minute),
	); err != nil {
		t.Fatalf("insert throttle with expires_at failed: %v", err)
	}

	if _, err := testDB.Exec(
		`INSERT INTO registration_attempts (email, "count", expires_at) VALUES (?, ?, ?)`,
		"user@example.com",
		1,
		time.Now().Add(time.Minute),
	); err != nil {
		t.Fatalf("insert registration attempt with expires_at failed: %v", err)
	}
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

func TestReserveIPRequest(t *testing.T) {
	newThrottleTestDB(t)

	retryAfter, err := ReserveIPRequest("login", "203.0.113.5", time.Second)
	if err != nil {
		t.Fatalf("first reserve failed: %v", err)
	}
	if retryAfter != 0 {
		t.Fatalf("expected first reserve to pass, got retry_after=%v", retryAfter)
	}

	retryAfter, err = ReserveIPRequest("login", "203.0.113.5", time.Second)
	if err != nil {
		t.Fatalf("second reserve failed: %v", err)
	}
	if retryAfter <= 0 || retryAfter > time.Second {
		t.Fatalf("expected second reserve to be limited, got retry_after=%v", retryAfter)
	}

	retryAfter, err = ReserveIPRequest("register", "203.0.113.5", time.Second)
	if err != nil {
		t.Fatalf("different scope reserve failed: %v", err)
	}
	if retryAfter != 0 {
		t.Fatalf("expected different scope to pass, got retry_after=%v", retryAfter)
	}
}

func TestReserveIdentifierRequest(t *testing.T) {
	newThrottleTestDB(t)

	retryAfter, err := ReserveIdentifierRequest("login_user", "alice", time.Second)
	if err != nil {
		t.Fatalf("first reserve failed: %v", err)
	}
	if retryAfter != 0 {
		t.Fatalf("expected first reserve to pass, got retry_after=%v", retryAfter)
	}

	retryAfter, err = ReserveIdentifierRequest("login_user", "alice", time.Second)
	if err != nil {
		t.Fatalf("second reserve failed: %v", err)
	}
	if retryAfter <= 0 || retryAfter > time.Second {
		t.Fatalf("expected second reserve to be limited, got retry_after=%v", retryAfter)
	}

	retryAfter, err = ReserveIdentifierRequest("login_user", "bob", time.Second)
	if err != nil {
		t.Fatalf("third reserve failed: %v", err)
	}
	if retryAfter != 0 {
		t.Fatalf("expected different identifier to pass, got retry_after=%v", retryAfter)
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

func TestIncrementRegistrationCountResetsExpiredRow(t *testing.T) {
	testDB := newRegistrationAttemptsTestDB(t)
	now := time.Now()

	if _, err := testDB.Exec(`INSERT INTO registration_attempts (email, "count", expires_at) VALUES (?, ?, ?)`, "user@example.com", 9, now.Add(-time.Minute)); err != nil {
		t.Fatalf("insert expired row failed: %v", err)
	}

	if err := IncrementRegistrationCount("user@example.com"); err != nil {
		t.Fatalf("increment failed: %v", err)
	}

	got, err := GetRegistrationCount("user@example.com")
	if err != nil {
		t.Fatalf("get count failed: %v", err)
	}
	if got != 1 {
		t.Fatalf("expected expired row to reset to 1, got %d", got)
	}
}

func TestCleanupExpiredTransientState(t *testing.T) {
	testDB := newThrottleTestDB(t)
	now := time.Now()

	if _, err := testDB.Exec(`INSERT INTO email_send_throttles (scope, identifier, last_sent_unix_ms, expires_at) VALUES (?, ?, ?, ?)`, "email", "expired@example.com", now.Add(-time.Hour).UnixMilli(), now.Add(-time.Minute)); err != nil {
		t.Fatalf("insert expired throttle failed: %v", err)
	}
	if _, err := testDB.Exec(`INSERT INTO email_send_throttles (scope, identifier, last_sent_unix_ms, expires_at) VALUES (?, ?, ?, ?)`, "email", "active@example.com", now.UnixMilli(), now.Add(time.Minute)); err != nil {
		t.Fatalf("insert active throttle failed: %v", err)
	}
	if _, err := testDB.Exec(`INSERT INTO registration_attempts (email, "count", expires_at) VALUES (?, ?, ?)`, "expired@example.com", 1, now.Add(-time.Minute)); err != nil {
		t.Fatalf("insert expired attempt failed: %v", err)
	}
	if _, err := testDB.Exec(`INSERT INTO registration_attempts (email, "count", expires_at) VALUES (?, ?, ?)`, "active@example.com", 1, now.Add(time.Minute)); err != nil {
		t.Fatalf("insert active attempt failed: %v", err)
	}

	if err := cleanupExpiredTransientState(now); err != nil {
		t.Fatalf("cleanup failed: %v", err)
	}

	var throttleCount int
	if err := testDB.QueryRow(`SELECT COUNT(*) FROM email_send_throttles`).Scan(&throttleCount); err != nil {
		t.Fatalf("count throttles failed: %v", err)
	}
	if throttleCount != 1 {
		t.Fatalf("expected 1 throttle row after cleanup, got %d", throttleCount)
	}

	var attemptCount int
	if err := testDB.QueryRow(`SELECT COUNT(*) FROM registration_attempts`).Scan(&attemptCount); err != nil {
		t.Fatalf("count registration attempts failed: %v", err)
	}
	if attemptCount != 1 {
		t.Fatalf("expected 1 registration attempt row after cleanup, got %d", attemptCount)
	}
}

func TestPoolConfigForDialect(t *testing.T) {
	sqliteCfg := poolConfigForDialect(dbTypeSQLite)
	if sqliteCfg.MaxOpenConns != 1 || sqliteCfg.MaxIdleConns != 1 {
		t.Fatalf("unexpected sqlite pool config: %+v", sqliteCfg)
	}

	postgresCfg := poolConfigForDialect(dbTypePostgres)
	if postgresCfg.MaxOpenConns != 32 || postgresCfg.MaxIdleConns != 16 {
		t.Fatalf("unexpected postgres pool config: %+v", postgresCfg)
	}
	if postgresCfg.ConnMaxLifetime <= 0 || postgresCfg.ConnMaxIdleTime <= 0 {
		t.Fatalf("expected postgres pool timeouts to be set, got %+v", postgresCfg)
	}
}

func TestSaveVerificationCodeCleansExpiredRows(t *testing.T) {
	testDB := newVerificationCodeTestDB(t)
	now := time.Now()

	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "a@example.com", "expired", now.Add(-time.Minute)); err != nil {
		t.Fatalf("insert expired row failed: %v", err)
	}
	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "b@example.com", "active", now.Add(time.Hour)); err != nil {
		t.Fatalf("insert active row failed: %v", err)
	}

	if err := SaveVerificationCode("c@example.com", "newcode"); err != nil {
		t.Fatalf("save verification code failed: %v", err)
	}

	var expiredCount int
	if err := testDB.QueryRow("SELECT COUNT(*) FROM verification_codes WHERE expires_at <= ?", time.Now()).Scan(&expiredCount); err != nil {
		t.Fatalf("count expired rows failed: %v", err)
	}
	if expiredCount != 0 {
		t.Fatalf("expected expired rows cleaned, got %d", expiredCount)
	}
}

func TestVerifyCodeCleansExpiredForEmail(t *testing.T) {
	testDB := newVerificationCodeTestDB(t)
	now := time.Now()

	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "user@example.com", "expired", now.Add(-time.Minute)); err != nil {
		t.Fatalf("insert expired row failed: %v", err)
	}
	if _, err := testDB.Exec("INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)", "user@example.com", "valid", now.Add(time.Hour)); err != nil {
		t.Fatalf("insert valid row failed: %v", err)
	}

	if !VerifyCode("user@example.com", "valid") {
		t.Fatal("expected valid code to pass")
	}
	if VerifyCode("user@example.com", "expired") {
		t.Fatal("expected expired code to fail")
	}

	var expiredCount int
	if err := testDB.QueryRow("SELECT COUNT(*) FROM verification_codes WHERE email = ? AND expires_at <= ?", "user@example.com", time.Now()).Scan(&expiredCount); err != nil {
		t.Fatalf("count expired rows failed: %v", err)
	}
	if expiredCount != 0 {
		t.Fatalf("expected expired rows for email cleaned, got %d", expiredCount)
	}
}

func TestGetVerificationCodeReturnsLatestUnexpired(t *testing.T) {
	newVerificationCodeTestDB(t)
	now := time.Now()

	if err := SaveVerificationCode("user@example.com", "olderolderolder1"); err != nil {
		t.Fatalf("save first code failed: %v", err)
	}
	time.Sleep(10 * time.Millisecond)
	if err := SaveVerificationCode("user@example.com", "newernewernewer2"); err != nil {
		t.Fatalf("save second code failed: %v", err)
	}
	if err := SaveVerificationCode("user@example.com", "expiredexpired33"); err != nil {
		t.Fatalf("save third code failed: %v", err)
	}

	// 将最后一个手动置为过期，验证读取时会清理并返回最近的未过期值。
	if _, err := Instance.Exec("UPDATE verification_codes SET expires_at = ? WHERE email = ? AND code = ?", now.Add(-time.Second), "user@example.com", "expiredexpired33"); err != nil {
		t.Fatalf("expire third code failed: %v", err)
	}

	got, ok := GetVerificationCode("user@example.com")
	if !ok {
		t.Fatal("expected to fetch verification code")
	}
	if got != "newernewernewer2" {
		t.Fatalf("expected latest unexpired code, got %q", got)
	}
}
