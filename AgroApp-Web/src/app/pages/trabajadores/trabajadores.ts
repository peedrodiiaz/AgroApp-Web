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
  trabajadores: Trabajador[] = []; 
  
  constructor(private router:Router, private trabajadorService: TrabajadorService) {
    
  }

  ngOnInit() {
    this.cargarTrabajadores(); 
  }

  cargarTrabajadores() {
    this.trabajadorService.getAll({ per_page: 15 }).subscribe({
      next: (response) => {
        this.trabajadores = response.data; // Extraer el array de la respuesta paginada
        console.log('Trabajadores cargados:', response.data);
        console.log('Total:', response.total);
      },
      error: (error) => {
        console.error('Error al cargar trabajadores:', error);
      }
    });
  }

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(trabajador: Trabajador) {
    this.router.navigate(['/trabajadores', trabajador.id]);
    this.menuAbierto = null;
  }

  cancelar(trabajador: Trabajador) {
    console.log('Cancelar:', trabajador);
    this.menuAbierto = null;
  }

  abrirModalNuevo() {
    this.router.navigate(['/trabajadores/nuevo']);
  }
}
