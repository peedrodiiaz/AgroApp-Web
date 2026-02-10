import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncidenciaService } from '../../services/incidencia.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { MaquinaService } from '../../services/maquina.service';

@Component({
  selector: 'app-incidencia-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './incidencias-editar.html',
  styleUrl: './incidencias-editar.css',
})
export class IncidenciaEditarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private incidenciaService = inject(IncidenciaService);
  private trabajadorService = inject(TrabajadorService);
  private maquinaService = inject(MaquinaService);

  incidenciaId: number = 0;
  isLoading = false;
  trabajadores: any[] = [];
  maquinas: any[] = [];

  editarForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    estado: new FormControl('', [Validators.required]),
    prioridad: new FormControl('', [Validators.required]),
    fechaApertura: new FormControl('', [Validators.required]),
    fechaCierre: new FormControl(''),
    trabajador_id: new FormControl<number | null>(null, [Validators.required]),
    maquina_id: new FormControl<number | null>(null, [Validators.required])
  });

  get f() { return this.editarForm.controls; }

  ngOnInit() {
    this.incidenciaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTrabajadores();
    this.cargarMaquinas();
    this.cargarIncidencia();
  }

  cargarIncidencia() {
    this.isLoading = true;
    this.incidenciaService.getById(this.incidenciaId).subscribe({
      next: (response: any) => {
        const incidencia = response && response.data ? response.data : response;
        this.editarForm.patchValue({
          titulo: incidencia.titulo,
          descripcion: incidencia.descripcion,
          estado: incidencia.estado,
          prioridad: incidencia.prioridad,
          fechaApertura: incidencia.fechaApertura?.split('T')[0] || incidencia.fechaApertura,
          fechaCierre: incidencia.fechaCierre?.split('T')[0] || incidencia.fechaCierre,
          trabajador_id: incidencia.trabajador_id,
          maquina_id: incidencia.maquina_id
        });
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar incidencia:', error);
        this.isLoading = false;
        alert('Error al cargar la información de la incidencia');
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
      error: (error: any) => {
        console.error('Error al cargar trabajadores:', error);
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
      error: (error: any) => {
        console.error('Error al cargar máquinas:', error);
      }
    });
  }

  volver() { 
    this.router.navigate(['/incidencias', this.incidenciaId]); 
  }

  cancelar() { 
    this.volver(); 
  }

  guardar() {
    if (this.editarForm.invalid) {
      this.editarForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const incidenciaData: any = this.editarForm.value;

    this.incidenciaService.update(this.incidenciaId, incidenciaData).subscribe({
      next: (incidencia: any) => {
        this.isLoading = false;
        alert('Incidencia actualizada exitosamente');
        this.router.navigate(['/incidencias', this.incidenciaId]);
      },
      error: (error: any) => {
        console.error('Error al actualizar incidencia:', error);
        this.isLoading = false;
        if (error.error?.errors) {
          const errors = Object.values(error.error.errors).flat();
          alert('Errores de validación:\n' + errors.join('\n'));
        } else {
          alert('Error al actualizar la incidencia');
        }
      }
    });
  }
}
