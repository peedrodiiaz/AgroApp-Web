export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};

export class ApiConfig {
  static readonly BASE_URL = environment.apiUrl;
  
  static readonly AUTH = {
    LOGIN: `${ApiConfig.BASE_URL}/auth/login`,
    LOGOUT: `${ApiConfig.BASE_URL}/auth/logout`
  };
  
  static readonly TRABAJADORES = `${ApiConfig.BASE_URL}/trabajadores`;
  static readonly MAQUINAS = `${ApiConfig.BASE_URL}/maquinas`;
  static readonly INCIDENCIAS = `${ApiConfig.BASE_URL}/incidencias`;
  static readonly ASIGNACIONES = `${ApiConfig.BASE_URL}/asignaciones`;
}
