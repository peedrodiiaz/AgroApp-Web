import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from '../../services/trabajador';

@Component({
  selector: 'app-trabajador-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajador-detalle.html',
  styleUrl: './trabajador-detalle.css',
})
export class TrabajadorDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private trabajadorService = inject(TrabajadorService);

  trabajadorId: number = 0;
  trabajador: any = null;
  isLoading: boolean = false;

  constructor() {}

  ngOnInit() {
    this.trabajadorId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTrabajador();
  }

  cargarTrabajador() {
    this.isLoading = true;
    this.trabajadorService.getById(this.trabajadorId).subscribe({
      next: (response: any) => {
        this.trabajador = response.data || response;
        this.isLoading = false;
        console.log('Trabajador cargado:', this.trabajador);
      },
      error: (error) => {
        console.error('Error al cargar trabajador:', error);
        this.isLoading = false;
        alert('Error al cargar el trabajador');
        this.volverListado();
      }
    });
  }

  volverListado() {
    this.router.navigate(['/trabajadores']);
  }

  editarTrabajador() {
    this.router.navigate(['/trabajadores', this.trabajadorId, 'editar']);
  }

  eliminarTrabajador() {
    if (confirm(`¿Seguro que quieres eliminar a ${this.trabajador?.nombre}?`)) {
      this.trabajadorService.delete(this.trabajadorId).subscribe({
        next: () => {
          console.log('Trabajador eliminado');
          this.router.navigate(['/trabajadores']);
        },
        error: (error) => {
          console.error('Error al eliminar trabajador:', error);
          alert('Error al eliminar el trabajador');
        }
      });
    }
  }

  getInitials(nombre: string): string {
    if (!nombre) return '??';
    const palabras = nombre.split(' ');
    if (palabras.length >= 2) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }
    return nombre.substring(0, 2).toUpperCase();
  }
}
