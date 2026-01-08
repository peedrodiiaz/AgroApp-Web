export interface Trabajador {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  rol: string;
  fechaAlta: string;
}

export interface TrabajadoresApiResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Trabajador[];
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

export type TrabajadoresResponse = Trabajador[];
