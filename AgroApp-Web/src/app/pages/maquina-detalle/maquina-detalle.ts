import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-maquina-detalle',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './maquina-detalle.html',
  styleUrl: './maquina-detalle.css',
})
export class MaquinaDetalleComponent implements OnInit {
  maquinaId: number = 0;

  maquina = {
    id: 3,
    nombre: 'Tractor',
    modelo: 'John Deere 5090',
    matricula: 'BLB346JK',
    fechaCompra: '20/09/2025',
    localizacion: 'Finca 1'
  };

  trabajador = {
    nombre: 'Pepe',
    avatar: '👤',
    fechaInicio: '25/08/2026'
  };

  incidencias = [
    { id: 1, estado: 'Abierta', descripcion: 'Cambio aceite', fecha: '18/06/2025' },
    { id: 2, estado: 'Cerrada', descripcion: 'Batería nueva', fecha: '18/06/2025' }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día'
    },
    events: [
      {
        title: 'Cambio de la rueda delantera',
        start: '2025-06-25',
        end: '2025-06-26',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500'
      },
      {
        title: 'Reparación de preferrediento',
        start: '2025-06-02',
        end: '2025-06-08',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500'
      },
      {
        title: 'Revisión de preferrediento',
        start: '2025-06-09',
        end: '2025-06-12',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500'
      },
      {
        title: 'Fran de cochón del programa',
        start: '2025-06-13',
        end: '2025-06-15',
        backgroundColor: '#28a745',
        borderColor: '#28a745'
      },
      {
        title: 'Revisión de documentos',
        start: '2025-06-20',
        end: '2025-06-22',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500'
      }
    ],
    height: 'auto',
    editable: false,
    selectable: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.maquinaId = Number(this.route.snapshot.paramMap.get('id'));
  }

  editarMaquina() {
    console.log('Editar máquina:', this.maquinaId);
  }

  eliminarMaquina() {
    if (confirm('¿Estás seguro de que quieres eliminar esta máquina?')) {
      this.router.navigate(['/maquinas']);
    }
  }

  volverListado() {
    this.router.navigate(['/maquinas']);
  }
}
