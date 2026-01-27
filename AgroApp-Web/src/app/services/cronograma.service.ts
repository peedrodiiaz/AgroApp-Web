import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cronograma, CronogramaCrear } from '../interfaces/cronograma.interface';

@Injectable({ providedIn: 'root' })
export class CronogramaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/cronogramas';

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(data: CronogramaCrear): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Partial<Cronograma>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
