export interface Cronograma {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  color: string;
  descripcion: string;
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
  color: string;
  descripcion: string;
  trabajador_id: number;
  maquina_id: number;
}
