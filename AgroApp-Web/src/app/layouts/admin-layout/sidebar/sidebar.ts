import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  menuItems = [
    { icon: '🏠', label: 'Home', route: '/home', active: true },
    { icon: '⚙️', label: 'Maquinas', route: '/maquinas', active: false, hasSubmenu: true },
    { icon: '👥', label: 'Trabajadores', route: '/trabajadores', active: false, hasSubmenu: true },
    { icon: '⚠️', label: 'Incidencias', route: '/incidencias', active: false, hasSubmenu: true },
  ];
}
