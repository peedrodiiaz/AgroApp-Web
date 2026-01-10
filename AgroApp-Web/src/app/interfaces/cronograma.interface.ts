export interface Cronograma {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  horaInicio?: string;
  horaFin?: string;
  color: string;
  descripcion: string;
  estado: 'pendiente' | 'confirmada' | 'en_uso' | 'completada' | 'cancelada';
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

export interface CronogramaCrear {
  fechaInicio: string;
  fechaFin: string;
  horaInicio?: string;
  horaFin?: string;
  color: string;
  descripcion: string;
  estado?: string;
  trabajador_id: number;
  maquina_id: number;
}

export interface DisponibilidadRequest {
  fechaInicio: string;
  fechaFin: string;
  maquina_id?: number;
}
