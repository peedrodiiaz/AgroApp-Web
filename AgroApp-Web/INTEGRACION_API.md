# AgroApp - Integración con API Laravel

## 📋 Estructura de la API

La aplicación está completamente integrada con la API Laravel de AgroApp. Todos los servicios están tipados con TypeScript y listos para usar.

## 🔐 Autenticación

### AuthService

Servicio para manejar autenticación con JWT Bearer tokens.

```typescript
import { AuthService } from './services/auth.service';

// Inyectar el servicio
constructor(private authService: AuthService) {}

// Login
this.authService.login({ email: 'admin@agroapp.com', password: '12345678' })
  .subscribe({
    next: (response) => {
      console.log('Token:', response.token);
      console.log('Usuario:', response.user);
      // El token se guarda automáticamente en localStorage
    },
    error: (error) => console.error('Error login:', error)
  });

// Register
this.authService.register({
  name: 'Usuario',
  email: 'user@example.com',
  password: '12345678',
  password_confirmation: '12345678'
}).subscribe(...);

// Logout
this.authService.logout().subscribe(() => {
  console.log('Sesión cerrada');
});

// Verificar si está autenticado
const isAuth = this.authService.isAuthenticated();

// Obtener usuario actual (Observable)
this.authService.currentUser$.subscribe(user => {
  console.log('Usuario actual:', user);
});

// Obtener token
const token = this.authService.getToken();
```

## 🛡️ Interceptor HTTP

El interceptor `authInterceptor` inyecta automáticamente el token Bearer en todas las peticiones HTTP.

**Ya está configurado** en `app.config.ts`. No necesitas hacer nada más.

## 🚦 Guards de Rutas

### authGuard
Protege rutas que requieren autenticación:

```typescript
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]  // ← Solo usuarios autenticados
  }
];
```

### publicGuard
Redirige usuarios autenticados desde páginas públicas:

```typescript
import { publicGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard]  // ← Si ya está logueado, redirige a dashboard
  }
];
```

## 📦 Servicios Disponibles

### 1️⃣ TrabajadorService

```typescript
import { TrabajadorService } from './services/trabajador';

// Listar trabajadores (paginado)
this.trabajadorService.getAll({ per_page: 15, rol: 'trabajador' })
  .subscribe(response => {
    console.log('Trabajadores:', response.data);
    console.log('Total:', response.total);
    console.log('Página actual:', response.current_page);
  });

// Ver trabajador por ID
this.trabajadorService.getById(1).subscribe(trabajador => {
  console.log(trabajador);
});

// Crear trabajador
this.trabajadorService.create({
  nombre: 'Juan',
  apellido: 'Pérez',
  dni: '12345678A',
  telefono: '600123456',
  email: 'juan@example.com',
  rol: 'trabajador',
  fechaAlta: '2025-01-15'
}).subscribe(nuevo => {
  console.log('Creado:', nuevo);
});

// Actualizar
this.trabajadorService.update(1, { telefono: '600999999' })
  .subscribe(actualizado => console.log(actualizado));

// Eliminar
this.trabajadorService.delete(1).subscribe(() => {
  console.log('Eliminado');
});

// Estadísticas
this.trabajadorService.getStats().subscribe(stats => {
  console.log('Stats:', stats);
});
```

### 2️⃣ MaquinaService

```typescript
import { MaquinaService } from './services/maquina';

// Listar máquinas (con filtros)
this.maquinaService.getAll({ 
  per_page: 15, 
  tipo: 'Tractor',
  estado: 'activa' 
}).subscribe(response => {
  console.log('Máquinas:', response.data);
});

// Crear máquina tipo Tractor
this.maquinaService.create({
  nombre: 'Tractor John Deere',
  numSerie: 'JD-2025-001',
  modelo: '5090E',
  tipo: 'Tractor',
  fechaCompra: '2025-01-10',
  ubicacion: 'Finca Norte',
  potenciaCv: 90,
  tipoCombustible: 'Diésel'
}).subscribe(nueva => console.log(nueva));

// Cambiar estado
this.maquinaService.cambiarEstado(1, 'mantenimiento')
  .subscribe(actualizada => console.log(actualizada));

// Estadísticas
this.maquinaService.getStats().subscribe(stats => {
  console.log('Stats:', stats);
});
```

### 3️⃣ IncidenciaService

```typescript
import { IncidenciaService } from './services/incidencia';

// Listar incidencias (con filtros)
this.incidenciaService.getAll({
  per_page: 15,
  estado: 'abierta',
  prioridad: 'alta'
}).subscribe(response => {
  console.log('Incidencias:', response.data);
});

// Crear incidencia
this.incidenciaService.create({
  titulo: 'Fallo en el motor',
  descripcion: 'El tractor presenta humo negro',
  estado: 'abierta',
  prioridad: 'alta',
  fechaApertura: '2025-01-15T10:30:00',
  maquina_id: 1,
  trabajador_id: 1
}).subscribe(nueva => console.log(nueva));

// Estadísticas
this.incidenciaService.getStats().subscribe(stats => {
  console.log('Stats:', stats);
});
```

