import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../services/trabajador.service';

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
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get f() { return this.trabajadorForm.controls; }

  ngOnInit() {
    this.trabajadorId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTrabajador();
  }

  cargarTrabajador() {
    this.isLoading = true;
    this.trabajadorService.getAll(0, 1000).subscribe({
      next: (response) => {
        const trabajadores = response.content || [];
        const trabajador = trabajadores.find((t: any) => t.id === this.trabajadorId);
        if (trabajador) {
          this.trabajadorForm.patchValue({
            nombre: trabajador.nombre,
            apellido: trabajador.apellido,
            email: trabajador.email,
            telefono: trabajador.telefono
          });
        }
        this.isLoading = false;
      },
      error: (error: any) => {
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
    const trabajadorData: any = this.trabajadorForm.value;

    this.trabajadorService.update(this.trabajadorId, trabajadorData).subscribe({
      next: (trabajador) => {
        this.isLoading = false;
        alert('Trabajador actualizado exitosamente');
        this.router.navigate(['/trabajadores', this.trabajadorId]);
      },
      error: (error) => {
        console.error('Error al actualizar trabajador:', error);
        this.isLoading = false;
        alert('Error al actualizar el trabajador');
      }
    });
  }
}
