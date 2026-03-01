package api

import (
	"fmt"
	"net/http"
	"os"
	"strings"

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
		res.Code = http.StatusBadRequest
		res.Msg = "格式错误"
		sendProto(w, res)
		return
	}

	id, ok := db.GetUserByCredentials(req.Username, req.Password)
	if !ok {
		res.Code = http.StatusUnauthorized
		res.Msg = "用户名或密码错误"
		sendProto(w, res)
		return
	}

	// 密码验证成功，检查 2FA 状态
	has2fa := db.Has2FA(id)
	tempToken := fmt.Sprintf("temp_%d", id)

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

	cookie, err := r.Cookie("uip_session")
	if err != nil {
		res.Code = http.StatusUnauthorized
		res.Msg = "未授权"
		sendProto(w, res)
		return
	}

	parts := strings.Split(cookie.Value, "_")
	if len(parts) < 3 {
		res.Code = http.StatusUnauthorized
		res.Msg = "会话无效"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "success"
	res.Data = &authpb.GetMeResponse_Data{
		Username: parts[2],
	}

	sendProto(w, res)
}

// HandleLogout 清除会话 Cookie。
func HandleLogout(w http.ResponseWriter, r *http.Request) {
	setCorsHeaders(w)
	http.SetCookie(w, &http.Cookie{
		Name:     "uip_session",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	})
	w.WriteHeader(http.StatusOK)
}
