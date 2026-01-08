import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trabajador, TrabajadoresResponse, TrabajadoresApiResponse } from '../interfaces/trabajador.interface';

@Injectable({
  providedIn: 'root',
})
export class TrabajadorService {

  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getTrabajadores(): Observable<TrabajadoresResponse> {
    return this.http.get<TrabajadoresApiResponse>(`${this.URL_BASE}/trabajadores`).pipe(
      map(response => response.data.data)
    );
  }

  // Alias para compatibilidad
  getAll(): Observable<TrabajadoresResponse> {
    return this.getTrabajadores();
  }

  // Obtener un trabajador por ID
  getById(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.URL_BASE}/trabajadores/${id}`);
  }

  removeTrabajador(id: number): Observable<TrabajadoresResponse> {
    return this.http.delete<TrabajadoresResponse>(`${this.URL_BASE}/trabajadores/${id}`);
  }

  // Alias para compatibilidad
  delete(id: number): Observable<TrabajadoresResponse> {
    return this.removeTrabajador(id);
  }
  
  crearTrabajador(trabajador: Trabajador): Observable<TrabajadoresResponse> {
    return this.http.post<TrabajadoresResponse>(`${this.URL_BASE}/trabajadores`, trabajador);
  }

  // Alias para compatibilidad
  create(trabajador: any): Observable<TrabajadoresResponse> {
    return this.crearTrabajador(trabajador);
  }

  actualizarTrabajador(id: number, trabajador: Trabajador): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.URL_BASE}/trabajadores/${id}`, trabajador);
  }

  // Alias para compatibilidad
  update(id: number, trabajador: any): Observable<Trabajador> {
    return this.actualizarTrabajador(id, trabajador);
  }
}
