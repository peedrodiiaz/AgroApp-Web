import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia, CreateIncidenciaRequest, UpdateIncidenciaRequest } from '../interfaces/incidencia.interface';
import { SpringPage } from '../interfaces/api-response.interface';
import { ApiConfig } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  constructor(private http: HttpClient) { }

  getAll(page: number = 0, size: number = 10): Observable<SpringPage<Incidencia>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SpringPage<Incidencia>>(ApiConfig.INCIDENCIAS, { params });
  }

  getById(id: number): Observable<Incidencia> {
    return this.http.get<Incidencia>(`${ApiConfig.INCIDENCIAS}/${id}`);
  }

  create(data: CreateIncidenciaRequest): Observable<Incidencia> {
    return this.http.post<Incidencia>(ApiConfig.INCIDENCIAS, data);
  }

  
  cambiarEstado(id: number, nuevoEstado: string): Observable<Incidencia> {
  return this.http.patch<Incidencia>(
    `${ApiConfig.INCIDENCIAS}/${id}/estado`,
    { estadoIncidencia: nuevoEstado }
  );
}

}
