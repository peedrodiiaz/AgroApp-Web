import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../services/trabajador.service';

@Component({
  selector: 'app-trabajador-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './trabajador-nuevo.html',
  styleUrl: './trabajador-nuevo.css',
})
export class TrabajadorNuevoComponent {
  private router = inject(Router);
  private trabajadorService = inject(TrabajadorService);

  isLoading: boolean = false;
  errorMessage: string = '';

  trabajadorForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[A-Za-z]$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.pattern(/^\d{9}$/)]),
    rol: new FormControl('trabajador', [Validators.required]),
    fechaAlta: new FormControl(new Date().toISOString().split('T')[0], [Validators.required])
  });

  get f() {
    return this.trabajadorForm.controls;
  }

  atras() {
    this.router.navigate(['/trabajadores']);
  }

  guardar() {
    if (this.trabajadorForm.invalid) {
      this.trabajadorForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const trabajadorData: any = this.trabajadorForm.value;

    this.trabajadorService.create(trabajadorData).subscribe({
      next: (response) => {
        console.log('Trabajador creado:', response);
        this.isLoading = false;
        alert('Trabajador creado exitosamente');
        this.router.navigate(['/trabajadores']);
      },
      error: (error) => {
        console.error('Error al crear trabajador:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Error al crear el trabajador';
      }
    });
  }
}
