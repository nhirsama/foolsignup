import { create, get } from '@github/webauthn-json';

import { applyI18n, getCurrentLanguage, LANGUAGE_OPTIONS, onLanguageChange, setLanguage, t } from './i18n';
import { foolsignup } from './pb/auth.js';
import { evaluatePasswordComplexity, getPasswordComplexityWidth, type PasswordComplexityResult } from './password-complexity';

const authpb = foolsignup.auth.v1;
const DASHBOARD_FIRST_VISIT_KEY = 'foolsignup_dashboard_first_visit_done';
const DASHBOARD_ZH_CN_TEXT = {
    online: '在线',
    noticeTitle: '祝你愚人节快乐！',
    noticeBody: '这是一个愚人节项目，意在通过刻意设计给用户带来不好的使用体验。',
    sourcePrefix: '项目源码：',
    noticeWarn: '提醒：如果您在注册时使用了常用密码，建议立即修改其他网站的相同密码以确保安全。',
    logout: '安全退出系统',
} as const;

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

type RegisterStage = 'email' | 'verify' | 'details';

type SendCodeThrottle = {
    remaining: number;
    scope: '' | 'email' | 'domain';
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

function extractSeconds(message: string): number {
    const match = message.match(/(\d{1,4})/);
    return match ? parseInt(match[1], 10) : 0;
}

function localizeServerMessage(message: string): string {
    const normalized = message.toLowerCase();
    const seconds = extractSeconds(message);
    const isRateLimitMessage = message.includes('频繁')
        || normalized.includes('frequen')
        || normalized.includes('too many')
        || normalized.includes('rate');

    if (
        message.includes('PoW')
        || message.includes('证明字符串')
        || message.includes('哈希摘要')
        || normalized.includes('proof')
    ) {
        return t('error.invalidCaptcha');
    }
    if (message.includes('验证码已过期') || normalized.includes('expired')) {
        return t('error.codeExpired');
    }
    if (message.includes('密码复杂度不足') || normalized.includes('complexity')) {
        return t('error.passwordWeak');
    }
    if (isRateLimitMessage && (message.includes('该邮箱域名发送过于频繁') || normalized.includes('domain'))) {
        return t('error.domainRateLimit', { seconds: seconds || 60 });
    }
    if (isRateLimitMessage && (message.includes('该邮箱发送过于频繁') || normalized.includes('email'))) {
        return t('error.emailRateLimit', { seconds: seconds || 60 });
    }
    if (/[\u4e00-\u9fff]/.test(message)) {
        return t('error.server');
    }

    return message;
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
        const dashOnlineText = requireElement<HTMLElement>('dash-online-text');
        const dashNoticeTitle = requireElement<HTMLElement>('dash-notice-title');
        const dashNoticeBody = requireElement<HTMLElement>('dash-notice-body');
        const dashSourcePrefix = requireElement<HTMLElement>('dash-source-prefix');
        const dashNoticeWarn = requireElement<HTMLElement>('dash-notice-warn');
        const formTitle = requireElement<HTMLElement>('form-title');
        const formSubtitle = requireElement<HTMLElement>('form-subtitle');
        const languagePicker = requireElement<HTMLElement>('language-picker');
        const languageTrigger = requireElement<HTMLButtonElement>('language-trigger');
        const languageCurrent = requireElement<HTMLElement>('language-current');
        const languageMenu = requireElement<HTMLElement>('language-menu');
        const languageList = requireElement<HTMLElement>('language-list');

        const usernameField = requireElement<HTMLElement>('username-field');
        const userInput = requireElement<HTMLInputElement>('username');
        const toggleLink = requireElement<HTMLElement>('toggle-link');
        const formActions = requireElement<HTMLElement>('form-actions');
        const submitBtn = requireElement<HTMLButtonElement>('submit-btn');
        const registerBackBtn = requireElement<HTMLButtonElement>('register-back-btn');
        const sendCodeBtn = requireElement<HTMLButtonElement>('send-code-btn');
        const emailField = requireElement<HTMLElement>('email-field');
        const emailAction = emailField.querySelector<HTMLElement>('.input-with-action');
        if (!emailAction) {
            throw new Error('missing email action container');
        }
        const emailInput = requireElement<HTMLInputElement>('email');
        const codeField = requireElement<HTMLElement>('code-field');
        const codeInput = requireElement<HTMLInputElement>('code');
        const ageField = requireElement<HTMLElement>('age-field');
        const ageInput = requireElement<HTMLInputElement>('age');
        const passwordField = requireElement<HTMLElement>('password-field');
        const passwordInput = requireElement<HTMLInputElement>('password');
        const confirmPasswordField = requireElement<HTMLElement>('confirm-password-field');
        const confirmPasswordInput = requireElement<HTMLInputElement>('confirm-password');
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
        let registerStage: RegisterStage = 'email';
        let isSeededEmailValue = false;
        let pendingStageAfterSendCode: RegisterStage | null = null;
        let countdownTimer: number | null = null;

        const defaultRegisterEmail = 'name@example.com';
        const generateRegistrationUsername = (): string => `User_${Math.floor(Math.random() * 899999 + 100000)}`;

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

        const syncEmailSeedStyle = (): void => {
            emailInput.classList.toggle('is-seeded', isSeededEmailValue);
        };

        const seedDefaultEmail = (): void => {
            emailInput.value = defaultRegisterEmail;
            isSeededEmailValue = true;
            syncEmailSeedStyle();
        };

        const languageLabelMap = new Map(LANGUAGE_OPTIONS.map((item) => [item.code, item.label] as const));
        let isLanguageMenuOpen = false;
        let shouldForceDashboardChinese = true;
        try {
            shouldForceDashboardChinese = window.localStorage.getItem(DASHBOARD_FIRST_VISIT_KEY) !== '1';
        } catch {
            shouldForceDashboardChinese = true;
        }

        const positionLanguageMenu = (): void => {
            const rect = languageTrigger.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const shouldOpenUpward = spaceBelow < 300 && spaceAbove > spaceBelow;
            languagePicker.classList.toggle('is-upward', shouldOpenUpward);
        };

        const closeLanguageMenu = (): void => {
            isLanguageMenuOpen = false;
            languageMenu.classList.add('hidden');
            languageTrigger.setAttribute('aria-expanded', 'false');
        };

        const openLanguageMenu = (): void => {
            positionLanguageMenu();
            isLanguageMenuOpen = true;
            languageMenu.classList.remove('hidden');
            languageTrigger.setAttribute('aria-expanded', 'true');
            renderLanguageMenu();
        };

        const toggleLanguageMenu = (): void => {
            if (isLanguageMenuOpen) {
                closeLanguageMenu();
                return;
            }
            openLanguageMenu();
        };

        const renderLanguageMenu = (): void => {
            const currentLanguage = getCurrentLanguage();
            const currentLabel = languageLabelMap.get(currentLanguage) ?? currentLanguage;
            languageCurrent.textContent = currentLabel;
            languageTrigger.title = `${t('language.switch')}: ${currentLabel}`;
            languageTrigger.setAttribute('aria-label', `${t('language.selectAria')}: ${currentLabel}`);
            languageList.setAttribute('aria-label', t('language.selectAria'));

            const fragment = document.createDocumentFragment();
            const options = LANGUAGE_OPTIONS;
            options.forEach((item) => {
                const option = document.createElement('button');
                option.type = 'button';
                option.className = 'language-option';
                option.dataset.lang = item.code;
                option.setAttribute('role', 'option');
                option.setAttribute('aria-selected', item.code === currentLanguage ? 'true' : 'false');
                option.title = `${item.label} (${item.code.toUpperCase()})`;
                if (item.code === currentLanguage) {
                    option.classList.add('is-active');
                }
                option.textContent = item.label;
                fragment.appendChild(option);
            });
            languageList.replaceChildren(fragment);
        };

        const getSendCodeThrottle = (parsed = parseEmailAddress(emailInput.value)): SendCodeThrottle => {
            if (!parsed) {
                return { remaining: 0, scope: '' };
            }

            const emailRemaining = parsed.email === sendCooldownState.email
                ? getRemainingSeconds(sendCooldownState.emailUntil)
                : 0;
            const domainRemaining = !isCommonEmailDomain(parsed.domain) && parsed.domain === sendCooldownState.domain
                ? getRemainingSeconds(sendCooldownState.domainUntil)
                : 0;

            if (emailRemaining >= domainRemaining && emailRemaining > 0) {
                return { remaining: emailRemaining, scope: 'email' };
            }
            if (domainRemaining > 0) {
                return { remaining: domainRemaining, scope: 'domain' };
            }

            return { remaining: 0, scope: '' };
        };

        const refreshSendCodeButton = (): void => {
            const throttle = getSendCodeThrottle();
            if (throttle.remaining > 0) {
                sendCodeBtn.disabled = true;
                sendCodeBtn.textContent = `${throttle.remaining}s`;
                if (!countdownTimer) {
                    countdownTimer = window.setInterval(() => {
                        refreshSendCodeButton();
                        if (getSendCodeThrottle().remaining <= 0 && countdownTimer) {
                            window.clearInterval(countdownTimer);
                            countdownTimer = null;
                        }
                    }, 1000);
                }
                return;
            }

            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = registerStage === 'verify' ? t('action.resendCode') : t('action.sendCode');
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
            const seconds = extractSeconds(message);
            if (!seconds) return;

            const normalized = message.toLowerCase();
            if (message.includes('邮箱域名') || normalized.includes('domain')) {
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

        const focusFieldForStage = (): void => {
            const target = isLoginMode
                ? userInput
                : registerStage === 'email'
                    ? emailInput
                    : registerStage === 'verify'
                        ? codeInput
                        : passwordInput;
            window.requestAnimationFrame(() => {
                target.focus({ preventScroll: true });
                if (target === emailInput && registerStage === 'email' && isSeededEmailValue) {
                    emailInput.setSelectionRange(0, 0);
                }
            });
        };

        const getRegisterStageTitle = (stage: RegisterStage): string => {
            if (stage === 'email') return t('mode.register.stage.email');
            if (stage === 'verify') return t('mode.register.stage.verify');
            return t('mode.register.stage.details');
        };

        const applyModeText = (): void => {
            formTitle.textContent = isLoginMode ? t('mode.login.title') : getRegisterStageTitle(registerStage);
            formSubtitle.textContent = isLoginMode ? t('mode.login.subtitle') : '';
            formSubtitle.classList.toggle('hidden', !isLoginMode);
            toggleLink.textContent = isLoginMode ? t('action.switchToRegister') : t('action.switchToLogin');
            twofaMsg.textContent = isSetup ? t('twofa.setupMessage') : t('twofa.verifyMessage');
            twofaBtn.textContent = isSetup ? t('twofa.setupButton') : t('twofa.verifyButton');
            userInput.placeholder = isLoginMode ? t('placeholder.username.login') : t('placeholder.username.register');

            if (!isLoginMode) {
                submitBtn.textContent = registerStage === 'details' ? t('action.createAccount') : t('action.continue');
                registerBackBtn.textContent = t('action.back');
            } else {
                submitBtn.textContent = t('action.submit');
            }
        };

        const applyDashboardText = (forceChinese = false): void => {
            if (forceChinese) {
                dashOnlineText.textContent = DASHBOARD_ZH_CN_TEXT.online;
                dashNoticeTitle.textContent = DASHBOARD_ZH_CN_TEXT.noticeTitle;
                dashNoticeBody.textContent = DASHBOARD_ZH_CN_TEXT.noticeBody;
                dashSourcePrefix.textContent = DASHBOARD_ZH_CN_TEXT.sourcePrefix;
                dashNoticeWarn.textContent = DASHBOARD_ZH_CN_TEXT.noticeWarn;
                logoutBtn.textContent = DASHBOARD_ZH_CN_TEXT.logout;
                return;
            }

            dashOnlineText.textContent = t('dashboard.online');
            dashNoticeTitle.textContent = t('dashboard.notice.title');
            dashNoticeBody.textContent = t('dashboard.notice.body');
            dashSourcePrefix.textContent = t('dashboard.notice.sourcePrefix');
            dashNoticeWarn.textContent = t('dashboard.notice.warn');
            logoutBtn.textContent = t('dashboard.logout');
        };

        const showDashboard = (username: string): void => {
            authView.classList.add('hidden');
            dashboardView.classList.remove('hidden');
            dashUsername.textContent = username;
            applyDashboardText(shouldForceDashboardChinese);

            if (shouldForceDashboardChinese) {
                shouldForceDashboardChinese = false;
                try {
                    window.localStorage.setItem(DASHBOARD_FIRST_VISIT_KEY, '1');
                } catch {
                    // Ignore storage failures and keep current render.
                }
            }
        };

        const showError = (msg: string, code = 0, tid = ''): void => {
            loading.classList.add('hidden');
            let displayMsg = localizeServerMessage(msg);
            if (tid && (code >= 500 || code === 0)) {
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
            if (isLoginMode || registerStage !== 'details' || !passwordValue) {
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
                    const err = new Error(decoded.msg || `${t('error.server')} (${response.status})`) as Error & { code?: number; traceId?: string };
                    err.code = decoded.code || response.status;
                    err.traceId = decoded.traceId;
                    throw err;
                }
                return decoded;
            }

            if (!response.ok) {
                const text = await response.text();
                const err = new Error(text || `${t('error.requestFailed')} (${response.status})`) as Error & { code?: number };
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

        const openCaptchaForSendCode = (nextStage: RegisterStage | null): void => {
            pendingStageAfterSendCode = nextStage;
            hideAlerts();
            void fetchNewCaptcha();
            captchaModal.classList.remove('hidden');
            renderGrid();
        };

        const setRegisterStage = (nextStage: RegisterStage): void => {
            registerStage = nextStage;

            if (registerStage === 'details' && !userInput.value) {
                userInput.value = generateRegistrationUsername();
                userInput.placeholder = t('placeholder.username.register');
            }
            if (registerStage === 'email' && !emailInput.value) {
                seedDefaultEmail();
            }

            applyModeText();

            usernameField.classList.toggle('hidden', registerStage !== 'details');
            emailField.classList.remove('hidden');
            codeField.classList.toggle('hidden', registerStage !== 'verify');
            ageField.classList.toggle('hidden', registerStage !== 'details');
            passwordField.classList.toggle('hidden', registerStage !== 'details');
            confirmPasswordField.classList.toggle('hidden', registerStage !== 'details');

            emailInput.readOnly = registerStage !== 'email';
            emailInput.tabIndex = registerStage === 'email' ? 0 : -1;
            codeInput.tabIndex = registerStage === 'verify' ? 0 : -1;
            userInput.tabIndex = -1;

            sendCodeBtn.classList.toggle('hidden', registerStage !== 'verify');
            emailAction.classList.toggle('is-single', registerStage !== 'verify');
            formActions.classList.toggle('is-details-stage', registerStage === 'details');
            registerBackBtn.classList.toggle('is-highlighted-action', registerStage === 'details');
            submitBtn.classList.toggle('is-muted-action', registerStage === 'details');

            registerBackBtn.classList.toggle('hidden', registerStage === 'email');
            applyModeText();

            refreshSendCodeButton();
            updatePasswordComplexityUI();
            syncEmailSeedStyle();
            focusFieldForStage();
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
                showError(t('error.invalidEmail'));
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
                await handleFetchResponse(res, authpb.SendEmailCodeResponse);
                if (!pendingStageAfterSendCode) {
                    showSuccess(t('success.codeSent'));
                }
                applySendCodeSuccessCooldown(parsedEmail);
                if (!isLoginMode && pendingStageAfterSendCode) {
                    setRegisterStage(pendingStageAfterSendCode);
                }
            } catch (error) {
                const err = error as Error & { code?: number; traceId?: string };
                if (err.code === 429) {
                    syncCooldownFromRateLimit(parsedEmail, err.message || '');
                }
                showError(err.message || t('error.sendCodeFailed'), err.code, err.traceId || '');
            } finally {
                pendingStageAfterSendCode = null;
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
                    showDashboard(result.data.username);
                }
            } catch (error) {
                console.error('Check login failed', error);
            }
        };

        const updateUI = (): void => {
            hideAlerts();
            closeLanguageMenu();
            form.reset();
            authView.classList.remove('hidden');
            twofaView.classList.add('hidden');
            applyI18n();
            applyModeText();

            if (!isLoginMode) {
                registerStage = 'email';
                userInput.value = generateRegistrationUsername();
                seedDefaultEmail();
                userInput.readOnly = true;
                userInput.tabIndex = -1;
                ageInput.value = '';
                setRegisterStage('email');
            } else {
                applyModeText();
                userInput.value = '';
                userInput.readOnly = false;
                userInput.tabIndex = 0;
                userInput.placeholder = t('placeholder.username.login');
                usernameField.classList.remove('hidden');
                emailField.classList.add('hidden');
                codeField.classList.add('hidden');
                ageField.classList.add('hidden');
                passwordField.classList.remove('hidden');
                confirmPasswordField.classList.add('hidden');
                registerBackBtn.classList.add('hidden');
                sendCodeBtn.classList.add('hidden');
                emailAction.classList.add('is-single');
                formActions.classList.remove('is-details-stage');
                registerBackBtn.classList.remove('is-highlighted-action');
                submitBtn.classList.remove('is-muted-action');
                isSeededEmailValue = false;
            }

            refreshSendCodeButton();
            updatePasswordComplexityUI();
            syncEmailSeedStyle();
            focusFieldForStage();
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

        renderLanguageMenu();
        closeLanguageMenu();
        applyI18n();
        onLanguageChange(() => {
            applyI18n();
            applyModeText();
            refreshSendCodeButton();
            renderLanguageMenu();
            if (!dashboardView.classList.contains('hidden')) {
                applyDashboardText(false);
            }
            if (!isLoginMode) {
                userInput.placeholder = t('placeholder.username.register');
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

        languageTrigger.addEventListener('click', (event) => {
            event.preventDefault();
            toggleLanguageMenu();
        });
        languageTrigger.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeLanguageMenu();
                return;
            }
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLanguageMenu();
            }
        });
        languageMenu.addEventListener('click', (event) => {
            const option = (event.target as HTMLElement).closest<HTMLButtonElement>('.language-option');
            if (!option?.dataset.lang) {
                return;
            }
            setLanguage(option.dataset.lang);
            closeLanguageMenu();
        });
        window.addEventListener('resize', () => {
            if (isLanguageMenuOpen) {
                positionLanguageMenu();
            }
        });
        window.addEventListener('scroll', () => {
            if (isLanguageMenuOpen) {
                positionLanguageMenu();
            }
        }, true);
        document.addEventListener('click', (event) => {
            if (languagePicker.contains(event.target as Node)) {
                return;
            }
            closeLanguageMenu();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeLanguageMenu();
            }
        });

        form.addEventListener('input', hideAlerts);
        emailInput.addEventListener('input', () => {
            if (isSeededEmailValue && emailInput.value !== defaultRegisterEmail) {
                isSeededEmailValue = false;
            }
            syncEmailSeedStyle();
            refreshSendCodeButton();
        });
        emailInput.addEventListener('blur', () => {
            normalizeEmailFieldValue();
            if (isSeededEmailValue && emailInput.value !== defaultRegisterEmail) {
                isSeededEmailValue = false;
            }
            syncEmailSeedStyle();
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
            pendingStageAfterSendCode = null;
            captchaModal.classList.add('hidden');
        };
        requireElement<HTMLButtonElement>('close-captcha-x').addEventListener('click', closeCaptcha);
        requireElement<HTMLButtonElement>('close-captcha-btn').addEventListener('click', closeCaptcha);

        sendCodeBtn.addEventListener('click', () => {
            if (isLoginMode || registerStage !== 'verify') {
                return;
            }

            const parsedEmail = normalizeEmailFieldValue();
            if (!parsedEmail) {
                showError(emailInput.value ? t('error.invalidEmail') : t('error.missingEmail'));
                return;
            }

            if (getSendCodeThrottle(parsedEmail).remaining > 0) {
                refreshSendCodeButton();
                return;
            }

            openCaptchaForSendCode(null);
        });

        registerBackBtn.addEventListener('click', () => {
            hideAlerts();
            if (registerStage === 'details') {
                userInput.value = '';
                ageInput.value = '';
                passwordInput.value = '';
                confirmPasswordInput.value = '';
                updatePasswordComplexityUI();
                setRegisterStage('verify');
                return;
            }

            setRegisterStage('email');
        });

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            hideAlerts();

            const rawData = Object.fromEntries(new FormData(form).entries());

            try {
                let body: Uint8Array;
                let responseClass: ProtoDecoder;

                if (isLoginMode) {
                    if (!rawData.username) {
                        showError(t('error.missingUsername'));
                        return;
                    }
                    if (!rawData.password) {
                        showError(t('error.missingPassword'));
                        return;
                    }

                    const req = authpb.LoginRequest.fromObject({
                        username: rawData.username,
                        password: rawData.password,
                    });
                    body = authpb.LoginRequest.encode(req).finish();
                    responseClass = authpb.LoginResponse;
                } else {
                    const parsedEmail = normalizeEmailFieldValue();
                    if (!rawData.email) {
                        showError(t('error.missingEmail'));
                        return;
                    }
                    if (!parsedEmail) {
                        showError(t('error.invalidEmail'));
                        return;
                    }

                    if (registerStage === 'email') {
                        const throttle = getSendCodeThrottle(parsedEmail);
                        if (throttle.remaining > 0) {
                            refreshSendCodeButton();
                            if (throttle.scope === 'email') {
                                setRegisterStage('verify');
                            } else {
                                showError(t('error.domainTooFrequent', { seconds: throttle.remaining }));
                            }
                            return;
                        }

                        openCaptchaForSendCode('verify');
                        return;
                    }

                    if (registerStage === 'verify') {
                        if (!rawData.code) {
                            showError(t('error.missingCode'));
                            return;
                        }
                        if (!(await verifyPoW(String(rawData.code)))) {
                            showError(t('error.invalidCaptcha'));
                            return;
                        }

                        setRegisterStage('details');
                        return;
                    }

                    if (!rawData.age) {
                        showError(t('error.missingAge'));
                        return;
                    }
                    if (!rawData.password) {
                        showError(t('error.missingPassword'));
                        return;
                    }

                    const password = String(rawData.password);
                    const complexity = updatePasswordComplexityUI();
                    if (password.length < 32) {
                        showError(t('error.passwordTooShort'));
                        return;
                    }
                    if (!/[a-z]/.test(password)) {
                        showError(t('error.passwordNeedLower'));
                        return;
                    }
                    if (!/[A-Z]/.test(password)) {
                        showError(t('error.passwordNeedUpper'));
                        return;
                    }
                    if (!/\d/.test(password)) {
                        showError(t('error.passwordNeedDigit'));
                        return;
                    }
                    if (!/[~!@#$%^&*()_\-+=|\\{}[\]:;"'<>,.?/]/.test(password)) {
                        showError(t('error.passwordNeedSpecial'));
                        return;
                    }
                    if (complexity.level !== 'complex') {
                        showError(t('error.passwordWeak'));
                        return;
                    }
                    if (rawData.password !== rawData['confirm-password']) {
                        showError(t('error.passwordMismatch'));
                        return;
                    }
                    if (!rawData.code) {
                        showError(t('error.missingCode'));
                        return;
                    }
                    if (!(await verifyPoW(String(rawData.code)))) {
                        showError(t('error.invalidCaptcha'));
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

                loading.classList.remove('hidden');
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
                        applyModeText();
                    } else {
                        location.reload();
                    }
                } else {
                    isLoginMode = true;
                    updateUI();
                    showSuccess(t('success.accountCreated'));
                }
            } catch (error) {
                const err = error as Error & { code?: number; traceId?: string };
                if (!isLoginMode && registerStage === 'details' && (err.message.includes('验证码') || err.message.includes('PoW') || err.message.toLowerCase().includes('proof'))) {
                    codeInput.value = '';
                    setRegisterStage('verify');
                }
                showError(err.message || t('error.requestFailed'), err.code, err.traceId || '');
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
                showError(err.message || t('error.verifyFailed'), err.code, err.traceId || '');
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
