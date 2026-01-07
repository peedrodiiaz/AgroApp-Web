import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

<<<<<<< HEAD
=======
/**
 * Interceptor funcional para inyectar el token de autenticación en las peticiones HTTP
 */
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

<<<<<<< HEAD
  // Si existe un token, lo agregamos al header
  if (token) {
    req = req.clone({
=======
  // Si existe token, clonamos la petición y añadimos el header Authorization
  if (token) {
    const clonedRequest = req.clone({
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
<<<<<<< HEAD
  }

=======
    return next(clonedRequest);
  }

  // Si no hay token, continuamos con la petición original
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  return next(req);
};
