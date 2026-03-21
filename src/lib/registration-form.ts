import { create, get } from '@github/webauthn-json';

import { foolsignup } from './pb/auth.js';
import { evaluatePasswordComplexity, getPasswordComplexityWidth, type PasswordComplexityResult } from './password-complexity';

const authpb = foolsignup.auth.v1;

const commonEmailDomains = new Set([
    'gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com', 'me.com', 'aol.com', 'live.com', 'msn.com',
    'qq.com', '163.com', '126.com', 'foxmail.com', 'aliyun.com', 'sina.com', 'sina.cn', 'yeah.net', '139.com', '189.cn',
    'proton.me', 'protonmail.com', 'pm.me', 'tuta.com', 'tutanota.com', 'zoho.com', 'yandex.com',
]);

type ParsedEmail = {
    email: string;
    domain: string;
};

type CooldownState = {
    email: string;
    emailUntil: number;
    domain: string;
    domainUntil: number;
};

type ProtoDecoder = {
    decode(input: Uint8Array): any;
};

function requireElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`missing element: ${id}`);
    }
    return element as T;
}

function parseEmailAddress(value: string): ParsedEmail | null {
    const normalized = value.trim().toLowerCase();
    if (!normalized) return null;

    const parts = normalized.split('@');
    if (parts.length !== 2) return null;

    const [local, domain] = parts;
    if (!local || !domain) return null;

    return { email: normalized, domain };
}

function isCommonEmailDomain(domain: string): boolean {
    return commonEmailDomains.has(domain);
}

