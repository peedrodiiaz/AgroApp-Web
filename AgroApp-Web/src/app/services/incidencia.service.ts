import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia } from '../interfaces/incidencia.interface';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private apiUrl = 'http://localhost:8000/api/incidencias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: Incidencia): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Partial<Incidencia>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
}
