import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignacion, AsignacionCrear } from '../interfaces/asignacion.interface';
import { SpringPage } from '../interfaces/api-response.interface';
import { ApiConfig } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class AsignacionService {
  private http = inject(HttpClient);

<<<<<<< HEAD
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: AsignacionCrear): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Partial<Asignacion>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
=======
  getAll(page: number = 0, size: number = 10): Observable<SpringPage<Asignacion>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SpringPage<Asignacion>>(ApiConfig.ASIGNACIONES, { params });
  }

  getById(id: number): Observable<Asignacion> {
    return this.http.get<Asignacion>(`${ApiConfig.ASIGNACIONES}/${id}`);
  }

  create(data: AsignacionCrear): Observable<Asignacion> {
    return this.http.post<Asignacion>(ApiConfig.ASIGNACIONES, data);
  }

  update(id: number, data: Partial<Asignacion>): Observable<Asignacion> {
    return this.http.put<Asignacion>(`${ApiConfig.ASIGNACIONES}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.ASIGNACIONES}/${id}`);
>>>>>>> 02805ad1e0b8530d36a8d33d28cf588cdbab0dfc
  }
}
