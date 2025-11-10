import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    usuario: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  onSubmit() {
    console.log('** Values **');
    console.log(this.loginForm.value);
  }
}
