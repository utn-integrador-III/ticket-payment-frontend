# 🌐 Sistema de Localización PalPase App

## 📋 Descripción
Sistema de localización completo implementado para la aplicación PalPase, permitiendo cambio dinámico entre español e inglés con persistencia de preferencias.

## 🚀 Características Implementadas

### ✅ Funcionalidades Principales
- **Cambio de idioma dinámico** entre español e inglés
- **Persistencia de preferencias** usando AsyncStorage
- **Selector visual** con botón 🌐 en pantallas principales
- **Traducciones centralizadas** en sistema simplificado
- **Fallback automático** a español en caso de errores

### 📱 Pantallas Localizadas
- **LoginScreen** - Formulario de inicio de sesión
- **RegisterScreen** - Formulario de registro con campos de tarjeta
- **HomeScreen** - Pantalla principal con navegación
- **QRCodeScreen** - Pantalla de código QR
- **RechargeCard** - Formulario de recarga de tarjeta

## 🏗️ Arquitectura del Sistema

### 📁 Estructura de Archivos
```
src/
├── utils/
│   └── i18n.js                    # Sistema de traducciones
├── hooks/
│   └── useSimpleLanguage.js       # Hook de localización
├── components/
│   └── SimpleLanguageSelector.js  # Selector de idioma
└── screens/
    ├── LoginScreen.js             # ✅ Localizada
    ├── RegisterScreen.js          # ✅ Localizada
    ├── HomeScreen.js              # ✅ Localizada
    ├── QRCodeScreen.js            # ✅ Localizada
    └── RechargeCard.js            # ✅ Localizada
```

### 🔧 Componentes del Sistema

#### 1. **Sistema de Traducciones** (`src/utils/i18n.js`)
```javascript
// Uso básico
import { t, setLanguage, getCurrentLanguage } from '../utils/i18n';

// Traducir texto
const texto = t('login'); // "Iniciar Sesión" o "Login"

// Cambiar idioma
setLanguage('en'); // Cambiar a inglés
setLanguage('es'); // Cambiar a español
```

#### 2. **Hook de Localización** (`src/hooks/useSimpleLanguage.js`)
```javascript
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';

const { t, currentLanguage, changeLanguage, isLoading } = useSimpleLanguage();

// Usar en componentes
<Text>{t('welcome')}</Text>
<Button onPress={() => changeLanguage('en')} />
```

#### 3. **Selector de Idioma** (`src/components/SimpleLanguageSelector.js`)
```javascript
import SimpleLanguageSelector from '../components/SimpleLanguageSelector';

<SimpleLanguageSelector
  visible={showSelector}
  onClose={() => setShowSelector(false)}
/>
```

## 📖 Traducciones Disponibles

### 🇪🇸 Español / 🇺🇸 English

| Clave | Español | English |
|-------|---------|---------|
| `login` | Iniciar Sesión | Login |
| `register` | Registrarse | Register |
| `email` | Correo Electrónico | Email |
| `password` | Contraseña | Password |
| `welcome` | Bienvenido | Welcome |
| `balance` | Saldo | Balance |
| `back` | Atrás | Back |
| `cancel` | Cancelar | Cancel |
| `confirm` | Confirmar | Confirm |
| `error` | Error | Error |
| `success` | Éxito | Success |
| `loading` | Cargando... | Loading... |

### 📋 Categorías de Traducciones
- **Autenticación:** login, register, email, password
- **Navegación:** back, next, cancel, confirm
- **Formularios:** amount, selectCard, cardHolder, cardNumber
- **Mensajes:** success, error, loading, info
- **Perfil:** profile, settings, language
- **Tarjetas:** myCards, addCard, removeCard

## 🎯 Uso en Componentes

### Ejemplo Básico
```javascript
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';

const MiComponente = () => {
  const { t, changeLanguage, currentLanguage } = useSimpleLanguage();

  return (
    <>
      <Text>{t('welcome')}</Text>
      <TouchableOpacity onPress={() => changeLanguage('en')}>
        <Text>{t('language')}</Text>
      </TouchableOpacity>
    </>
  );
};
```

### Ejemplo con Selector
```javascript
import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';
import SimpleLanguageSelector from '../components/SimpleLanguageSelector';

const PantallaConSelector = () => {
  const [showSelector, setShowSelector] = useState(false);
  const { t } = useSimpleLanguage();

  return (
    <>
      <TouchableOpacity onPress={() => setShowSelector(true)}>
        <Text>🌐</Text>
      </TouchableOpacity>
      
      <SimpleLanguageSelector
        visible={showSelector}
        onClose={() => setShowSelector(false)}
      />
    </>
  );
};
```

## 🔄 Flujo de Funcionamiento

1. **Inicialización:** App carga idioma guardado o usa español por defecto
2. **Uso:** Componentes acceden a traducciones via hook `useSimpleLanguage()`
3. **Cambio:** Usuario selecciona idioma desde selector modal
4. **Persistencia:** Nueva preferencia se guarda en AsyncStorage
5. **Actualización:** Toda la app se re-renderiza con nuevo idioma

## 🚀 Instrucciones de Uso

### Para Desarrolladores

1. **Importar el hook:**
```javascript
import { useSimpleLanguage } from '../hooks/useSimpleLanguage';
```

2. **Usar en componente:**
```javascript
const { t } = useSimpleLanguage();
```

3. **Aplicar traducciones:**
```javascript
<Text>{t('clave_de_traduccion')}</Text>
```

### Para Usuarios

1. **Cambiar idioma:** Toca el botón 🌐 en cualquier pantalla principal
2. **Seleccionar idioma:** Elige entre Español o English
3. **Confirmar:** El cambio se aplica inmediatamente
4. **Persistencia:** La preferencia se mantiene entre sesiones

## 🔧 Configuración Técnica

### Dependencias Requeridas
```json
{
  "@react-native-async-storage/async-storage": "^2.1.2"
}
```

### Instalación
```bash
npm install @react-native-async-storage/async-storage
```

## 🎨 Personalización

### Agregar Nuevas Traducciones
1. Editar `src/utils/i18n.js`
2. Agregar nueva clave en ambos idiomas:
```javascript
const translations = {
  es: {
    // ...existentes
    nuevaClave: "Nuevo Texto"
  },
  en: {
    // ...existentes
    nuevaClave: "New Text"
  }
};
```

### Agregar Nuevo Idioma
1. Expandir objeto `translations` en `i18n.js`
2. Actualizar array en `getSupportedLanguages()`
3. Modificar validaciones en `useSimpleLanguage.js`

## 📊 Estado del Proyecto

### ✅ Completado
- [x] Sistema de traducciones centralizado
- [x] Hook de localización funcional
- [x] Selector de idioma modal
- [x] Persistencia con AsyncStorage
- [x] Integración en pantallas principales
- [x] Traducciones español/inglés
- [x] Documentación completa

### 🚀 Listo para Producción
El sistema de localización está completamente implementado y probado, listo para uso en producción.

---

**Desarrollado para PalPase App - Sistema de Pago de Transporte**
*Implementación completada: Enero 2025*
