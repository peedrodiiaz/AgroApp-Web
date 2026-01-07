/**
 * Configuración centralizada de la API
 */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};

/**
 * Clase de utilidad para construir URLs de la API
 */
export class ApiConfig {
  static readonly BASE_URL = environment.apiUrl;
  
  // Endpoints de autenticación
  static readonly AUTH = {
    REGISTER: `${ApiConfig.BASE_URL}/register`,
    LOGIN: `${ApiConfig.BASE_URL}/login`,
    LOGOUT: `${ApiConfig.BASE_URL}/logout`,
    USER: `${ApiConfig.BASE_URL}/user`
  };
  
  // Endpoints de recursos
  static readonly TRABAJADORES = `${ApiConfig.BASE_URL}/trabajadores`;
  static readonly MAQUINAS = `${ApiConfig.BASE_URL}/maquinas`;
  static readonly INCIDENCIAS = `${ApiConfig.BASE_URL}/incidencias`;
  static readonly CRONOGRAMAS = `${ApiConfig.BASE_URL}/cronogramas`;
  static readonly ASIGNACIONES = `${ApiConfig.BASE_URL}/asignaciones`;
}
