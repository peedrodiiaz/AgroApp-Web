import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajador, CreateTrabajadorRequest, UpdateTrabajadorRequest } from '../interfaces/trabajador.interface';
import { SpringPage } from '../interfaces/api-response.interface';
import { ApiConfig } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class TrabajadorService {
  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 10): Observable<SpringPage<Trabajador>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SpringPage<Trabajador>>(ApiConfig.TRABAJADORES, { params });
  }

  getMe(): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${ApiConfig.TRABAJADORES}/me`);
  }

  updateMe(data: UpdateTrabajadorRequest): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${ApiConfig.TRABAJADORES}/me`, data);
  }

  update(id: number, data: UpdateTrabajadorRequest): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${ApiConfig.TRABAJADORES}/${id}`, data);
  }

  create(data: CreateTrabajadorRequest): Observable<Trabajador> {
    return this.http.post<Trabajador>(ApiConfig.TRABAJADORES, data);
  }

  toggleActivacion(id: number): Observable<Trabajador> {
    return this.http.patch<Trabajador>(`${ApiConfig.TRABAJADORES}/${id}/activacion`, {});
  }
}