### 4️⃣ CronogramaService

```typescript
import { CronogramaService } from './services/cronograma.service';

// Listar cronogramas
this.cronogramaService.getAll({
  per_page: 15,
  trabajador_id: 1
}).subscribe(response => {
  console.log('Cronogramas:', response.data);
});

// Crear cronograma
this.cronogramaService.create({
  fechaInicio: '2025-01-20',
  fechaFin: '2025-01-25',
  color: '#4CAF50',
  descripcion: 'Labrado de campo norte',
  trabajador_id: 1,
  maquina_id: 1
}).subscribe(nuevo => console.log(nuevo));
```

### 5️⃣ AsignacionService

```typescript
import { AsignacionService } from './services/asignacion.service';

// Listar asignaciones
this.asignacionService.getAll({
  per_page: 15,
  tipoAsignacion: 'permanente',
  activas: true
}).subscribe(response => {
  console.log('Asignaciones:', response.data);
});

// Crear asignación temporal
this.asignacionService.create({
  fechaInicio: '2025-01-15',
  fechaFin: '2025-06-30',
  descripcion: 'Asignación temporal',
  tipoAsignacion: 'temporal',
  trabajador_id: 1,
  maquina_id: 1
}).subscribe(nueva => console.log(nueva));

// Crear asignación permanente (sin fecha fin)
this.asignacionService.create({
  fechaInicio: '2025-01-15',
  descripcion: 'Operador principal',
  tipoAsignacion: 'permanente',
  trabajador_id: 2,
  maquina_id: 2
}).subscribe(nueva => console.log(nueva));
```

## 📡 Interfaces TypeScript

Todas las respuestas están tipadas:

```typescript
import { Trabajador } from './interfaces/trabajador.interface';
import { Maquina } from './interfaces/maquina.interface';
import { Incidencia } from './interfaces/incidencia.interface';
import { Cronograma } from './interfaces/cronograma.interface';
import { Asignacion } from './interfaces/asignacion.interface';
import { PaginatedResponse } from './interfaces/api-response.interface';

// Ejemplo de uso con tipado
let trabajadores: Trabajador[] = [];
this.trabajadorService.getAll().subscribe((response: PaginatedResponse<Trabajador>) => {
  trabajadores = response.data; // ← IntelliSense completo
  console.log(response.total, response.current_page);
});
```

## 🌐 Configuración de la API

La URL base está en `src/app/config/api.config.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'  // ← Cambiar aquí si es necesario
};
```

Para producción, crea un archivo `environment.prod.ts` con la URL real del servidor.

## 🔄 Respuestas Paginadas (Laravel)

Todas las respuestas de listados usan la paginación de Laravel:

```typescript
interface PaginatedResponse<T> {
  data: T[];              // ← Array de elementos
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;          // ← Total de registros
}
```

## ⚠️ Manejo de Errores

```typescript
this.trabajadorService.getAll().subscribe({
  next: (response) => {
    console.log('Éxito:', response.data);
  },
  error: (error) => {
    if (error.status === 401) {
      console.log('No autenticado');
      // Redirigir a login
    } else if (error.status === 404) {
      console.log('Recurso no encontrado');
    } else {
      console.error('Error:', error.error.message);
    }
  }
});
```

## 🚀 Inicio Rápido

1. **Asegúrate de que la API Laravel esté corriendo** en `http://localhost:8000`

2. **Ejecuta el frontend Angular**:
   ```bash
   npm start
   ```

3. **Usa el AuthService en el componente de login**:
   ```typescript
   login() {
     this.authService.login(this.credentials).subscribe({
       next: (response) => {
         this.router.navigate(['/dashboard']);
       },
       error: (error) => {
         console.error('Error de login:', error);
       }
     });
   }
   ```

4. **Protege tus rutas** con `authGuard`

5. **¡Listo!** Todos los servicios inyectarán automáticamente el token Bearer.

## 📁 Estructura de Archivos Creados

```
src/app/
├── config/
│   └── api.config.ts              # URLs de la API
├── guards/
│   └── auth.guard.ts              # Guards de autenticación
├── interceptors/
│   └── auth.interceptor.ts        # Interceptor JWT
├── interfaces/
│   ├── api-response.interface.ts  # Respuestas genéricas
│   ├── asignacion.interface.ts
│   ├── auth.interface.ts
│   ├── cronograma.interface.ts
│   ├── incidencia.interface.ts
│   ├── maquina.interface.ts
│   └── trabajador.interface.ts
└── services/
    ├── asignacion.service.ts
    ├── auth.service.ts
    ├── cronograma.service.ts
    ├── incidencia.ts
    ├── maquina.ts
    └── trabajador.ts
```

## 🎯 Próximos Pasos

- Implementa el componente de login usando `AuthService`
- Protege rutas privadas con `authGuard`
- Actualiza componentes para usar los servicios tipados
- Maneja estados de carga y errores en la UI
- Implementa refresh token si la API lo soporta

---

**¡Todo está listo para conectar tu frontend Angular con la API de Laravel!** 🚀
