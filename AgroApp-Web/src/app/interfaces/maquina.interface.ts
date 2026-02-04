export interface Maquina {
  id: number;
  nombre: string;
  modelo: string;
  numSerie: string;
  fechaCompra: string;
  estado: 'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA';
}

export interface CreateMaquinaRequest {
  nombre: string;
  modelo: string;
  numeroSerie: string;
  fechaCompra: string;
}

export interface UpdateMaquinaDto {
  nombre?: string;
  modelo?: string;
  numeroSerie?: string;
  fechaCompra?: string;
}

export interface CambiarEstadoMaquinaDto {
  estado: 'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA';
}

export interface MaquinaStatsDto {
  totalMaquinas: number;
  activas: number;
  enMantenimiento: number;
  inactivas: number;
}

export type MaquinasResponse = Maquina[];
