package main

import (
	"log"
	"net/http"
	"os"

	"foolsignup-api/internal/api"
	"foolsignup-api/internal/db"
)

func main() {
	// 初始化数据库单例
	db.InitDB()

	// 注册 API 路由
	http.HandleFunc("/api/captcha", api.HandleGetCaptcha)
	http.HandleFunc("/api/send-code", api.HandleSendCode)
	http.HandleFunc("/api/register", api.HandleRegister)
	http.HandleFunc("/api/login", api.HandleLogin)
	http.HandleFunc("/api/me", api.HandleMe)

	port := os.Getenv("FOOL_SIGNUP_PORT")
	if port == "" {
		port = "3001" // 本地开发默认端口
	}

	log.Printf("后端正在运行：http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("服务器无法启动: %v", err)
	}
}
