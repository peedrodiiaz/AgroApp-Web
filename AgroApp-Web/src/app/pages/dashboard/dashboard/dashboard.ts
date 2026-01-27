import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../../services/trabajador.service';
import { MaquinaService } from '../../../services/maquina.service';
import { forkJoin } from 'rxjs';
import { Trabajador } from '../../../interfaces/trabajador.interface';
import { Maquina } from '../../../interfaces/maquina.interface';

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
  
  totalTrabajadores = 0;
  trabajadoresPorRol: any = {};
  
  totalMaquinas = 0;
  maquinasPorEstado: any = {};
  maquinasPorTipo: any = {};

  ngOnInit() {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.isLoading = true;
    
    forkJoin({
      trabajadores: this.trabajadorService.getAll(),
      maquinas: this.maquinaService.getAll()
    }).subscribe({
      next: (result) => {
        // Procesar respuesta de API
        let trabajadores = result.trabajadores as any;
        let maquinas = result.maquinas as any;

        // Si viene en formato {success, data}, extraer data
        if (trabajadores && trabajadores.data && Array.isArray(trabajadores.data)) {
          trabajadores = trabajadores.data;
        } else if (!Array.isArray(trabajadores)) {
          trabajadores = [];
        }

        if (maquinas && maquinas.data && Array.isArray(maquinas.data)) {
          maquinas = maquinas.data;
        } else if (!Array.isArray(maquinas)) {
          maquinas = [];
        }

        // Calcular estadísticas
        this.totalTrabajadores = trabajadores.length;
        this.trabajadoresPorRol = this.contarPorPropiedad(trabajadores, 'rol');

        this.totalMaquinas = maquinas.length;
        this.maquinasPorEstado = this.contarPorPropiedad(maquinas, 'estado');
        this.maquinasPorTipo = this.contarPorPropiedad(maquinas, 'tipo');

        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar estadísticas:', error);
        this.isLoading = false;
      }
    });
  }

  private contarPorPropiedad(items: any[], propiedad: string): any {
    return items.reduce((acc, item) => {
      const valor = item[propiedad];
      if (valor) {
        acc[valor] = (acc[valor] || 0) + 1;
      }
      return acc;
    }, {});
  }

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
