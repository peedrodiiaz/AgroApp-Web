// Interfaz genérica para respuestas paginadas de Laravel
export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Interfaz para respuestas de estadísticas
export interface StatsResponse {
  [key: string]: number | string | object;
}

// Interfaz para respuestas simples de éxito
export interface SuccessResponse {
  message: string;
  data?: any;
}
