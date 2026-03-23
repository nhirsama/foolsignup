export const LANGUAGE_CHANGE_EVENT = 'foolsignup:language-change';
const STORAGE_KEY = 'foolsignup_language';

export const LANGUAGE_OPTIONS = [
    { code: 'es', label: 'Espanol' },
    { code: 'fr', label: 'Francais' },
    { code: 'de', label: 'Deutsch' },
    { code: 'pt', label: 'Portugues' },
    { code: 'it', label: 'Italiano' },
    { code: 'nl', label: 'Nederlands' },
    { code: 'pl', label: 'Polski' },
    { code: 'tr', label: 'Turkce' },
    { code: 'ru', label: 'Russkiy' },
    { code: 'uk', label: 'Ukrainska' },
    { code: 'ar', label: 'Al-Arabiyya' },
    { code: 'fa', label: 'Farsi' },
    { code: 'he', label: 'Ivrit' },
    { code: 'hi', label: 'Hindi' },
    { code: 'bn', label: 'Bangla' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'vi', label: 'Tieng Viet' },
    { code: 'th', label: 'Thai' },
    { code: 'ja', label: 'ニホンゴ' },
    { code: 'ko', label: 'Hangugeo' },
    { code: 'ro', label: 'Romana' },
    { code: 'cs', label: 'Cestina' },
    { code: 'sv', label: 'Svenska' },
    { code: 'fi', label: 'Suomi' },
    { code: 'el', label: 'Ellinika' },
] as const;

export type LanguageCode = (typeof LANGUAGE_OPTIONS)[number]['code'];

const FALLBACK_LANGUAGE: LanguageCode = 'es';

const RTL_LANGUAGES = new Set<LanguageCode>(['ar', 'fa', 'he']);
const languageSet = new Set<LanguageCode>(LANGUAGE_OPTIONS.map((item) => item.code));

const TRANSLATION_KEYS = [
    'language.switch',
    'language.selectAria',
    'mode.login.title',
    'mode.login.subtitle',
    'mode.register.stage.email',
    'mode.register.stage.verify',
    'mode.register.stage.details',
    'label.username',
    'label.email',
    'label.code',
    'label.age',
    'label.password',
    'label.confirmPassword',
    'placeholder.username.login',
    'placeholder.username.register',
    'placeholder.email',
    'placeholder.code',
    'placeholder.age',
    'placeholder.password',
    'placeholder.confirmPassword',
    'action.sendCode',
    'action.resendCode',
    'action.submit',
    'action.continue',
    'action.createAccount',
    'action.back',
    'action.backPrevious',
    'action.switchToRegister',
    'action.switchToLogin',
    'twofa.title',
    'twofa.setupMessage',
    'twofa.verifyMessage',
    'twofa.setupButton',
    'twofa.verifyButton',
    'twofa.backToLogin',
    'dashboard.online',
    'dashboard.notice.title',
    'dashboard.notice.body',
    'dashboard.notice.sourcePrefix',
    'dashboard.notice.warn',
    'dashboard.logout',
    'captcha.title',
    'captcha.alt',
    'captcha.refreshTitle',
    'captcha.guide',
    'captcha.cancel',
    'success.codeSent',
    'success.accountCreated',
    'error.server',
    'error.invalidCaptcha',
    'error.codeExpired',
    'error.passwordWeak',
    'error.domainRateLimit',
    'error.emailRateLimit',
    'error.invalidEmail',
    'error.missingEmail',
    'error.missingUsername',
    'error.missingPassword',
    'error.missingCode',
    'error.missingAge',
    'error.passwordTooShort',
    'error.passwordNeedLower',
    'error.passwordNeedUpper',
    'error.passwordNeedDigit',
    'error.passwordNeedSpecial',
    'error.passwordMismatch',
    'error.sendCodeFailed',
    'error.requestFailed',
    'error.verifyFailed',
    'error.domainTooFrequent',
] as const;

type TranslationKey = (typeof TRANSLATION_KEYS)[number];
type Translations = Record<TranslationKey, string>;
type TranslationCatalog = Partial<Translations>;

