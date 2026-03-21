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
		res.Code = http.StatusBadRequest
		res.Msg = "请求无效"
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

	applyDomainLimit := !isCommonEmailDomain(domain)
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

	challenge, _ := generateRandomHex(16)
	if err := db.SaveVerificationCode(email, challenge); err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "系统繁忙"
		sendProto(w, res)
		return
	}

	sender := mail.NewDefaultSender()
	subject := "PoW 验证码"
	html := fmt.Sprintf(`您的证明字符串前缀为: <b>%s</b><br><br>
	<b>验证要求：</b><br>
	请寻找一个以此前缀开头的扩展字符串，并确保其 SHA-256 哈希摘要满足前导 20 位零比特位限制 (Difficulty Target)。<br><br>
	计算完成后，请将包含前缀在内的完整证明字符串粘贴至验证码输入框。<br><br>
    请在 2 小时内完成验证。如果这不是您的操作，请忽略此邮件。`, challenge)

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
