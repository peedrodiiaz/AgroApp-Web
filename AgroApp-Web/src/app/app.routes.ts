import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.page/login.pages';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard';


export const routes: Routes = [
    {
        path: 'inicio-sesion',
        component: LoginComponent,
    },
    {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Aquí puedes añadir más páginas hijas (máquinas, incidencias...)
    ]
  },



];
