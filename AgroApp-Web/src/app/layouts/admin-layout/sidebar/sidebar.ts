import { Component, HostBinding, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @HostBinding('class.show') @Output() sidebarVisible = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  menuItems = [
    {
      icon: '📊',
      label: 'Dashboard',
      route: '/dashboard',
      hasSubmenu: false
    },
    {
      icon: '🚜',
      label: 'Máquinas',
      route: '/maquinas',
      hasSubmenu: false
    },
    {
      icon: '👷',
      label: 'Trabajadores',
      route: '/trabajadores',
      hasSubmenu: false
    },
    {
      icon: '⚠️',
      label: 'Incidencias',
      route: '/incidencias',
      hasSubmenu: false
    },
    {
      icon: '📅',                        
      label: 'Asignaciones',
      route: '/asignaciones',
      hasSubmenu: false
    }
  ];
}
