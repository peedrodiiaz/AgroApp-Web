import { Maquina } from '../interfaces/maquina.interface';
import { Trabajador } from '../interfaces/trabajador.interface';

export class Incidencia {
    id: number;
    titulo: string;
    descripcion: string;
    estado: 'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA';
    prioridad: 'BAJA' | 'MEDIA' | 'ALTA';
    fechaApertura: string;
    fechaCierre?: string;
    maquina: Maquina;
    trabajador: Trabajador;

    constructor(
        id: number,
        titulo: string,
        descripcion: string,
        estado: 'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA',
        prioridad: 'BAJA' | 'MEDIA' | 'ALTA',
        fechaApertura: string,
        maquina: Maquina,
        trabajador: Trabajador,
        fechaCierre?: string
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.prioridad = prioridad;
        this.fechaApertura = fechaApertura;
        this.maquina = maquina;
        this.trabajador = trabajador;
        this.fechaCierre = fechaCierre;
    }
}
