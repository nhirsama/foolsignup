# Build stage
FROM golang:1.25-alpine AS builder

ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG ALL_PROXY

WORKDIR /app

# 安装构建依赖
RUN apk add --no-cache git

# 复制依赖文件并下载
COPY go.mod go.sum ./
RUN go mod download

# 复制源代码并构建
COPY . .
# 使用 CGO_ENABLED=0 以确保生成的二进制文件在 alpine 中运行
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Run stage
FROM alpine:latest

WORKDIR /app

# 安装基础运行依赖（如 ca-certificates 用于邮件发送）
RUN apk add --no-cache ca-certificates tzdata

# 从构建阶段复制二进制文件
COPY --from=builder /app/main .

# 创建持久化数据目录
RUN mkdir -p /app/data

# 设置环境变量默认值
ENV FOOL_SIGNUP_PORT=3001
ENV ALLOWED_ORIGIN=http://localhost:4321

# 邮件 API 配置
ENV MAIL_API_ENDPOINT=""
ENV MAIL_FROM=""
ENV MAIL_API_KEY=""

EXPOSE 3001

CMD ["./main"]
