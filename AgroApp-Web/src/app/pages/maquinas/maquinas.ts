import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Maquina } from '../../interfaces/maquina.interface';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './maquinas.html',
  styleUrl: './maquinas.css',
})
export class MaquinasComponent {
  constructor(private router: Router) {}

  tabActivo: 'activas' | 'inactivas' = 'activas';
  menuAbierto: number | null = null;
  modalAbierto: boolean = false;

  nuevaMaquinaForm = new FormGroup({
    nombre: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      nonNullable: true
    }),
    matricula: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[A-Z0-9]{6,10}$/i)],
      nonNullable: true
    }),
    modelo: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      nonNullable: true
    }),
    fechaCompra: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    localizacion: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      nonNullable: true
    }),
    trabajador: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(50)],
      nonNullable: true
    }),
  });

  get f() { return this.nuevaMaquinaForm.controls; }

  maquinasActivas: Maquina[] = [
    { 
      id: 1, 
      nombre: 'Cosechadora Case IH', 
      numSerie: 'CASE-2025-001', 
      modelo: 'Axial-Flow 250', 
      tipo: 'Cosechadora',
      fechaCompra: '2024-06-15', 
      estado: 'activa', 
      ubicacion: 'Finca 1',
      tipoCultivo: 'Trigo, Cebada',
      anchoCorte: '7.6m',
      capacidadTolva: 10500
    },
    { 
      id: 2, 
      nombre: 'Empacadora New Holland', 
      numSerie: 'NH-2025-002', 
      modelo: 'BR6090', 
      tipo: 'Empacadora',
      fechaCompra: '2024-08-20', 
      estado: 'activa', 
      ubicacion: 'Finca 3',
      tipoBala: 'Redonda',
      capacidadEmpaque: 80
    },
    { 
      id: 3, 
      nombre: 'Tractor John Deere', 
      numSerie: 'JD5090E-2025-001', 
      modelo: '5090E', 
      tipo: 'Tractor',
      fechaCompra: '2025-01-10', 
      estado: 'activa', 
      ubicacion: 'Finca 2',
      potenciaCv: 90,
      tipoCombustible: 'Diésel',
      capacidadRemolque: 3500
    },
    { 
      id: 4, 
      nombre: 'Tractor Massey Ferguson', 
      numSerie: 'MF-2024-003', 
      modelo: 'MF 5700', 
      tipo: 'Tractor',
      fechaCompra: '2024-05-15', 
      estado: 'activa', 
      ubicacion: 'Finca 3',
      potenciaCv: 120,
      tipoCombustible: 'Diésel',
      capacidadRemolque: 4000
    },
  ];

  maquinasInactivas: Maquina[] = [
    { 
      id: 5, 
      nombre: 'Cosechadora Antigua', 
      numSerie: 'OLD-CASE-001', 
      modelo: 'Legacy 100', 
      tipo: 'Cosechadora',
      fechaCompra: '2015-03-10', 
      estado: 'inactiva', 
      ubicacion: 'Almacén',
      descripcion: 'Fuera de servicio por antigüedad'
    },
    { 
      id: 6, 
      nombre: 'Empacadora Vieja', 
      numSerie: 'OLD-NH-002', 
      modelo: 'BR4000', 
      tipo: 'Empacadora',
      fechaCompra: '2016-07-20', 
      estado: 'inactiva', 
      ubicacion: 'Almacén',
      descripcion: 'Reemplazada por modelo nuevo'
    },
    { 
      id: 7, 
      nombre: 'Tractor en Reparación', 
      numSerie: 'REP-JD-003', 
      modelo: 'JD 4000', 
      tipo: 'Tractor',
      fechaCompra: '2018-01-15', 
      estado: 'mantenimiento', 
      ubicacion: 'Taller',
      descripcion: 'En mantenimiento mayor'
    },
  ];

  get maquinasMostradas() {
    return this.tabActivo === 'activas' ? this.maquinasActivas : this.maquinasInactivas;
  }

  cambiarTab(tab: 'activas' | 'inactivas') {
    this.tabActivo = tab;
    this.menuAbierto = null;
  }

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(maquina: Maquina) {
    this.router.navigate(['/maquinas', maquina.id]);
    this.menuAbierto = null;
  }

  cancelar(maquina: Maquina) {
    console.log('Cancelar:', maquina);
    this.menuAbierto = null;
  }

  abrirModal() {
    this.modalAbierto = true;
    this.nuevaMaquinaForm.reset();
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.nuevaMaquinaForm.reset();
  }

  guardarMaquina() {
    if (this.nuevaMaquinaForm.invalid) {
      this.nuevaMaquinaForm.markAllAsTouched();
      return;
    }
    this.cerrarModal();
  }
}
