import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  Maquina, 
  CreateMaquinaRequest, 
  UpdateMaquinaDto, 
  CambiarEstadoMaquinaDto,
  MaquinaStatsDto 
} from '../interfaces/maquina.interface';
import { SpringPage } from '../interfaces/api-response.interface';
import { ApiConfig } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class MaquinaService {
  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 10): Observable<SpringPage<Maquina>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<SpringPage<Maquina>>(ApiConfig.MAQUINAS, { params });
  }

  getById(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${ApiConfig.MAQUINAS}/${id}`);
  }

  create(data: CreateMaquinaRequest): Observable<Maquina> {
    return this.http.post<Maquina>(ApiConfig.MAQUINAS, data);
  }

  update(id: number, data: UpdateMaquinaDto): Observable<Maquina> {
    return this.http.put<Maquina>(`${ApiConfig.MAQUINAS}/${id}/estado`, data);
  }

  cambiarEstado(id: number, estado: 'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA'): Observable<Maquina> {
    const dto: CambiarEstadoMaquinaDto = { estado };
    return this.http.patch<Maquina>(`${ApiConfig.MAQUINAS}/${id}/estado`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.MAQUINAS}/${id}`);
  }

  getStats(): Observable<MaquinaStatsDto> {
    return this.http.get<MaquinaStatsDto>(`${ApiConfig.MAQUINAS}/stats`);
  }
}