function getRemainingSeconds(until: number): number {
    return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

export function initRegistrationForm(): void {
    const mount = () => {
        const form = document.getElementById('uip-form') as HTMLFormElement | null;
        if (!form || form.dataset.initialized === 'true') {
            return;
        }
        form.dataset.initialized = 'true';

        const authView = requireElement<HTMLElement>('auth-view');
        const twofaView = requireElement<HTMLElement>('twofa-view');
        const dashboardView = requireElement<HTMLElement>('dashboard-view');
        const twofaBtn = requireElement<HTMLButtonElement>('webauthn-btn');
        const twofaMsg = requireElement<HTMLElement>('twofa-msg');
        const backToLogin = requireElement<HTMLElement>('back-to-login');
        const logoutBtn = requireElement<HTMLButtonElement>('logout-btn');
        const dashUsername = requireElement<HTMLElement>('dash-username');

        const userInput = requireElement<HTMLInputElement>('username');
        const toggleLink = requireElement<HTMLElement>('toggle-link');
        const sendCodeBtn = requireElement<HTMLButtonElement>('send-code-btn');
        const emailInput = requireElement<HTMLInputElement>('email');
        const ageInput = requireElement<HTMLInputElement>('age');
        const passwordInput = requireElement<HTMLInputElement>('password');
        const confirmPasswordField = requireElement<HTMLElement>('confirm-password-field');
        const passwordComplexityBox = requireElement<HTMLElement>('password-complexity-box');
        const passwordComplexityFill = requireElement<HTMLElement>('password-complexity-fill');

        const captchaModal = requireElement<HTMLElement>('captcha-modal');
        const captchaImg = requireElement<HTMLImageElement>('captcha-img');
        const captchaGrid = requireElement<HTMLElement>('captcha-grid');
        const captchaSlider = requireElement<HTMLInputElement>('captcha-nav-slider');

        const successAlert = requireElement<HTMLElement>('success-alert');
        const errorAlert = requireElement<HTMLElement>('error-alert');
        const errorText = requireElement<HTMLElement>('error-text');
        const loading = requireElement<HTMLElement>('loading-overlay');

        const traceId = Math.random().toString(36).substring(2, 15);
        const apiUrl = import.meta.env.PUBLIC_API_URL || '';

        let isLoginMode = true;
        let isSetup = false;
        let tempToken = '';
        let countdownTimer: number | null = null;

        const sendCooldownState: CooldownState = {
            email: '',
            emailUntil: 0,
            domain: '',
            domainUntil: 0,
        };

        const normalizeEmailFieldValue = (): ParsedEmail | null => {
            const parsed = parseEmailAddress(emailInput.value);
            emailInput.value = parsed ? parsed.email : emailInput.value.trim();
            return parsed;
        };

        const getSendCodeCooldown = (parsed = parseEmailAddress(emailInput.value)): number => {
            if (!parsed) return 0;

            let remaining = 0;
            if (parsed.email === sendCooldownState.email) {
                remaining = Math.max(remaining, getRemainingSeconds(sendCooldownState.emailUntil));
            }
            if (!isCommonEmailDomain(parsed.domain) && parsed.domain === sendCooldownState.domain) {
                remaining = Math.max(remaining, getRemainingSeconds(sendCooldownState.domainUntil));
            }

            return remaining;
        };

        const refreshSendCodeButton = (): void => {
            const remaining = getSendCodeCooldown();
            if (remaining > 0) {
                sendCodeBtn.disabled = true;
                sendCodeBtn.textContent = `${remaining}s`;
                if (!countdownTimer) {
                    countdownTimer = window.setInterval(() => {
                        refreshSendCodeButton();
                        if (getSendCodeCooldown() <= 0 && countdownTimer) {
                            window.clearInterval(countdownTimer);
                            countdownTimer = null;
                        }
                    }, 1000);
                }
                return;
            }

            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = '发送验证码';
            if (countdownTimer) {
                window.clearInterval(countdownTimer);
                countdownTimer = null;
            }
        };

        const setEmailCooldown = (parsed: ParsedEmail, seconds: number): void => {
            sendCooldownState.email = parsed.email;
            sendCooldownState.emailUntil = Math.max(sendCooldownState.emailUntil, Date.now() + seconds * 1000);
        };

        const setDomainCooldown = (parsed: ParsedEmail, seconds: number): void => {
            sendCooldownState.domain = parsed.domain;
            sendCooldownState.domainUntil = Math.max(sendCooldownState.domainUntil, Date.now() + seconds * 1000);
        };

        const applySendCodeSuccessCooldown = (parsed: ParsedEmail): void => {
            setEmailCooldown(parsed, 60);
            if (!isCommonEmailDomain(parsed.domain)) {
                setDomainCooldown(parsed, 30);
            }
            refreshSendCodeButton();
        };

        const syncCooldownFromRateLimit = (parsed: ParsedEmail, message: string): void => {
            const secondsMatch = message.match(/(\d+)\s*秒/);
            const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;
            if (!seconds) return;

            if (message.includes('邮箱域名')) {
                setDomainCooldown(parsed, seconds);
            } else {
                setEmailCooldown(parsed, seconds);
            }
            refreshSendCodeButton();
        };

        const hideAlerts = (): void => {
            errorAlert.classList.add('hidden');
            successAlert.classList.add('hidden');
        };

        const showError = (msg: string, code = 0, tid = ''): void => {
            loading.classList.add('hidden');
            let displayMsg = msg;
            if (tid && (code >= 500 || code === 0) && !msg.includes('请输入') && !msg.includes('一致')) {
                displayMsg += ` (ID: ${tid})`;
            }
            errorText.textContent = displayMsg;
            errorAlert.classList.remove('hidden');
            successAlert.classList.add('hidden');
            errorAlert.scrollIntoView({ behavior: 'smooth', block: 'end' });
        };

        const showSuccess = (msg: string): void => {
            successAlert.textContent = msg;
            successAlert.classList.remove('hidden');
            errorAlert.classList.add('hidden');
        };

        const updatePasswordComplexityUI = (): PasswordComplexityResult => {
            const passwordValue = passwordInput.value;
            if (isLoginMode || !passwordValue) {
                passwordComplexityBox.classList.add('hidden');
                passwordComplexityFill.className = 'password-complexity-fill is-idle';
                passwordComplexityFill.style.width = '0';
                return { score: 0, level: 'idle' };
            }

            passwordComplexityBox.classList.remove('hidden');
            const result = evaluatePasswordComplexity(passwordValue);
            passwordComplexityFill.className = `password-complexity-fill is-${result.level}`;
            passwordComplexityFill.style.width = `${getPasswordComplexityWidth(result)}%`;
            return result;
        };

        const handleFetchResponse = async (response: Response, responseClass: ProtoDecoder): Promise<any> => {
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/x-protobuf')) {
                const buffer = await response.arrayBuffer();
                const decoded = responseClass.decode(new Uint8Array(buffer));
                if (!response.ok || (decoded.code && decoded.code !== 200)) {
                    const err = new Error(decoded.msg || `服务器错误 (${response.status})`) as Error & { code?: number; traceId?: string };
                    err.code = decoded.code || response.status;
                    err.traceId = decoded.traceId;
                    throw err;
                }
                return decoded;
            }

            if (!response.ok) {
                const text = await response.text();
                const err = new Error(text || `请求失败 (${response.status})`) as Error & { code?: number };
                err.code = response.status;
                throw err;
            }

            const buffer = await response.arrayBuffer();
            return responseClass.decode(new Uint8Array(buffer));
        };

        const renderGrid = (): void => {
            const startIdx = parseInt(captchaSlider.value, 10) * 4;
            let html = '';
            for (let i = 0; i < 20; i++) {
                const val = (startIdx + i).toString().padStart(6, '0');
                html += `<button type="button" class="captcha-btn">${val}</button>`;
            }
            captchaGrid.innerHTML = html;
        };

        const fetchNewCaptcha = async (): Promise<void> => {
            try {
                const res = await fetch(`${apiUrl}/api/captcha`);
                const buffer = await res.arrayBuffer();
                const result = authpb.GetCaptchaResponse.decode(new Uint8Array(buffer));
                if (result.code === 200) {
                    captchaImg.src = result.data.image;
                    captchaImg.dataset.key = result.data.captchaKey;
                }
            } catch (error) {
                console.error(error);
            }
        };

        const executeSendCode = async (value: string, key: string): Promise<void> => {
            const parsedEmail = normalizeEmailFieldValue();
            if (!parsedEmail) {
                showError('请输入有效的邮箱地址');
                return;
            }

            loading.classList.remove('hidden');
            try {
                const req = authpb.SendEmailCodeRequest.create({
                    email: parsedEmail.email,
                    captchaKey: key,
                    captchaValue: value,
                });
                const res = await fetch(`${apiUrl}/api/send-code`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-protobuf', 'X-Trace-Id': traceId },
                    body: authpb.SendEmailCodeRequest.encode(req).finish(),
                });
                const result = await handleFetchResponse(res, authpb.SendEmailCodeResponse);
                showSuccess(result.msg || '已发送');
                applySendCodeSuccessCooldown(parsedEmail);
            } catch (error) {
                const err = error as Error & { code?: number; traceId?: string };
                if (err.code === 429) {
                    syncCooldownFromRateLimit(parsedEmail, err.message || '');
                }
                showError(err.message || '发送失败', err.code, err.traceId || '');
            } finally {
                loading.classList.add('hidden');
            }
        };

        const verifyPoW = async (input: string): Promise<boolean> => {
            const msgUint8 = new TextEncoder().encode(input);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
            const hashHex = Array.from(new Uint8Array(hashBuffer))
                .map((value) => value.toString(16).padStart(2, '0'))
                .join('');
            return hashHex.startsWith('00000');
        };

        const checkLogin = async (): Promise<void> => {
            try {
                const res = await fetch(`${apiUrl}/api/me`, {
                    credentials: 'include',
                    headers: { 'X-Trace-Id': traceId },
                });
                if (res.status !== 200) return;

                const buffer = await res.arrayBuffer();
                const result = authpb.GetMeResponse.decode(new Uint8Array(buffer));
                if (result.code === 200) {
                    authView.classList.add('hidden');
                    dashboardView.classList.remove('hidden');
                    dashUsername.textContent = result.data.username;
                }
            } catch (error) {
                console.error('Check login failed', error);
            }
        };

        const updateUI = (): void => {
            hideAlerts();
            form.reset();
            authView.classList.remove('hidden');
            twofaView.classList.add('hidden');

            requireElement<HTMLElement>('form-title').textContent = isLoginMode ? '账号登录' : '账号注册';
            requireElement<HTMLElement>('email-field').classList.toggle('hidden', isLoginMode);
            requireElement<HTMLElement>('code-field').classList.toggle('hidden', isLoginMode);
            requireElement<HTMLElement>('age-field').classList.toggle('hidden', isLoginMode);
            confirmPasswordField.classList.toggle('hidden', isLoginMode);
            toggleLink.textContent = isLoginMode ? '没有账号？点击注册' : '已有账号？点击登录';

            if (!isLoginMode) {
                userInput.value = `User_${Math.floor(Math.random() * 899999 + 100000)}`;
                userInput.readOnly = true;
                userInput.tabIndex = -1;
                ageInput.value = '';
            } else {
                userInput.value = '';
                userInput.readOnly = false;
                userInput.tabIndex = 0;
                userInput.placeholder = '请输入您的用户名';
            }

            refreshSendCodeButton();
            updatePasswordComplexityUI();
        };

        requireElement<HTMLButtonElement>('age-minus').addEventListener('click', () => {
            ageInput.value = ((parseInt(ageInput.value, 10) || 0) - 1).toString();
        });
        requireElement<HTMLButtonElement>('age-plus').addEventListener('click', () => {
            ageInput.value = ((parseInt(ageInput.value, 10) || 0) + 1).toString();
        });

        requireElement<HTMLButtonElement>('slider-up').addEventListener('click', () => {
            const value = parseInt(captchaSlider.value, 10);
            if (value > 0) {
                captchaSlider.value = (value - 1).toString();
                renderGrid();
            }
        });
        requireElement<HTMLButtonElement>('slider-down').addEventListener('click', () => {
            const value = parseInt(captchaSlider.value, 10);
            const max = parseInt(captchaSlider.max, 10);
            if (value < max) {
                captchaSlider.value = (value + 1).toString();
                renderGrid();
            }
        });

        checkLogin();
        updateUI();

        logoutBtn.addEventListener('click', async () => {
            await fetch(`${apiUrl}/api/logout`, {
                credentials: 'include',
                headers: { 'X-Trace-Id': traceId },
            });
            location.reload();
        });

        form.addEventListener('input', hideAlerts);
        emailInput.addEventListener('input', refreshSendCodeButton);
        emailInput.addEventListener('blur', () => {
            normalizeEmailFieldValue();
            refreshSendCodeButton();
        });
        passwordInput.addEventListener('input', updatePasswordComplexityUI);
        toggleLink.addEventListener('click', (event) => {
            event.preventDefault();
            isLoginMode = !isLoginMode;
            updateUI();
        });
        backToLogin.addEventListener('click', (event) => {
            event.preventDefault();
            updateUI();
        });

        captchaSlider.addEventListener('input', renderGrid);
        requireElement<HTMLButtonElement>('refresh-captcha').addEventListener('click', fetchNewCaptcha);
        captchaGrid.addEventListener('click', (event) => {
            const btn = (event.target as HTMLElement).closest('.captcha-btn') as HTMLButtonElement | null;
            if (!btn) return;
            captchaModal.classList.add('hidden');
            void executeSendCode(btn.textContent ?? '', captchaImg.dataset.key ?? '');
        });

        const closeCaptcha = (): void => {
            captchaModal.classList.add('hidden');
        };
        requireElement<HTMLButtonElement>('close-captcha-x').addEventListener('click', closeCaptcha);
        requireElement<HTMLButtonElement>('close-captcha-btn').addEventListener('click', closeCaptcha);

        sendCodeBtn.addEventListener('click', () => {
            const parsedEmail = normalizeEmailFieldValue();
            if (!parsedEmail) {
                showError(emailInput.value ? '请输入有效的邮箱地址' : '请输入邮箱地址');
                return;
            }

            if (getSendCodeCooldown(parsedEmail) > 0) {
                refreshSendCodeButton();
                return;
            }

            hideAlerts();
            void fetchNewCaptcha();
            captchaModal.classList.remove('hidden');
            renderGrid();
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            hideAlerts();

            const rawData = Object.fromEntries(new FormData(form).entries());
            loading.classList.remove('hidden');

            try {
                let body: Uint8Array;
                let responseClass: ProtoDecoder;

                if (isLoginMode) {
                    if (!rawData.username) {
                        showError('请输入用户名');
                        return;
                    }
                    if (!rawData.password) {
                        showError('请输入密码');
                        return;
                    }

                    const req = authpb.LoginRequest.fromObject({
                        username: rawData.username,
                        password: rawData.password,
                    });
                    body = authpb.LoginRequest.encode(req).finish();
                    responseClass = authpb.LoginResponse;
                } else {
                    if (!rawData.email) {
                        showError('请输入邮箱地址');
                        return;
                    }
                    if (!rawData.age) {
                        showError('请输入年龄');
                        return;
                    }
                    if (!rawData.password) {
                        showError('请输入密码');
                        return;
                    }

                    const parsedEmail = normalizeEmailFieldValue();
                    if (!parsedEmail) {
                        showError('请输入有效的邮箱地址');
                        return;
                    }

                    const password = String(rawData.password);
                    const complexity = updatePasswordComplexityUI();
                    if (password.length < 32) {
                        showError('密码长度必须大于等于 32 位');
                        return;
                    }
                    if (!/[a-z]/.test(password)) {
                        showError('密码必须包含小写字母');
                        return;
                    }
                    if (!/[A-Z]/.test(password)) {
                        showError('密码必须包含大写字母');
                        return;
                    }
                    if (!/\d/.test(password)) {
                        showError('密码必须包含数字');
                        return;
                    }
                    if (!/[~!@#$%^&*()_\-+=|\\{}[\]:;"'<>,.?/]/.test(password)) {
                        showError('密码必须包含特殊符号');
                        return;
                    }
                    if (complexity.level !== 'complex') {
                        showError('密码复杂度不足，请重新设计');
                        return;
                    }
                    if (rawData.password !== rawData['confirm-password']) {
                        showError('两次输入的密码不一致');
                        return;
                    }
                    if (!rawData.code) {
                        showError('请输入 PoW 验证码');
                        return;
                    }
                    if (!(await verifyPoW(String(rawData.code)))) {
                        showError('PoW 证明无效：哈希摘要未满足难度目标');
                        return;
                    }

                    const req = authpb.RegisterRequest.fromObject({
                        username: rawData.username,
                        email: parsedEmail.email,
                        age: parseInt(String(rawData.age), 10),
                        password: rawData.password,
                        code: rawData.code,
                    });
                    body = authpb.RegisterRequest.encode(req).finish();
                    responseClass = authpb.RegisterResponse;
                }

                const response = await fetch(`${apiUrl}${isLoginMode ? '/api/login' : '/api/register'}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-protobuf', 'X-Trace-Id': traceId },
                    body,
                    credentials: 'include',
                });
                const result = await handleFetchResponse(response, responseClass);

                if (isLoginMode) {
                    const { setup_2fa, require_2fa, tempToken: nextToken } = result.data || {};
                    if (setup_2fa || require_2fa) {
                        tempToken = nextToken;
                        isSetup = setup_2fa;
                        authView.classList.add('hidden');
                        twofaView.classList.remove('hidden');
                        twofaMsg.textContent = isSetup ? '首次登录，请设置生物识别凭证' : '请使用生物识别验证身份';
                        twofaBtn.textContent = isSetup ? '立即设置' : '立即验证';
                    } else {
                        location.reload();
                    }
                } else {
                    isLoginMode = true;
                    updateUI();
                    showSuccess('注册成功，请登录');
                }
            } catch (error) {
                const err = error as Error & { code?: number; traceId?: string };
                showError(err.message || '请求失败', err.code, err.traceId || '');
            } finally {
                loading.classList.add('hidden');
            }
        });

        twofaBtn.addEventListener('click', async () => {
            hideAlerts();
            loading.classList.remove('hidden');

            try {
                if (isSetup) {
                    const res = await fetch(`${apiUrl}/api/webauthn/register/options`, {
                        credentials: 'include',
                        headers: { 'X-Trace-Id': traceId },
                    });
                    const options = await handleFetchResponse(res, authpb.GetWebAuthnRegistrationOptionsResponse);
                    const credential = await create(JSON.parse(options.optionsJson));
                    const verifyResponse = await fetch(`${apiUrl}/api/webauthn/register/verify`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-protobuf', 'X-Trace-Id': traceId },
                        body: authpb.VerifyWebAuthnRegistrationRequest.encode({
                            credentialJson: JSON.stringify(credential),
                        }).finish(),
                        credentials: 'include',
                    });
                    await handleFetchResponse(verifyResponse, authpb.VerifyWebAuthnRegistrationResponse);
                    location.reload();
                    return;
                }

                const res = await fetch(`${apiUrl}/api/webauthn/login/options`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-protobuf', 'X-Trace-Id': traceId },
                    body: authpb.GetWebAuthnLoginOptionsRequest.encode({ tempToken }).finish(),
                    credentials: 'include',
                });
                const options = await handleFetchResponse(res, authpb.GetWebAuthnLoginOptionsResponse);
                const credential = await get(JSON.parse(options.optionsJson));
                const verifyResponse = await fetch(`${apiUrl}/api/webauthn/login/verify`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-protobuf', 'X-Trace-Id': traceId },
                    body: authpb.VerifyWebAuthnLoginRequest.encode({
                        tempToken,
                        credentialJson: JSON.stringify(credential),
                    }).finish(),
                    credentials: 'include',
                });
                await handleFetchResponse(verifyResponse, authpb.VerifyWebAuthnLoginResponse);
                location.reload();
            } catch (error) {
                const err = error as Error & { code?: number; traceId?: string };
                showError(err.message || '验证失败', err.code, err.traceId || '');
            } finally {
                loading.classList.add('hidden');
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
    } else {
        mount();
    }
}
