package api

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"

	"foolsignup-api/internal/db"
	"foolsignup-api/internal/mail"
)

// HandleSendCode 生成并发送验证码。
func HandleSendCode(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	var req RequestBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "请求无效", http.StatusBadRequest)
		return
	}

	// 1. 人机验证二次检查 (校验 Key 和所选 Value)
	if req.CaptchaKey == "" || req.CaptchaValue == "" || !VerifyCaptcha(req.CaptchaKey, req.CaptchaValue) {
		sendError(w, "人机验证未通过或已过期，请重新验证", http.StatusForbidden)
		return
	}

	if req.Email == "" {
		sendError(w, "请输入邮箱地址", http.StatusBadRequest)
		return
	}

	code, err := generateNumericCode(6)
	if err != nil {
		sendError(w, "系统错误", http.StatusInternalServerError)
		return
	}

	if err := db.SaveVerificationCode(req.Email, code); err != nil {
		sendError(w, "系统繁忙，请稍后再试", http.StatusInternalServerError)
		return
	}

	sender := mail.NewDefaultSender()
	subject := "[UIP-2026] 身份验证码"
	html := fmt.Sprintf("您的验证码是: <b>%s</b><br>请在10分钟内完成验证。如果这不是您的操作，请忽略此邮件。", code)

	if err := sender.Send(req.Email, subject, html); err != nil {
		fmt.Printf("邮件发送失败: %v ", err)
		sendError(w, "邮件发送失败，请联系管理员", http.StatusInternalServerError)
		return
	}

	sendJSON(w, ResponseBody{Success: true, Message: "验证码已发送"}, http.StatusOK)
}

func generateNumericCode(length int) (string, error) {
	res := ""
	for i := 0; i < length; i++ {
		num, err := rand.Int(rand.Reader, big.NewInt(10))
		if err != nil {
			return "", err
		}
		res += num.String()
	}
	return res, nil
}
