import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../../services/trabajador';
import { MaquinaService } from '../../../services/maquina';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private trabajadorService = inject(TrabajadorService);
  private maquinaService = inject(MaquinaService);

  isLoading = false;
  
  // Estadísticas de trabajadores
  totalTrabajadores = 0;
  trabajadoresPorRol: any = {};
  
  // Estadísticas de máquinas
  totalMaquinas = 0;
  maquinasPorEstado: any = {};
  maquinasPorTipo: any = {};

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.isLoading = true;
    
    forkJoin({
      trabajadoresStats: this.trabajadorService.getStats(),
      maquinasStats: this.maquinaService.getStats()
    }).subscribe({
      next: (result) => {
        // Procesar estadísticas de trabajadores
        this.totalTrabajadores = result.trabajadoresStats.total || 0;
        this.trabajadoresPorRol = result.trabajadoresStats.por_rol || {};

        // Procesar estadísticas de máquinas
        this.totalMaquinas = result.maquinasStats.total || 0;
        this.maquinasPorEstado = result.maquinasStats.por_estado || {};
        this.maquinasPorTipo = result.maquinasStats.por_tipo || {};

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
        this.isLoading = false;
        alert('Error al cargar las estadísticas del dashboard');
      }
    });
  }

  // Helpers para obtener valores de forma segura
  getRoles(): string[] {
    return Object.keys(this.trabajadoresPorRol);
  }

  getEstados(): string[] {
    return Object.keys(this.maquinasPorEstado);
  }

  getTipos(): string[] {
    return Object.keys(this.maquinasPorTipo);
  }

  getEstadoClass(estado: string): string {
    const estadoLower = estado.toLowerCase();
    if (estadoLower === 'activa') return 'bg-success';
    if (estadoLower === 'inactiva') return 'bg-danger';
    if (estadoLower === 'mantenimiento') return 'bg-warning';
    return 'bg-secondary';
  }
}
