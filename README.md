# PalPaseApp

**PalPaseApp** es una aplicación móvil desarrollada con **React Native** y **Expo** para facilitar el pago de entradas (tickets). La aplicación cuenta con navegación, integración con API mediante Axios, y feedback visual para los usuarios mediante notificaciones tipo *toast*.

## 📱 Tecnologías principales

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)
- [React Native Toast Message](https://github.com/calintamas/react-native-toast-message)

## 🚀 Instalación y configuración

### Requisitos previos

- Node.js (recomendado: 18.x o superior)
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Emulador Android configurado o Expo Go en un dispositivo físico

### Pasos para ejecutar la app

1. Clona el repositorio:

   ```bash
   git clone https://github.com/utn-integrador-III/ticket-payment-frontend.git
   cd ticket-payment-frontend-dev/PalPaseApp
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm start
   # o
   expo start
   ```

4. Ejecuta la app en tu dispositivo:

   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## 🧪 Scripts disponibles

- `start`: Inicia el servidor de desarrollo con Expo
- `android`: Ejecuta la app en un emulador o dispositivo Android
- `ios`: Ejecuta la app en un emulador iOS (solo macOS)
- `web`: Ejecuta la app en navegador
