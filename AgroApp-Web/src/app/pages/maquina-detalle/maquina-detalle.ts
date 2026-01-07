import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { MaquinaService } from '../../services/maquina';

@Component({
  selector: 'app-maquina-detalle',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, ReactiveFormsModule],
  templateUrl: './maquina-detalle.html',
  styleUrl: './maquina-detalle.css',
})
export class MaquinaDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private maquinaService = inject(MaquinaService);

  maquinaId: number = 0;
  modalEditarAbierto: boolean = false;
  isLoading: boolean = false;

  maquina: any = null;

  // FormGroup para editar
  editarMaquinaForm = new FormGroup({
    nombre: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      nonNullable: true
    }),
    numSerie: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[A-Z0-9]{6,20}$/i)],
      nonNullable: true
    }),
    modelo: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      nonNullable: true
    }),
    tipo: new FormControl('', {
      validators: [Validators.required],
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
    ubicacion: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true
    }),
    descripcion: new FormControl('', {
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
    events: [],
    height: 'auto',
    editable: false,
    selectable: false
  };

  ngOnInit() {
    this.maquinaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarMaquina();
  }

  cargarMaquina() {
    this.isLoading = true;
    this.maquinaService.getById(this.maquinaId).subscribe({
      next: (maquina) => {
        this.maquina = maquina;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar máquina:', error);
        this.isLoading = false;
        alert('Error al cargar la información de la máquina');
      }
    });
  }

  abrirModalEditar() {
    // Cargar datos actuales en el formulario
    this.editarMaquinaForm.patchValue({
      nombre: this.maquina.nombre,
      numSerie: this.maquina.numSerie,
      modelo: this.maquina.modelo,
      tipo: this.maquina.tipo,
      fechaCompra: this.maquina.fechaCompra,
      ubicacion: this.maquina.ubicacion,
      descripcion: this.maquina.descripcion
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

    const maquinaData = this.editarMaquinaForm.value;

    this.maquinaService.update(this.maquinaId, maquinaData).subscribe({
      next: (maquina) => {
        this.maquina = maquina;
        this.cerrarModalEditar();
        alert('Máquina actualizada exitosamente');
      },
      error: (error) => {
        console.error('Error al actualizar máquina:', error);
        alert('Error al actualizar la máquina');
      }
    });
  }

  eliminarMaquina() {
    if (confirm('¿Estás seguro de que quieres eliminar esta máquina?')) {
      this.maquinaService.delete(this.maquinaId).subscribe({
        next: () => {
          alert('Máquina eliminada exitosamente');
          this.router.navigate(['/maquinas']);
        },
        error: (error) => {
          console.error('Error al eliminar máquina:', error);
          alert('Error al eliminar la máquina');
        }
      });
    }
  }

  cambiarEstado(nuevoEstado: string) {
    this.maquinaService.cambiarEstado(this.maquinaId, nuevoEstado).subscribe({
      next: () => {
        this.cargarMaquina();
        alert(`Estado cambiado a ${nuevoEstado}`);
      },
      error: (error) => {
        console.error('Error al cambiar estado:', error);
        alert('Error al cambiar el estado');
      }
    });
  }

  volverListado() {
    this.router.navigate(['/maquinas']);
  }
}