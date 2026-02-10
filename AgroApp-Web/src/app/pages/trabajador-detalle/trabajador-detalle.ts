import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrabajadorService } from '../../services/trabajador.service';

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

  constructor() { }

  ngOnInit() {
    this.trabajadorId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTrabajador();
  }

  cargarTrabajador() {
    this.isLoading = true;
    this.trabajadorService.getAll(0, 1000).subscribe({
      next: (response) => {
        const trabajadores = response.content || [];
        this.trabajador = trabajadores.find((t: any) => t.id === this.trabajadorId);
        if (!this.trabajador) {
          alert('Trabajador no encontrado');
          this.volverListado();
        }
        this.isLoading = false;
        console.log('Trabajador cargado:', this.trabajador);
      },
      error: (error: any) => {
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
    if (confirm(`¿Seguro que quieres desactivar a ${this.trabajador?.nombre}?`)) {
      this.trabajadorService.toggleActivacion(this.trabajadorId).subscribe({
        next: () => {
          console.log('Trabajador desactivado');
          this.router.navigate(['/trabajadores']);
        },
        error: (error) => {
          console.error('Error al desactivar trabajador:', error);
          alert('Error al desactivar el trabajador');
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
