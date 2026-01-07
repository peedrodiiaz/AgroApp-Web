import { Injectable, inject } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
=======
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incidencia, IncidenciaCrear } from '../interfaces/incidencia.interface';
import { PaginatedResponse, StatsResponse } from '../interfaces/api-response.interface';
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  private http = inject(HttpClient);
<<<<<<< HEAD
  private apiUrl = `${environment.apiUrl}/incidencias`;

  getAll(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data || response)
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data || response)
    );
  }

  create(incidencia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, incidencia).pipe(
      map(response => response.data || response)
    );
  }

  update(id: number, incidencia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, incidencia).pipe(
      map(response => response.data || response)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
=======
  private apiUrl = 'http://localhost:8000/api/incidencias';

  /**
   * Obtener listado paginado de incidencias
   * @param params Parámetros de consulta (per_page, estado, prioridad, maquina_id, trabajador_id, search)
   */
  getAll(params?: { 
    per_page?: number; 
    estado?: string; 
    prioridad?: string; 
    maquina_id?: number;
    trabajador_id?: number;
    search?: string;
  }): Observable<PaginatedResponse<Incidencia>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Incidencia>>(this.apiUrl, { params: httpParams });
  }

  /**
   * Obtener incidencia por ID
   */
  getById(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear una nueva incidencia
   */
  create(incidencia: IncidenciaCrear): Observable<Incidencia> {
    return this.http.post<Incidencia>(this.apiUrl, incidencia);
  }

  /**
   * Actualizar incidencia existente
   */
  update(id: number, incidencia: Partial<Incidencia>): Observable<Incidencia> {
    return this.http.put<Incidencia>(`${this.apiUrl}/${id}`, incidencia);
  }

  /**
   * Eliminar incidencia
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener estadísticas de incidencias
   */
  getStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/stats`);
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  }
}
