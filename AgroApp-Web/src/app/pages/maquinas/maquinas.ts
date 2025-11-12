import { Component } from '@angular/core';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [],
  templateUrl: './maquinas.html',
  styleUrl: './maquinas.css',
})
export class MaquinasComponent {
  tabActivo: 'activas' | 'inactivas' = 'activas';
  menuAbierto: number | null = null;

  maquinasActivas = [
    { id: 1, nombre: 'Cosechadora', matricula: 'ER342BK', fechaLiberacion: '20/05/2025', localizacion: 'Finca 1', trabajadores: 5 },
    { id: 2, nombre: 'Empacadora', matricula: 'B3223CV', fechaLiberacion: '13/09/2025', localizacion: 'Finca 3', trabajadores: 3 },
    { id: 3, nombre: 'Tractor', matricula: 'C6434NM', fechaLiberacion: '14/01/2026', localizacion: 'Finca 2', trabajadores: 1 },
    { id: 4, nombre: 'Fumigadora', matricula: 'L3465LK', fechaLiberacion: '25/08/2025', localizacion: 'Finca 3', trabajadores: 2 },
  ];

  maquinasInactivas = [
    { id: 5, nombre: 'Cosechadora', matricula: 'ER342BK', fechaLiberacion: '-', localizacion: 'Finca 1', trabajadores: '-' },
    { id: 6, nombre: 'Empacadora', matricula: 'B3223CV', fechaLiberacion: '-', localizacion: 'Finca 3', trabajadores: '-' },
    { id: 7, nombre: 'Tractor', matricula: 'C6434NM', fechaLiberacion: '-', localizacion: 'Finca 2', trabajadores: '-' },
    { id: 8, nombre: 'Fumigadora', matricula: 'L3465LK', fechaLiberacion: '-', localizacion: 'Finca 3', trabajadores: '-' },
  ];

  get maquinasMostradas() {
    return this.tabActivo === 'activas' ? this.maquinasActivas : this.maquinasInactivas;
  }

  cambiarTab(tab: 'activas' | 'inactivas') {
    this.tabActivo = tab;
    this.menuAbierto = null; // Cerrar menú al cambiar tab
  }

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
