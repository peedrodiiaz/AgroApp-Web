import { TrabajadorService } from './../../services/trabajador';
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
  trabajadores: any[] = []; 
  
  constructor(private router:Router, private trabajadorService: TrabajadorService) {
    
  }

  ngOnInit() {
    this.cargarTrabajadores(); 
  }

  cargarTrabajadores() {
    this.trabajadorService.getAll().subscribe({
      next: (data) => {
        this.trabajadores = data;
        console.log('Trabajadores cargados:', data);
      },
      error: (error) => {
        console.error('Error al cargar trabajadores:', error);
      }
    });
  }

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(trabajador: any) {
    this.router.navigate(['/trabajadores', trabajador.id]);
    this.menuAbierto = null;
  }

  cancelar(trabajador: any) {
    console.log('Cancelar:', trabajador);
    this.menuAbierto = null;
  }

  abrirModalNuevo() {
    this.router.navigate(['/trabajadores/nuevo']);
  }
}
