import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../services/trabajador';

@Component({
  selector: 'app-trabajador-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './trabajador-editar.html',
  styleUrl: './trabajador-editar.css',
})
export class TrabajadorEditarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private trabajadorService = inject(TrabajadorService);

  trabajadorId: number = 0;
  isLoading = false;
  trabajadorForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[A-Z]$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    rol: new FormControl('', [Validators.required]),
    fechaAlta: new FormControl('', [Validators.required])
  });

  get f() { return this.trabajadorForm.controls; }

  ngOnInit() {
    this.trabajadorId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTrabajador();
  }

  cargarTrabajador() {
    this.isLoading = true;
    this.trabajadorService.getById(this.trabajadorId).subscribe({
      next: (trabajador) => {
        this.trabajadorForm.patchValue({
          nombre: trabajador.nombre,
          apellido: trabajador.apellido,
          dni: trabajador.dni,
          email: trabajador.email,
          telefono: trabajador.telefono,
          rol: trabajador.rol,
          fechaAlta: trabajador.fechaAlta
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar trabajador:', error);
        this.isLoading = false;
        alert('Error al cargar la información del trabajador');
      }
    });
  }

  atras() {
    this.router.navigate(['/trabajadores', this.trabajadorId]);
  }

  guardar() {
    if (this.trabajadorForm.invalid) {
      this.trabajadorForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const trabajadorData = this.trabajadorForm.value;

    this.trabajadorService.update(this.trabajadorId, trabajadorData).subscribe({
      next: (trabajador) => {
        this.isLoading = false;
        alert('Trabajador actualizado exitosamente');
        this.router.navigate(['/trabajadores', this.trabajadorId]);
      },
      error: (error) => {
        console.error('Error al actualizar trabajador:', error);
        this.isLoading = false;
        if (error.error?.errors) {
          const errors = Object.values(error.error.errors).flat();
          alert('Errores de validación:\n' + errors.join('\n'));
        } else {
          alert('Error al actualizar el trabajador');
        }
      }
    });
  }
}
