// Package mail 提供基于 HTTP API 的通用邮件发送功能。
package mail

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// EmailSender 定义了发送邮件的通用接口。
type EmailSender interface {
	Send(to, subject, html string) error
}

// APISender 实现了通过 CyberPersons HTTP API 发送邮件。
type APISender struct {
	Endpoint string
	APIKey   string
	From     string
	Client   *http.Client
}

// emailRequest 内部使用的 API 请求结构。
type emailRequest struct {
	From    string `json:"from"`
	To      string `json:"to"`
	Subject string `json:"subject"`
	HTML    string `json:"html"`
}

// Send 执行 HTTP POST 请求发送邮件。
func (s *APISender) Send(to, subject, html string) error {
	payload, err := json.Marshal(emailRequest{
		From:    s.From,
		To:      to,
		Subject: subject,
		HTML:    html,
	})
	if err != nil {
		return fmt.Errorf("mail: 序列化请求失败: %w", err)
	}

	req, err := http.NewRequest("POST", s.Endpoint, bytes.NewBuffer(payload))
	if err != nil {
		return fmt.Errorf("mail: 创建请求失败: %w", err)
	}

	// 强制设置 User-Agent 和 Authorization 头部
	req.Header.Set("Authorization", "Bearer "+s.APIKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("User-Agent", "Go-http-client/1.1")

	client := s.Client
	if client == nil {
		client = defaultMailHTTPClient
	}

	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("mail: 网络请求失败: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("mail: API 错误 (状态码 %d): %s", resp.StatusCode, string(body))
	}

	return nil
}

var defaultMailHTTPClient = &http.Client{
	Timeout: 10 * time.Second,
	Transport: &http.Transport{
		Proxy:                 http.ProxyFromEnvironment,
		MaxIdleConns:          32,
		MaxIdleConnsPerHost:   8,
		IdleConnTimeout:       90 * time.Second,
		TLSHandshakeTimeout:   5 * time.Second,
		ResponseHeaderTimeout: 5 * time.Second,
		ExpectContinueTimeout: time.Second,
	},
}

// NewDefaultSender 从环境变量初始化默认发送器。
func NewDefaultSender() EmailSender {
	return &APISender{
		Endpoint: os.Getenv("MAIL_API_ENDPOINT"),
		APIKey:   os.Getenv("MAIL_API_KEY"),
		From:     os.Getenv("MAIL_FROM"),
	}
}