const translations: Record<LanguageCode, TranslationCatalog> = {
    es: {
        'language.switch': 'Idioma',
        'language.selectAria': 'Selector de idioma',
        'mode.login.title': 'Iniciar sesion',
        'mode.login.subtitle': 'Gestiona tu identidad y permisos de acceso',
        'mode.register.stage.email': 'Crear cuenta',
        'mode.register.stage.verify': 'Verificar codigo',
        'mode.register.stage.details': 'Configurar cuenta',
        'label.username': 'Usuario',
        'label.email': 'Correo electronico',
        'label.code': 'Codigo de verificacion',
        'label.age': 'Edad',
        'label.password': 'Contrasena',
        'label.confirmPassword': 'Confirmar contrasena',
        'placeholder.username.login': 'Introduce tu usuario',
        'placeholder.username.register': 'Define tu usuario',
        'placeholder.email': 'tu@correo.com',
        'placeholder.code': 'Introduce el codigo',
        'placeholder.age': 'Selecciona tu edad',
        'placeholder.password': 'Define una contrasena',
        'placeholder.confirmPassword': 'Introduce de nuevo la contrasena',
        'action.sendCode': 'Enviar codigo',
        'action.resendCode': 'Reenviar',
        'action.submit': 'Enviar',
        'action.continue': 'Continuar',
        'action.createAccount': 'Crear cuenta',
        'action.back': 'Volver',
        'action.backPrevious': 'Volver al paso anterior',
        'action.switchToRegister': 'No tienes cuenta? Registrate',
        'action.switchToLogin': 'Ya tienes cuenta? Inicia sesion',
        'twofa.title': 'Verificacion en dos pasos',
        'twofa.setupMessage': 'Primer acceso: configura una credencial biometrica',
        'twofa.verifyMessage': 'Verifica tu identidad con biometria',
        'twofa.setupButton': 'Configurar ahora',
        'twofa.verifyButton': 'Verificar ahora',
        'twofa.backToLogin': 'Volver al acceso normal',
        'dashboard.online': 'En linea',
        'dashboard.notice.title': 'Feliz April Fools!',
        'dashboard.notice.body': 'Este es un proyecto de broma que intencionalmente empeora la experiencia de registro.',
        'dashboard.notice.sourcePrefix': 'Codigo fuente:',
        'dashboard.notice.warn': 'Aviso: si usaste una contrasena habitual, cambiala tambien en otros sitios.',
        'dashboard.logout': 'Cerrar sesion segura',
        'captcha.title': 'Verificacion de seguridad',
        'captcha.alt': 'CAPTCHA',
        'captcha.refreshTitle': 'Actualizar captcha',
        'captcha.guide': 'Usa el deslizador y pulsa el numero que coincide con la imagen.',
        'captcha.cancel': 'Cancelar',
        'success.codeSent': 'Codigo enviado',
        'success.accountCreated': 'Cuenta creada, inicia sesion',
        'error.server': 'Error del servidor',
        'error.invalidCaptcha': 'Codigo invalido, intenta de nuevo',
        'error.codeExpired': 'El codigo ha expirado, solicita uno nuevo',
        'error.passwordWeak': 'Contrasena demasiado debil',
        'error.domainRateLimit': 'Demasiadas solicitudes para este dominio. Reintenta en {seconds}s',
        'error.emailRateLimit': 'Demasiadas solicitudes para este correo. Reintenta en {seconds}s',
        'error.invalidEmail': 'Introduce un correo valido',
        'error.missingEmail': 'Introduce tu correo',
        'error.missingUsername': 'Introduce tu usuario',
        'error.missingPassword': 'Introduce tu contrasena',
        'error.missingCode': 'Introduce el codigo de verificacion',
        'error.missingAge': 'Introduce tu edad',
        'error.passwordTooShort': 'La contrasena debe tener al menos 32 caracteres',
        'error.passwordNeedLower': 'La contrasena debe incluir minusculas',
        'error.passwordNeedUpper': 'La contrasena debe incluir mayusculas',
        'error.passwordNeedDigit': 'La contrasena debe incluir numeros',
        'error.passwordNeedSpecial': 'La contrasena debe incluir simbolos especiales',
        'error.passwordMismatch': 'Las dos contrasenas no coinciden',
        'error.sendCodeFailed': 'No se pudo enviar el codigo',
        'error.requestFailed': 'La solicitud fallo, intenta mas tarde',
        'error.verifyFailed': 'Fallo de verificacion',
        'error.domainTooFrequent': 'Dominio con demasiadas solicitudes, reintenta en {seconds}s',
    },
    fr: {
        'language.switch': 'Langue',
        'language.selectAria': 'Selecteur de langue',
        'mode.login.title': 'Connexion',
        'mode.login.subtitle': "Gerez votre identite et vos autorisations d'acces",
        'mode.register.stage.email': 'Creer un compte',
        'mode.register.stage.verify': 'Verifier le code',
        'mode.register.stage.details': 'Configurer le compte',
        'label.username': "Nom d'utilisateur",
        'label.email': 'Adresse e-mail',
        'label.code': 'Code de verification',
        'label.age': 'Age',
        'label.password': 'Mot de passe',
        'label.confirmPassword': 'Confirmer le mot de passe',
        'action.sendCode': 'Envoyer',
        'action.resendCode': 'Renvoyer',
        'action.submit': 'Valider',
        'action.continue': 'Continuer',
        'action.createAccount': 'Creer un compte',
        'action.back': 'Retour',
        'action.switchToRegister': 'Pas de compte ? Inscription',
        'action.switchToLogin': 'Deja un compte ? Connexion',
        'twofa.title': 'Verification a deux facteurs',
        'twofa.backToLogin': 'Retour a la connexion',
        'dashboard.online': 'En ligne',
        'dashboard.notice.title': 'Joyeux poisson d avril !',
        'dashboard.logout': 'Deconnexion securisee',
        'captcha.title': 'Verification de securite',
        'captcha.guide': "Utilisez le curseur et cliquez sur le numero correspondant a l'image.",
        'captcha.cancel': 'Annuler',
        'success.codeSent': 'Code envoye',
        'success.accountCreated': 'Compte cree, connectez-vous',
        'error.invalidEmail': 'Saisissez un e-mail valide',
        'error.requestFailed': 'Echec de la requete, reessayez plus tard',
    },
    de: {
        'language.switch': 'Sprache',
        'language.selectAria': 'Sprachauswahl',
        'mode.login.title': 'Anmelden',
        'mode.login.subtitle': 'Verwalte deine Identitat und Zugriffsrechte',
        'mode.register.stage.email': 'Konto erstellen',
        'mode.register.stage.verify': 'Code prufen',
        'mode.register.stage.details': 'Konto einrichten',
        'label.username': 'Benutzername',
        'label.email': 'E-Mail',
        'label.code': 'Bestatigungscode',
        'label.age': 'Alter',
        'label.password': 'Passwort',
        'label.confirmPassword': 'Passwort bestatigen',
        'action.sendCode': 'Code senden',
        'action.resendCode': 'Erneut senden',
        'action.submit': 'Absenden',
        'action.continue': 'Weiter',
        'action.createAccount': 'Konto erstellen',
        'action.back': 'Zuruck',
        'action.switchToRegister': 'Noch kein Konto? Registrieren',
        'action.switchToLogin': 'Schon ein Konto? Anmelden',
        'twofa.title': 'Zwei-Faktor-Verifizierung',
        'twofa.backToLogin': 'Zuruck zur Anmeldung',
        'dashboard.online': 'Online',
        'dashboard.notice.title': 'Frohen Aprilscherz!',
        'dashboard.logout': 'Sicher abmelden',
        'captcha.title': 'Sicherheitsprufung',
        'captcha.guide': 'Nutze den Regler und wahle die Zahl wie im Bild.',
        'captcha.cancel': 'Abbrechen',
        'success.codeSent': 'Code gesendet',
        'success.accountCreated': 'Konto erstellt, bitte anmelden',
        'error.invalidEmail': 'Bitte gib eine gultige E-Mail ein',
        'error.requestFailed': 'Anfrage fehlgeschlagen, bitte spater erneut versuchen',
    },
    pt: {
        'language.switch': 'Idioma',
        'language.selectAria': 'Seletor de idioma',
        'mode.login.title': 'Entrar',
        'mode.login.subtitle': 'Gerencie sua identidade e permissoes de acesso',
        'mode.register.stage.email': 'Criar conta',
        'mode.register.stage.verify': 'Verificar codigo',
        'mode.register.stage.details': 'Configurar conta',
        'label.username': 'Usuario',
        'label.email': 'E-mail',
        'label.code': 'Codigo de verificacao',
        'label.age': 'Idade',
        'label.password': 'Senha',
        'label.confirmPassword': 'Confirmar senha',
        'action.sendCode': 'Enviar codigo',
        'action.resendCode': 'Reenviar',
        'action.submit': 'Enviar',
        'action.continue': 'Continuar',
        'action.createAccount': 'Criar conta',
        'action.back': 'Voltar',
        'action.switchToRegister': 'Nao tem conta? Cadastre-se',
        'action.switchToLogin': 'Ja tem conta? Entrar',
        'twofa.title': 'Verificacao em duas etapas',
        'twofa.backToLogin': 'Voltar ao login',
        'dashboard.online': 'Online',
        'dashboard.notice.title': 'Feliz Dia da Mentira!',
        'dashboard.logout': 'Sair com seguranca',
        'captcha.title': 'Verificacao de seguranca',
        'captcha.guide': 'Use o controle deslizante e clique no numero correspondente.',
        'captcha.cancel': 'Cancelar',
        'success.codeSent': 'Codigo enviado',
        'success.accountCreated': 'Conta criada, faca login',
        'error.invalidEmail': 'Digite um e-mail valido',
        'error.requestFailed': 'Falha na solicitacao, tente novamente mais tarde',
    },
    it: {
        'language.switch': 'Lingua',
        'language.selectAria': 'Selettore lingua',
        'mode.login.title': 'Accesso',
        'mode.login.subtitle': 'Gestisci identita e autorizzazioni di accesso',
        'mode.register.stage.email': 'Crea account',
        'mode.register.stage.verify': 'Verifica codice',
        'mode.register.stage.details': 'Configura account',
        'label.username': 'Nome utente',
        'label.email': 'Email',
        'label.code': 'Codice di verifica',
        'label.age': 'Eta',
        'label.password': 'Password',
        'label.confirmPassword': 'Conferma password',
        'action.sendCode': 'Invia codice',
        'action.resendCode': 'Invia di nuovo',
        'action.submit': 'Conferma',
        'action.continue': 'Continua',
        'action.createAccount': 'Crea account',
        'action.back': 'Indietro',
        'action.switchToRegister': 'Nessun account? Registrati',
        'action.switchToLogin': 'Hai gia un account? Accedi',
        'twofa.title': 'Verifica a due fattori',
        'captcha.cancel': 'Annulla',
        'success.codeSent': 'Codice inviato',
        'success.accountCreated': 'Account creato, effettua il login',
    },
    nl: {
        'language.switch': 'Taal',
        'language.selectAria': 'Taalselector',
        'mode.login.title': 'Inloggen',
        'mode.login.subtitle': 'Beheer je identiteit en toegangsrechten',
        'mode.register.stage.email': 'Account maken',
        'mode.register.stage.verify': 'Code verifieeren',
        'mode.register.stage.details': 'Account instellen',
        'label.username': 'Gebruikersnaam',
        'label.email': 'E-mailadres',
        'label.code': 'Verificatiecode',
        'label.age': 'Leeftijd',
        'label.password': 'Wachtwoord',
        'label.confirmPassword': 'Bevestig wachtwoord',
        'action.sendCode': 'Code sturen',
        'action.continue': 'Doorgaan',
        'action.createAccount': 'Account maken',
        'action.switchToRegister': 'Geen account? Registreren',
        'action.switchToLogin': 'Al een account? Inloggen',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Annuleren',
    },
    pl: {
        'language.switch': 'Jezyk',
        'language.selectAria': 'Wybierz jezyk',
        'mode.login.title': 'Logowanie',
        'mode.login.subtitle': 'Zarzadzaj tozsamoscia i uprawnieniami',
        'mode.register.stage.email': 'Utworz konto',
        'mode.register.stage.verify': 'Zweryfikuj kod',
        'mode.register.stage.details': 'Skonfiguruj konto',
        'label.username': 'Nazwa uzytkownika',
        'label.email': 'Adres e-mail',
        'label.code': 'Kod weryfikacyjny',
        'label.age': 'Wiek',
        'label.password': 'Haslo',
        'label.confirmPassword': 'Potwierdz haslo',
        'action.sendCode': 'Wyslij kod',
        'action.continue': 'Kontynuuj',
        'action.createAccount': 'Utworz konto',
        'action.switchToRegister': 'Nie masz konta? Zarejestruj sie',
        'action.switchToLogin': 'Masz konto? Zaloguj sie',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Anuluj',
    },
    tr: {
        'language.switch': 'Dil',
        'language.selectAria': 'Dil secici',
        'mode.login.title': 'Giris',
        'mode.login.subtitle': 'Kimligini ve erisim izinlerini yonet',
        'mode.register.stage.email': 'Hesap olustur',
        'mode.register.stage.verify': 'Kodu dogrula',
        'mode.register.stage.details': 'Hesabi ayarla',
        'label.username': 'Kullanici adi',
        'label.email': 'E-posta',
        'label.code': 'Dogrulama kodu',
        'label.age': 'Yas',
        'label.password': 'Sifre',
        'label.confirmPassword': 'Sifreyi dogrula',
        'action.sendCode': 'Kod gonder',
        'action.continue': 'Devam et',
        'action.createAccount': 'Hesap olustur',
        'action.switchToRegister': 'Hesabin yok mu? Kaydol',
        'action.switchToLogin': 'Hesabin var mi? Giris yap',
        'dashboard.online': 'Cevrimici',
        'captcha.cancel': 'Iptal',
    },
    ru: {
        'language.switch': 'Yazyk',
        'language.selectAria': 'Vybor yazyka',
        'mode.login.title': 'Vhod',
        'mode.login.subtitle': 'Upravlyayte lichnostyu i pravami dostupa',
        'mode.register.stage.email': 'Sozdat akkaunt',
        'mode.register.stage.verify': 'Proverit kod',
        'mode.register.stage.details': 'Nastroit akkaunt',
        'label.username': 'Imya polzovatelya',
        'label.email': 'Elektronnaya pochta',
        'label.code': 'Kod podtverzhdeniya',
        'label.age': 'Vozrast',
        'label.password': 'Parol',
        'label.confirmPassword': 'Podtverdite parol',
        'action.sendCode': 'Otpravit kod',
        'action.continue': 'Prodolzhit',
        'action.createAccount': 'Sozdat akkaunt',
        'action.switchToRegister': 'Net akkaunta? Registraciya',
        'action.switchToLogin': 'Uzhe est akkaunt? Vhod',
        'dashboard.online': 'V seti',
        'captcha.cancel': 'Otmena',
    },
    uk: {
        'language.switch': 'Mova',
        'language.selectAria': 'Vybir movy',
        'mode.login.title': 'Vkhid',
        'mode.login.subtitle': 'Keruyte identychnistyu ta dostupom',
        'mode.register.stage.email': 'Stvoryty oblikovyi zapys',
        'mode.register.stage.verify': 'Pereviryty kod',
        'mode.register.stage.details': 'Nalashtuvaty oblikovyi zapys',
        'label.username': 'Imya korystuvacha',
        'label.email': 'Email',
        'label.code': 'Kod perevirky',
        'label.age': 'Vik',
        'label.password': 'Parol',
        'label.confirmPassword': 'Pidtverdzhennia parolia',
        'action.sendCode': 'Nadislati kod',
        'action.continue': 'Prodovzhyty',
        'action.createAccount': 'Stvoryty oblikovyi zapys',
        'action.switchToRegister': 'Nemaye konta? Zareyestruvatysya',
        'action.switchToLogin': 'Vzhe ye konto? Uviyty',
        'dashboard.online': 'Onlain',
        'captcha.cancel': 'Skasuvaty',
    },
    ar: {
        'language.switch': 'Al-lugha',
        'language.selectAria': 'Mukhtarat al-lugha',
        'mode.login.title': 'Tasjeel al-dukhool',
        'mode.login.subtitle': 'Idarat al-hawiya wa salahiat al-wusool',
        'mode.register.stage.email': 'Insha hisab',
        'mode.register.stage.verify': 'Tahqiq al-ramz',
        'mode.register.stage.details': 'Iedad al-hisab',
        'label.username': 'Ism al-mustakhdim',
        'label.email': 'Al-bareed al-elektroni',
        'label.code': 'Ramz al-tahqiq',
        'label.age': 'Al-omr',
        'label.password': 'Kalimat al-moroor',
        'label.confirmPassword': 'Tawkid kalimat al-moroor',
        'action.sendCode': 'Irsal al-ramz',
        'action.continue': 'Istimrar',
        'action.createAccount': 'Insha hisab',
        'action.switchToRegister': 'Laysa ladayk hisab? Sajjil',
        'action.switchToLogin': 'Ladayk hisab? Odhkul',
        'dashboard.online': 'Muttasil',
        'captcha.cancel': 'Ilgha',
    },
    fa: {
        'language.switch': 'Zaban',
        'language.selectAria': 'Entkhab zaban',
        'mode.login.title': 'Vorood',
        'mode.login.subtitle': 'Modiriat hoviat va dastresi',
        'mode.register.stage.email': 'Sakht hesab',
        'mode.register.stage.verify': 'Taeid code',
        'mode.register.stage.details': 'Tanzim hesab',
        'label.username': 'Nam karbari',
        'label.email': 'Email',
        'label.code': 'Code taeid',
        'label.age': 'Sen',
        'label.password': 'Ramz oboor',
        'label.confirmPassword': 'Taeid ramz oboor',
        'action.sendCode': 'Ersal code',
        'action.continue': 'Edame',
        'action.createAccount': 'Sakht hesab',
        'action.switchToRegister': 'Hesab nadari? Sabt nam',
        'action.switchToLogin': 'Hesab dari? Vorood',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Enseraf',
    },
    he: {
        'language.switch': 'Safa',
        'language.selectAria': 'Bohar safa',
        'mode.login.title': 'Knisa',
        'mode.login.subtitle': 'Nihul zehut veharshaot gisha',
        'mode.register.stage.email': 'Ytzirat heshbon',
        'mode.register.stage.verify': 'Imut kod',
        'mode.register.stage.details': 'Hagdarot heshbon',
        'label.username': 'Shem mishtamesh',
        'label.email': 'Doar elektronI',
        'label.code': 'Kod imut',
        'label.age': 'Gil',
        'label.password': 'Sisma',
        'label.confirmPassword': 'Imut sisma',
        'action.sendCode': 'Shlach kod',
        'action.continue': 'Hamshech',
        'action.createAccount': 'Ytzor heshbon',
        'action.switchToRegister': 'Ein heshbon? Hirashmut',
        'action.switchToLogin': 'Yesh heshbon? Knisa',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Bitul',
    },
    hi: {
        'language.switch': 'Bhasha',
        'language.selectAria': 'Bhasha chunav',
        'mode.login.title': 'Log in',
        'mode.login.subtitle': 'Apni pahchan aur access anumatiyan sambhalen',
        'mode.register.stage.email': 'Khaata banayen',
        'mode.register.stage.verify': 'Code satyapit karen',
        'mode.register.stage.details': 'Khaata set karen',
        'label.username': 'Upyogakarta naam',
        'label.email': 'Email',
        'label.code': 'Satyapan code',
        'label.age': 'Ayu',
        'label.password': 'Password',
        'label.confirmPassword': 'Password pushti',
        'action.sendCode': 'Code bhejen',
        'action.continue': 'Jaari rakhen',
        'action.createAccount': 'Khaata banayen',
        'action.switchToRegister': 'Khaata nahi hai? Register karen',
        'action.switchToLogin': 'Pehle se khaata hai? Log in',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Radd karen',
    },
    bn: {
        'language.switch': 'Bhasha',
        'language.selectAria': 'Bhasha nirbachon',
        'mode.login.title': 'Login',
        'mode.login.subtitle': 'Porichoy ebong access onumoti porichalona korun',
        'mode.register.stage.email': 'Account toiri korun',
        'mode.register.stage.verify': 'Code jachai korun',
        'mode.register.stage.details': 'Account set korun',
        'label.username': 'Byabaharkari nam',
        'label.email': 'Email',
        'label.code': 'Jachai code',
        'label.age': 'Boyosh',
        'label.password': 'Password',
        'label.confirmPassword': 'Password nischit korun',
        'action.sendCode': 'Code pathan',
        'action.continue': 'Chaliye jan',
        'action.createAccount': 'Account toiri korun',
        'action.switchToRegister': 'Account nei? Nibondhon korun',
        'action.switchToLogin': 'Account ache? Login korun',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Batil',
    },
    id: {
        'language.switch': 'Bahasa',
        'language.selectAria': 'Pemilih bahasa',
        'mode.login.title': 'Masuk',
        'mode.login.subtitle': 'Kelola identitas dan hak akses Anda',
        'mode.register.stage.email': 'Buat akun',
        'mode.register.stage.verify': 'Verifikasi kode',
        'mode.register.stage.details': 'Atur akun',
        'label.username': 'Nama pengguna',
        'label.email': 'Email',
        'label.code': 'Kode verifikasi',
        'label.age': 'Usia',
        'label.password': 'Kata sandi',
        'label.confirmPassword': 'Konfirmasi kata sandi',
        'action.sendCode': 'Kirim kode',
        'action.continue': 'Lanjutkan',
        'action.createAccount': 'Buat akun',
        'action.switchToRegister': 'Belum punya akun? Daftar',
        'action.switchToLogin': 'Sudah punya akun? Masuk',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Batal',
    },
    ms: {
        'language.switch': 'Bahasa',
        'language.selectAria': 'Pemilih bahasa',
        'mode.login.title': 'Log masuk',
        'mode.login.subtitle': 'Urus identiti dan kebenaran akses anda',
        'mode.register.stage.email': 'Cipta akaun',
        'mode.register.stage.verify': 'Sahkan kod',
        'mode.register.stage.details': 'Tetapkan akaun',
        'label.username': 'Nama pengguna',
        'label.email': 'E-mel',
        'label.code': 'Kod pengesahan',
        'label.age': 'Umur',
        'label.password': 'Kata laluan',
        'label.confirmPassword': 'Sahkan kata laluan',
        'action.sendCode': 'Hantar kod',
        'action.continue': 'Teruskan',
        'action.createAccount': 'Cipta akaun',
        'action.switchToRegister': 'Tiada akaun? Daftar',
        'action.switchToLogin': 'Sudah ada akaun? Log masuk',
        'dashboard.online': 'Dalam talian',
        'captcha.cancel': 'Batal',
    },
    vi: {
        'language.switch': 'Ngon ngu',
        'language.selectAria': 'Bo chon ngon ngu',
        'mode.login.title': 'Dang nhap',
        'mode.login.subtitle': 'Quan ly danh tinh va quyen truy cap cua ban',
        'mode.register.stage.email': 'Tao tai khoan',
        'mode.register.stage.verify': 'Xac minh ma',
        'mode.register.stage.details': 'Cai dat tai khoan',
        'label.username': 'Ten nguoi dung',
        'label.email': 'Email',
        'label.code': 'Ma xac minh',
        'label.age': 'Tuoi',
        'label.password': 'Mat khau',
        'label.confirmPassword': 'Xac nhan mat khau',
        'action.sendCode': 'Gui ma',
        'action.continue': 'Tiep tuc',
        'action.createAccount': 'Tao tai khoan',
        'action.switchToRegister': 'Chua co tai khoan? Dang ky',
        'action.switchToLogin': 'Da co tai khoan? Dang nhap',
        'dashboard.online': 'Truc tuyen',
        'captcha.cancel': 'Huy',
    },
    th: {
        'language.switch': 'Phasa',
        'language.selectAria': 'Tua lueak phasa',
        'mode.login.title': 'Khao su rabob',
        'mode.login.subtitle': 'Jatkan tua ton lae sitthi kan khao thueng',
        'mode.register.stage.email': 'Sang banchee',
        'mode.register.stage.verify': 'Yuenyan code',
        'mode.register.stage.details': 'Tang kha banchee',
        'label.username': 'Chue phu chai',
        'label.email': 'Email',
        'label.code': 'Rahas yuenyan',
        'label.age': 'Ayoo',
        'label.password': 'Rahas phan',
        'label.confirmPassword': 'Yuenyan rahas phan',
        'action.sendCode': 'Song code',
        'action.continue': 'Damnoen to',
        'action.createAccount': 'Sang banchee',
        'action.switchToRegister': 'Mai mi banchee? Long thabian',
        'action.switchToLogin': 'Mi banchee laew? Khao su rabob',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Yok loek',
    },
    ja: {
        'language.switch': 'ゲンゴ',
        'language.selectAria': 'ゲンゴ セレクター',
        'mode.login.title': 'ログイン',
        'mode.login.subtitle': 'アイデンティティ ト アクセス ケンゲン オ カンリ',
        'mode.register.stage.email': 'アカウント サクセイ',
        'mode.register.stage.verify': 'コード ニンショウ',
        'mode.register.stage.details': 'アカウント セッテイ',
        'label.username': 'ユーザー メイ',
        'label.email': 'メール アドレス',
        'label.code': 'ニンショウ コード',
        'label.age': 'ネンレイ',
        'label.password': 'パスワード',
        'label.confirmPassword': 'パスワード カクニン',
        'placeholder.username.login': 'ユーザー メイ オ ニュウリョク',
        'placeholder.username.register': 'ユーザー メイ オ セッテイ',
        'placeholder.email': 'name@example.com',
        'placeholder.code': 'コード オ ニュウリョク',
        'placeholder.age': 'ネンレイ オ センタク',
        'placeholder.password': 'パスワード オ セッテイ',
        'placeholder.confirmPassword': 'モウ イチド パスワード オ ニュウリョク',
        'action.sendCode': 'コード ソウシン',
        'action.resendCode': 'サイソウシン',
        'action.submit': 'ソウシン',
        'action.continue': 'ツヅケル',
        'action.createAccount': 'アカウント サクセイ',
        'action.back': 'モドル',
        'action.backPrevious': 'ヒトツ マエ ニ モドル',
        'action.switchToRegister': 'アカウント ガ ナイ? トウロク',
        'action.switchToLogin': 'アカウント ガ アル? ログイン',
        'twofa.title': 'ニダンカ ニンショウ',
        'twofa.setupMessage': 'ハツログイン: セイブツ ニンショウ クレデンシャル オ セッテイ',
        'twofa.verifyMessage': 'セイブツ ニンショウ デ ホンニン カクニン',
        'twofa.setupButton': 'イマ スグ セッテイ',
        'twofa.verifyButton': 'イマ スグ ニンショウ',
        'twofa.backToLogin': 'ツウジョウ ログイン ニ モドル',
        'dashboard.online': 'オンライン',
        'dashboard.notice.title': 'エイプリル フール!',
        'dashboard.notice.body': 'コノ プロジェクト ワ ユーザー タイケン オ ワザト ワルク スル ジョーク プロジェクト デス。',
        'dashboard.notice.sourcePrefix': 'ソース コード:',
        'dashboard.notice.warn': 'チュウイ: ヨク ツカウ パスワード オ ツカッタ バアイ、ホカ ノ サイト モ スグ ヘンコウ シテ クダサイ。',
        'dashboard.logout': 'セキュア ログアウト',
        'captcha.title': 'セキュリティ ニンショウ',
        'captcha.alt': 'キャプチャ',
        'captcha.refreshTitle': 'キャプチャ サイシュトク',
        'captcha.guide': 'スライダー デ イドウ シテ、ガゾウ ト オナジ スウジ オ クリック。',
        'captcha.cancel': 'キャンセル',
        'success.codeSent': 'コード ソウシン ズミ',
        'success.accountCreated': 'アカウント サクセイ カンリョウ。ログイン シテ クダサイ',
        'error.server': 'サーバー エラー',
        'error.invalidCaptcha': 'コード ガ ムコウ。モウ イチド オネガイシマス',
        'error.codeExpired': 'コード ノ ユウコウ キゲン ガ キレマシタ。サイシュトク シテ クダサイ',
        'error.passwordWeak': 'パスワード キョウド ガ フソク',
        'error.domainRateLimit': 'コノ ドメイン デ ノ リクエスト ガ オオスギマス。{seconds}ビョウゴ ニ サイシコウ',
        'error.emailRateLimit': 'コノ メール デ ノ リクエスト ガ オオスギマス。{seconds}ビョウゴ ニ サイシコウ',
        'error.invalidEmail': 'ユウコウ ナ メール アドレス オ ニュウリョク',
        'error.missingEmail': 'メール アドレス オ ニュウリョク',
        'error.missingUsername': 'ユーザー メイ オ ニュウリョク',
        'error.missingPassword': 'パスワード オ ニュウリョク',
        'error.missingCode': 'ニンショウ コード オ ニュウリョク',
        'error.missingAge': 'ネンレイ オ ニュウリョク',
        'error.passwordTooShort': 'パスワード ワ 32モジ イジョウ ヒツヨウ',
        'error.passwordNeedLower': 'パスワード ニ コモジ エイジ ヒツヨウ',
        'error.passwordNeedUpper': 'パスワード ニ オオモジ エイジ ヒツヨウ',
        'error.passwordNeedDigit': 'パスワード ニ スウジ ヒツヨウ',
        'error.passwordNeedSpecial': 'パスワード ニ キゴウ ヒツヨウ',
        'error.passwordMismatch': '2ツ ノ パスワード ガ イッチ シマセン',
        'error.sendCodeFailed': 'コード ソウシン シッパイ',
        'error.requestFailed': 'リクエスト シッパイ。アトデ サイシコウ',
        'error.verifyFailed': 'ニンショウ シッパイ',
        'error.domainTooFrequent': 'コノ ドメイン ノ リクエスト ガ ヒンパン。{seconds}ビョウゴ ニ サイシコウ',
    },
    ko: {
        'language.switch': 'Eoneo',
        'language.selectAria': 'Eoneo seontaek',
        'mode.login.title': 'Login',
        'mode.login.subtitle': 'Sinwon mit jeopgeun gwonhan gwanri',
        'mode.register.stage.email': 'Gyejeong saengseong',
        'mode.register.stage.verify': 'Kodeu geomjeung',
        'mode.register.stage.details': 'Gyejeong seoljeong',
        'label.username': 'Sayongja ireum',
        'label.email': 'Email',
        'label.code': 'Geomjeung kodeu',
        'label.age': 'Nai',
        'label.password': 'Bimilbeonho',
        'label.confirmPassword': 'Bimilbeonho hwagin',
        'action.sendCode': 'Kodeu bonaegi',
        'action.continue': 'Gyesok',
        'action.createAccount': 'Gyejeong saengseong',
        'action.switchToRegister': 'Gyejeongi eopseumnikka? Hoewon gaip',
        'action.switchToLogin': 'Gyejeongi isseumnikka? Login',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Chwiso',
    },
    ro: {
        'language.switch': 'Limba',
        'language.selectAria': 'Selector limba',
        'mode.login.title': 'Autentificare',
        'mode.login.subtitle': 'Gestioneaza identitatea si permisiunile de acces',
        'mode.register.stage.email': 'Creeaza cont',
        'mode.register.stage.verify': 'Verifica codul',
        'mode.register.stage.details': 'Configureaza contul',
        'label.username': 'Nume utilizator',
        'label.email': 'Email',
        'label.code': 'Cod de verificare',
        'label.age': 'Varsta',
        'label.password': 'Parola',
        'label.confirmPassword': 'Confirma parola',
        'action.sendCode': 'Trimite cod',
        'action.continue': 'Continua',
        'action.createAccount': 'Creeaza cont',
        'action.switchToRegister': 'Nu ai cont? Inregistreaza-te',
        'action.switchToLogin': 'Ai deja cont? Autentificare',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Anuleaza',
    },
    cs: {
        'language.switch': 'Jazyk',
        'language.selectAria': 'Vyber jazyka',
        'mode.login.title': 'Prihlaseni',
        'mode.login.subtitle': 'Spravujte identitu a pristupova opravneni',
        'mode.register.stage.email': 'Vytvorit ucet',
        'mode.register.stage.verify': 'Overit kod',
        'mode.register.stage.details': 'Nastavit ucet',
        'label.username': 'Uzivatelske jmeno',
        'label.email': 'E-mail',
        'label.code': 'Overovaci kod',
        'label.age': 'Vek',
        'label.password': 'Heslo',
        'label.confirmPassword': 'Potvrdit heslo',
        'action.sendCode': 'Odeslat kod',
        'action.continue': 'Pokracovat',
        'action.createAccount': 'Vytvorit ucet',
        'action.switchToRegister': 'Nemate ucet? Registrace',
        'action.switchToLogin': 'Mate ucet? Prihlaseni',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Zrusit',
    },
    sv: {
        'language.switch': 'Sprak',
        'language.selectAria': 'Sprakval',
        'mode.login.title': 'Logga in',
        'mode.login.subtitle': 'Hantera identitet och behorigheter',
        'mode.register.stage.email': 'Skapa konto',
        'mode.register.stage.verify': 'Verifiera kod',
        'mode.register.stage.details': 'Konfigurera konto',
        'label.username': 'Anvandarnamn',
        'label.email': 'E-post',
        'label.code': 'Verifieringskod',
        'label.age': 'Alder',
        'label.password': 'Losenord',
        'label.confirmPassword': 'Bekrafta losenord',
        'action.sendCode': 'Skicka kod',
        'action.continue': 'Fortsatt',
        'action.createAccount': 'Skapa konto',
        'action.switchToRegister': 'Inget konto? Registrera dig',
        'action.switchToLogin': 'Har konto? Logga in',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Avbryt',
    },
    fi: {
        'language.switch': 'Kieli',
        'language.selectAria': 'Kielen valinta',
        'mode.login.title': 'Kirjaudu sisaan',
        'mode.login.subtitle': 'Hallitse identiteettia ja paasyoikeuksia',
        'mode.register.stage.email': 'Luo tili',
        'mode.register.stage.verify': 'Vahvista koodi',
        'mode.register.stage.details': 'Aseta tili',
        'label.username': 'Kayttajanimi',
        'label.email': 'Sahkoposti',
        'label.code': 'Vahvistuskoodi',
        'label.age': 'Ika',
        'label.password': 'Salasana',
        'label.confirmPassword': 'Vahvista salasana',
        'action.sendCode': 'Laheta koodi',
        'action.continue': 'Jatka',
        'action.createAccount': 'Luo tili',
        'action.switchToRegister': 'Ei tilia? Rekisteroidy',
        'action.switchToLogin': 'Onko tili? Kirjaudu sisaan',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Peruuta',
    },
    el: {
        'language.switch': 'Glossa',
        'language.selectAria': 'Epilogi glossas',
        'mode.login.title': 'Syndesi',
        'mode.login.subtitle': 'Diaxeirisi tautotitas kai adeion prosvasis',
        'mode.register.stage.email': 'Dimiourgia logariasmou',
        'mode.register.stage.verify': 'Epalithefsi kodikou',
        'mode.register.stage.details': 'Rythmisi logariasmou',
        'label.username': 'Onoma xristi',
        'label.email': 'Email',
        'label.code': 'Kodikos epalithefsis',
        'label.age': 'Ilikia',
        'label.password': 'Kodikos',
        'label.confirmPassword': 'Epivevaiosi kodikou',
        'action.sendCode': 'Apostoli kodikou',
        'action.continue': 'Synexeia',
        'action.createAccount': 'Dimiourgia logariasmou',
        'action.switchToRegister': 'Den exeis logariasmo? Eggrafi',
        'action.switchToLogin': 'Exeis idi logariasmo? Syndesi',
        'dashboard.online': 'Online',
        'captcha.cancel': 'Akyrosi',
    },
};

