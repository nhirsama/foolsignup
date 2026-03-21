# Fool Signup 愚人注册

本项目是一个愚人节项目，意在通过刻意设计给用户带来不好的使用体验。

本项目通过 Vibe Coding 实现。

## 特点

- Protobuf 二进制通信。前端与后端通过 Protobuf 二进制格式进行 HTTP 通信，作为简单的逆向门槛。
- ~~禁用主流邮箱~~。本意是在通过设计阻止用户泄露邮箱和常用密码，但是用户往往不会去考虑使用临时邮箱，故暂时强制使用 32
  位及以上的复杂密码以用户阻止泄露常用密码。
- 黑盒密码强度判定。注册密码除必须包含大小写字母、数字和特殊符号外，还需要通过额外的字符串结构强度校验；重复片段、明显周期、长回文和连续序列都会显著降低评分，只有达到“复杂”才允许注册。
- 显式工作量证明 Proof-of-Work (PoW)。用户需要手动找到一个随机 16 位前缀的 sha-256 值符合特定难度（20位前导零）的字符串。
- 年龄唯一性约束。每个年龄只允许被一位用户占用，系统在初始化时将创建若干虚假账户占用 0-99 的年龄区间。
- 虚假用户。当一个新邮箱尝试注册时，系统会先创建一个虚假用户并提示“密码已被用户xx占用”。
- WebAuthn (Passkey) 验证。强制要求使用 WebAuthn 进行两步验证，并阻止用户登录系统创建的虚假用户。

## 技术栈

- 后端: Go 1.22+ / Protobuf / SQLite
- 前端: Astro / TypeScript / Protobuf.js
- 架构: 前后端分离，通过 Protobuf over HTTP 交互

## 部署方法

本项目支持 Docker 一键部署。

### 1. 环境准备

确保您的服务器已安装 `Docker` 和 `Docker Compose`。

### 2. 获取源码

```bash
git clone https://github.com/nhirsama/foolsignup.git
cd foolsignup
```

### 3. 配置环境变量

修改 `docker-compose.yml` 。核心变量说明：

| 变量名                 | 说明                         | 示例                                        |
|:--------------------|:---------------------------|:------------------------------------------|
| `ALLOWED_ORIGIN`    | 允许跨域的域名（前端访问地址）            | `https://signup.example.com`              |
| `MAIL_API_ENDPOINT` | 邮件服务 API 地址 (基于 HTTP POST) | `https://api.cyberpersons.com/email/send` |
| `MAIL_API_KEY`      | 邮件服务 API Key               | `your_secret_key`                         |
| `MAIL_FROM`         | 发件人邮箱                      | `noreply@example.com`                     |

### 4. 启动服务

使用 Docker Compose 构建并运行：

```bash
docker-compose up -d --build
```

服务启动后：

- 后端 API 将运行在 `http://localhost:16241` (映射自 3001)。
- 数据库文件将持久化在当前目录下的 `./data/data.db`。

---

## 前端部署 (Astro)

建议将前端部署在 **Cloudflare Pages**, **Vercel** 或作为静态文件托管。

### 1. 安装依赖

```bash
pnpm install
```

### 2. 构建

```bash
pnpm build
```

### 3. 配置

请配置环境变量 `PUBLIC_API_URL` 并指向后端 URL。
