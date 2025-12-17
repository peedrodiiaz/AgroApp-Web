import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador, TrabajadorCrear } from '../interfaces/trabajador.interface';
import { PaginatedResponse, StatsResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/trabajadores';

  /**
   * Obtener listado paginado de trabajadores
   * @param params Parámetros de consulta (per_page, rol, search, with)
   */
  getAll(params?: { per_page?: number; rol?: string; search?: string; with?: string }): Observable<PaginatedResponse<Trabajador>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Trabajador>>(this.apiUrl, { params: httpParams });
  }

  /**
   * Obtener trabajador por ID
   */
  getById(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear un nuevo trabajador
   */
  create(trabajador: TrabajadorCrear): Observable<Trabajador> {
    return this.http.post<Trabajador>(this.apiUrl, trabajador);
  }

  /**
   * Actualizar trabajador existente
   */
  update(id: number, trabajador: Partial<Trabajador>): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.apiUrl}/${id}`, trabajador);
  }

  /**
   * Eliminar trabajador
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener estadísticas de trabajadores
   */
  getStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/stats`);
  }
}
