import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

<<<<<<< HEAD
=======
/**
 * Guard funcional para proteger rutas que requieren autenticación
 */
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login si no está autenticado
<<<<<<< HEAD
  router.navigate(['/login']);
=======
  router.navigate(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
  return false;
};

/**
 * Guard funcional para redirigir usuarios autenticados desde páginas públicas (como login)
 */
export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Si ya está autenticado, redirigir al dashboard
  router.navigate(['/dashboard']);
>>>>>>> a8ea3b81f347502c9f91f9e9c880a972f9b4c8a8
  return false;
};
