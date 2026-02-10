import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token && !req.url.includes('/login')) {
    const reqHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(reqHeader);
  }
  
  return next(req);
};
