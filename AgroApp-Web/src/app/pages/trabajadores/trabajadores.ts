import { TrabajadorService } from './../../services/trabajador';
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
<<<<<<< HEAD
  trabajadores: any[] = []; 
  trabajadoresFiltrados: any[] = [];
  isLoading: boolean = false;
=======
  trabajadores: Trabajador[] = []; 
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  
  constructor(private router: Router, private trabajadorService: TrabajadorService) {}

  ngOnInit() {
    this.cargarTrabajadores(); 
  }

  cargarTrabajadores() {
<<<<<<< HEAD
    this.isLoading = true;
    this.trabajadorService.getAll().subscribe({
      next: (response: any) => {
        // La respuesta del backend puede venir en diferentes formatos
        this.trabajadores = response.data || response;
        this.trabajadoresFiltrados = this.trabajadores;
        this.isLoading = false;
        console.log('Trabajadores cargados:', this.trabajadores);
=======
    this.trabajadorService.getAll({ per_page: 15 }).subscribe({
      next: (response) => {
        this.trabajadores = response.data; // Extraer el array de la respuesta paginada
        console.log('Trabajadores cargados:', response.data);
        console.log('Total:', response.total);
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
      },
      error: (error) => {
        console.error('Error al cargar trabajadores:', error);
        this.isLoading = false;
      }
    });
  }

  filtrarTrabajadores() {
    if (!this.busqueda.trim()) {
      this.trabajadoresFiltrados = this.trabajadores;
      return;
    }

    const busquedaLower = this.busqueda.toLowerCase();
    this.trabajadoresFiltrados = this.trabajadores.filter(trabajador =>
      trabajador.nombre?.toLowerCase().includes(busquedaLower) ||
      trabajador.email?.toLowerCase().includes(busquedaLower) ||
      trabajador.telefono?.includes(busquedaLower)
    );
  }

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(trabajador: Trabajador) {
    this.router.navigate(['/trabajadores', trabajador.id]);
    this.menuAbierto = null;
  }

<<<<<<< HEAD
  editarTrabajador(trabajador: any) {
    this.router.navigate(['/trabajadores', trabajador.id, 'editar']);
    this.menuAbierto = null;
  }

  eliminarTrabajador(trabajador: any) {
    if (confirm(`¿Estás seguro de eliminar a ${trabajador.nombre}?`)) {
      this.trabajadorService.delete(trabajador.id).subscribe({
        next: () => {
          console.log('Trabajador eliminado');
          this.cargarTrabajadores(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al eliminar trabajador:', error);
          alert('Error al eliminar el trabajador');
        }
      });
    }
=======
  cancelar(trabajador: Trabajador) {
    console.log('Cancelar:', trabajador);
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
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
