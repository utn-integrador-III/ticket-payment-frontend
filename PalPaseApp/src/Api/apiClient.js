import axios from "axios";
import AuthService from "../Services/AuthService";

// Configuración de la URL base de la API (usando IP directa de la red Docker)
const API_BASE_URL = "http://192.168.100.13:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Tiempo máximo de espera en milisegundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir automáticamente el Bearer token (solo para rutas protegidas)
apiClient.interceptors.request.use(
  async (config) => {
    console.log('Interceptor - URL solicitada:', config.url);
    console.log('Interceptor - URL completa:', `${config.baseURL}${config.url}`);
    
    // No agregar token para endpoints de login
    if (!config.url.includes('/login')) {
      const token = await AuthService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Token agregado a la petición:', token.substring(0, 20) + '...');
      } else {
        console.log('No hay token disponible');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas de error (ej: token expirado)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401 && !error.config.url.includes('/login')) {
      // Token expirado o inválido - cerrar sesión (solo si no es login)
      await AuthService.logout();
      console.log('Token expirado, usuario deslogueado');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
