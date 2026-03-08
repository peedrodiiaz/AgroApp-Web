import { Maquina } from './maquina.interface';
import { Trabajador } from './trabajador.interface';

export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA';
  estadoIncidencia?: 'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA';
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA';
  fechaApertura: string;
  fechaCierre?: string;
  maquina: Maquina;
  trabajador: Trabajador;
  latitud?: number;
  longitud?: number;
}

export interface CreateIncidenciaRequest {
  titulo: string;
  descripcion: string;
  estadoIncidencia?: 'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA';
  maquinaId: number;
  trabajadorId: number;
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA';
  latitud?: number;
  longitud?: number;
}

export interface UpdateIncidenciaRequest {
  titulo?: string;
  descripcion?: string;
  estadoIncidencia?: 'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA';
  prioridad?: 'BAJA' | 'MEDIA' | 'ALTA';
}

export type IncidenciasResponse = Incidencia[];
