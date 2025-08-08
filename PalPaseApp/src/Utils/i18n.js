// Sistema de localización simplificado
const translations = {
  es: {
    // Common
    accept: "Aceptar",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    confirm: "Confirmar",
    back: "Atrás",
    next: "Siguiente",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Información",

    // Auth
    login: "Iniciar Sesión",
    register: "Registrarse",
    email: "Correo Electrónico",
    password: "Contraseña",
    confirmPassword: "Confirmar Contraseña",
    fullName: "Nombre Completo",
    forgotPassword: "¿Olvidaste tu contraseña?",
    dontHaveAccount: "¿No tienes cuenta?",
    alreadyHaveAccount: "¿Ya tienes cuenta?",
    loginSuccess: "Inicio de sesión exitoso",
    loginError: "Error al iniciar sesión",
    registerSuccess: "Registro exitoso",
    registerError: "Error al registrarse",

    // Home
    welcome: "Bienvenido",
    balance: "Saldo",
    recentTransactions: "Transacciones Recientes",
    quickActions: "Acciones Rápidas",
    recharge: "Recargar",
    transfer: "Transferir",
    pay: "Pagar",
    qrCode: "Código QR",

    // Cards
    myCards: "Mis Tarjetas",
    addCard: "Agregar Tarjeta",
    cardNumber: "Número de Tarjeta",
    cardHolder: "Titular de la Tarjeta",
    expiryDate: "Fecha de Vencimiento",
    cvv: "CVV",
    removeCard: "Eliminar Tarjeta",

    // Recharge
    rechargeCard: "Recargar Tarjeta",
    amount: "Monto",
    selectCard: "Seleccionar Tarjeta",
    rechargeSuccess: "Recarga exitosa",
    rechargeError: "Error en la recarga",

    // Profile
    profile: "Perfil",
    personalInfo: "Información Personal",
    settings: "Configuraciones",
    language: "Idioma",
    changePassword: "Cambiar Contraseña",
    logout: "Cerrar Sesión",
    logoutConfirm: "¿Estás seguro que deseas cerrar sesión?",

    // Settings
    spanish: "Español",
    english: "Inglés",
    languageChanged: "Idioma cambiado exitosamente"
  },

  en: {
    // Common
    accept: "Accept",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    back: "Back",
    next: "Next",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",

    // Auth
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    forgotPassword: "Forgot your password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    loginSuccess: "Login successful",
    loginError: "Login error",
    registerSuccess: "Registration successful",
    registerError: "Registration error",

    // Home
    welcome: "Welcome",
    balance: "Balance",
    recentTransactions: "Recent Transactions",
    quickActions: "Quick Actions",
    recharge: "Recharge",
    transfer: "Transfer",
    pay: "Pay",
    qrCode: "QR Code",

    // Cards
    myCards: "My Cards",
    addCard: "Add Card",
    cardNumber: "Card Number",
    cardHolder: "Card Holder",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    removeCard: "Remove Card",

    // Recharge
    rechargeCard: "Recharge Card",
    amount: "Amount",
    selectCard: "Select Card",
    rechargeSuccess: "Recharge successful",
    rechargeError: "Recharge error",

    // Profile
    profile: "Profile",
    personalInfo: "Personal Information",
    settings: "Settings",
    language: "Language",
    changePassword: "Change Password",
    logout: "Logout",
    logoutConfirm: "Are you sure you want to logout?",

    // Settings
    spanish: "Spanish",
    english: "English",
    languageChanged: "Language changed successfully"
  }
};

let currentLanguage = 'es';

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
  }
};

export const getCurrentLanguage = () => currentLanguage;

export const t = (key) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      break;
    }
  }
  
  return value || key;
};

export const getSupportedLanguages = () => [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' }
];
