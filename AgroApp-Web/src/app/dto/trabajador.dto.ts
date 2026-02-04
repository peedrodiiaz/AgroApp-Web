export class Trabajador {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    rol: 'ADMIN' | 'TRABAJADOR';
    fechaAlta: string;
    enabled?: boolean;

    constructor(
        id: number,
        nombre: string,
        apellido: string,
        dni: string,
        email: string,
        telefono: string,
        rol: 'ADMIN' | 'TRABAJADOR',
        fechaAlta: string,
        enabled?: boolean
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.telefono = telefono;
        this.rol = rol;
        this.fechaAlta = fechaAlta;
        this.enabled = enabled;
    }
}
