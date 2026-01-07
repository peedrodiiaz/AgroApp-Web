import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { MaquinaService } from '../../services/maquina';
=======
import { Maquina } from '../../interfaces/maquina.interface';
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './maquinas.html',
  styleUrl: './maquinas.css',
})
export class MaquinasComponent implements OnInit {
  private router = inject(Router);
  private maquinaService = inject(MaquinaService);

  tabActivo: 'activas' | 'inactivas' | 'mantenimiento' = 'activas';
  menuAbierto: number | null = null;
  modalAbierto: boolean = false;
  isLoading: boolean = false;
  searchTerm: string = '';

  maquinas: any[] = [];

  nuevaMaquinaForm = new FormGroup({
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
    ubicacion: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(100)],
      nonNullable: true
    }),
    descripcion: new FormControl('', {
      nonNullable: true
    }),
  });

  get f() { return this.nuevaMaquinaForm.controls; }

<<<<<<< HEAD
  ngOnInit() {
    this.cargarMaquinas();
=======
  maquinasActivas: Maquina[] = [
    { 
      id: 1, 
      nombre: 'Cosechadora Case IH', 
      numSerie: 'CASE-2025-001', 
      modelo: 'Axial-Flow 250', 
      tipo: 'Cosechadora',
      fechaCompra: '2024-06-15', 
      estado: 'activa', 
      ubicacion: 'Finca 1',
      tipoCultivo: 'Trigo, Cebada',
      anchoCorte: '7.6m',
      capacidadTolva: 10500
    },
    { 
      id: 2, 
      nombre: 'Empacadora New Holland', 
      numSerie: 'NH-2025-002', 
      modelo: 'BR6090', 
      tipo: 'Empacadora',
      fechaCompra: '2024-08-20', 
      estado: 'activa', 
      ubicacion: 'Finca 3',
      tipoBala: 'Redonda',
      capacidadEmpaque: 80
    },
    { 
      id: 3, 
      nombre: 'Tractor John Deere', 
      numSerie: 'JD5090E-2025-001', 
      modelo: '5090E', 
      tipo: 'Tractor',
      fechaCompra: '2025-01-10', 
      estado: 'activa', 
      ubicacion: 'Finca 2',
      potenciaCv: 90,
      tipoCombustible: 'Diésel',
      capacidadRemolque: 3500
    },
    { 
      id: 4, 
      nombre: 'Tractor Massey Ferguson', 
      numSerie: 'MF-2024-003', 
      modelo: 'MF 5700', 
      tipo: 'Tractor',
      fechaCompra: '2024-05-15', 
      estado: 'activa', 
      ubicacion: 'Finca 3',
      potenciaCv: 120,
      tipoCombustible: 'Diésel',
      capacidadRemolque: 4000
    },
  ];

  maquinasInactivas: Maquina[] = [
    { 
      id: 5, 
      nombre: 'Cosechadora Antigua', 
      numSerie: 'OLD-CASE-001', 
      modelo: 'Legacy 100', 
      tipo: 'Cosechadora',
      fechaCompra: '2015-03-10', 
      estado: 'inactiva', 
      ubicacion: 'Almacén',
      descripcion: 'Fuera de servicio por antigüedad'
    },
    { 
      id: 6, 
      nombre: 'Empacadora Vieja', 
      numSerie: 'OLD-NH-002', 
      modelo: 'BR4000', 
      tipo: 'Empacadora',
      fechaCompra: '2016-07-20', 
      estado: 'inactiva', 
      ubicacion: 'Almacén',
      descripcion: 'Reemplazada por modelo nuevo'
    },
    { 
      id: 7, 
      nombre: 'Tractor en Reparación', 
      numSerie: 'REP-JD-003', 
      modelo: 'JD 4000', 
      tipo: 'Tractor',
      fechaCompra: '2018-01-15', 
      estado: 'mantenimiento', 
      ubicacion: 'Taller',
      descripcion: 'En mantenimiento mayor'
    },
  ];

  get maquinasMostradas() {
    return this.tabActivo === 'activas' ? this.maquinasActivas : this.maquinasInactivas;
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  }

  cargarMaquinas() {
    this.isLoading = true;
    this.maquinaService.getAll().subscribe({
      next: (maquinas) => {
        this.maquinas = maquinas;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar máquinas:', error);
        this.isLoading = false;
      }
    });
  }

  get maquinasMostradas() {
    let filtered = this.maquinas.filter(m => {
      if (this.tabActivo === 'activas') return m.estado === 'activa';
      if (this.tabActivo === 'inactivas') return m.estado === 'inactiva';
      if (this.tabActivo === 'mantenimiento') return m.estado === 'mantenimiento';
      return true;
    });

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.nombre.toLowerCase().includes(term) ||
        m.numSerie.toLowerCase().includes(term) ||
        m.modelo.toLowerCase().includes(term) ||
        m.tipo.toLowerCase().includes(term) ||
        (m.ubicacion && m.ubicacion.toLowerCase().includes(term))
      );
    }

    return filtered;
  }

  cambiarTab(tab: 'activas' | 'inactivas' | 'mantenimiento') {
    this.tabActivo = tab;
    this.menuAbierto = null;
  }

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(maquina: Maquina) {
    this.router.navigate(['/maquinas', maquina.id]);
    this.menuAbierto = null;
  }

<<<<<<< HEAD
  cambiarEstado(maquina: any, nuevoEstado: string) {
    this.maquinaService.cambiarEstado(maquina.id, nuevoEstado).subscribe({
      next: () => {
        this.cargarMaquinas();
        this.menuAbierto = null;
      },
      error: (error) => {
        console.error('Error al cambiar estado:', error);
        alert('Error al cambiar el estado de la máquina');
      }
    });
  }

  eliminarMaquina(maquina: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar la máquina "${maquina.nombre}"?`)) {
      this.maquinaService.delete(maquina.id).subscribe({
        next: () => {
          this.cargarMaquinas();
          this.menuAbierto = null;
        },
        error: (error) => {
          console.error('Error al eliminar máquina:', error);
          alert('Error al eliminar la máquina');
        }
      });
    }
=======
  cancelar(maquina: Maquina) {
    console.log('Cancelar:', maquina);
    this.menuAbierto = null;
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  }

  abrirModal() {
    this.modalAbierto = true;
    this.nuevaMaquinaForm.reset();
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.nuevaMaquinaForm.reset();
  }

  guardarMaquina() {
    if (this.nuevaMaquinaForm.invalid) {
      this.nuevaMaquinaForm.markAllAsTouched();
      return;
    }

    const maquinaData = {
      ...this.nuevaMaquinaForm.value,
      estado: 'activa'
    };

    this.maquinaService.create(maquinaData).subscribe({
      next: () => {
        this.cargarMaquinas();
        this.cerrarModal();
        alert('Máquina creada exitosamente');
      },
      error: (error) => {
        console.error('Error al crear máquina:', error);
        alert('Error al crear la máquina');
      }
    });
  }
}

