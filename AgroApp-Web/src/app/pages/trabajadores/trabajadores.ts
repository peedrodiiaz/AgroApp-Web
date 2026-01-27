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
  busqueda = '';
  trabajadores: any[] = [];
  isLoading = false;

  ngOnInit() {
    this.cargarTrabajadores();
  }

  cargarTrabajadores() {
    this.isLoading = true;
    this.trabajadorService.getAll().subscribe({
      next: (response: any) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.trabajadores = response.data;
        } else if (Array.isArray(response)) {
          this.trabajadores = response;
        } else {
          this.trabajadores = [];
        }
        this.isLoading = false;
      },
      error: () => {
        this.trabajadores = [];
        this.isLoading = false;
      }
    });
  }

  get trabajadoresFiltrados() {
    const term = this.busqueda.toLowerCase();
    return this.trabajadores.filter(t =>
      !this.busqueda || t.nombre?.toLowerCase().includes(term) ||
      t.apellido?.toLowerCase().includes(term) ||
      t.dni?.toLowerCase().includes(term) ||
      t.email?.toLowerCase().includes(term)
    );
  }

  toggleMenu(id: number) {
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
    if (confirm(`¿Eliminar "${nombre}"?`)) {
      this.trabajadorService.delete(id).subscribe({
        next: () => this.cargarTrabajadores(),
        error: () => alert('Error al eliminar')
      });
    }
    this.menuAbierto = null;
  }

  eliminarTrabajador(trabajador: any) {
    if (confirm(`¿Eliminar "${trabajador.nombre}"?`)) {
      this.trabajadorService.delete(trabajador.id).subscribe({
        next: () => this.cargarTrabajadores(),
        error: () => alert('Error al eliminar')
      });
    }
    this.menuAbierto = null;
  }

  abrirModalNuevo() {
    this.router.navigate(['/trabajadores/nuevo']);
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
