package api

import (
	"crypto/rand"
	"encoding/hex"
	"io"
	"net/http"
	"os"
	"strings"

	"google.golang.org/protobuf/proto"
)

var restrictedDomains = map[string]struct{}{
	// 预留受限域名列表
}

var commonEmailDomains = map[string]struct{}{
	// 国际主流
	"gmail.com":   {},
	"outlook.com": {},
	"hotmail.com": {},
	"yahoo.com":   {},
	"icloud.com":  {},
	"me.com":      {},
	"aol.com":     {},
	"live.com":    {},
	"msn.com":     {},
	// 国内主流
	"qq.com":      {},
	"163.com":     {},
	"126.com":     {},
	"foxmail.com": {},
	"aliyun.com":  {},
	"sina.com":    {},
	"sina.cn":     {},
	"yeah.net":    {},
	"139.com":     {},
	"189.cn":      {},
	// 隐私与极客向
	"proton.me":      {},
	"protonmail.com": {},
	"pm.me":          {},
	"tuta.com":       {},
	"tutanota.com":   {},
	"zoho.com":       {},
	"yandex.com":     {},
}

func getTraceID(r *http.Request) string {
	tid := r.Header.Get("X-Trace-Id")
	if tid != "" {
		return tid
	}
	b := make([]byte, 8)
	_, _ = rand.Read(b)
	return hex.EncodeToString(b)
}

func setupCORSAndMethod(w http.ResponseWriter, r *http.Request, method string) bool {
	setCorsHeaders(w)
	if r.Method == http.MethodOptions {
		return false
	}
	if r.Method != method {
		http.Error(w, "方法不允许", http.StatusMethodNotAllowed)
		return false
	}
	return true
}

func setCorsHeaders(w http.ResponseWriter) {
	origin := os.Getenv("ALLOWED_ORIGIN")
	if origin == "" {
		origin = "http://localhost:4321"
	}
	w.Header().Set("Access-Control-Allow-Origin", origin)
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Trace-Id")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}

// readProto 从请求体中读取 Protobuf 二进制数据并反序列化。
func readProto(r *http.Request, msg proto.Message) error {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		return err
	}
	return proto.Unmarshal(body, msg)
}

// sendProto 序列化 Protobuf 消息并发送二进制响应。
func sendProto(w http.ResponseWriter, msg proto.Message) {
	w.Header().Set("Content-Type", "application/x-protobuf")

	// 尝试从消息中获取 code 字段（通过反射或简单判断）
	statusCode := http.StatusOK
	if m, ok := msg.(interface{ GetCode() int32 }); ok {
		c := int(m.GetCode())
		if c >= 400 && c < 600 {
			statusCode = c
		}
	}

	w.WriteHeader(statusCode)
	data, err := proto.Marshal(msg)
	if err == nil {
		w.Write(data)
	}
}

func normalizeEmailAddress(email string) (string, string, bool) {
	normalized := strings.ToLower(strings.TrimSpace(email))
	if normalized == "" || strings.Count(normalized, "@") != 1 {
		return "", "", false
	}

	local, domain, ok := strings.Cut(normalized, "@")
	if !ok || local == "" || domain == "" {
		return "", "", false
	}

	return normalized, domain, true
}

func isRestrictedDomain(domain string) bool {
	if domain == "" {
		return true
	}

	_, restricted := restrictedDomains[domain]
	return restricted
}

func isCommonEmailDomain(domain string) bool {
	_, common := commonEmailDomains[domain]
	return common
}
