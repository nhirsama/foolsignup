package api

import (
	"fmt"
	"net/http"
	"time"

	"foolsignup/internal/db"
	authpb "foolsignup/internal/pb/auth/v1"

	"github.com/mojocn/base64Captcha"
)

// CaptchaStore 使用内存存储并设置 TTL
var CaptchaStore = newBoundedCaptchaStore(captchaStoreMaxEntries, captchaStoreExpiration)

func HandleGetCaptcha(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodGet) {
		return
	}

	res := &authpb.GetCaptchaResponse{
		TraceId: getTraceID(r),
	}

	retryAfter, err := dbReserveCaptchaRequest(r)
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

	// 6位数字验证码，强干扰
	driver := base64Captcha.NewDriverDigit(80, 240, 6, 0.7, 80)
	cp := base64Captcha.NewCaptcha(driver, CaptchaStore)

	id, b64, _, err := cp.Generate()
	if err != nil {
		res.Code = http.StatusServiceUnavailable
		res.Msg = "验证码服务繁忙，请稍后重试"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "success"
	res.Data = &authpb.GetCaptchaResponse_Data{
		CaptchaKey: id,
		Image:      b64,
	}

	sendProto(w, res)
}

func VerifyCaptcha(id string, val string) bool {
	return CaptchaStore.Verify(id, val, true)
}

func dbReserveCaptchaRequest(r *http.Request) (time.Duration, error) {
	return db.ReserveIPRequest("captcha", getClientIP(r), captchaRateLimitWindow)
}
