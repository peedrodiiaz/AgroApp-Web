import { TrabajadorService } from './../../services/trabajador.service';
import { Trabajador } from './../../interfaces/trabajador.interface';
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
  menuAbierto: number | null = null;
  busqueda: string = '';
  trabajadores: Trabajador[] = [];
  isLoading: boolean = false;
  
  constructor(private router: Router, private trabajadorService: TrabajadorService) {}

  ngOnInit() {
    this.cargarTrabajadores(); 
  }

  cargarTrabajadores() {
    this.isLoading = true;
    this.trabajadorService.getAll().subscribe({
      next: (response: any) => {
        this.trabajadores = response || [];
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar trabajadores:', error);
        this.isLoading = false;
      }
    });
  }

  get trabajadoresFiltrados() {
    if (!this.busqueda.trim()) {
      return this.trabajadores;
    }
    const term = this.busqueda.toLowerCase();
    return this.trabajadores.filter(t => 
      t.nombre?.toLowerCase().includes(term) ||
      t.apellido?.toLowerCase().includes(term) ||
      t.dni?.toLowerCase().includes(term) ||
      t.email?.toLowerCase().includes(term)
    );
  }

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(trabajador: Trabajador) {
    this.router.navigate(['/trabajadores', trabajador.id]);
    this.menuAbierto = null;
  }

  editarTrabajador(trabajador: Trabajador) {
    this.router.navigate(['/trabajadores', trabajador.id, 'editar']);
    this.menuAbierto = null;
  }

  eliminarTrabajador(trabajador: Trabajador) {
    if (confirm(`¿Estás seguro de eliminar a ${trabajador.nombre}?`)) {
      this.trabajadorService.delete(trabajador.id).subscribe({
        next: () => {
          console.log('Trabajador eliminado');
          this.cargarTrabajadores();
        },
        error: (error) => {
          console.error('Error al eliminar trabajador:', error);
          alert('Error al eliminar el trabajador');
        }
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
