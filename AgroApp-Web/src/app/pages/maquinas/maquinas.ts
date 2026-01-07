import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaquinaService } from '../../services/maquina';

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

  ngOnInit() {
    this.cargarMaquinas();
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

  verInfo(maquina: any) {
    this.router.navigate(['/maquinas', maquina.id]);
    this.menuAbierto = null;
  }

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

