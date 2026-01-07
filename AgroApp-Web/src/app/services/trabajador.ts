import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
=======
import { Trabajador, TrabajadorCrear } from '../interfaces/trabajador.interface';
import { PaginatedResponse, StatsResponse } from '../interfaces/api-response.interface';
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private http = inject(HttpClient);
<<<<<<< HEAD
  private apiUrl = `${environment.apiUrl}/trabajadores`;

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

  create(trabajador: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, trabajador).pipe(
      map(response => response.data || response)
    );
  }

  update(id: number, trabajador: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, trabajador).pipe(
      map(response => response.data || response)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/trabajadores/stats`).pipe(
      map(response => response.data || response)
    );
=======
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
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  }
}
