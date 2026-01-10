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
}

export interface IncidenciasApiResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Incidencia[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export type IncidenciasResponse = Incidencia[];
