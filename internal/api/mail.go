package api

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"
	"math"
	"net/http"
	"net/url"
	"os"
	"strings"

	"foolsignup/internal/db"
	"foolsignup/internal/mail"
	authpb "foolsignup/internal/pb/auth/v1"
)

// HandleSendCode 生成并发送验证码挑战。
func HandleSendCode(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	res := &authpb.SendEmailCodeResponse{
		TraceId: getTraceID(r),
	}

	var req authpb.SendEmailCodeRequest
	if err := readProto(r, &req); err != nil {
		res.Code, res.Msg = protoReadError(err, "请求无效")
		sendProto(w, res)
		return
	}

	if code, msg, ok := validateMaxBytes(req.Email, maxEmailBytes, "邮箱地址过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if code, msg, ok := validateMaxBytes(req.CaptchaKey, maxCaptchaKeyBytes, "验证码标识过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if code, msg, ok := validateMaxBytes(req.CaptchaValue, maxCaptchaValueBytes, "验证码答案过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}

	retryAfter, err := db.ReserveIPRequest("send_code", getClientIP(r), sendCodeRateLimitWindow)
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

	email, domain, ok := normalizeEmailAddress(req.Email)
	if !ok {
		res.Code = http.StatusBadRequest
		res.Msg = "请输入有效的邮箱地址"
		sendProto(w, res)
		return
	}

	if isRestrictedDomain(domain) {
		res.Code = http.StatusBadRequest
		res.Msg = fmt.Sprintf("暂不支持 %s 邮箱，请使用其他邮箱", domain)
		sendProto(w, res)
		return
	}

	applyDomainLimit := true
	limitedScope, retryAfter, err := db.ReserveVerificationEmailSend(email, domain, applyDomainLimit)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "系统繁忙"
		sendProto(w, res)
		return
	}
	if limitedScope != "" {
		seconds := int(math.Ceil(retryAfter.Seconds()))
		if seconds < 1 {
			seconds = 1
		}

		res.Code = http.StatusTooManyRequests
		if limitedScope == "domain" {
			res.Msg = fmt.Sprintf("该邮箱域名发送过于频繁，请 %d 秒后再试", seconds)
		} else {
			res.Msg = fmt.Sprintf("该邮箱发送过于频繁，请 %d 秒后再试", seconds)
		}
		sendProto(w, res)
		return
	}

	if !tryAcquireSlot(mailSendSlots) {
		res.Code = http.StatusServiceUnavailable
		res.Msg = "邮件服务繁忙，请稍后重试"
		sendProto(w, res)
		return
	}
	defer releaseSlot(mailSendSlots)

	challenge, _ := generateRandomHex(16)
	if err := db.SaveVerificationCode(email, challenge); err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "系统繁忙"
		sendProto(w, res)
		return
	}

	sender := mail.NewDefaultSender()
	subject := "PoW 验证码"
	html := buildVerificationEmailHTML(challenge)

	if err := sender.Send(email, subject, html); err != nil {
		if !isMailEnvConfigured() {
			log.Printf("mail: MAIL_API_* 未正确配置，请在后端日志中查看。trace_id=%s", res.TraceId)
			log.Printf("mail: fallback email begin\nTo: %s\nSubject: %s\nHTML:\n%s\nmail: fallback email end", email, subject, html)
			res.Code = http.StatusOK
			res.Msg = "验证码已发送"
			sendProto(w, res)
			return
		}

		log.Printf("mail: 发送失败。trace_id=%s email=%s err=%v", res.TraceId, email, err)
		res.Code = http.StatusInternalServerError
		res.Msg = "邮件发送失败"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "验证码已发送"
	sendProto(w, res)
}

func buildVerificationEmailHTML(challenge string) string {
	return fmt.Sprintf(`<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PoW 验证码</title>
</head>
<body style="margin:0;padding:24px;background:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Microsoft YaHei','Noto Sans SC',sans-serif;color:#1f2937;">
  <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%%" cellpadding="0" cellspacing="0" style="max-width:640px;border-collapse:collapse;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#111827,#4b5563);"></td>
          </tr>
          <tr>
            <td style="padding:28px 28px 18px 28px;">
              <p style="margin:0 0 14px 0;font-size:16px;line-height:1.75;">您的证明字符串前缀为:</p>
              <div style="margin:0 0 22px 0;padding:14px 16px;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:10px;font-size:20px;line-height:1.4;font-weight:700;letter-spacing:0.5px;color:#0f172a;word-break:break-all;">%s</div>
              <p style="margin:0 0 10px 0;font-size:16px;line-height:1.75;font-weight:700;">验证要求：</p>
              <p style="margin:0 0 12px 0;font-size:15px;line-height:1.8;">请寻找一个以此前缀开头的扩展字符串，并确保其 SHA-256 哈希摘要满足前导 20 位零比特位限制 (Difficulty Target)。</p>
              <p style="margin:0 0 12px 0;font-size:15px;line-height:1.8;">计算完成后，请将包含前缀在内的完整证明字符串粘贴至验证码输入框。</p>
              <p style="margin:0;font-size:15px;line-height:1.8;">请在 2 小时内完成验证。如果这不是您的操作，请忽略此邮件。</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`, challenge)
}

func generateRandomHex(n int) (string, error) {
	b := make([]byte, n/2)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

// VerifyPoW 校验字符串是否满足 20 个前导 0 位（即 16 进制前 5 位为 0）
func VerifyPoW(input string) bool {
	sum := sha256.Sum256([]byte(input))
	hash := hex.EncodeToString(sum[:])
	return strings.HasPrefix(hash, "00000")
}

func isMailEnvConfigured() bool {
	endpoint := strings.TrimSpace(os.Getenv("MAIL_API_ENDPOINT"))
	apiKey := strings.TrimSpace(os.Getenv("MAIL_API_KEY"))
	from := strings.TrimSpace(os.Getenv("MAIL_FROM"))

	if endpoint == "" || apiKey == "" || from == "" {
		return false
	}

	u, err := url.Parse(endpoint)
	if err != nil {
		return false
	}
	return u.Scheme != "" && u.Host != ""
}
