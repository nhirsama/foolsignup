package api

import (
	"fmt"
	"net/http"
	"strings"

	"foolsignup/internal/db"
	"foolsignup/internal/password"
	authpb "foolsignup/internal/pb/auth/v1"
)

var registrationFlowLocks = newStripedMutex(1024)

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

	if code, msg, ok := validateMaxBytes(req.Username, maxUsernameBytes, "用户名过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if code, msg, ok := validateMaxBytes(req.Email, maxEmailBytes, "邮箱地址过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if code, msg, ok := validateMaxBytes(req.Password, maxPasswordBytes, "密码过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if code, msg, ok := validateMaxBytes(req.Code, maxProofBytes, "PoW 字符串过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if code, msg, ok := validateMaxBytes(req.TurnstileToken, maxTurnstileTokenBytes, "Cloudflare 验证凭证过长"); !ok {
		res.Code, res.Msg = code, msg
		sendProto(w, res)
		return
	}
	if strings.TrimSpace(req.Username) == "" || req.Password == "" {
		res.Code = http.StatusBadRequest
		res.Msg = "用户名和密码不能为空"
		sendProto(w, res)
		return
	}

	retryAfter, err := db.ReserveIPRequest("register", getClientIP(r), registerRateLimitWindow)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "服务器内部错误"
		sendProto(w, res)
		return
	}
	if retryAfter > 0 {
		res.Code = http.StatusTooManyRequests
		res.Msg = fmt.Sprintf("请求过于频繁，请 %d 秒后再试", retryAfterSeconds(retryAfter))
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

	// 1. PoW 挑战校验：challenge 前缀需与邮箱下未过期记录精确匹配，同时满足哈希难度。
	if !isValidRegistrationPoW(email, req.Code) {
		res.Code = http.StatusBadRequest
		res.Msg = "PoW 验证码校验未通过，请检查字符串与哈希摘要"
		sendProto(w, res)
		return
	}
	if err := verifyRegistrationTurnstile(r, req.TurnstileToken); err != nil {
		res.Code, res.Msg = turnstileErrorResponse(err)
		sendProto(w, res)
		return
	}

	if !registrationFlowLocks.TryLockKey(email) {
		res.Code = http.StatusTooManyRequests
		res.Msg = "该邮箱已有注册请求正在处理中，请稍后再试"
		sendProto(w, res)
		return
	}
	defer registrationFlowLocks.UnlockKey(email)

	if setRegisterConflictResponse(res, req.Username, email, int(req.Age), req.Password) {
		sendProto(w, res)
		return
	}

	if !tryAcquireSlot(registerWriteSlots) {
		res.Code = http.StatusServiceUnavailable
		res.Msg = "注册服务繁忙，请稍后重试"
		sendProto(w, res)
		return
	}
	defer releaseSlot(registerWriteSlots)

	// 到这里说明审查已通过。检查该邮箱是否为第一次将要成功注册。
	count, err := db.GetRegistrationCount(email)
	if err != nil {
		res.Code = http.StatusInternalServerError
		res.Msg = "服务器内部错误"
		sendProto(w, res)
		return
	}
	if count == 0 {
		// 第一次尝试先创建诱饵用户；即使此处因竞态失败，也保留原有“首次尝试后进入下一阶段”的业务语义。
		baitCreated := db.CreateBaitUser(req.Password, -1) == nil
		if err := db.IncrementRegistrationCount(email); err != nil {
			res.Code = http.StatusInternalServerError
			res.Msg = "服务器内部错误"
			sendProto(w, res)
			return
		}
		if baitCreated {
			if !setRegisterConflictResponse(res, req.Username, email, int(req.Age), req.Password) {
				res.Code = http.StatusConflict
				res.Msg = "密码已被占用"
			}
			sendProto(w, res)
			return
		}
	}

	// 非第一次尝试或已执行过诱饵，允许保存真实用户。
	if err := db.SaveUser(req.Username, email, int(req.Age), req.Password); err != nil {
		if setRegisterConflictResponse(res, req.Username, email, int(req.Age), req.Password) {
			sendProto(w, res)
			return
		}
		res.Code = http.StatusInternalServerError
		res.Msg = "服务器内部错误"
		sendProto(w, res)
		return
	}

	res.Code = http.StatusOK
	res.Msg = "注册成功，请登录"
	sendProto(w, res)
}

func isValidRegistrationPoW(email, code string) bool {
	proof := strings.TrimSpace(code)
	if len(proof) < powChallengePrefixSize {
		return false
	}
	if !VerifyPoW(proof) {
		return false
	}

	challenge := proof[:powChallengePrefixSize]
	return db.VerifyCode(email, challenge)
}

func setRegisterConflictResponse(res *authpb.RegisterResponse, username, email string, age int, password string) bool {
	field, owner := db.CheckConflict(username, email, age, password)
	if field == "" {
		return false
	}

	msg := fmt.Sprintf("%s已被占用", field)
	if owner != "" && (field == "年龄" || field == "密码") {
		msg = fmt.Sprintf("%s已被用户 %s 占用", field, owner)
	}

	res.Code = http.StatusConflict
	res.Msg = msg
	return true
}
