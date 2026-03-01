package api

import (
	"encoding/json"
	"net/http"
	"strings"
)

// RequestBody 定义了 API 请求的通用结构体。
type RequestBody struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Age      int    `json:"age"`
	Password string `json:"password"`
	Code     string `json:"code"`
}

// ResponseBody 定义了 API 响应的通用结构体。
type ResponseBody struct {
	Error   string `json:"error,omitempty"`
	Success bool   `json:"success,omitempty"`
	Message string `json:"message,omitempty"`
}

var restrictedDomains = []string{"gmail.com", "outlook.com", "qq.com", "163.com", "hotmail.com", "yahoo.com"}

func setupCORSAndMethod(w http.ResponseWriter, r *http.Request, method string) bool {
	setCorsHeaders(w)
	if r.Method == http.MethodOptions {
		return false
	}
	if r.Method != method {
		sendError(w, "方法不允许", http.StatusMethodNotAllowed)
		return false
	}
	return true
}

func setCorsHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4321")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}

func sendJSON(w http.ResponseWriter, data interface{}, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(data)
}

func sendError(w http.ResponseWriter, msg string, code int) {
	sendJSON(w, ResponseBody{Error: msg}, code)
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
