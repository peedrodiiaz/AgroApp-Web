import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CronogramaService } from '../../services/cronograma.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { MaquinaService } from '../../services/maquina.service';

@Component({
    selector: 'app-cronogramas',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './cronogramas.html',
    styleUrl: './cronogramas.css',
})
export class CronogramasComponent implements OnInit {
    cronogramaService = inject(CronogramaService);
    trabajadorService = inject(TrabajadorService);
    maquinaService = inject(MaquinaService);

    vistaActiva = 'lista';
    isLoading = false;
    modalAbierto = false;

    cronogramas: any[] = [];
    trabajadores: any[] = [];
    maquinas: any[] = [];

    filtroMaquina: number | null = null;
    filtroTrabajador: number | null = null;
    filtroEstado = 'todas';
    searchTerm = '';

    form = new FormGroup({
        maquina_id: new FormControl<number | null>(null, [Validators.required]),
        trabajador_id: new FormControl<number | null>(null, [Validators.required]),
        fechaInicio: new FormControl('', [Validators.required]),
        fechaFin: new FormControl('', [Validators.required]),
        descripcion: new FormControl(''),
        estado: new FormControl('pendiente')
    });


  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.isLoading = true;
    this.cronogramaService.getAll().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.cronogramas = response.data;
        } else if (Array.isArray(response)) {
          this.cronogramas = response;
        } else {
          this.cronogramas = [];
        }
        this.isLoading = false;
      },
      error: () => {
        this.cronogramas = [];
        this.isLoading = false;
      }
    });
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
      error: () => { this.trabajadores = []; }
    });
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
      error: () => { this.maquinas = []; }
    });
  }

  get cronogramasFiltrados() {
    return this.cronogramas
      .filter((c: any) => !this.filtroMaquina || c.maquina_id === this.filtroMaquina)
      .filter((c: any) => !this.filtroTrabajador || c.trabajador_id === this.filtroTrabajador)
      .filter((c: any) => this.filtroEstado === 'todas' || c.estado === this.filtroEstado)
      .filter((c: any) => !this.searchTerm || c.descripcion?.toLowerCase().includes(this.searchTerm.toLowerCase()));
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
    this.cronogramaService.create(this.form.value as any).subscribe({
      next: () => {
        this.cargarDatos();
        this.cerrarModal();
      },
      error: () => alert('Error al guardar')
    });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar cronograma?')) {
      this.cronogramaService.delete(id).subscribe({
        next: () => this.cargarDatos(),
        error: () => alert('Error al eliminar')
      });
    }
  }

  limpiarFiltros() {
    this.filtroMaquina = null;
    this.filtroTrabajador = null;
    this.filtroEstado = 'todas';
    this.searchTerm = '';
  }
}