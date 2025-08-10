// Versión simplificada del AuthService para debugging
class AuthService {
  constructor() {
    this.token = null;
    this.userId = null;
  }

  // Almacenar token y userId (solo en memoria por ahora)
  async setAuthData(token, userId) {
    try {
      this.token = token;
      this.userId = userId;
      console.log('Token almacenado:', token ? 'Sí' : 'No');
      console.log('UserId almacenado:', userId);
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

  // Verificar si el usuario está autenticado
  async isAuthenticated() {
    return !!this.token;
  }

  // Cerrar sesión
  async logout() {
    try {
      this.token = null;
      this.userId = null;
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
