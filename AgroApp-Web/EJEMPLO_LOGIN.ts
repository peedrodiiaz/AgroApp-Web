// EJEMPLO DE USO DEL AUTH SERVICE EN EL COMPONENTE LOGIN

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.pages.html',
  styleUrl: './login.pages.css'
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response.user);
        // Redirigir al dashboard después del login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error de login:', error);
        
        // Manejar errores comunes
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas';
        } else if (error.status === 422) {
          this.errorMessage = 'Por favor verifica los datos ingresados';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Intenta de nuevo.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

/* 
EJEMPLO DE HTML PARA EL LOGIN (login.pages.html):

<div class="container my-5">
  <div class="row justify-content-center">
    <div class="col-lg-5">
      <div class="card shadow-sm p-4">
        <div class="text-success fw-bold fs-2 mb-4">AgroApp</div>
        <h4 class="fw-bold">Inicia Sesión</h4>
        <p class="text-muted mb-4">Ingrese sus detalles</p>

        <!-- Mensaje de error -->
        <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>

        <form (ngSubmit)="login()">
          <div class="mb-3">
            <label class="form-label text-success">
              Email <span class="text-danger">*</span>
            </label>
            <input 
              type="email" 
              class="form-control" 
              placeholder="Ingrese su email"
              [(ngModel)]="credentials.email"
              name="email"
              required
              [disabled]="isLoading">
          </div>

          <div class="mb-3">
            <label class="form-label text-success">
              Contraseña <span class="text-danger">*</span>
            </label>
            <input 
              type="password" 
              class="form-control" 
              placeholder="Ingrese su contraseña"
              [(ngModel)]="credentials.password"
              name="password"
              required
              [disabled]="isLoading">
          </div>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="rememberMe">
              <label class="form-check-label" for="rememberMe">
                Recuérdame
              </label>
            </div>
            <a href="#" class="text-primary text-decoration-none">
              Olvidé mi contraseña
            </a>
          </div>

          <button 
            type="submit" 
            class="btn btn-success w-100 mb-2 fw-bold"
            [disabled]="isLoading || !credentials.email || !credentials.password">
            <span *ngIf="!isLoading">LOGIN</span>
            <span *ngIf="isLoading">
              <span class="spinner-border spinner-border-sm me-2"></span>
              Cargando...
            </span>
          </button>
        </form>

        <div class="text-center text-muted mt-4" style="font-size:small;">
          AgroApp. Todos los derechos reservados
        </div>
      </div>
    </div>
  </div>
</div>
*/
