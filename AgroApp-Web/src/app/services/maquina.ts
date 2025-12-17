import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina, MaquinaCrear } from '../interfaces/maquina.interface';
import { PaginatedResponse, StatsResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class MaquinaService {
  private http = inject(HttpClient);
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
  }
}
