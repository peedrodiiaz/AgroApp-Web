import { Component, OnInit, OnDestroy, inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IncidenciaService } from '../../services/incidencia.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-incidencia-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencias-detalle.html',
  styleUrl: './incidencias-detalle.css',
})
export class IncidenciaDetalleComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private incidenciaService = inject(IncidenciaService);
  private cdr = inject(ChangeDetectorRef);

  incidenciaId: number = 0;
  incidencia: any = null;
  isLoading = false;
  private map: L.Map | null = null;

  ngOnInit() {
    this.incidenciaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarIncidencia();
  }

  ngAfterViewInit() {}

  cargarIncidencia() {
    this.isLoading = true;
    this.incidenciaService.getById(this.incidenciaId).subscribe({
      next: (response) => {
        this.incidencia = response;
        this.isLoading = false;
        this.cdr.detectChanges();
        if (response.latitud && response.longitud) {
          const lat = response.latitud as number;
          const lng = response.longitud as number;
          setTimeout(() => this.initMap(lat, lng), 100);
        }
      },
      error: (error: any) => {
        console.error('Error al cargar incidencia:', error);
        this.isLoading = false;
        alert('Error al cargar la información de la incidencia');
        this.volverListado();
      }
    });
  }

  private initMap(lat: number, lng: number) {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    const mapEl = document.getElementById('mapa-incidencia');
    if (!mapEl) return;

    this.map = L.map('mapa-incidencia').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    const icono = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.marker([lat, lng], { icon: icono }).addTo(this.map)
      .bindPopup(`<b>${this.incidencia?.titulo}</b>`)
      .openPopup();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  volverListado() {
    this.router.navigate(['/incidencias']);
  }
}
