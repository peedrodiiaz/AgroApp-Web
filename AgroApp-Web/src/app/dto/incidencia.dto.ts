export class Incidencia {
    id: number;
    titulo: string;
    descripcion: string;
    estado: string;
    prioridad: string;
    fechaApertura: string;
    fechaCierre?: string;
    trabajador_id: number;
    maquina_id: number;

    constructor(
        id: number,
        titulo: string,
        descripcion: string,
        estado: string,
        prioridad: string,
        fechaApertura: string,
        trabajador_id: number,
        maquina_id: number,
        fechaCierre?: string
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.prioridad = prioridad;
        this.fechaApertura = fechaApertura;
        this.trabajador_id = trabajador_id;
        this.maquina_id = maquina_id;
        this.fechaCierre = fechaCierre;
    }
}
