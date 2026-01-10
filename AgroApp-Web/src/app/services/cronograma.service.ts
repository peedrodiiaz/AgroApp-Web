import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cronograma, CronogramaCrear, DisponibilidadRequest } from '../interfaces/cronograma.interface';

interface CronogramaApiResponse {
  success: boolean;
  data: {
    data: Cronograma[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/cronogramas';

  /**
   * Obtener listado paginado de cronogramas (reservas)
   */
  getAll(params?: { 
    per_page?: number; 
    trabajador_id?: number; 
    maquina_id?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
  }): Observable<Cronograma[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key as keyof typeof params];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, value.toString());
        }
      });
    }
    return this.http.get<CronogramaApiResponse>(this.apiUrl, { params: httpParams }).pipe(
      map(response => response.data.data)
    );
  }

  /**
   * Obtener cronograma por ID
   */
  getById(id: number): Observable<Cronograma> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Crear una nueva reserva
   */
  create(cronograma: CronogramaCrear): Observable<Cronograma> {
    return this.http.post<any>(this.apiUrl, cronograma).pipe(
      map(response => response.data)
    );
  }

  /**
   * Actualizar reserva existente
   */
  update(id: number, cronograma: Partial<Cronograma>): Observable<Cronograma> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cronograma).pipe(
      map(response => response.data)
    );
  }

  /**
   * Eliminar reserva
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Verificar disponibilidad de máquinas en un rango de fechas
   */
  getDisponibilidad(params: DisponibilidadRequest): Observable<Cronograma[]> {
    let httpParams = new HttpParams()
      .set('fechaInicio', params.fechaInicio)
      .set('fechaFin', params.fechaFin);
    
    if (params.maquina_id) {
      httpParams = httpParams.set('maquina_id', params.maquina_id.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/disponibilidad`, { params: httpParams }).pipe(
      map(response => response.data)
    );
  }
}
