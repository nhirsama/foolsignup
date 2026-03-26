package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"foolsignup/internal/api"
	"foolsignup/internal/db"
)

const (
	serverReadHeaderTimeout = 2 * time.Second
	serverReadTimeout       = 10 * time.Second
	serverWriteTimeout      = 15 * time.Second
	serverIdleTimeout       = 60 * time.Second
	serverMaxHeaderBytes    = 8 << 10
)

func main() {
	// 初始化数据库单例
	db.InitDB()

	port := os.Getenv("FOOL_SIGNUP_PORT")
	if port == "" {
		port = "3001" // 本地开发默认端口
	}

	log.Printf("后端正在运行：http://localhost:%s", port)
	server := newHTTPServer(":" + port)
	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("服务器无法启动: %v", err)
	}
}

func newHTTPServer(addr string) *http.Server {
	return &http.Server{
		Addr:              addr,
		Handler:           newServeMux(),
		ReadHeaderTimeout: serverReadHeaderTimeout,
		ReadTimeout:       serverReadTimeout,
		WriteTimeout:      serverWriteTimeout,
		IdleTimeout:       serverIdleTimeout,
		MaxHeaderBytes:    serverMaxHeaderBytes,
	}
}

func newServeMux() *http.ServeMux {
	mux := http.NewServeMux()

	// 注册 API 路由
	mux.HandleFunc("/api/captcha", api.HandleGetCaptcha)
	mux.HandleFunc("/api/send-code", api.HandleSendCode)
	mux.HandleFunc("/api/register", api.HandleRegister)
	mux.HandleFunc("/api/login", api.HandleLogin)
	mux.HandleFunc("/api/me", api.HandleMe)
	mux.HandleFunc("/api/logout", api.HandleLogout)

	// WebAuthn 2FA 路由
	mux.HandleFunc("/api/webauthn/register/options", api.HandleGetWebAuthnRegistrationOptions)
	mux.HandleFunc("/api/webauthn/register/verify", api.HandleVerifyWebAuthnRegistration)
	mux.HandleFunc("/api/webauthn/login/options", api.HandleGetWebAuthnLoginOptions)
	mux.HandleFunc("/api/webauthn/login/verify", api.HandleVerifyWebAuthnLogin)

	return mux
}
