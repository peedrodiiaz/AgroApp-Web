import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidenciaService } from '../../services/incidencia.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { MaquinaService } from '../../services/maquina.service';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class IncidenciasComponent implements OnInit {
  router = inject(Router);
  incidenciaService = inject(IncidenciaService);
  trabajadorService = inject(TrabajadorService);
  maquinaService = inject(MaquinaService);

  incidencias: any[] = [];
  trabajadores: any[] = [];
  maquinas: any[] = [];
  searchTerm = '';
  isLoading = false;
  estadoActivo = 'todas';
  modalAbierto = false;

  nuevoReporteForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    estadoIncidencia: new FormControl<'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA'>('ABIERTA', [Validators.required]),
    prioridad: new FormControl<'BAJA' | 'MEDIA' | 'ALTA'>('MEDIA', [Validators.required]),
    trabajadorId: new FormControl<number | null>(null, [Validators.required]),
    maquinaId: new FormControl<number | null>(null, [Validators.required]),
    fechaApertura: new FormControl('', [Validators.required])
  });

  form = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    estadoIncidencia: new FormControl<'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA'>('ABIERTA', [Validators.required]),
    prioridad: new FormControl<'BAJA' | 'MEDIA' | 'ALTA'>('MEDIA', [Validators.required]),
    trabajadorId: new FormControl<number | null>(null, [Validators.required]),
    maquinaId: new FormControl<number | null>(null, [Validators.required])
  });

  get f() {
    return this.nuevoReporteForm.controls;
  }

  get abiertas() {
    return this.incidencias.filter((i: any) => i.estadoIncidencia === 'ABIERTA').length;
  }

  get enProgreso() {
    return this.incidencias.filter((i: any) => i.estadoIncidencia === 'EN_PROGRESO').length;
  }

  get resueltas() {
    return this.incidencias.filter((i: any) => i.estadoIncidencia === 'RESUELTA').length;
  }

  get total() {
    return this.incidencias.length;
  }

  ngOnInit() {
    this.cargarIncidencias();
    this.cargarTrabajadores();
    this.cargarMaquinas();
  }

  cargarIncidencias() {
    this.isLoading = true;
    this.incidenciaService.getAll(0, 100).subscribe({
      next: (response) => {
        this.incidencias = response.content || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar incidencias:', error);
        this.incidencias = [];
        this.isLoading = false;
      }
    });
  }

  cargarTrabajadores() {
    this.trabajadorService.getAll(0, 100).subscribe({
      next: (response) => {
        this.trabajadores = response.content || [];
      },
      error: (error) => {
        console.error('Error al cargar trabajadores:', error);
        this.trabajadores = [];
      }
    });
  }

  cargarMaquinas() {
    this.maquinaService.getAll(0, 100).subscribe({
      next: (response) => {
        this.maquinas = response.content || [];
      },
      error: (error) => {
        console.error('Error al cargar máquinas:', error);
        this.maquinas = [];
      }
    });
  }

  get incidenciasFiltradas() {
    const term = this.searchTerm.toLowerCase();
    return this.incidencias.filter((i: any) =>
      (this.estadoActivo === 'todas' || i.estadoIncidencia === this.estadoActivo.toUpperCase()) &&
      (!this.searchTerm || i.titulo?.toLowerCase().includes(term) || i.descripcion?.toLowerCase().includes(term))
    );
  }

  cambiarEstado(estado: string) {
    this.estadoActivo = estado;
  }

  verIncidencia(id: number) {
    this.router.navigate(['/incidencias', id]);
  }

  eliminarIncidencia(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('¿Cerrar incidencia?')) {
      this.incidenciaService.cerrar(id).subscribe({
        next: () => this.cargarIncidencias(),
        error: () => alert('Error al cerrar incidencia')
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Cerrar incidencia?')) {
      this.incidenciaService.cerrar(id).subscribe({
        next: () => this.cargarIncidencias(),
        error: () => alert('Error al cerrar incidencia')
      });
    }
  }

  abrirModal() {
    this.modalAbierto = true;
    this.nuevoReporteForm.reset({
      estadoIncidencia: 'ABIERTA',
      prioridad: 'MEDIA',
      fechaApertura: new Date().toISOString().split('T')[0]
    });
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  registrarIncidencia() {
    if (this.nuevoReporteForm.invalid) return;
    
    const formValue = this.nuevoReporteForm.value;
    const incidenciaData = {
      titulo: formValue.titulo || '',
      descripcion: formValue.descripcion || '',
      estadoIncidencia: formValue.estadoIncidencia || 'ABIERTA',
      prioridad: formValue.prioridad || 'MEDIA',
      trabajadorId: formValue.trabajadorId || 0,
      maquinaId: formValue.maquinaId || 0
    };
    
    this.incidenciaService.create(incidenciaData).subscribe({
      next: () => {
        this.cargarIncidencias();
        this.cerrarModal();
        alert('Incidencia registrada exitosamente');
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar incidencia');
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;
    
    const formValue = this.form.value;
    const incidenciaData = {
      titulo: formValue.titulo || '',
      descripcion: formValue.descripcion || '',
      estadoIncidencia: formValue.estadoIncidencia || 'ABIERTA',
      prioridad: formValue.prioridad || 'MEDIA',
      trabajadorId: formValue.trabajadorId || 0,
      maquinaId: formValue.maquinaId || 0
    };
    
    this.incidenciaService.create(incidenciaData).subscribe({
      next: () => {
        this.cargarIncidencias();
        this.cerrarModal();
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar incidencia');
      }
    });
  }
}
