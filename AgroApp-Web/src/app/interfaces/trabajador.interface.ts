export interface Trabajador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  rol: 'trabajador' | 'supervisor' | 'administrador';
  fechaAlta: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  // Relaciones opcionales
  cronogramas?: any[];
  incidencias?: any[];
}

export interface TrabajadorCrear {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  rol: 'trabajador' | 'supervisor' | 'administrador';
  fechaAlta: string;
}

export interface TrabajadorSalario {
  base: number;
  pluses: number;
  ultimoCobro: string;
}

export interface TrabajadorHistorial {
  id: number;
  tipo: 'incidencia' | 'salario' | 'ausencia';
  fecha: string;
  desc: string;
}
