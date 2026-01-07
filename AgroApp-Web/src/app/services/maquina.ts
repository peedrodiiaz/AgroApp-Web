import { Injectable, inject } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
=======
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina, MaquinaCrear } from '../interfaces/maquina.interface';
import { PaginatedResponse, StatsResponse } from '../interfaces/api-response.interface';
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8

@Injectable({
  providedIn: 'root',
})
export class MaquinaService {
  private http = inject(HttpClient);
<<<<<<< HEAD
  private apiUrl = `${environment.apiUrl}/maquinas`;

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

  create(maquina: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, maquina).pipe(
      map(response => response.data || response)
    );
  }

  update(id: number, maquina: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, maquina).pipe(
      map(response => response.data || response)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/maquinas/stats`).pipe(
      map(response => response.data || response)
    );
  }

  cambiarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/estado`, { estado }).pipe(
      map(response => response.data || response)
    );
=======
  private apiUrl = 'http://localhost:8000/api/maquinas';

  /**
   * Obtener listado paginado de máquinas
   * @param params Parámetros de consulta (per_page, tipo, estado, search)
   */
  getAll(params?: { per_page?: number; tipo?: string; estado?: string; search?: string }): Observable<PaginatedResponse<Maquina>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Maquina>>(this.apiUrl, { params: httpParams });
  }

  /**
   * Obtener máquina por ID
   */
  getById(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear una nueva máquina
   */
  create(maquina: MaquinaCrear): Observable<Maquina> {
    return this.http.post<Maquina>(this.apiUrl, maquina);
  }

  /**
   * Actualizar máquina existente
   */
  update(id: number, maquina: Partial<Maquina>): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.apiUrl}/${id}`, maquina);
  }

  /**
   * Eliminar máquina
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cambiar estado de una máquina (activa, inactiva, mantenimiento)
   */
  cambiarEstado(id: number, estado: 'activa' | 'inactiva' | 'mantenimiento'): Observable<Maquina> {
    return this.http.patch<Maquina>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  /**
   * Obtener estadísticas de máquinas
   */
  getStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/stats`);
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  }
}
