export interface Trabajador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  rol: string;
  fechaAlta: string;
  enabled?: boolean;
}

export interface CreateTrabajadorRequest {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  password: string;
  rol: 'ADMIN' | 'TRABAJADOR';
}

export interface UpdateTrabajadorRequest {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  email?: string;
}

export type TrabajadoresResponse = Trabajador[];
