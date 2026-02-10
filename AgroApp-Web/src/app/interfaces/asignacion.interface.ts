import { Maquina } from './maquina.interface';
import { Trabajador } from './trabajador.interface';

export interface Asignacion {
  id: number;
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  trabajador: Trabajador;
  maquina: Maquina;
}

export interface AsignacionCrear {
  fechaInicio: string;
  fechaFin?: string;
  descripcion: string;
  trabajadorId: number;
  maquinaId: number;
}
