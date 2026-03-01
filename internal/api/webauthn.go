package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"

	"foolsignup/internal/db"
	authpb "foolsignup/internal/pb/auth/v1"

	"github.com/go-webauthn/webauthn/protocol"
	"github.com/go-webauthn/webauthn/webauthn"
)

var (
	webAuthn *webauthn.WebAuthn
	waOnce   sync.Once
	// 存储正在进行的会话数据
	sessionStore = make(map[string]*webauthn.SessionData)
	sessionMu    sync.RWMutex
)

func getWebAuthn() *webauthn.WebAuthn {
	waOnce.Do(func() {
		var err error
		allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
		rpID := "localhost"
		origin := "http://localhost:4321"

		if allowedOrigin != "" {
			origin = allowedOrigin
			u, err := url.Parse(allowedOrigin)
			if err == nil {
				rpID = u.Hostname()
			}
		}

		webAuthn, err = webauthn.New(&webauthn.Config{
			RPDisplayName:         "FoolSignUp RP",
			RPID:                  rpID,
			RPOrigins:             []string{origin},
			AttestationPreference: protocol.PreferNoAttestation,
		})
		if err != nil {
			fmt.Printf("WebAuthn 初始化失败: %v\n", err)
		}
	})
	return webAuthn
}

// User 适配 WebAuthn 接口
type User struct {
	id          int
	username    string
	credentials []webauthn.Credential
}

func (u *User) WebAuthnID() []byte                         { return []byte(fmt.Sprintf("%d", u.id)) }
func (u *User) WebAuthnName() string                       { return u.username }
func (u *User) WebAuthnDisplayName() string                { return u.username }
func (u *User) WebAuthnIcon() string                       { return "" }
func (u *User) WebAuthnCredentials() []webauthn.Credential { return u.credentials }

func HandleGetWebAuthnRegistrationOptions(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodGet) {
		return
	}
	res := &authpb.GetWebAuthnRegistrationOptionsResponse{TraceId: getTraceID(r)}

	userID, ok := getTempUserID(r)
	if !ok {
		res.Code = http.StatusUnauthorized
		res.Msg = "请先登录"
		sendProto(w, res)
		return
	}

	username, _, _ := db.GetUserByID(userID)
	user := &User{id: userID, username: username}

	// 明确配置 AuthenticatorSelection 以支持现代同步凭证（Passkeys）
	options, session, err := getWebAuthn().BeginRegistration(user, webauthn.WithAuthenticatorSelection(protocol.AuthenticatorSelection{
		UserVerification: protocol.VerificationPreferred,
		ResidentKey:      protocol.ResidentKeyRequirementPreferred,
	}))
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "无法生成注册选项"
		sendProto(w, res)
		return
	}

	sessionMu.Lock()
	sessionStore[getTraceID(r)] = session
	sessionMu.Unlock()

	optionsJSON, _ := json.Marshal(options)
	res.Code = http.StatusOK
	res.Msg = "success"
	res.OptionsJson = string(optionsJSON)
	sendProto(w, res)
}

func HandleVerifyWebAuthnRegistration(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}
	res := &authpb.VerifyWebAuthnRegistrationResponse{TraceId: getTraceID(r)}

	var req authpb.VerifyWebAuthnRegistrationRequest
	if err := readProto(r, &req); err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "格式错误"
		sendProto(w, res)
		return
	}

	userID, ok := getTempUserID(r)
	if !ok {
		res.Code = http.StatusUnauthorized
		res.Msg = "会话超时"
		sendProto(w, res)
		return
	}

	sessionMu.RLock()
	session, exists := sessionStore[getTraceID(r)]
	sessionMu.RUnlock()
	if !exists {
		res.Code = http.StatusBadRequest
		res.Msg = "验证超时，请重试"
		sendProto(w, res)
		return
	}

	username, _, _ := db.GetUserByID(userID)
	user := &User{id: userID, username: username}

	fakeReq, _ := http.NewRequest("POST", "/", bytes.NewReader([]byte(req.CredentialJson)))
	fakeReq.Header.Set("Content-Type", "application/json")
	parsedResponse, err := protocol.ParseCredentialCreationResponse(fakeReq)
	if err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "无效的凭证响应"
		sendProto(w, res)
		return
	}

	credential, err := getWebAuthn().CreateCredential(user, *session, parsedResponse)
	if err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "验证失败"
		sendProto(w, res)
		return
	}

	// 关键：将 BackupEligible 和 BackupState 保存到数据库
	err = db.SaveCredential(userID, credential.ID, credential.PublicKey, string(credential.AttestationType), credential.Authenticator.AAGUID, int(credential.Authenticator.SignCount), credential.Flags.BackupEligible, credential.Flags.BackupState)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "无法保存凭证"
		sendProto(w, res)
		return
	}

	setSessionCookie(w, userID, username)
	res.Code = http.StatusOK
	res.Msg = "2FA 设置成功"
	sendProto(w, res)
}

