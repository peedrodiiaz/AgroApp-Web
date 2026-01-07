import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cronograma, CronogramaCrear } from '../interfaces/cronograma.interface';
import { PaginatedResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/cronogramas';

  /**
   * Obtener listado paginado de cronogramas
   * @param params Parámetros de consulta (per_page, trabajador_id, maquina_id, fecha_inicio, fecha_fin)
   */
  getAll(params?: { 
    per_page?: number; 
    trabajador_id?: number; 
    maquina_id?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<PaginatedResponse<Cronograma>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<PaginatedResponse<Cronograma>>(this.apiUrl, { params: httpParams });
  }

  /**
   * Obtener cronograma por ID
   */
  getById(id: number): Observable<Cronograma> {
    return this.http.get<Cronograma>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear un nuevo cronograma
   */
  create(cronograma: CronogramaCrear): Observable<Cronograma> {
    return this.http.post<Cronograma>(this.apiUrl, cronograma);
  }

  /**
   * Actualizar cronograma existente
   */
  update(id: number, cronograma: Partial<Cronograma>): Observable<Cronograma> {
    return this.http.put<Cronograma>(`${this.apiUrl}/${id}`, cronograma);
  }

  /**
   * Eliminar cronograma
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
