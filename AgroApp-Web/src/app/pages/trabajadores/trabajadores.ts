import { TrabajadorService } from './../../services/trabajador.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajadores.html',
  styleUrl: './trabajadores.css',
})
export class TrabajadoresComponent implements OnInit {
  router = inject(Router);
  trabajadorService = inject(TrabajadorService);

  menuAbierto: number | null = null;
  menuPosition: { top: string; right: string } | null = null;
  busqueda = '';
  trabajadores: any[] = [];
  isLoading = false;

  ngOnInit() {
    this.cargarTrabajadores();
  }

  cargarTrabajadores() {
    this.isLoading = true;
    this.trabajadorService.getAll(0, 100).subscribe({
      next: (response) => {
        this.trabajadores = response.content || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar trabajadores:', error);
        this.trabajadores = [];
        this.isLoading = false;
      }
    });
  }

  get trabajadoresFiltrados() {
    if (!this.busqueda || this.busqueda.trim() === '') {
      return this.trabajadores;
    }
    const term = this.busqueda.toLowerCase().trim();
    return this.trabajadores.filter(t =>
      (t.nombre?.toLowerCase().includes(term)) ||
      (t.apellido?.toLowerCase().includes(term)) ||
      (t.dni?.toLowerCase().includes(term)) ||
      (t.email?.toLowerCase().includes(term))
    );
  }

  toggleMenu(id: number, event?: Event) {
    if (event) {
      const button = event.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      this.menuPosition = {
        top: (rect.bottom + 5) + 'px',
        right: (window.innerWidth - rect.right) + 'px'
      };
    }
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(trabajador: any) {
    this.router.navigate(['/trabajadores', trabajador.id]);
    this.menuAbierto = null;
  }

  editar(id: number) {
    this.router.navigate(['/trabajadores', id, 'editar']);
    this.menuAbierto = null;
  }

  editarTrabajador(trabajador: any) {
    this.router.navigate(['/trabajadores', trabajador.id, 'editar']);
    this.menuAbierto = null;
  }

  eliminar(id: number, nombre: string) {
    if (confirm(`¿Desactivar "${nombre}"?`)) {
      this.trabajadorService.toggleActivacion(id).subscribe({
        next: () => this.cargarTrabajadores(),
        error: () => alert('Error al desactivar')
      });
    }
    this.menuAbierto = null;
  }

  eliminarTrabajador(trabajador: any) {
    if (confirm(`¿Desactivar "${trabajador.nombre}"?`)) {
      this.trabajadorService.toggleActivacion(trabajador.id).subscribe({
        next: () => this.cargarTrabajadores(),
        error: () => alert('Error al desactivar')
      });
    }
    this.menuAbierto = null;
  }

  abrirModalNuevo() {
    console.log('Botón clickeado - Navegando a /trabajadores/nuevo');
    this.router.navigate(['/trabajadores/nuevo']).then(
      success => console.log('Navegación exitosa:', success),
      error => console.error('Error en navegación:', error)
    );
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
