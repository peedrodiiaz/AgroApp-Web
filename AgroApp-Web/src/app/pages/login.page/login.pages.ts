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
    usuario: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(50)
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

      const { usuario, password } = this.loginForm.value;

      this.authService.login({ usuario: usuario, password: password }).subscribe({
        next: (response) => {
          console.log('Login exitoso', response);
          
          // Guardar el token en localStorage
          if (response.token) {
            this.authService.saveToken(response.token);
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
