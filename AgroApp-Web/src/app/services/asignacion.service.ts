import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignacion, AsignacionCrear } from '../interfaces/asignacion.interface';
import { PaginatedResponse, StatsResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/asignaciones';

  /**
   * Obtener listado paginado de asignaciones
   * @param params Parámetros de consulta (per_page, trabajador_id, maquina_id, tipoAsignacion, activas)
   */
  getAll(params?: { 
    per_page?: number; 
    trabajador_id?: number; 
    maquina_id?: number;
    tipoAsignacion?: 'temporal' | 'permanente';
    activas?: boolean;
  }): Observable<PaginatedResponse<Asignacion>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Asignacion>>(this.apiUrl, { params: httpParams });
  }

  /**
   * Obtener asignación por ID
   */
  getById(id: number): Observable<Asignacion> {
    return this.http.get<Asignacion>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear una nueva asignación
   */
  create(asignacion: AsignacionCrear): Observable<Asignacion> {
    return this.http.post<Asignacion>(this.apiUrl, asignacion);
  }

  /**
   * Actualizar asignación existente
   */
  update(id: number, asignacion: Partial<Asignacion>): Observable<Asignacion> {
    return this.http.put<Asignacion>(`${this.apiUrl}/${id}`, asignacion);
  }

  /**
   * Eliminar asignación
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtener estadísticas de asignaciones
   */
  getStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/stats`);
  }
}
