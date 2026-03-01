package api

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"net/http"

	"foolsignup-api/internal/db"
	"foolsignup-api/internal/mail"
	authpb "foolsignup-api/internal/pb/auth/v1"
)

// HandleSendCode 生成并发送验证码。
func HandleSendCode(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	res := &authpb.SendEmailCodeResponse{
		TraceId: getTraceID(r),
	}

	var req authpb.SendEmailCodeRequest
	if err := readProto(r, &req); err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "请求无效"
		sendProto(w, res)
		return
	}

	// 1. 人机验证二次检查 (校验 Key 和所选 Value)
	if req.CaptchaKey == "" || req.CaptchaValue == "" || !VerifyCaptcha(req.CaptchaKey, req.CaptchaValue) {
		res.Code = http.StatusForbidden
		res.Msg = "人机验证未通过或已过期，请重新验证"
		sendProto(w, res)
		return
	}

	if req.Email == "" {
		res.Code = http.StatusBadRequest
		res.Msg = "请输入邮箱地址"
		sendProto(w, res)
		return
	}

	code, err := generateNumericCode(6)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "系统错误"
		sendProto(w, res)
		return
	}

	if err := db.SaveVerificationCode(req.Email, code); err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "系统繁忙，请稍后再试"
		sendProto(w, res)
		return
	}

	sender := mail.NewDefaultSender()
	subject := "[UIP-2026] 身份验证码"
	html := fmt.Sprintf("您的验证码是: <b>%s</b><br>请在10分钟内完成验证。如果这不是您的操作，请忽略此邮件。", code)

	if err := sender.Send(req.Email, subject, html); err != nil {
		fmt.Printf("邮件发送失败: %v ", err)
		res.Code = http.StatusInternalServerError
		res.Msg = "邮件发送失败，请联系管理员"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "验证码已发送"
	sendProto(w, res)
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
