import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateBreadcrumb();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumb();
      }
    });
  }

  updateBreadcrumb() {
    const url = this.router.url;
    console.log('URL actual:', url);
    
    if (url.includes('maquinas')) {
      this.breadcrumb = 'Máquinas';
    } else if (url.includes('trabajadores')) {
      this.breadcrumb = 'Trabajadores';
    } else if (url.includes('incidencias')) {
      this.breadcrumb = 'Incidencias';
    } else if (url === '/' || url === '') {
      this.breadcrumb = 'Panel de control / Home';
    } else {
      this.breadcrumb = 'Panel de control';
    }
  }

  toggleSidebar() {
    console.log('BOTÓN HAMBURGUESA CLICKEADO'); // Debug
    this.toggleSidebarEvent.emit();
  }
}
