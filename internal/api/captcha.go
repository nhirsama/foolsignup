package api

import (
	"net/http"

	authpb "foolsignup-api/internal/pb/auth/v1"

	"github.com/mojocn/base64Captcha"
)

// CaptchaStore 使用内存存储并设置 TTL
var CaptchaStore = base64Captcha.DefaultMemStore

func HandleGetCaptcha(w http.ResponseWriter, r *http.Request) {
	setCorsHeaders(w)
	if r.Method == http.MethodOptions {
		return
	}

	res := &authpb.GetCaptchaResponse{
		TraceId: getTraceID(r),
	}

	// 6位数字验证码，强干扰
	driver := base64Captcha.NewDriverDigit(80, 240, 6, 0.7, 80)
	cp := base64Captcha.NewCaptcha(driver, CaptchaStore)

	id, b64, _, err := cp.Generate()
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "无法生成验证码"
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
