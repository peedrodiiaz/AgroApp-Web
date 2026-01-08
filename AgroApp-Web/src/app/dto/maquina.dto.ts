export class Maquina {
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

    constructor(
        id: number,
        nombre: string,
        numSerie: string,
        modelo: string,
        tipo: string,
        fechaCompra: string,
        estado: string,
        ubicacion: string,
        imagen?: string,
        descripcion?: string,
        potenciaCv?: number,
        tipoCombustible?: string,
        capacidadRemolque?: number,
        tipoCultivo?: string,
        anchoCorte?: string,
        capacidadTolva?: number,
        tipoBala?: string,
        capacidadEmpaque?: number
    ) {
        this.id = id;
        this.nombre = nombre;
        this.numSerie = numSerie;
        this.modelo = modelo;
        this.tipo = tipo;
        this.fechaCompra = fechaCompra;
        this.estado = estado;
        this.ubicacion = ubicacion;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.potenciaCv = potenciaCv;
        this.tipoCombustible = tipoCombustible;
        this.capacidadRemolque = capacidadRemolque;
        this.tipoCultivo = tipoCultivo;
        this.anchoCorte = anchoCorte;
        this.capacidadTolva = capacidadTolva;
        this.tipoBala = tipoBala;
        this.capacidadEmpaque = capacidadEmpaque;
    }
}
