import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse, RegistroResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api';


  register(data: any): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>(`${this.apiUrl}/register`, data);
  }


  login(credentials: any): Observable<LoginResponse> {
  
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }


  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }


  getUser(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/user`);
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
}
