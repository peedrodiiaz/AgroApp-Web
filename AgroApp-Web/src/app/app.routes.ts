import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component/login.component';
import { RegisterComponent } from './pages/register.component/register.component';

export const routes: Routes = [
    {
        path: 'inicio-sesion',
        component: LoginComponent,
    },
    {
        path: 'registro',
        component: RegisterComponent

    }

];
