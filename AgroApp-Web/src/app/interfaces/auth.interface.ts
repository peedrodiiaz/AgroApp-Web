// Interfaz de usuario autenticado
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

// Respuesta de login y register
export interface AuthResponse {
  token: string;
  user: User;
}

// Payload para login
export interface LoginRequest {
  email: string;
  password: string;
}

// Payload para registro
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
