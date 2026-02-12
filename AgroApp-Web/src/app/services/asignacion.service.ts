import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignacion, CreateAsignacionRequest } from '../interfaces/asignacion.interface';
import { SpringPage } from '../interfaces/api-response.interface';
import { ApiConfig } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AsignacionService {
  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 10): Observable<SpringPage<Asignacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SpringPage<Asignacion>>(ApiConfig.ASIGNACIONES, { params });
  }

  
  getById(id: number): Observable<Asignacion> {
    return this.http.get<Asignacion>(`${ApiConfig.ASIGNACIONES}/${id}`);
  }

  
  getByTrabajador(trabajadorId: number): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(`${ApiConfig.ASIGNACIONES}/trabajador/${trabajadorId}`);
  }


  getByMaquina(maquinaId: number): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(`${ApiConfig.ASIGNACIONES}/maquina/${maquinaId}`);
  }



  getActivas(): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(`${ApiConfig.ASIGNACIONES}/activas`);
  }


  getMisAsignaciones(): Observable<Asignacion[]> {
    return this.http.get<Asignacion[]>(`${ApiConfig.ASIGNACIONES}/mis-asignaciones`);
  }

  
  create(data: CreateAsignacionRequest): Observable<Asignacion> {
    return this.http.post<Asignacion>(ApiConfig.ASIGNACIONES, data);
  }

  
  update(id: number, data: CreateAsignacionRequest): Observable<Asignacion> {
    return this.http.put<Asignacion>(`${ApiConfig.ASIGNACIONES}/${id}`, data);
  }

  
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.ASIGNACIONES}/${id}`);
  }
}
