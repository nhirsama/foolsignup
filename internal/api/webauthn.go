package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sync"

	"foolsignup-api/internal/db"
	authpb "foolsignup-api/internal/pb/auth/v1"

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
		webAuthn, err = webauthn.New(&webauthn.Config{
			RPDisplayName:         "FoolSignUp RP",
			RPID:                  "localhost",
			RPOrigins:             []string{"http://localhost:4321"},
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
	setCorsHeaders(w)
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

	options, session, err := getWebAuthn().BeginRegistration(user, webauthn.WithAuthenticatorSelection(protocol.AuthenticatorSelection{
		UserVerification: protocol.VerificationPreferred,
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
	setCorsHeaders(w)
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

	// 构造一个模拟请求以使用 ParseCredentialCreationResponse
	fakeReq, _ := http.NewRequest("POST", "/", bytes.NewReader([]byte(req.CredentialJson)))
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

	err = db.SaveCredential(userID, credential.ID, credential.PublicKey, string(credential.AttestationType), credential.Authenticator.AAGUID, int(credential.Authenticator.SignCount))
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
	setCorsHeaders(w)
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
	user := &User{id: userID, username: username}

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
	setCorsHeaders(w)
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
	user := &User{id: userID, username: username}

	fakeReq, _ := http.NewRequest("POST", "/", io.NopCloser(bytes.NewReader([]byte(req.CredentialJson))))
	parsedResponse, err := protocol.ParseCredentialRequestResponse(fakeReq)
	if err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "无效的验证请求"
		sendProto(w, res)
		return
	}

	_, err = getWebAuthn().ValidateLogin(user, *session, parsedResponse)
	if err != nil {
		res.Code = http.StatusUnauthorized
		res.Msg = "2FA 验证失败"
		sendProto(w, res)
		return
	}

	setSessionCookie(w, userID, username)
	res.Code = http.StatusOK
	res.Msg = "登录成功"
	sendProto(w, res)
}

func setSessionCookie(w http.ResponseWriter, id int, username string) {
	http.SetCookie(w, &http.Cookie{
		Name:     "uip_session",
		Value:    fmt.Sprintf("sess_%d_%s", id, username),
		Path:     "/",
		HttpOnly: true,
		MaxAge:   86400,
	})
	http.SetCookie(w, &http.Cookie{
		Name:   "uip_temp_auth",
		MaxAge: -1,
		Path:   "/",
	})
}
