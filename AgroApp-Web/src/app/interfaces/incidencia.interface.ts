export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'abierta' | 'en_progreso' | 'resuelta';
  prioridad: 'baja' | 'media' | 'alta';
  fechaApertura: string;
  fechaCierre?: string;
  maquina_id: number;
  trabajador_id: number;
  // Relaciones opcionales
  maquina?: {
    id: number;
    nombre: string;
    modelo: string;
  };
  trabajador?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface IncidenciaCrear {
  titulo: string;
  descripcion: string;
  estado: 'abierta' | 'en_progreso' | 'resuelta';
  prioridad: 'baja' | 'media' | 'alta';
  fechaApertura: string;
  fechaCierre?: string;
  maquina_id: number;
  trabajador_id: number;
}
