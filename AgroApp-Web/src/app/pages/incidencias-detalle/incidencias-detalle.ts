import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidencia-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencias-detalle.html',
  styleUrl: './incidencias-detalle.css',
})
export class IncidenciaDetalleComponent  {
  incidencia = {
    id: 1,
    codigo: 'INC-001',
    estado: 'Abierto',
    trabajador: 'María López',
    maquina: 'Tractor JD-320',
    fechaPublicacion: '28 nov 2024',
    fechaCierre: '',
    categoria: 'Fallo Mecánico',
    descripcion: 'El tractor JD-320 presenta problemas en el sistema de transmisión. Al intentar cambiar de marcha, se escuchan ruidos extraños y la palanca se traba. El problema comenzó esta mañana durante las labores de arado en el sector norte.',
  };

  constructor(private route: ActivatedRoute, private router: Router) {}



  volverListado() {
    this.router.navigate(['/incidencias']);
  }

  editarIncidencia() {

  this.router.navigate(['/incidencias', this.incidencia.id, 'editar']); 

  }
}