let currentLanguage: LanguageCode = FALLBACK_LANGUAGE;
let initialized = false;

function normalizeLanguage(input: string | null | undefined): LanguageCode | null {
    if (!input) return null;

    const lowered = input.trim().toLowerCase();
    if (!lowered) return null;

    if (languageSet.has(lowered as LanguageCode)) {
        return lowered as LanguageCode;
    }

    const base = lowered.split('-')[0];
    if (languageSet.has(base as LanguageCode)) {
        return base as LanguageCode;
    }

    return null;
}

function setDocumentDirection(language: LanguageCode): void {
    document.documentElement.lang = language;
    document.documentElement.dir = RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';
}

function detectInitialLanguage(): LanguageCode {
    const stored = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
    if (stored) return stored;

    for (const language of navigator.languages) {
        const normalized = normalizeLanguage(language);
        if (normalized) {
            return normalized;
        }
    }

    return FALLBACK_LANGUAGE;
}

export function initializeLanguage(): LanguageCode {
    if (initialized) {
        return currentLanguage;
    }

    currentLanguage = detectInitialLanguage();
    initialized = true;
    setDocumentDirection(currentLanguage);
    return currentLanguage;
}

export function getCurrentLanguage(): LanguageCode {
    return initialized ? currentLanguage : initializeLanguage();
}

