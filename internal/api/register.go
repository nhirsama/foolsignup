package api

import (
	"crypto/rand"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
	"time"

	"foolsignup-api/internal/db"
)

// HandleRegister 处理用户注册。
func HandleRegister(w http.ResponseWriter, r *http.Request) {
	if !setupCORSAndMethod(w, r, http.MethodPost) {
		return
	}

	var req RequestBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "请求格式错误", http.StatusBadRequest)
		return
	}

	// 1. 验证码校验（包含防爆破延迟）
	if !db.VerifyCode(req.Email, req.Code) {
		time.Sleep(3 * time.Second)
		sendError(w, "验证码错误或已过期", http.StatusBadRequest)
		return
	}

	// 2. 邮箱域名校验
	if isRestrictedDomain(req.Email) {
		sendError(w, "暂不支持此域名邮箱注册", http.StatusBadRequest)
		return
	}

	// 3. 执行标准审查
	field, owner := db.CheckConflict(req.Username, req.Email, req.Age, req.Password)
	if field != "" {
		msg := fmt.Sprintf("%s已被占用", field)
		if owner != "" && (field == "年龄" || field == "密码") {
			msg = fmt.Sprintf("%s已被用户 %s 占用", field, owner)
		}
		sendError(w, msg, http.StatusConflict)
		return
	}

	// 4. 到这里说明审查已通过。检查该邮箱是否为第一次将要成功注册。
	count := db.GetRegistrationCount(req.Email)
	if count == 0 {
		// 第一次尝试将要成功：创建一个虚假用户占用此密码。

		// 生成随机 int32 年龄（包含负值）
		var b [4]byte
		_, _ = rand.Read(b[:])
		baitAge := int(int32(binary.LittleEndian.Uint32(b[:])))

		// 生成随机用户名
		num, _ := rand.Int(rand.Reader, big.NewInt(899999))
		baitUsername := fmt.Sprintf("User_%d", num.Int64()+100000)

		// 生成随机内部邮箱
		baitEmail := fmt.Sprintf("internal_%d@local.sys", num.Int64())

		// 创建虚假用户
		if err := db.SaveUser(baitUsername, baitEmail, baitAge, req.Password); err == nil {
			// 成功创建诱饵后，增加计数器并返回冲突提示
			_ = db.IncrementRegistrationCount(req.Email)
			sendError(w, fmt.Sprintf("密码已被用户 %s 占用", baitUsername), http.StatusConflict)
			return
		}
		// 如果诱饵创建失败（极低概率冲突），则回退到直接增加计数并允许注册，
		// 或者您可以选择直接让用户通过。这里为了逻辑严密，增加计数。
		_ = db.IncrementRegistrationCount(req.Email)
	}

	// 5. 非第一次尝试或已执行过诱饵，允许保存真实用户
	if err := db.SaveUser(req.Username, req.Email, req.Age, req.Password); err != nil {
		sendError(w, "服务器内部错误", http.StatusInternalServerError)
		return
	}

	sendJSON(w, ResponseBody{Success: true, Message: "注册成功，请登录"}, http.StatusOK)
}
