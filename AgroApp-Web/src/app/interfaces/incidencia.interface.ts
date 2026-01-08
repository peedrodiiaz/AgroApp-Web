export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fechaApertura: string;
  fechaCierre?: string;
  maquina_id: number;
  trabajador_id: number;
}

export type IncidenciasResponse = Incidencia[];
