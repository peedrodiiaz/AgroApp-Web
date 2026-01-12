import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CronogramaService } from '../../services/cronograma.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { MaquinaService } from '../../services/maquina.service';
import { Cronograma } from '../../interfaces/cronograma.interface';
import { Trabajador } from '../../interfaces/trabajador.interface';
import { Maquina } from '../../interfaces/maquina.interface';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
selector: 'app-cronogramas',
standalone: true,
imports: [CommonModule, FormsModule, ReactiveFormsModule, FullCalendarModule],
templateUrl: './cronogramas.html',
styleUrl: './cronogramas.css',
})
export class CronogramasComponent implements OnInit {
private cronogramaService = inject(CronogramaService);
private trabajadorService = inject(TrabajadorService);
private maquinaService = inject(MaquinaService);

vistaActiva: 'calendario' | 'lista' = 'calendario';
isLoading = false;
modalAbierto = false;
cronogramaSeleccionado: Cronograma | null = null;

cronogramas: Cronograma[] = [];
trabajadores: Trabajador[] = [];
maquinas: Maquina[] = [];

filtroMaquina: number | null = null;
filtroTrabajador: number | null = null;
filtroEstado: string = 'todas';
searchTerm = '';

calendarOptions = signal<CalendarOptions>({
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    list: 'Lista'
    },
    events: [],
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    height: 'auto',
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this)
});

reservaForm = new FormGroup({
    maquina_id: new FormControl<number | null>(null, [Validators.required]),
    trabajador_id: new FormControl<number | null>(null, [Validators.required]),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl('', [Validators.required]),
    horaInicio: new FormControl(''),
    horaFin: new FormControl(''),
    descripcion: new FormControl(''),
    color: new FormControl('#198754'),
    estado: new FormControl('pendiente')
});

ngOnInit() {
    this.cargarDatos();
}

cargarDatos() {
    this.isLoading = true;
    Promise.all([
    this.cronogramaService.getAll().toPromise(),
    this.trabajadorService.getAll().toPromise(),
    this.maquinaService.getAll().toPromise()
    ]).then(([cronogramas, trabajadores, maquinas]) => {
    this.cronogramas = cronogramas || [];
    this.trabajadores = trabajadores || [];
    this.maquinas = maquinas || [];
    this.actualizarEventosCalendario();
    this.isLoading = false;
    }).catch(error => {
    console.error('Error al cargar datos:', error);
    this.isLoading = false;
    alert('Error al cargar los datos');
    });
}

actualizarEventosCalendario() {
    const eventos: EventInput[] = this.cronogramas.map(cronograma => {
    const titulo = `${cronograma.maquina?.nombre || 'Máquina'} - ${cronograma.trabajador?.nombre || 'Trabajador'}`;
    const descripcion = cronograma.descripcion ? `\n${cronograma.descripcion}` : '';
    
    let start = cronograma.fechaInicio;
    let end = cronograma.fechaFin;
    
    if (cronograma.horaInicio) {
        start = `${cronograma.fechaInicio}T${cronograma.horaInicio}`;
    }
    if (cronograma.horaFin) {
        end = `${cronograma.fechaFin}T${cronograma.horaFin}`;
    }

    return {
        id: cronograma.id.toString(),
        title: titulo + descripcion,
        start: start,
        end: end,
        backgroundColor: cronograma.color || this.getColorPorEstado(cronograma.estado),
        borderColor: cronograma.color || this.getColorPorEstado(cronograma.estado),
        extendedProps: {
        cronograma: cronograma
        }
    };
    });

    this.calendarOptions.update(options => ({
    ...options,
    events: eventos
    }));
}

getColorPorEstado(estado: string): string {
    const colores: any = {
    'pendiente': '#ffc107',
    'confirmada': '#0dcaf0',
    'en_uso': '#0d6efd',
    'completada': '#198754',
    'cancelada': '#dc3545'
    };
    return colores[estado] || '#6c757d';
}

handleEventClick(clickInfo: EventClickArg) {
    const cronograma = clickInfo.event.extendedProps['cronograma'] as Cronograma;
    this.cronogramaSeleccionado = cronograma;
    
    const opciones = [
    'Ver detalles',
    'Cambiar estado',
    'Eliminar',
    'Cancelar'
    ];
    
    const accion = prompt(
    `Reserva: ${cronograma.maquina?.nombre}\n` +
    `Trabajador: ${cronograma.trabajador?.nombre} ${cronograma.trabajador?.apellido}\n` +
    `Estado: ${this.getEstadoTexto(cronograma.estado)}\n` +
    `Fecha: ${cronograma.fechaInicio} - ${cronograma.fechaFin}\n\n` +
    `Seleccione una opción:\n` +
    `1. ${opciones[0]}\n` +
    `2. ${opciones[1]}\n` +
    `3. ${opciones[2]}\n` +
    `4. ${opciones[3]}`
    );

    if (accion === '2') {
    this.mostrarCambioEstado(cronograma);
    } else if (accion === '3') {
    if (confirm('¿Estás seguro de eliminar esta reserva?')) {
        this.eliminarReservaCalendario(cronograma.id);
    }
    }
}

handleDateClick(arg: any) {
    this.abrirModal();
    this.reservaForm.patchValue({
    fechaInicio: arg.dateStr,
    fechaFin: arg.dateStr
    });
}

