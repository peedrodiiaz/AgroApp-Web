import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trabajador-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajador-detalle.html',
  styleUrl: './trabajador-detalle.css',
})
export class TrabajadorDetalleComponent implements OnInit {
  trabajadorId: number = 0;
  trabajador = {
    id: 1,
    nombre: 'John Wick',
    avatar: '👤',
    email: 'john@gmail.com',
    telefono: '67578374',
    fechaAlta: '2023-02-15',
    puesto: 'Operario',
    matriculaAsignada: 'C6434NM'
  };
  salario = {
    base: 1800,
    pluses: 150,
    ultimoCobro: '2024-11-10'
  };
  historial = [
    { id:1 ,tipo: 'incidencia', fecha: '2024-10-21', desc: 'Avería en máquina asignada' },
    { id:2,tipo: 'salario', fecha: '2024-09-30', desc: 'Cobro salario mensual' },
    { id:3,tipo: 'ausencia', fecha: '2024-09-14', desc: 'Día de asuntos propios' },
    { id:4,tipo: 'salario', fecha: '2024-08-30', desc: 'Cobro salario mensual' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.trabajadorId = Number(this.route.snapshot.paramMap.get('id'));
  }

  volverListado() {
    this.router.navigate(['/trabajadores']);
  }

  editarTrabajador() {
    this.router.navigate(['/trabajadores', this.trabajadorId, 'editar']);
  }

  eliminarTrabajador() {
    if (confirm('¿Seguro que quieres eliminar a este trabajador?')) {
      this.router.navigate(['/trabajadores']);
    }
  }
}
