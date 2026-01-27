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

  form = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    estado: new FormControl('abierta', [Validators.required]),
    prioridad: new FormControl('media', [Validators.required]),
    fechaApertura: new FormControl('', [Validators.required]),
    trabajador_id: new FormControl<number | null>(null, [Validators.required]),
    maquina_id: new FormControl<number | null>(null, [Validators.required])
  });

  ngOnInit() {
    this.cargarIncidencias();
    this.cargarTrabajadores();
    this.cargarMaquinas();
  }

  cargarIncidencias() {
    this.isLoading = true;
    this.incidenciaService.getAll().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.incidencias = response.data;
        } else if (Array.isArray(response)) {
          this.incidencias = response;
        } else {
          this.incidencias = [];
        }
        this.isLoading = false;
      },
      error: () => {
        this.incidencias = [];
        this.isLoading = false;
      }
    });
  }

  cargarTrabajadores() {
    this.trabajadorService.getAll().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.trabajadores = response.data;
        } else if (Array.isArray(response)) {
          this.trabajadores = response;
        } else {
          this.trabajadores = [];
        }
      },
      error: () => {
        this.trabajadores = [];
      }
    });
  }

  cargarMaquinas() {
    this.maquinaService.getAll().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.maquinas = response.data;
        } else if (Array.isArray(response)) {
          this.maquinas = response;
        } else {
          this.maquinas = [];
        }
      },
      error: () => {
        this.maquinas = [];
      }
    });
  }

  get incidenciasFiltradas() {
    const term = this.searchTerm.toLowerCase();
    return this.incidencias.filter((i: any) =>
      (this.estadoActivo === 'todas' || i.estado === this.estadoActivo) &&
      (!this.searchTerm || i.titulo?.toLowerCase().includes(term) || i.descripcion?.toLowerCase().includes(term))
    );
  }

  verIncidencia(id: number) {
    this.router.navigate(['/incidencias', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar incidencia?')) {
      this.incidenciaService.delete(id).subscribe({
        next: () => this.cargarIncidencias(),
        error: () => alert('Error al eliminar')
      });
    }
  }

  abrirModal() {
    this.modalAbierto = true;
    this.form.reset();
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  guardar() {
    if (this.form.invalid) return;
    this.incidenciaService.create(this.form.value as any).subscribe({
      next: () => {
        this.cargarIncidencias();
        this.cerrarModal();
      },
      error: () => alert('Error al guardar')
    });
  }
}
