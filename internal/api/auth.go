package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"foolsignup-api/internal/db"
)

// HandleLogin 处理用户登录及设置 Cookie。
func HandleLogin(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	var req RequestBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "格式错误", http.StatusBadRequest)
		return
	}

	id, ok := db.GetUserByCredentials(req.Username, req.Password)
	if !ok {
		sendError(w, "用户名或密码错误", http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "uip_session",
		Value:    fmt.Sprintf("sess_%d_%s", id, req.Username),
		Path:     "/",
		HttpOnly: true,
		MaxAge:   86400,
	})

	sendJSON(w, ResponseBody{Success: true, Message: "登录成功"}, http.StatusOK)
}

// HandleMe 返回当前登录用户信息。
func HandleMe(w http.ResponseWriter, r *http.Request) {
	setCorsHeaders(w)
	if r.Method == http.MethodOptions {
		return
	}

	cookie, err := r.Cookie("uip_session")
	if err != nil {
		sendError(w, "未授权", http.StatusUnauthorized)
		return
	}

	parts := strings.Split(cookie.Value, "_")
	if len(parts) < 3 {
		sendError(w, "会话无效", http.StatusUnauthorized)
		return
	}

	sendJSON(w, map[string]interface{}{"success": true, "username": parts[2]}, http.StatusOK)
}
