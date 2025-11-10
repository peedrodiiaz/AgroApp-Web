import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar';
import { TopbarComponent } from '../topbar/topbar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
})
export class AdminLayoutComponent {}
