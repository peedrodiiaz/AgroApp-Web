export interface Asignacion {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  maquina: {
    id: number;
    nombre: string;
    modelo: string;
    estado: string;
  };
  trabajador: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
}

export interface CreateAsignacionRequest {
  fechaInicio: string;
  fechaFin: string;
  descripcion: string;
  maquinaId: number;
  trabajadorId?: number;  
}
