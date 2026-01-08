import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroUsuario } from '../dto/registro.dto';
import { RegistroResponse, LoginResponse } from '../interfaces/auth.interface';
import { Usuario } from '../dto/usuario.dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  crearUsuario(crearUsuario: RegistroUsuario): Observable<RegistroResponse> {
    return this.http.post<RegistroResponse>(`${this.URL_BASE}/register`, crearUsuario);
  }

  loginUsuario(usuario: Usuario): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.URL_BASE}/login`, usuario);
  }
}
