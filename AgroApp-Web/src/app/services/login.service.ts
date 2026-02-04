import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/auth.interface';
import { ApiConfig } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(ApiConfig.AUTH.LOGIN, credentials);
  }
}
