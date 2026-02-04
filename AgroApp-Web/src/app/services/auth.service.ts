import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse, Usuario } from '../interfaces/auth.interface';
import { ApiConfig } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private currentUser: Usuario | null = null;

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(ApiConfig.AUTH.LOGIN, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.currentUser = response.user;
        this.saveUser(response.user);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.currentUser = null;
  }

  getUser(): Usuario | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  saveUser(user: Usuario): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }
}
