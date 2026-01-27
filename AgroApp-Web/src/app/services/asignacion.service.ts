import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asignacion, AsignacionCrear } from '../interfaces/asignacion.interface';

@Injectable({ providedIn: 'root' })
export class AsignacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/asignaciones';

  // Obtener todas las asignaciones
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener asignación por ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear asignación
  create(data: AsignacionCrear): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Actualizar asignación
  update(id: number, data: Partial<Asignacion>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar asignación
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener estadísticas
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }
}
