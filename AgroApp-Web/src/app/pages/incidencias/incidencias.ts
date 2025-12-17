import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Incidencia } from '../../interfaces/incidencia.interface';

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

  incidencias: Incidencia[] = [
    { 
      id: 1, 
      titulo: 'Fallo en motor',
      descripcion: 'El tractor presenta humo negro al arrancar', 
      estado: 'abierta', 
      prioridad: 'alta',
      fechaApertura: '2024-11-28T10:00:00', 
      maquina_id: 1,
      trabajador_id: 1,
      maquina: { id: 1, nombre: 'Tractor JD-320', modelo: 'JD-320' },
      trabajador: { id: 1, nombre: 'María', apellido: 'López' }
    },
    { 
      id: 2, 
      titulo: 'Avería en cosechadora',
      descripcion: 'La cosechadora no arranca correctamente', 
      estado: 'en_progreso', 
      prioridad: 'media',
      fechaApertura: '2024-11-22T08:30:00', 
      maquina_id: 2,
      trabajador_id: 2,
      maquina: { id: 2, nombre: 'Cosechadora MX-200', modelo: 'MX-200' },
      trabajador: { id: 2, nombre: 'John', apellido: 'Wick' }
    },
    { 
      id: 3, 
      titulo: 'Sistema de riego',
      descripcion: 'Fuga detectada en tubería principal', 
      estado: 'resuelta', 
      prioridad: 'baja',
      fechaApertura: '2024-11-05T14:00:00',
      fechaCierre: '2024-11-12T16:00:00', 
      maquina_id: 3,
      trabajador_id: 3,
      maquina: { id: 3, nombre: 'Sistema de riego PR-45', modelo: 'PR-45' },
      trabajador: { id: 3, nombre: 'Carlos', apellido: 'Ortega' }
    },
  ];

  get abiertas() {
    return this.incidencias.filter(i => i.estado === 'abierta').length;
  }

  verIncidencia(incidencia: Incidencia) {
    this.router.navigate(['/incidencias', incidencia.id]);
  }

  get enProgreso() {
    return this.incidencias.filter(i => i.estado === 'en_progreso').length;
  }

  get resueltas() {
    return this.incidencias.filter(i => i.estado === 'resuelta').length;
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
