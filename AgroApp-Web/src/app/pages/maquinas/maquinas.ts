import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maquinas.html',
  styleUrl: './maquinas.css',
})
export class MaquinasComponent {
  menuAbierto: number | null = null;

  maquinas = [
    { id: 1, nombre: 'Cosechadora', matricula: 'ER342BK', fechaLiberacion: '20/05/2025', localizacion: 'Finca 1', trabajadores: 5 },
    { id: 2, nombre: 'Empacadora', matricula: 'B3223CV', fechaLiberacion: '13/09/2025', localizacion: 'Finca 3', trabajadores: 3 },
    { id: 3, nombre: 'Tractor', matricula: 'C6434NM', fechaLiberacion: '14/01/2026', localizacion: 'Finca 2', trabajadores: 1 },
    { id: 4, nombre: 'Fumigadora', matricula: 'L3465LK', fechaLiberacion: '25/08/2025', localizacion: 'Finca 3', trabajadores: 2 },
  ];

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(maquina: any) {
    console.log('Ver info de:', maquina);
    this.menuAbierto = null;
  }

  cancelar(maquina: any) {
    console.log('Cancelar:', maquina);
    this.menuAbierto = null;
  }
}
