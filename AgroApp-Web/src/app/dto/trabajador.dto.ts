export class Trabajador {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    rol: string;
    fechaAlta: string;

    constructor(
        id: number,
        nombre: string,
        apellido: string,
        dni: string,
        email: string,
        telefono: string,
        rol: string,
        fechaAlta: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.telefono = telefono;
        this.rol = rol;
        this.fechaAlta = fechaAlta;
    }
}
