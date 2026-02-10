export class Maquina {
    id: number;
    nombre: string;
    modelo: string;
    numSerie: string;
    fechaCompra: string;
    estado: 'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA';

    constructor(
        id: number,
        nombre: string,
        modelo: string,
        numSerie: string,
        fechaCompra: string,
        estado: 'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA'
    ) {
        this.id = id;
        this.nombre = nombre;
        this.modelo = modelo;
        this.numSerie = numSerie;
        this.fechaCompra = fechaCompra;
        this.estado = estado;
    }
}
