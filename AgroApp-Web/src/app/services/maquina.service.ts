import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maquina } from '../interfaces/maquina.interface';

@Injectable({ providedIn: 'root' })
export class MaquinaService {
  private apiUrl = 'http://localhost:8000/api/maquinas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  
  create(data: Maquina): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: Partial<Maquina>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  cambiarEstado(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { estado });
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
}
