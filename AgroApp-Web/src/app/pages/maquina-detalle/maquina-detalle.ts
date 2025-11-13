import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-maquina-detalle',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, ReactiveFormsModule],
  templateUrl: './maquina-detalle.html',
  styleUrl: './maquina-detalle.css',
})
export class MaquinaDetalleComponent implements OnInit {
  maquinaId: number = 0;
  modalEditarAbierto: boolean = false;

  // Datos de ejemplo
  maquina = {
    id: 3,
    nombre: 'Tractor',
    modelo: 'John Deere 5090',
    matricula: 'BLB346JK',
    fechaCompra: '2025-09-20',
    localizacion: 'Finca 1',
    trabajador: 'Pepe'
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

  // FormGroup para editar
  editarMaquinaForm = new FormGroup({
    nombre: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      nonNullable: true
    }),
    matricula: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[A-Z0-9]{6,10}$/i)],
      nonNullable: true
    }),
    modelo: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
      nonNullable: true
    }),
    fechaCompra: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    localizacion: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      nonNullable: true
    }),
    trabajador: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(50)],
      nonNullable: true
    }),
  });

  get f() { return this.editarMaquinaForm.controls; }

  // Configuración del calendario
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
        title: 'Reparación de mantenimiento',
        start: '2025-06-02',
        end: '2025-06-08',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500'
      },
      {
        title: 'Revisión de mantenimiento',
        start: '2025-06-09',
        end: '2025-06-12',
        backgroundColor: '#ffa500',
        borderColor: '#ffa500'
      },
      {
        title: 'Fin de ejecución del programa',
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
    console.log('Cargando máquina con ID:', this.maquinaId);
  }

  abrirModalEditar() {
    // Cargar datos actuales en el formulario
    this.editarMaquinaForm.patchValue({
      nombre: this.maquina.nombre,
      matricula: this.maquina.matricula,
      modelo: this.maquina.modelo,
      fechaCompra: this.maquina.fechaCompra,
      localizacion: this.maquina.localizacion,
      trabajador: this.maquina.trabajador
    });
    this.modalEditarAbierto = true;
  }

  cerrarModalEditar() {
    this.modalEditarAbierto = false;
    this.editarMaquinaForm.reset();
  }

  guardarCambios() {
    if (this.editarMaquinaForm.invalid) {
      this.editarMaquinaForm.markAllAsTouched();
      return;
    }

    console.log('Guardando cambios:', this.editarMaquinaForm.value);

    // Actualizar datos locales (luego será petición al backend)
    this.maquina.nombre = this.editarMaquinaForm.value.nombre || this.maquina.nombre;
    this.maquina.matricula = this.editarMaquinaForm.value.matricula || this.maquina.matricula;
    this.maquina.modelo = this.editarMaquinaForm.value.modelo || this.maquina.modelo;
    this.maquina.fechaCompra = this.editarMaquinaForm.value.fechaCompra || this.maquina.fechaCompra;
    this.maquina.localizacion = this.editarMaquinaForm.value.localizacion || this.maquina.localizacion;
    this.maquina.trabajador = this.editarMaquinaForm.value.trabajador || this.maquina.trabajador;

    this.cerrarModalEditar();
  }

  eliminarMaquina() {
    if (confirm('¿Estás seguro de que quieres eliminar esta máquina?')) {
      console.log('Eliminar máquina:', this.maquinaId);
      this.router.navigate(['/maquinas']);
    }
  }

  volverListado() {
    this.router.navigate(['/maquinas']);
  }
}
