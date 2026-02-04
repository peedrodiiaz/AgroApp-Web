import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  menuItems = [
    { icon: '🏠', label: 'Home', route: '/dashboard', active: false },
    { icon: '⚙️', label: 'Maquinas', route: '/maquinas', active: false, hasSubmenu: true },
    { icon: '👥', label: 'Trabajadores', route: '/trabajadores', active: false, hasSubmenu: true },
    { icon: '⚠️', label: 'Incidencias', route: '/incidencias', active: false, hasSubmenu: true },
  ];
}
