export interface Usuario {
  id: number;
  name: string;
  usuario?: string;
  email: string;
  role?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token: string;
  user: Usuario;
}

export interface RegistroResponse {
  message: string;
  token: string;
  user: Usuario;
}
