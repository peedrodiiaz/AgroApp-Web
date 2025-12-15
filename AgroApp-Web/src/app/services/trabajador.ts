import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/trabajadores';

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(trabajador: any): Observable<any> {
    return this.http.post(this.apiUrl, trabajador);
  }

  update(id: number, trabajador: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, trabajador);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
