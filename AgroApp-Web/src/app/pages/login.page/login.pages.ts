import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.pages.html',
  styleUrl: './login.pages.css',
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\\s]+$')
      ]
    }),
    password: new FormControl('', {
      validators: [Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(50)],
    }),
    rememberMe: new FormControl(false),
  });
  get f() {return this.loginForm.controls;}

  onSubmit() {
    console.log('** Values **');
    console.log(this.loginForm.value);
  }
}
