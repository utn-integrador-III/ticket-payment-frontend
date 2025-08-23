// Versión simplificada del AuthService para debugging
class AuthService {
  constructor() {
    this.token = null;
    this.userId = null;
    this.userType = null; // "user" o "driver"
  }

  // Almacenar token, userId y tipo de usuario
  async setAuthData(token, userId, userType = "user") {
    try {
      this.token = token;
      this.userId = userId;
      this.userType = userType;
      console.log('Token almacenado:', token ? 'Sí' : 'No');
      console.log('UserId almacenado:', userId);
      console.log('Tipo de usuario:', userType);
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  }

  // Obtener token almacenado
  async getToken() {
    return this.token;
  }

  // Obtener userId almacenado
  async getUserId() {
    return this.userId;
  }

  // Obtener tipo de usuario
  async getUserType() {
    return this.userType;
  }

  // Verificar si es chofer
  async isDriver() {
    return this.userType === "driver";
  }

  // Verificar si es usuario normal
  async isUser() {
    return this.userType === "user";
  }

  // Verificar si el usuario está autenticado
  async isAuthenticated() {
    return !!this.token;
  }

  // Cerrar sesión
  async logout() {
    try {
      this.token = null;
      this.userId = null;
      this.userType = null;
      console.log('Sesión cerrada');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  // Obtener headers de autorización
  async getAuthHeaders() {
    if (this.token) {
      return {
        'Authorization': `Bearer ${this.token}`,
      };
    }
    return {};
  }
}

// Exportar una instancia singleton
export default new AuthService();
