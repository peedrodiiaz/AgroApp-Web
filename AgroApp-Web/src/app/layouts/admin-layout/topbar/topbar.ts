import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class TopbarComponent implements OnInit {
  breadcrumb: string = 'Panel de control';

  constructor(private router: Router) {}

  ngOnInit() {
    // Actualizar breadcrumb al inicio
    this.updateBreadcrumb();

    // Actualizar breadcrumb cada vez que cambie la ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumb();
      }
    });
  }

  updateBreadcrumb() {
    const url = this.router.url;
    console.log('URL actual:', url); // Para debug

    if (url.includes('maquinas')) {
      this.breadcrumb = 'Máquinas';
    } else if (url.includes('trabajadores')) {
      this.breadcrumb = 'Trabajadores';
    } else if (url.includes('incidencias')) {
      this.breadcrumb = 'Incidencias';
    } else if (url === '/' || url === '') {
      this.breadcrumb = 'Panel de control ';
    } else {
      this.breadcrumb = 'Panel de control';
    }
  }
}
