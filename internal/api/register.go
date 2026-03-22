package api

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"foolsignup/internal/db"
	"foolsignup/internal/password"
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
		res.Code, res.Msg = protoReadError(err, "请求格式错误")
		sendProto(w, res)
		return
	}

	email, _, ok := normalizeEmailAddress(req.Email)
	if !ok {
		res.Code = http.StatusBadRequest
		res.Msg = "请输入有效的邮箱地址"
		sendProto(w, res)
		return
	}

	if msg := password.ValidateRegistrationPassword(req.Password); msg != "" {
		res.Code = http.StatusBadRequest
		res.Msg = msg
		sendProto(w, res)
		return
	}

	// 1. PoW 挑战校验
	challenge, ok := db.GetVerificationCode(email)
	if !ok {
		res.Code = http.StatusBadRequest
		res.Msg = "验证码已过期"
		sendProto(w, res)
		return
	}

	// 校验：输入必须以 Challenge 开头，且满足哈希条件
	if !strings.HasPrefix(req.Code, challenge) || !VerifyPoW(req.Code) {
		time.Sleep(3 * time.Second)
		res.Code = http.StatusBadRequest
		res.Msg = "PoW 验证码校验未通过，请检查字符串与哈希摘要"
		sendProto(w, res)
		return
	}

	// 3. 执行标准审查
	field, owner := db.CheckConflict(req.Username, email, int(req.Age), req.Password)
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
	count, err := db.GetRegistrationCount(email)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "服务器内部错误"
		sendProto(w, res)
		return
	}
	if count == 0 {
		// 第一次尝试将要成功：创建一个虚假用户占用此密码。
		if err := db.CreateBaitUser(req.Password, -1); err == nil {
			if err := db.IncrementRegistrationCount(email); err != nil {
				res.Code = http.StatusInternalServerError
				res.Msg = "服务器内部错误"
				sendProto(w, res)
				return
			}
			// 诱饵用户已创建，再次检查冲突以获取该诱饵用户的用户名
			_, owner := db.CheckConflict(req.Username, email, int(req.Age), req.Password)
			res.Code = http.StatusConflict
			res.Msg = fmt.Sprintf("密码已被用户 %s 占用", owner)
			sendProto(w, res)
			return
		}
		if err := db.IncrementRegistrationCount(email); err != nil {
			res.Code = http.StatusInternalServerError
			res.Msg = "服务器内部错误"
			sendProto(w, res)
			return
		}
	}

	// 5. 非第一次尝试或已执行过诱饵，允许保存真实用户
	if err := db.SaveUser(req.Username, email, int(req.Age), req.Password); err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "服务器内部错误"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "注册成功，请登录"
	sendProto(w, res)
}
