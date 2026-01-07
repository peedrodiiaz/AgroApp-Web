import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IncidenciaService } from '../../services/incidencia';

@Component({
  selector: 'app-incidencia-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencias-detalle.html',
  styleUrl: './incidencias-detalle.css',
})
export class IncidenciaDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private incidenciaService = inject(IncidenciaService);

  incidenciaId: number = 0;
  incidencia: any = null;
  isLoading = false;

  ngOnInit() {
    this.incidenciaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarIncidencia();
  }

  cargarIncidencia() {
    this.isLoading = true;
    this.incidenciaService.getById(this.incidenciaId).subscribe({
      next: (data) => {
        this.incidencia = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar incidencia:', error);
        this.isLoading = false;
        alert('Error al cargar la información de la incidencia');
        this.volverListado();
      }
    });
  }

  volverListado() {
    this.router.navigate(['/incidencias']);
  }

  editarIncidencia() {
    this.router.navigate(['/incidencias', this.incidencia.id, 'editar']); 
  }

  eliminarIncidencia() {
    if (!confirm('¿Estás seguro de eliminar esta incidencia?')) {
      return;
    }

    this.incidenciaService.delete(this.incidenciaId).subscribe({
      next: () => {
        alert('Incidencia eliminada exitosamente');
        this.volverListado();
      },
      error: (error) => {
        console.error('Error al eliminar incidencia:', error);
        alert('Error al eliminar la incidencia');
      }
    });
  }
}