mostrarCambioEstado(cronograma: Cronograma) {
    const nuevoEstado = prompt(
    `Estado actual: ${this.getEstadoTexto(cronograma.estado)}\n\n` +
    `Seleccione nuevo estado:\n` +
    `1. Pendiente\n` +
    `2. Confirmada\n` +
    `3. En Uso\n` +
    `4. Completada\n` +
    `5. Cancelada`
    );

    const estados = ['pendiente', 'confirmada', 'en_uso', 'completada', 'cancelada'];
    const indice = parseInt(nuevoEstado || '0') - 1;
    
    if (indice >= 0 && indice < estados.length) {
    this.cambiarEstado(cronograma, estados[indice]);
    }
}

eliminarReservaCalendario(id: number) {
    this.cronogramaService.delete(id).subscribe({
    next: () => {
        alert('Reserva eliminada exitosamente');
        this.cargarDatos();
    },
    error: (error) => {
        console.error('Error al eliminar reserva:', error);
        alert('Error al eliminar la reserva');
    }
    });
}

get cronogramasFiltrados() {
    let resultado = [...this.cronogramas];

    if (this.filtroMaquina) {
    resultado = resultado.filter(c => c.maquina_id === this.filtroMaquina);
    }

    if (this.filtroTrabajador) {
    resultado = resultado.filter(c => c.trabajador_id === this.filtroTrabajador);
    }

    if (this.filtroEstado !== 'todas') {
    resultado = resultado.filter(c => c.estado === this.filtroEstado);
    }

    if (this.searchTerm.trim()) {
    const term = this.searchTerm.toLowerCase();
    resultado = resultado.filter(c =>
        c.descripcion?.toLowerCase().includes(term) ||
        c.maquina?.nombre?.toLowerCase().includes(term) ||
        c.trabajador?.nombre?.toLowerCase().includes(term) ||
        c.trabajador?.apellido?.toLowerCase().includes(term)
    );
    }

    return resultado;
}

cambiarVista(vista: 'calendario' | 'lista') {
    this.vistaActiva = vista;
}

abrirModal() {
    this.modalAbierto = true;
    this.reservaForm.reset({
    color: '#198754',
    estado: 'pendiente'
    });
}

cerrarModal() {
    this.modalAbierto = false;
    this.reservaForm.reset();
}

get f() {
    return this.reservaForm.controls;
}

crearReserva() {
    if (this.reservaForm.invalid) {
    this.reservaForm.markAllAsTouched();
    return;
    }

    this.isLoading = true;
    const formValue = this.reservaForm.value;
    
    const reservaData: any = {
    maquina_id: formValue.maquina_id,
    trabajador_id: formValue.trabajador_id,
    fechaInicio: formValue.fechaInicio,
    fechaFin: formValue.fechaFin,
    color: formValue.color || '#198754',
    descripcion: formValue.descripcion || '',
    estado: formValue.estado || 'pendiente'
    };
    


    if (formValue.horaInicio && formValue.horaInicio.trim() !== '') {
    reservaData.horaInicio = formValue.horaInicio;
    }
    if (formValue.horaFin && formValue.horaFin.trim() !== '') {
    reservaData.horaFin = formValue.horaFin;
    }

    console.log('Datos enviados al backend:', reservaData);

    this.cronogramaService.create(reservaData).subscribe({
    next: () => {
        this.isLoading = false;
        alert('Reserva creada exitosamente');
        this.cerrarModal();
        this.cargarDatos();
    },
    error: (error) => {
        this.isLoading = false;
        console.error('Error al crear reserva:', error);
        console.error('Respuesta del servidor:', error.error);
        
        if (error.status === 409) {
        alert('La máquina ya está reservada en ese periodo de tiempo');
        } else if (error.error?.errors) {
        const errors = Object.values(error.error.errors).flat();
        alert('Errores de validación:\n' + errors.join('\n'));
        } else if (error.error?.message) {
        alert('Error: ' + error.error.message);
        } else {
        alert('Error al crear la reserva. Revisa la consola para más detalles.');
        }
    }
    });
}

eliminarReserva(id: number, event: Event) {
    event.stopPropagation();
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) {
    return;
    }

    this.cronogramaService.delete(id).subscribe({
    next: () => {
        alert('Reserva eliminada exitosamente');
        this.cargarDatos();
    },
    error: (error) => {
        console.error('Error al eliminar reserva:', error);
        alert('Error al eliminar la reserva');
    }
    });
}

cambiarEstado(cronograma: Cronograma, nuevoEstado: string) {
    this.cronogramaService.update(cronograma.id, { estado: nuevoEstado as any }).subscribe({
    next: () => {
        alert('Estado actualizado exitosamente');
        this.cargarDatos();
    },
    error: (error) => {
        console.error('Error al cambiar estado:', error);
        alert('Error al cambiar el estado');
    }
    });
}

getEstadoClass(estado: string): string {
    const estados: any = {
    'pendiente': 'bg-warning',
    'confirmada': 'bg-info',
    'en_uso': 'bg-primary',
    'completada': 'bg-success',
    'cancelada': 'bg-danger'
    };
    return estados[estado] || 'bg-secondary';
}

getEstadoTexto(estado: string): string {
    const estados: any = {
    'pendiente': 'Pendiente',
    'confirmada': 'Confirmada',
    'en_uso': 'En Uso',
    'completada': 'Completada',
    'cancelada': 'Cancelada'
    };
    return estados[estado] || estado;
}

limpiarFiltros() {
    this.filtroMaquina = null;
    this.filtroTrabajador = null;
    this.filtroEstado = 'todas';
    this.searchTerm = '';
}
}
