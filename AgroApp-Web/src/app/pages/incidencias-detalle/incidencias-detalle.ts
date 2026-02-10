import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IncidenciaService } from '../../services/incidencia.service';

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
      next: (response) => {
        this.incidencia = response;
        this.isLoading = false;
      },
      error: (error: any) => {
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

  cerrarIncidencia() {
    if (!confirm('¿Estás seguro de cerrar esta incidencia?')) {
      return;
    }

    this.incidenciaService.cerrar(this.incidenciaId).subscribe({
      next: () => {
        alert('Incidencia cerrada exitosamente');
        this.cargarIncidencia();
      },
      error: (error) => {
        console.error('Error al cerrar incidencia:', error);
        alert('Error al cerrar la incidencia');
      }
    });
  }
}
