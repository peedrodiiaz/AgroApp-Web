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
import { MaquinaService } from '../../services/maquina.service';

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

  editarMaquinaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numSerie: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    fechaCompra: new FormControl('', [Validators.required]),
    ubicacion: new FormControl(''),
    descripcion: new FormControl(''),
  });

  get f() { return this.editarMaquinaForm.controls; }

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
      next: (response) => {
        this.maquina = response;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error al cargar máquina:', error);
        this.isLoading = false;
        alert('Error al cargar la información de la máquina');
      }
    });
  }

  abrirModalEditar() {
    let fechaFormateada = this.maquina.fechaCompra;
    if (fechaFormateada && fechaFormateada.includes('T')) {
      fechaFormateada = fechaFormateada.split('T')[0];
    } else if (fechaFormateada && fechaFormateada.includes('/')) {
      const partes = fechaFormateada.split('/');
      if (partes.length === 3) {
        fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
    }

    this.editarMaquinaForm.patchValue({
      nombre: this.maquina.nombre,
      numSerie: this.maquina.numSerie,
      modelo: this.maquina.modelo,
      tipo: this.maquina.tipo,
      fechaCompra: fechaFormateada,
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

    this.maquinaService.update(this.maquinaId, maquinaData as any).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.maquina = response.data;
        } else {
          this.maquina = response;
        }
        this.cerrarModalEditar();
        alert('Máquina actualizada exitosamente');
        this.cargarMaquina(); 
      },
      error: (error: any) => {
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
    const estadoValido = nuevoEstado.toUpperCase() as 'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA';
    this.maquinaService.cambiarEstado(this.maquinaId, estadoValido).subscribe({
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