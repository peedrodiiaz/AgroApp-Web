import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  maquinasActivas = [
    { id: 1, nombre: 'Cosechadora', matricula: 'ER342BK', fechaLiberacion: '20/05/2025', localizacion: 'Finca 1', trabajadores: 5 },
    { id: 2, nombre: 'Empacadora', matricula: 'B3223CV', fechaLiberacion: '13/09/2025', localizacion: 'Finca 3', trabajadores: 3 },
    { id: 3, nombre: 'Tractor', matricula: 'C6434NM', fechaLiberacion: '14/01/2026', localizacion: 'Finca 2', trabajadores: 1 },
    { id: 4, nombre: 'Fumigadora', matricula: 'L3465LK', fechaLiberacion: '25/08/2025', localizacion: 'Finca 3', trabajadores: 2 },
  ];

  maquinasInactivas = [
    { id: 5, nombre: 'Cosechadora', matricula: 'ER342BK', fechaLiberacion: '-', localizacion: 'Finca 1', trabajadores: '-' },
    { id: 6, nombre: 'Empacadora', matricula: 'B3223CV', fechaLiberacion: '-', localizacion: 'Finca 3', trabajadores: '-' },
    { id: 7, nombre: 'Tractor', matricula: 'C6434NM', fechaLiberacion: '-', localizacion: 'Finca 2', trabajadores: '-' },
    { id: 8, nombre: 'Fumigadora', matricula: 'L3465LK', fechaLiberacion: '-', localizacion: 'Finca 3', trabajadores: '-' },
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

  verInfo(maquina: any) {
    this.router.navigate(['/maquinas', maquina.id]);
    this.menuAbierto = null;
  }

  cancelar(maquina: any) {
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
