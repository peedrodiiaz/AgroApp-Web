import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  
  if (token && !req.url.includes('/login')) {
    const reqHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    
    return next(reqHeader).pipe(
      catchError(error => {
        // Si el error es 401, limpiar token y redirigir al login
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
  
  return next(req);
};
