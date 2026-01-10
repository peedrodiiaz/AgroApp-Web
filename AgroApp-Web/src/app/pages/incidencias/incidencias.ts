import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidenciaService } from '../../services/incidencia.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { MaquinaService } from '../../services/maquina.service';
import { Incidencia } from '../../interfaces/incidencia.interface';

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

  incidencias: Incidencia[] = [];
  trabajadores: any[] = [];
  maquinas: any[] = [];
  searchTerm = '';
  isLoading = false;
  estadoActivo = 'todas';

  nuevoReporteForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    estado: new FormControl('abierta', [Validators.required]),
    prioridad: new FormControl('media', [Validators.required]),
    fechaApertura: new FormControl('', [Validators.required]),
    fechaCierre: new FormControl(''),
    trabajador_id: new FormControl<number | null>(null, [Validators.required]),
    maquina_id: new FormControl<number | null>(null, [Validators.required])
  });

  ngOnInit() {
    this.cargarIncidencias();
    this.cargarTrabajadores();
    this.cargarMaquinas();
  }

  aplicarFiltros() {
    // Los filtros se aplican automáticamente a través del getter incidenciasFiltradas
  }

  cargarIncidencias() {
    this.isLoading = true;
    this.incidenciaService.getAll().subscribe({
      next: (response: any) => {
        this.incidencias = response || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar incidencias:', error);
        this.isLoading = false;
        alert('Error al cargar las incidencias');
      }
    });
  }

  cargarTrabajadores() {
    this.trabajadorService.getAll().subscribe({
      next: (response: any) => {
        this.trabajadores = response || [];
      },
      error: (error: any) => {
        console.error('Error al cargar trabajadores:', error);
      }
    });
  }

  cargarMaquinas() {
    this.maquinaService.getAll().subscribe({
      next: (response: any) => {
        this.maquinas = response || [];
      },
      error: (error: any) => {
        console.error('Error al cargar máquinas:', error);
      }
    });
  }

  get incidenciasFiltradas() {
    let resultado = [...this.incidencias];

    // Filtrar por estado
    if (this.estadoActivo !== 'todas') {
      resultado = resultado.filter(i => i.estado.toLowerCase() === this.estadoActivo);
    }

    // Filtrar por búsqueda
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      resultado = resultado.filter(i => {
        // Búsqueda en campos básicos
        const basicMatch = 
          i.titulo?.toLowerCase().includes(term) ||
          i.descripcion?.toLowerCase().includes(term) ||
          i.prioridad?.toLowerCase().includes(term);
        
        // Búsqueda en trabajador
        const trabajadorMatch = i.trabajador ? 
          (i.trabajador.nombre?.toLowerCase().includes(term) ||
           i.trabajador.apellido?.toLowerCase().includes(term)) : false;
        
        // Búsqueda en máquina
        const maquinaMatch = i.maquina ?
          (i.maquina.nombre?.toLowerCase().includes(term) ||
           i.maquina.modelo?.toLowerCase().includes(term)) : false;
        
        return basicMatch || trabajadorMatch || maquinaMatch;
      });
    }

    return resultado;
  }

  cambiarEstado(estado: string) {
    this.estadoActivo = estado;
  }

  get abiertas() {
    return this.incidencias.filter(i => i.estado === 'abierta').length;
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

  verIncidencia(incidencia: Incidencia) {
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
    const incidenciaData: any = this.nuevoReporteForm.value;

    this.incidenciaService.create(incidenciaData).subscribe({
      next: (incidencia) => {
        this.isLoading = false;
        alert('Incidencia registrada exitosamente');
        this.nuevoReporteForm.reset({ estado: 'abierta', prioridad: 'media' });
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
