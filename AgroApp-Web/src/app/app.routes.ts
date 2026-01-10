import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.page/login.pages';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard';
import { MaquinasComponent } from './pages/maquinas/maquinas';
import { MaquinaDetalleComponent } from './pages/maquina-detalle/maquina-detalle';
import { TrabajadoresComponent } from './pages/trabajadores/trabajadores';
import { TrabajadorDetalleComponent } from './pages/trabajador-detalle/trabajador-detalle';
import { TrabajadorNuevoComponent } from './pages/trabajador-nuevo/trabajador-nuevo';
import { TrabajadorEditarComponent } from './pages/trabajador-editar/trabajador-editar';
import { IncidenciasComponent } from './pages/incidencias/incidencias';
import { IncidenciaDetalleComponent } from './pages/incidencias-detalle/incidencias-detalle';
import { IncidenciaEditarComponent } from './pages/incidencias-editar/incidencias-editar';
import { CronogramasComponent } from './pages/cronogramas/cronogramas';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'maquinas',
        component: MaquinasComponent
      },
      {
        path: 'maquinas/:id',
        component: MaquinaDetalleComponent
      },
      {
        path: 'trabajadores',
        component: TrabajadoresComponent
      },
      {
        path: 'trabajadores/nuevo',
        component: TrabajadorNuevoComponent
      },
      {
        path: 'trabajadores/:id',
        component: TrabajadorDetalleComponent
      },
      {
        path: 'trabajadores/:id/editar',
        component: TrabajadorEditarComponent
      },
      {
        path: 'cronogramas',
        component: CronogramasComponent
      },
      {
        path: 'incidencias',
        component: IncidenciasComponent
      },
      {
        path: 'incidencias/:id',
        component: IncidenciaDetalleComponent
      },
      {
        path: 'incidencias/:id/editar',
        component: IncidenciaEditarComponent
      }
    ]
  }
];
