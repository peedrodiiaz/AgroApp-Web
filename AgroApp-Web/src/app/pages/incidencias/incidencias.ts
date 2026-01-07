import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidenciaService } from '../../services/incidencia';
import { TrabajadorService } from '../../services/trabajador';
import { MaquinaService } from '../../services/maquina';

@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.css',
})
export class IncidenciasComponent implements OnInit {
  private router = inject(Router);
  private incidenciaService = inject(IncidenciaService);
  private trabajadorService = inject(TrabajadorService);
  private maquinaService = inject(MaquinaService);

  incidencias: any[] = [];
  incidenciasFiltradas: any[] = [];
  trabajadores: any[] = [];
  maquinas: any[] = [];
  searchTerm = '';
  isLoading = false;
  estadoActivo = 'todas';

  nuevoReporteForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    estado: new FormControl('Abierta', [Validators.required]),
    prioridad: new FormControl('Media', [Validators.required]),
    fechaApertura: new FormControl('', [Validators.required]),
    fechaCierre: new FormControl(''),
    trabajador_id: new FormControl('', [Validators.required]),
    maquina_id: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.cargarIncidencias();
    this.cargarTrabajadores();
    this.cargarMaquinas();
  }

  cargarIncidencias() {
    this.isLoading = true;
    this.incidenciaService.getAll().subscribe({
      next: (data) => {
        this.incidencias = data;
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar incidencias:', error);
        this.isLoading = false;
        alert('Error al cargar las incidencias');
      }
    });
  }

  cargarTrabajadores() {
    this.trabajadorService.getAll().subscribe({
      next: (data) => {
        this.trabajadores = data;
      },
      error: (error) => {
        console.error('Error al cargar trabajadores:', error);
      }
    });
  }

  cargarMaquinas() {
    this.maquinaService.getAll().subscribe({
      next: (data) => {
        this.maquinas = data;
      },
      error: (error) => {
        console.error('Error al cargar máquinas:', error);
      }
    });
  }

  aplicarFiltros() {
    let resultado = [...this.incidencias];

    // Filtrar por estado
    if (this.estadoActivo !== 'todas') {
      resultado = resultado.filter(i => i.estado.toLowerCase() === this.estadoActivo);
    }

    // Filtrar por búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      resultado = resultado.filter(i =>
        i.titulo?.toLowerCase().includes(term) ||
        i.descripcion?.toLowerCase().includes(term) ||
        i.maquina?.nombre?.toLowerCase().includes(term) ||
        i.trabajador?.nombre?.toLowerCase().includes(term)
      );
    }

    this.incidenciasFiltradas = resultado;
  }

  cambiarEstado(estado: string) {
    this.estadoActivo = estado;
    this.aplicarFiltros();
  }

  get abiertas() {
    return this.incidencias.filter(i => i.estado === 'Abierta').length;
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

  verIncidencia(incidencia: any) {
    this.router.navigate(['/incidencias', incidencia.id]);
  }

  eliminarIncidencia(id: number, event: Event) {
    event.stopPropagation();
    if (!confirm('¿Estás seguro de eliminar esta incidencia?')) {
      return;
    }

    this.incidenciaService.delete(id).subscribe({
      next: () => {
        alert('Incidencia eliminada exitosamente');
        this.cargarIncidencias();
      },
      error: (error) => {
        console.error('Error al eliminar incidencia:', error);
        alert('Error al eliminar la incidencia');
      }
    });
  }

  get f() {
    return this.nuevoReporteForm.controls;
  }

  registrarIncidencia() {
    if (this.nuevoReporteForm.invalid) {
      this.nuevoReporteForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const incidenciaData = this.nuevoReporteForm.value;

    this.incidenciaService.create(incidenciaData).subscribe({
      next: (incidencia) => {
        this.isLoading = false;
        alert('Incidencia registrada exitosamente');
        this.nuevoReporteForm.reset({ estado: 'Abierta', prioridad: 'Media' });
        this.cargarIncidencias();
        // Cerrar modal si existe
        const modal = document.getElementById('modalNuevoReporte');
        if (modal) {
          const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
          if (bsModal) bsModal.hide();
        }
      },
      error: (error) => {
        console.error('Error al registrar incidencia:', error);
        this.isLoading = false;
        if (error.error?.errors) {
          const errors = Object.values(error.error.errors).flat();
          alert('Errores de validación:\n' + errors.join('\n'));
        } else {
          alert('Error al registrar la incidencia');
        }
      }
    });
  }
}
