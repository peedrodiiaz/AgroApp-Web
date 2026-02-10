import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaquinaService } from '../../services/maquina.service';

@Component({
  selector: 'app-maquinas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './maquinas.html',
  styleUrl: './maquinas.css',
})
export class MaquinasComponent implements OnInit {
  router = inject(Router);
  maquinaService = inject(MaquinaService);

  tabActivo = 'activas';
  menuAbierto: number | null = null;
  modalAbierto = false;
  isLoading = false;
  searchTerm = '';
  maquinas: any[] = [];

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numSerie: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    fechaCompra: new FormControl('', [Validators.required]),
    ubicacion: new FormControl(''),
    descripcion: new FormControl(''),
  });

  get nuevaMaquinaForm() { return this.form; }
  get f() { return this.form.controls; }

  ngOnInit() {
    this.cargarMaquinas();
  }

  cargarMaquinas() {
    this.isLoading = true;
    this.maquinaService.getAll(0, 100).subscribe({
      next: (response) => {
        this.maquinas = response.content || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar máquinas:', error);
        this.maquinas = [];
        this.isLoading = false;
      }
    });
  }

  get maquinasMostradas() {
    return this.maquinas
      .filter((m: any) => {
        if (this.tabActivo === 'activas') return m.estado === 'ACTIVA';
        if (this.tabActivo === 'mantenimiento') return m.estado === 'MANTENIMIENTO';
        if (this.tabActivo === 'inactivas') return m.estado === 'INACTIVA';
        return true;
      })
      .filter((m: any) => !this.searchTerm || m.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }

  toggleMenu(id: number) {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  verInfo(maquina: any) {
    this.router.navigate(['/maquinas', maquina.id]);
    this.menuAbierto = null;
  }

  cambiarEstado(maquina: any, estado: string) {
    const estadoValido = estado.toUpperCase() as 'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA';
    this.maquinaService.cambiarEstado(maquina.id, estadoValido).subscribe({
      next: () => {
        this.cargarMaquinas();
        this.menuAbierto = null;
      },
      error: () => alert('Error al cambiar estado')
    });
  }

  eliminarMaquina(maquina: any) {
    if (confirm(`¿Eliminar "${maquina.nombre}"?`)) {
      this.maquinaService.delete(maquina.id).subscribe({
        next: () => {
          this.cargarMaquinas();
          this.menuAbierto = null;
        },
        error: () => alert('Error al eliminar')
      });
    }
  }

  abrirModal() {
    this.modalAbierto = true;
    this.form.reset();
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.form.reset();
  }

  guardarMaquina() {
    if (this.form.invalid) return;
    this.maquinaService.create({ ...this.form.value, estado: 'activa' } as any).subscribe({
      next: () => {
        this.cargarMaquinas();
        this.cerrarModal();
      },
      error: () => alert('Error al crear máquina')
    });
  }
}

