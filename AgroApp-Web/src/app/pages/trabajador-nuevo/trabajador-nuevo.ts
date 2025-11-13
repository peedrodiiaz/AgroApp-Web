import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trabajador-nuevo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trabajador-nuevo.html',
  styleUrl: './trabajador-nuevo.css',
})
export class TrabajadorNuevoComponent {
  trabajadorForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
    descripcion: new FormControl('', [Validators.maxLength(200)]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    nacionalidad: new FormControl('', [Validators.required]),
    codigoPostal: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}$/)])
  });

  get f() {
    return this.trabajadorForm.controls;
  }

  constructor(private router: Router) {}

  atras() {
    this.router.navigate(['/trabajadores']);
  }

  guardar() {
    if (this.trabajadorForm.invalid) {
      this.trabajadorForm.markAllAsTouched();
      return;
    }
    console.log('Datos trabajador:', this.trabajadorForm.value);
  }
}
