import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  usuario: string;
  email?: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}
=======
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../interfaces/auth.interface';
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
<<<<<<< HEAD
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

=======
  private apiUrl = 'http://localhost:8000/api';
  
  // BehaviorSubject para mantener el estado del usuario autenticado
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  /**
<<<<<<< HEAD
   * Realiza el login del usuario
   */
  login(usuario: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { usuario, password })
      .pipe(
        tap(response => {
          if (response.success && response.token) {
            this.setSession(response);
          }
        })
      );
  }

  /**
   * Realiza el logout del usuario
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearSession();
          this.router.navigate(['/login']);
        })
      );
  }

  /**
   * Registra un nuevo usuario
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Obtiene el usuario actual del servidor
   */
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  /**
   * Guarda la sesión del usuario
   */
  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
    this.currentUserSubject.next(authResult.user);
  }

  /**
   * Limpia la sesión del usuario
   */
  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  /**
   * Obtiene el usuario del localStorage
   */
  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Obtiene el token actual
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica si el usuario está autenticado
=======
   * Registrar un nuevo usuario
   */
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  /**
   * Iniciar sesión
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  /**
   * Cerrar sesión
   */
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearAuthData())
    );
  }

  /**
   * Obtener información del usuario autenticado
   */
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user`);
  }

  /**
   * Verificar si el usuario está autenticado
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
<<<<<<< HEAD
   * Obtiene el usuario actual (sincrono)
   */
  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
=======
   * Obtener el token del localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Obtener el usuario actual desde el BehaviorSubject
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Manejar la respuesta de autenticación (login/register)
   */
  private handleAuthResponse(response: AuthResponse): void {
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
    }
    if (response.user) {
      localStorage.setItem('current_user', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
    }
  }

  /**
   * Limpiar datos de autenticación
   */
  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  /**
   * Obtener usuario desde localStorage al iniciar la app
   */
  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('current_user');
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch {
        return null;
      }
    }
    return null;
  }
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
}