func getTempUserID(r *http.Request) (int, bool) {
	cookie, err := r.Cookie("uip_temp_auth")
	if err != nil {
		return 0, false
	}
	var id int
	_, err = fmt.Sscanf(cookie.Value, "temp_%d", &id)
	return id, err == nil
}

func HandleGetWebAuthnLoginOptions(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}
	res := &authpb.GetWebAuthnLoginOptionsResponse{TraceId: getTraceID(r)}

	var req authpb.GetWebAuthnLoginOptionsRequest
	if err := readProto(r, &req); err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "格式错误"
		sendProto(w, res)
		return
	}

	userID, ok := getTempUserID(r)
	if !ok {
		res.Code = http.StatusUnauthorized
		res.Msg = "会话超时"
		sendProto(w, res)
		return
	}

	username, _, _ := db.GetUserByID(userID)
	creds, _ := db.GetUserCredentials(userID)
	user := &User{id: userID, username: username, credentials: creds}

	options, session, err := getWebAuthn().BeginLogin(user)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "无法生成登录选项"
		sendProto(w, res)
		return
	}

	sessionMu.Lock()
	sessionStore[getTraceID(r)] = session
	sessionMu.Unlock()

	optionsJSON, _ := json.Marshal(options)
	res.Code = http.StatusOK
	res.Msg = "success"
	res.OptionsJson = string(optionsJSON)
	sendProto(w, res)
}

func HandleVerifyWebAuthnLogin(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}
	res := &authpb.VerifyWebAuthnLoginResponse{TraceId: getTraceID(r)}

	var req authpb.VerifyWebAuthnLoginRequest
	if err := readProto(r, &req); err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "格式错误"
		sendProto(w, res)
		return
	}

	userID, ok := getTempUserID(r)
	if !ok {
		res.Code = http.StatusUnauthorized
		res.Msg = "会话超时"
		sendProto(w, res)
		return
	}

	sessionMu.RLock()
	session, exists := sessionStore[getTraceID(r)]
	sessionMu.RUnlock()
	if !exists {
		res.Code = http.StatusBadRequest
		res.Msg = "验证超时"
		sendProto(w, res)
		return
	}

	username, _, _ := db.GetUserByID(userID)
	creds, _ := db.GetUserCredentials(userID)
	user := &User{id: userID, username: username, credentials: creds}

	fakeReq, _ := http.NewRequest("POST", "/", io.NopCloser(bytes.NewReader([]byte(req.CredentialJson))))
	fakeReq.Header.Set("Content-Type", "application/json")
	parsedResponse, err := protocol.ParseCredentialRequestResponse(fakeReq)
	if err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "无效的验证请求"
		sendProto(w, res)
		return
	}

	credential, err := getWebAuthn().ValidateLogin(user, *session, parsedResponse)
	if err != nil {
		log.Printf("[WebAuthn] 验证失败! TraceID: %s, UserID: %d, Error: %v", getTraceID(r), userID, err)
		res.Code = http.StatusUnauthorized
		res.Msg = "2FA 验证失败"
		sendProto(w, res)
		return
	}

	// 成功验证后更新计数器
	_ = db.UpdateCredentialSignCount(credential.ID, credential.Authenticator.SignCount)

	setSessionCookie(w, userID, username)
	res.Code = http.StatusOK
	res.Msg = "登录成功"
	sendProto(w, res)
}

func setSessionCookie(w http.ResponseWriter, id int, username string) {
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	isSecure := strings.HasPrefix(allowedOrigin, "https://")

	cookie := &http.Cookie{
		Name:     "uip_session",
		Value:    fmt.Sprintf("sess_%d_%s", id, username),
		Path:     "/",
		HttpOnly: true,
		MaxAge:   86400,
	}

	if isSecure {
		cookie.Secure = true
		cookie.SameSite = http.SameSiteNoneMode
	}

	http.SetCookie(w, cookie)

	tempCookie := &http.Cookie{
		Name:   "uip_temp_auth",
		MaxAge: -1,
		Path:   "/",
	}
	if isSecure {
		tempCookie.Secure = true
		tempCookie.SameSite = http.SameSiteNoneMode
	}
	http.SetCookie(w, tempCookie)
}
