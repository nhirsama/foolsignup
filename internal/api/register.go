package api

import (
	"fmt"
	"net/http"
	"time"

	"foolsignup/internal/db"
	authpb "foolsignup/internal/pb/auth/v1"
)

// HandleRegister 处理用户注册。
func HandleRegister(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	res := &authpb.RegisterResponse{
		TraceId: getTraceID(r),
	}

	var req authpb.RegisterRequest
	if err := readProto(r, &req); err != nil {
		res.Code = http.StatusBadRequest
		res.Msg = "请求格式错误"
		sendProto(w, res)
		return
	}

	// 1. 验证码校验（包含防爆破延迟）
	if !db.VerifyCode(req.Email, req.Code) {
		time.Sleep(3 * time.Second)
		res.Code = http.StatusBadRequest
		res.Msg = "验证码错误或已过期"
		sendProto(w, res)
		return
	}

	// 2. 邮箱域名校验
	if isRestrictedDomain(req.Email) {
		res.Code = http.StatusBadRequest
		res.Msg = "暂不支持此域名邮箱注册"
		sendProto(w, res)
		return
	}

	// 3. 执行标准审查
	field, owner := db.CheckConflict(req.Username, req.Email, int(req.Age), req.Password)
	if field != "" {
		msg := fmt.Sprintf("%s已被占用", field)
		if owner != "" && (field == "年龄" || field == "密码") {
			msg = fmt.Sprintf("%s已被用户 %s 占用", field, owner)
		}
		res.Code = http.StatusConflict
		res.Msg = msg
		sendProto(w, res)
		return
	}

	// 4. 到这里说明审查已通过。检查该邮箱是否为第一次将要成功注册。
	count := db.GetRegistrationCount(req.Email)
	if count == 0 {
		// 第一次尝试将要成功：创建一个虚假用户占用此密码。
		if err := db.CreateBaitUser(req.Password); err == nil {
			_ = db.IncrementRegistrationCount(req.Email)
			res.Code = http.StatusConflict
			res.Msg = "密码已被占用" // 提示信息保持一致，但后台已通过 2FA 封死
			sendProto(w, res)
			return
		}
		_ = db.IncrementRegistrationCount(req.Email)
	}

	// 5. 非第一次尝试或已执行过诱饵，允许保存真实用户
	if err := db.SaveUser(req.Username, req.Email, int(req.Age), req.Password); err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "服务器内部错误"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "注册成功，请登录"
	sendProto(w, res)
}
