import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IncidenciaService } from '../../services/incidencia';
import { TrabajadorService } from '../../services/trabajador';
import { MaquinaService } from '../../services/maquina';

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
    trabajador_id: new FormControl('', [Validators.required]),
    maquina_id: new FormControl('', [Validators.required])
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
      next: (incidencia) => {
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
      error: (error) => {
        console.error('Error al cargar incidencia:', error);
        this.isLoading = false;
        alert('Error al cargar la información de la incidencia');
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
    const incidenciaData = this.editarForm.value;

    this.incidenciaService.update(this.incidenciaId, incidenciaData).subscribe({
      next: (incidencia) => {
        this.isLoading = false;
        alert('Incidencia actualizada exitosamente');
        this.router.navigate(['/incidencias', this.incidenciaId]);
      },
      error: (error) => {
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
