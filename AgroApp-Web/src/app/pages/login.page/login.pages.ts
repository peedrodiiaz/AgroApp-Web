import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.pages.html',
  styleUrl: './login.pages.css',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required, 
        
      ],
    }),
    rememberMe: new FormControl(false),
  });

  errorMessage: string = '';
  isLoading: boolean = false;
  
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, password } = this.loginForm.value;

      this.authService.login({ 
        email: email || '', 
        password: password || '' 
      }).subscribe({
        next: (response) => {
          // Validar que el usuario sea ADMIN
          if (response.user.rol !== 'ADMIN') {
            this.isLoading = false;
            this.errorMessage = 'Acceso denegado. Solo administradores pueden entrar en esta aplicación.';
            this.authService.logout();
            return;
          }
          
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error en login', error);
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
        }
      });
    } 
  }
}
