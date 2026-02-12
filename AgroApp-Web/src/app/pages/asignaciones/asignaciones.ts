import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsignacionService } from '../../services/asignacion.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { MaquinaService } from '../../services/maquina.service';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './asignaciones.html',
  styleUrl: './asignaciones.css',
})

export class AsignacionesComponent implements OnInit {
  router = inject(Router);
  asignacionService = inject(AsignacionService);
  trabajadorService = inject(TrabajadorService);
  maquinaService = inject(MaquinaService);

  asignaciones: any[] = [];
  trabajadores: any[] = [];
  maquinas: any[] = [];
  searchTerm = '';
  isLoading = false;
  modalAbierto = false;
  esEdicion = false;
  asignacionEditando: any = null;

  nuevaAsignacionForm = new FormGroup({
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    maquinaId: new FormControl<number | null>(null, [Validators.required]),
    trabajadorId: new FormControl<number | null>(null)
  });

  get f() {
    return this.nuevaAsignacionForm.controls;
  }

  get asignacionesActivas() {
    const hoy = new Date();
    return this.asignaciones.filter((a: any) => {
      const inicio = new Date(a.fechaInicio);
      const fin = new Date(a.fechaFin);
      return inicio <= hoy && fin >= hoy;
    }).length;
  }

  get asignacionesFuturas() {
    const hoy = new Date();
    return this.asignaciones.filter((a: any) => new Date(a.fechaInicio) > hoy).length;
  }

  get total() {
    return this.asignaciones.length;
  }

  ngOnInit() {
    this.cargarAsignaciones();
    this.cargarTrabajadores();
    this.cargarMaquinas();
  }

  cargarAsignaciones() {
    this.isLoading = true;
    this.asignacionService.getAll(0, 100).subscribe({
      next: (response) => {
        this.asignaciones = response.content || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar asignaciones:', error);
        this.asignaciones = [];
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

  get asignacionesFiltradas() {
    const term = this.searchTerm.toLowerCase();
    return this.asignaciones.filter((a: any) =>
      !this.searchTerm ||
      a.descripcion?.toLowerCase().includes(term) ||
      a.maquina?.nombre?.toLowerCase().includes(term) ||
      a.trabajador?.nombre?.toLowerCase().includes(term) ||
      a.trabajador?.apellido?.toLowerCase().includes(term)
    );
  }

  abrirModal() {
    this.modalAbierto = true;
    this.esEdicion = false;
    this.asignacionEditando = null;
    this.nuevaAsignacionForm.reset({
      fechaInicio: new Date().toISOString().split('T')[0]
    });
  }

  esActiva(asignacion: any): boolean {
    const hoy = new Date();
    const inicio = new Date(asignacion.fechaInicio);
    const fin = new Date(asignacion.fechaFin);
    return inicio <= hoy && fin >= hoy;
  }

  esFutura(asignacion: any): boolean {
    const hoy = new Date();
    const inicio = new Date(asignacion.fechaInicio);
    return inicio > hoy;
  }


  cerrarModal() {
    this.modalAbierto = false;
    this.esEdicion = false;
    this.asignacionEditando = null;
  }

  editarAsignacion(asignacion: any, event: Event) {
    event.stopPropagation();
    this.esEdicion = true;
    this.asignacionEditando = asignacion;
    this.modalAbierto = true;

    this.nuevaAsignacionForm.patchValue({
      fechaInicio: asignacion.fechaInicio,
      fechaFin: asignacion.fechaFin,
      descripcion: asignacion.descripcion,
      maquinaId: asignacion.maquina.id,
      trabajadorId: asignacion.trabajador?.id
    });
  }

  eliminarAsignacion(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('¿Eliminar esta asignación?')) {
      this.asignacionService.delete(id).subscribe({
        next: () => {
          alert('Asignación eliminada exitosamente');
          this.cargarAsignaciones();
        },
        error: (err) => {
          alert(err.error?.detail || 'Error al eliminar asignación');
        }
      });
    }
  }

  guardarAsignacion() {
    if (this.nuevaAsignacionForm.invalid) {
      this.nuevaAsignacionForm.markAllAsTouched();
      return;
    }

    const formValue = this.nuevaAsignacionForm.value;
    const asignacionData: any = {
      fechaInicio: formValue.fechaInicio,
      fechaFin: formValue.fechaFin,
      descripcion: formValue.descripcion,
      maquinaId: formValue.maquinaId,
      trabajadorId: formValue.trabajadorId
    };

    const operacion = this.esEdicion
      ? this.asignacionService.update(this.asignacionEditando.id, asignacionData)
      : this.asignacionService.create(asignacionData);

    operacion.subscribe({
      next: () => {
        alert(this.esEdicion ? 'Asignación actualizada' : 'Asignación creada exitosamente');
        this.cargarAsignaciones();
        this.cerrarModal();
      },
      error: (error) => {
        console.error('Error:', error);
        alert(error.error?.message || 'Error al guardar asignación');
      }
    });
  }

  verAsignacionesMaquina(maquinaId: number) {
    this.router.navigate(['/asignaciones/maquina', maquinaId]);
  }
}