export function setLanguage(language: string): LanguageCode {
    const normalized = normalizeLanguage(language) ?? FALLBACK_LANGUAGE;

    if (!initialized) {
        initialized = true;
    }

    if (normalized === currentLanguage) {
        setDocumentDirection(normalized);
        return normalized;
    }

    currentLanguage = normalized;
    setDocumentDirection(currentLanguage);
    window.localStorage.setItem(STORAGE_KEY, currentLanguage);

    window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT, {
        detail: { language: currentLanguage },
    }));

    return currentLanguage;
}

export function onLanguageChange(listener: (language: LanguageCode) => void): () => void {
    const handler = (event: Event) => {
        const custom = event as CustomEvent<{ language?: string }>;
        const next = normalizeLanguage(custom.detail?.language) ?? getCurrentLanguage();
        listener(next);
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handler);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handler);
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
    if (!vars) return template;

    return template.replace(/\{(\w+)\}/g, (_all, name: string) => {
        const value = vars[name];
        return value === undefined ? `{${name}}` : String(value);
    });
}

export function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    const language = getCurrentLanguage();
    const translated = translations[language][key] ?? translations[FALLBACK_LANGUAGE][key] ?? key;
    return interpolate(translated, vars);
}

function setTranslatedValue(element: HTMLElement, value: string, mode: string): void {
    if (mode === 'text') {
        element.textContent = value;
        return;
    }

    if (mode === 'placeholder') {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            element.placeholder = value;
        }
        return;
    }

    if (mode === 'title') {
        element.setAttribute('title', value);
        return;
    }

    if (mode === 'aria-label') {
        element.setAttribute('aria-label', value);
        return;
    }

    if (mode === 'alt') {
        if (element instanceof HTMLImageElement) {
            element.alt = value;
        }
    }
}

