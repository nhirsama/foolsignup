package api

import "time"

const (
	loginRateLimitWindow          = time.Second
	registerRateLimitWindow       = 2 * time.Second
	sendCodeRateLimitWindow       = 2 * time.Second
	captchaRateLimitWindow        = 2 * time.Second
	captchaStoreExpiration        = 10 * time.Minute
	captchaStoreMaxEntries        = 4096
	tempAuthStoreMaxEntries       = 4096
	sessionAuthStoreMaxEntries    = 8192
	webAuthnStoreMaxEntries       = 4096
	maxUsernameBytes              = 64
	maxEmailBytes                 = 320
	maxPasswordBytes              = 256
	maxProofBytes                 = 256
	maxTurnstileTokenBytes        = 4096
	maxCaptchaKeyBytes            = 128
	maxCaptchaValueBytes          = 16
	maxTempTokenBytes             = 128
	maxWebAuthnCredentialBytes    = 64 << 10
	loginVerifyConcurrencyLimit   = 16
	registerWriteConcurrencyLimit = 8
	mailSendConcurrencyLimit      = 16
)
