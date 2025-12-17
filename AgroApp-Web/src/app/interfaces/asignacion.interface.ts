export interface Asignacion {
  id: number;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  tipoAsignacion: 'temporal' | 'permanente';
  trabajador_id: number;
  maquina_id: number;
  trabajador?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  maquina?: {
    id: number;
    nombre: string;
    modelo: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface AsignacionCrear {
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  tipoAsignacion: 'temporal' | 'permanente';
  trabajador_id: number;
  maquina_id: number;
}
