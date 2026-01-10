import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Incidencia, IncidenciasResponse, IncidenciasApiResponse } from '../interfaces/incidencia.interface';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {

  URL_BASE = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getIncidencias(): Observable<IncidenciasResponse> {
    return this.http.get<IncidenciasApiResponse>(`${this.URL_BASE}/incidencias`).pipe(
      map(response => response.data.data)
    );
  }

  getAll(): Observable<IncidenciasResponse> {
    return this.getIncidencias();
  }

  getById(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.URL_BASE}/incidencias/${id}`);
  }

  removeIncidencia(id: number): Observable<IncidenciasResponse> {
    return this.http.delete<IncidenciasResponse>(`${this.URL_BASE}/incidencias/${id}`);
  }

  delete(id: number): Observable<IncidenciasResponse> {
    return this.removeIncidencia(id);
  }
  
  crearIncidencia(incidencia: Incidencia): Observable<IncidenciasResponse> {
    return this.http.post<IncidenciasResponse>(`${this.URL_BASE}/incidencias`, incidencia);
  }

  create(incidencia: any): Observable<IncidenciasResponse> {
    return this.crearIncidencia(incidencia);
  }

  actualizarIncidencia(id: number, incidencia: Incidencia): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${this.URL_BASE}/incidencias/${id}`, incidencia);
  }

  update(id: number, incidencia: any): Observable<Incidencia> {
    return this.actualizarIncidencia(id, incidencia);
  }
}
