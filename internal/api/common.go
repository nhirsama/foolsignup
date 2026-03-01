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

var restrictedDomains = []string{
	// 国际主流
	"gmail.com", "outlook.com", "hotmail.com", "yahoo.com", "icloud.com", "me.com", "aol.com", "live.com", "msn.com",
	// 国内主流
	"qq.com", "163.com", "126.com", "foxmail.com", "aliyun.com", "sina.com", "sina.cn", "yeah.net", "139.com", "189.cn",
	// 隐私与极客向
	"proton.me", "protonmail.com", "pm.me", "tuta.com", "zoho.com", "yandex.com",
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
	w.WriteHeader(http.StatusOK)
	data, err := proto.Marshal(msg)
	if err == nil {
		w.Write(data)
	}
}

func isRestrictedDomain(email string) bool {
	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		return true
	}
	domain := strings.ToLower(parts[1])
	for _, d := range restrictedDomains {
		if domain == d {
			return true
		}
	}
	return false
}
