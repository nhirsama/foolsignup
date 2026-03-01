package api

import (
	"github.com/mojocn/base64Captcha"
	"net/http"
)

// CaptchaStore 使用内存存储并设置 TTL
var CaptchaStore = base64Captcha.DefaultMemStore

func HandleGetCaptcha(w http.ResponseWriter, r *http.Request) {
	setCorsHeaders(w)
	if r.Method == http.MethodOptions {
		return
	}

	// 6位数字验证码，强干扰
	driver := base64Captcha.NewDriverDigit(80, 240, 6, 0.7, 80)
	cp := base64Captcha.NewCaptcha(driver, CaptchaStore)

	id, b64, _, err := cp.Generate()
	if err != nil {
		sendError(w, "无法生成验证码", http.StatusInternalServerError)
		return
	}

	// 只返回 key 和图片，不返回验证码内容
	sendJSON(w, map[string]string{
		"captchaKey": id,
		"image":      b64,
	}, http.StatusOK)
}

func VerifyCaptcha(id string, val string) bool {
	return CaptchaStore.Verify(id, val, true)
}
