import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidencia-editar',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './incidencias-editar.html',
  styleUrl: './incidencias-editar.css',
})
export class IncidenciaEditarComponent implements OnInit {
  incidenciaId: number = 0;
  editarForm = new FormGroup({
    estado: new FormControl('Cerrado', [Validators.required]),
    prioridad: new FormControl('Baja', [Validators.required]),
    trabajador: new FormControl('Lucía Fernández', [Validators.required]),
    maquina: new FormControl('Fumigadora FX-10', [Validators.required]),
    codigo: new FormControl('INC-004', [Validators.required]),
    fechaPublicacion: new FormControl('2024-10-15', [Validators.required]),
    fechaCierre: new FormControl('2024-10-20'),
    categoria: new FormControl(''),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(300)])
  });

  get f(){ return this.editarForm.controls; }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.incidenciaId = Number(this.route.snapshot.paramMap.get('id'));
    this.editarForm.patchValue({
      estado: 'Cerrado', prioridad: 'Baja', trabajador: 'Lucía Fernández', maquina: 'Fumigadora FX-10', codigo: 'INC-004',
      fechaPublicacion: '2024-10-15', fechaCierre: '2024-10-20', categoria: '',
      descripcion: 'El tractor JD-320 presenta problemas en el sistema de transmisión. Al intentar cambiar de marcha, se escuchan ruidos extraños y la palanca se traba. El problema comenzó esta mañana durante las labores de arado en el sector norte.'
    });
  }

  volver(){ this.router.navigate(['/incidencias']); }
  cancelar(){ this.volver(); }
  guardar(){
    if(this.editarForm.invalid) {
      this.editarForm.markAllAsTouched();
      return;
    }
    console.log('Incidencia editada 🌱', this.editarForm.value);
    this.volver();
  }
}
