import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Maquina, MaquinasResponse, MaquinasApiResponse } from '../interfaces/maquina.interface';

@Injectable({
  providedIn: 'root',
})
export class MaquinaService {

  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getMaquinas(): Observable<MaquinasResponse> {
    return this.http.get<MaquinasApiResponse>(`${this.URL_BASE}/maquinas`).pipe(
      map(response => response.data.data)
    );
  }

  // Alias para compatibilidad
  getAll(): Observable<MaquinasResponse> {
    return this.getMaquinas();
  }

  // Obtener una máquina por ID
  getById(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${this.URL_BASE}/maquinas/${id}`);
  }

  removeMaquina(id: number): Observable<MaquinasResponse> {
    return this.http.delete<MaquinasResponse>(`${this.URL_BASE}/maquinas/${id}`);
  }

  // Alias para compatibilidad
  delete(id: number): Observable<MaquinasResponse> {
    return this.removeMaquina(id);
  }
  
  crearMaquina(maquina: Maquina): Observable<MaquinasResponse> {
    return this.http.post<MaquinasResponse>(`${this.URL_BASE}/maquinas`, maquina);
  }

  // Alias para compatibilidad
  create(maquina: any): Observable<MaquinasResponse> {
    return this.crearMaquina(maquina);
  }

  actualizarMaquina(id: number, maquina: Maquina): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.URL_BASE}/maquinas/${id}`, maquina);
  }

  // Alias para compatibilidad
  update(id: number, maquina: any): Observable<Maquina> {
    return this.actualizarMaquina(id, maquina);
  }

  // Método para cambiar estado (para compatibilidad)
  cambiarEstado(id: number, estado: string): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.URL_BASE}/maquinas/${id}`, { estado });
  }
}
