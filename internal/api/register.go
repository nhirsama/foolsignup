package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"foolsignup-api/internal/db"
)

// HandleRegister 处理用户注册。
func HandleRegister(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	var req RequestBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "请求格式错误", http.StatusBadRequest)
		return
	}

	// 1. 验证码校验
	if !db.VerifyCode(req.Email, req.Code) {
		sendError(w, "验证码错误或已过期", http.StatusBadRequest)
		return
	}

	// 2. 邮箱域名校验
	if isRestrictedDomain(req.Email) {
		sendError(w, "暂不支持此域名邮箱注册", http.StatusBadRequest)
		return
	}

	// 3. 数据库冲突校验
	field, owner := db.CheckConflict(req.Username, req.Email, req.Age, req.Password)
	if field != "" {
		msg := fmt.Sprintf("%s已被占用", field)
		if owner != "" && (field == "年龄" || field == "密码") {
			msg = fmt.Sprintf("%s已被用户 %s 占用", field, owner)
		}
		sendError(w, msg, http.StatusConflict)
		return
	}

	// 4. 保存用户
	if err := db.SaveUser(req.Username, req.Email, req.Age, req.Password); err != nil {
		sendError(w, "服务器内部错误", http.StatusInternalServerError)
		return
	}

	sendJSON(w, ResponseBody{Success: true, Message: "注册成功，请登录"}, http.StatusOK)
}
