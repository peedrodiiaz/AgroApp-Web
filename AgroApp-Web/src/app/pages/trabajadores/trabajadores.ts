import { Component } from '@angular/core';
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
export class TrabajadoresComponent {
  menuAbierto: number | null = null;
  busqueda: string = '';

  trabajadores = [
    { id: 1, nombre: 'John Wick', email: 'john@gmail.com', telefono: '67578374', avatar: '👤' },
    { id: 2, nombre: 'John Wick', email: 'john@gmail.com', telefono: '67578374', avatar: '👤' },
    { id: 3, nombre: 'John Wick', email: 'john@gmail.com', telefono: '67578374', avatar: '👤' },
    { id: 4, nombre: 'John Wick', email: 'john@gmail.com', telefono: '67578374', avatar: '👤' },
    { id: 5, nombre: 'John Wick', email: 'john@gmail.com', telefono: '67578374', avatar: '👤' },
    { id: 6, nombre: 'John Wick', email: 'john@gmail.com', telefono: '67578374', avatar: '👤' },
  ];

  constructor(private router: Router) {}

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(trabajador: any) {
    this.router.navigate([ '/trabajadores', trabajador.id ]);
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
