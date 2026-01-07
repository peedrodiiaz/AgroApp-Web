import { IncidenciaEditarComponent } from './pages/incidencias-editar/incidencias-editar';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.page/login.pages';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard';
import { MaquinasComponent } from './pages/maquinas/maquinas';
import { MaquinaDetalleComponent } from './pages/maquina-detalle/maquina-detalle';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores';
import { TrabajadorDetalleComponent } from './pages/trabajador-detalle/trabajador-detalle';
import { TrabajadorNuevoComponent } from './pages/trabajador-nuevo/trabajador-nuevo';
import { TrabajadorEditarComponent } from './pages/trabajador-editar/trabajador-editar';
import { IncidenciasComponent } from './pages/incidencias/incidencias';
import { IncidenciaDetalleComponent } from './pages/incidencias-detalle/incidencias-detalle';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  // Ruta de login completamente independiente (sin layout)
  {
    path: 'login',
    component: LoginComponent,
  },
  // Rutas principales con AdminLayout (protegidas con authGuard)
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard], // Protege todas las rutas hijas
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'maquinas', component: MaquinasComponent },
      { path: 'maquinas/:id', component: MaquinaDetalleComponent },
      { path: 'trabajadores/nuevo', component: TrabajadorNuevoComponent },
      { path: 'trabajadores/:id/editar', component: TrabajadorEditarComponent },
      { path: 'trabajadores/:id', component: TrabajadorDetalleComponent },
      { path: 'trabajadores', component: TrabajadoresComponent },
      { path: 'incidencias', component: IncidenciasComponent },
      { path: 'incidencias/:id/editar', component: IncidenciaEditarComponent},
      { path: 'incidencias/:id', component: IncidenciaDetalleComponent },
<<<<<<< HEAD
=======
      {path: 'login', component: LoginComponent }, 
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
    ],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
