export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
  fechaAlta: string;
  rol: string;
}

export interface LoginResponse {
  token: string;
  user: Usuario;
}

export interface RegistroResponse {
  message: string;
  token: string;
  user: Usuario;
}