function applyBySelector(root: ParentNode, selector: string, mode: 'text' | 'placeholder' | 'title' | 'aria-label' | 'alt'): void {
    root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        const attrName =
            mode === 'text'
                ? 'data-i18n'
                : mode === 'placeholder'
                    ? 'data-i18n-placeholder'
                    : mode === 'title'
                        ? 'data-i18n-title'
                        : mode === 'aria-label'
                            ? 'data-i18n-aria-label'
                            : 'data-i18n-alt';
        const key = element.getAttribute(attrName) as TranslationKey | null;
        if (!key) return;
        setTranslatedValue(element, t(key), mode);
    });
}

export function applyI18n(root: ParentNode = document): void {
    applyBySelector(root, '[data-i18n]', 'text');
    applyBySelector(root, '[data-i18n-placeholder]', 'placeholder');
    applyBySelector(root, '[data-i18n-title]', 'title');
    applyBySelector(root, '[data-i18n-aria-label]', 'aria-label');
    applyBySelector(root, '[data-i18n-alt]', 'alt');
}

export function initLanguageSwitcher(select: HTMLSelectElement): void {
    initializeLanguage();

    if (select.dataset.initialized !== 'true') {
        const fragment = document.createDocumentFragment();
        LANGUAGE_OPTIONS.forEach((item) => {
            const option = document.createElement('option');
            option.value = item.code;
            option.textContent = item.label;
            fragment.appendChild(option);
        });
        select.appendChild(fragment);

        select.addEventListener('change', () => {
            setLanguage(select.value);
        });
        select.dataset.initialized = 'true';
    }

    select.value = getCurrentLanguage();
}
