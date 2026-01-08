export interface Maquina {
  id: number;
  nombre: string;
  imagen?: string;
  numSerie: string;
  modelo: string;
  tipo: string;
  fechaCompra: string;
  estado: string;
  ubicacion: string;
  descripcion?: string;
  potenciaCv?: number;
  tipoCombustible?: string;
  capacidadRemolque?: number;
  tipoCultivo?: string;
  anchoCorte?: string;
  capacidadTolva?: number;
  tipoBala?: string;
  capacidadEmpaque?: number;
}

export interface MaquinasApiResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Maquina[];
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

export type MaquinasResponse = Maquina[];
