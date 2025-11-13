import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class IncidenciasComponent {
  nuevoReporteForm = new FormGroup({
    trabajador: new FormControl('', [Validators.required]),
    maquina: new FormControl('', [Validators.required]),
    estado: new FormControl('Abierta', [Validators.required]),
    fechaPublicacion: new FormControl('', [Validators.required]),
    fechaCierre: new FormControl(''),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(300)])
  });
  constructor(private router: Router) {}

  incidencias = [
    { id: 1, codigo: 'INC-001', trabajador: 'María López', maquina: 'Tractor JD-320', estado: 'Abierta', fechaPublicacion: '28 nov 2024', fechaCierre: '', descripcion: '' },
    { id: 2, codigo: 'INC-002', trabajador: 'John Wick', maquina: 'Cosechadora MX-200', estado: 'En progreso', fechaPublicacion: '22 nov 2024', fechaCierre: '', descripcion: '' },
    { id: 3, codigo: 'INC-003', trabajador: 'Carlos Ortega', maquina: 'Sistema de riego PR-45', estado: 'Resuelta', fechaPublicacion: '05 nov 2024', fechaCierre: '12 nov 2024', descripcion: '' },
  ];

  get abiertas() {
    return this.incidencias.filter(i => i.estado === 'Abierta').length;
  }

  verIncidencia(incidencia: any) {
  this.router.navigate(['/incidencias', incidencia.id]);
}

  get enProgreso() {
    return this.incidencias.filter(i => i.estado === 'En progreso').length;
  }

  get resueltas() {
    return this.incidencias.filter(i => i.estado === 'Resuelta').length;
  }

  get total() {
    return this.incidencias.length;
  }

  get f() {
    return this.nuevoReporteForm.controls;
  }

  registrarIncidencia() {
    if (this.nuevoReporteForm.invalid) {
      this.nuevoReporteForm.markAllAsTouched();
      return;
    }
    alert('Incidencia registrada (lógica real más adelante)');
    this.nuevoReporteForm.reset({ estado: 'Abierta' });
  }
}
