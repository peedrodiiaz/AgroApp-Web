import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-trabajador-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './trabajador-editar.html',
  styleUrl: './trabajador-editar.css',
})
export class TrabajadorEditarComponent implements OnInit {
  trabajadorId: number = 0;
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

  get f() { return this.trabajadorForm.controls; }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.trabajadorId = Number(this.route.snapshot.paramMap.get('id'));

    this.trabajadorForm.patchValue({
      nombre: 'John',
      apellidos: 'Wick',
      descripcion: 'Trabajador experimentado',
      fechaNacimiento: '1990-01-15',
      direccion: 'Calle Falsa 123',
      ciudad: 'Sevilla',
      nacionalidad: 'Española',
      codigoPostal: '41001'
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
    console.log('Datos EDITADOS del trabajador:', this.trabajadorForm.value);
    this.router.navigate(['/trabajadores', this.trabajadorId]);
  }
}
