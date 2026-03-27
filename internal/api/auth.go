package api

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"foolsignup/internal/db"
	authpb "foolsignup/internal/pb/auth/v1"
)

// HandleLogin 处理用户登录（第一阶段：密码验证）。
func HandleLogin(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	res := &authpb.LoginResponse{
		TraceId: getTraceID(r),
	}

	var req authpb.LoginRequest
	if err := readProto(r, &req); err != nil {
		res.Code, res.Msg = protoReadError(err, "格式错误")
		sendProto(w, res)
		return
	}

	if code, msg, ok := validateMaxBytes(req.Username, maxUsernameBytes, "用户名过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if code, msg, ok := validateMaxBytes(req.Password, maxPasswordBytes, "密码过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if strings.TrimSpace(req.Username) == "" || req.Password == "" {
		res.Code = http.StatusBadRequest
		res.Msg = "用户名和密码不能为空"
		sendProto(w, res)
		return
	}

	retryAfter, err := db.ReserveIPRequest("login", getClientIP(r), loginRateLimitWindow)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "系统繁忙"
		sendProto(w, res)
		return
	}
	if retryAfter > 0 {
		res.Code = http.StatusTooManyRequests
		res.Msg = fmt.Sprintf("请求过于频繁，请 %d 秒后再试", retryAfterSeconds(retryAfter))
		sendProto(w, res)
		return
	}

	if !tryAcquireSlot(loginVerifySlots) {
		res.Code = http.StatusServiceUnavailable
		res.Msg = "登录服务繁忙，请稍后重试"
		sendProto(w, res)
		return
	}
	defer releaseSlot(loginVerifySlots)

	id, ok := db.GetUserByCredentials(req.Username, req.Password)
	if !ok {
		res.Code = http.StatusUnauthorized
		res.Msg = "用户名或密码错误"
		sendProto(w, res)
		return
	}

	// 密码验证成功，检查 2FA 状态
	has2fa := db.Has2FA(id)
	tempToken, err := issueTempAuthToken(id, 5*time.Minute)
	if err != nil {
		if errors.Is(err, errStoreCapacityExceeded) {
			res.Code = http.StatusServiceUnavailable
			res.Msg = "登录请求过多，请稍后重试"
		} else {
			res.Code = http.StatusInternalServerError
			res.Msg = "临时会话创建失败"
		}
		sendProto(w, res)
		return
	}

	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	isSecure := strings.HasPrefix(allowedOrigin, "https://")

	// 下发临时 Cookie 用于后续 WebAuthn 验证
	tempCookie := &http.Cookie{
		Name:     "uip_temp_auth",
		Value:    tempToken,
		Path:     "/",
		HttpOnly: true,
		MaxAge:   300, // 5 分钟有效
	}
	if isSecure {
		tempCookie.Secure = true
		tempCookie.SameSite = http.SameSiteNoneMode
	}
	http.SetCookie(w, tempCookie)

	res.Code = http.StatusOK
	res.Msg = "密码验证通过"
	res.Data = &authpb.LoginResponse_Data{
		TempToken:   tempToken,
		Require_2Fa: has2fa,
		Setup_2Fa:   !has2fa, // 如果没有 2FA，则强制要求设置
	}

	sendProto(w, res)
}

// HandleMe 返回当前登录用户信息。
func HandleMe(w http.ResponseWriter, r *http.Request) {
	setCorsHeaders(w)
	if r.Method == http.MethodOptions {
		return
	}

	res := &authpb.GetMeResponse{
		TraceId: getTraceID(r),
	}

	_, username, ok := getSessionFromRequest(r)
	if !ok {
		res.Code = http.StatusUnauthorized
		res.Msg = "未授权"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "success"
	res.Data = &authpb.GetMeResponse_Data{
		Username: username,
	}

	sendProto(w, res)
}

// HandleLogout 清除会话 Cookie。
func HandleLogout(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}
	if !requestOriginAllowed(r) {
		http.Error(w, "forbidden", http.StatusForbidden)
		return
	}
	if cookie, err := r.Cookie("uip_session"); err == nil {
		clearSessionToken(cookie.Value)
	}
	if cookie, err := r.Cookie("uip_temp_auth"); err == nil {
		clearTempAuthToken(cookie.Value)
	}
	clearAuthCookies(w)
	w.WriteHeader(http.StatusOK)
}

func clearAuthCookies(w http.ResponseWriter) {
	allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
	isSecure := strings.HasPrefix(allowedOrigin, "https://")

	sessionCookie := &http.Cookie{
		Name:     "uip_session",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	}
	tempCookie := &http.Cookie{
		Name:     "uip_temp_auth",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	}
	if isSecure {
		sessionCookie.Secure = true
		sessionCookie.SameSite = http.SameSiteNoneMode
		tempCookie.Secure = true
		tempCookie.SameSite = http.SameSiteNoneMode
	}

	http.SetCookie(w, sessionCookie)
	http.SetCookie(w, tempCookie)
}
