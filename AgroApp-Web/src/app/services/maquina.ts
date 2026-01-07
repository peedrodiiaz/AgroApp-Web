import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaquinaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/maquinas`;

  getAll(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data || response)
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data || response)
    );
  }

  create(maquina: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, maquina).pipe(
      map(response => response.data || response)
    );
  }

  update(id: number, maquina: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, maquina).pipe(
      map(response => response.data || response)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/maquinas/stats`).pipe(
      map(response => response.data || response)
    );
  }

  cambiarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/estado`, { estado }).pipe(
      map(response => response.data || response)
    );
  }
}
