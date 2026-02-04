# 🔄 Migración AgroApp - Frontend Angular adaptado a Backend Spring Boot

## 📋 Resumen de Cambios

Se ha adaptado el frontend Angular para trabajar con el backend Spring Boot. Los cambios principales incluyen la actualización de URLs, interfaces, servicios y componentes.

---

## 🔧 Cambios Realizados

### 1. **Configuración de API** (`src/app/config/api.config.ts`)

**Cambios:**
- ✅ URL base cambiada de `localhost:8000` a `localhost:8080`
- ✅ Endpoint de autenticación actualizado: `/api/auth/login`
- ✅ Eliminado endpoint de registro (no existe en backend)

```typescript
// Antes: http://localhost:8000/api
// Ahora: http://localhost:8080/api
```

---

### 2. **Interfaces y Tipos**

#### **api-response.interface.ts**
- ✅ Agregada interfaz `SpringPage<T>` para manejar respuestas paginadas de Spring Boot
- ✅ Las respuestas paginadas ahora usan `content` en lugar de `data.data`

#### **auth.interface.ts**
- ✅ `Usuario` ahora incluye: `nombre`, `apellido`, `dni`, `telefono`, `fechaAlta`, `rol`
- ✅ `LoginResponse` simplificado (sin campo `success`)

#### **trabajador.interface.ts**
- ✅ Agregadas interfaces: `CreateTrabajadorRequest`, `UpdateTrabajadorRequest`
- ✅ Eliminada estructura de respuesta paginada Laravel

#### **maquina.interface.ts**
- ✅ Simplificada a campos básicos: `id`, `nombre`, `modelo`, `numSerie`, `fechaCompra`, `estado`
- ✅ Estados definidos como enum: `'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA'`
- ✅ Agregadas interfaces: `CreateMaquinaRequest`, `UpdateMaquinaDto`, `CambiarEstadoMaquinaDto`, `MaquinaStatsDto`
- ❌ Eliminados campos no utilizados: `imagen`, `tipo`, `ubicacion`, `descripcion`, `potenciaCv`, etc.

#### **incidencia.interface.ts**
- ✅ Ahora incluye objetos anidados `maquina` y `trabajador` completos
- ✅ Estados: `'ABIERTA' | 'EN_PROGRESO' | 'RESUELTA'`
- ✅ Prioridades: `'BAJA' | 'MEDIA' | 'ALTA'`
- ✅ Agregada interfaz `CreateIncidenciaRequest` con `maquinaId` y `trabajadorId`

#### **asignacion.interface.ts**
- ✅ Ahora incluye objetos anidados `maquina` y `trabajador`
- ❌ Eliminado campo `tipoAsignacion` (no existe en backend)

---

### 3. **Servicios**

#### **login.service.ts** y **auth.service.ts**
- ✅ Login actualizado para usar `/api/auth/login`
- ✅ Respuesta sin campo `success`
- ✅ Token y usuario guardados automáticamente
- ❌ Eliminado endpoint de registro

#### **trabajador.service.ts**
- ✅ Métodos actualizados para usar paginación: `getAll(page, size)`
- ✅ Agregados métodos: `getMe()`, `updateMe()`, `toggleActivacion()`
- ❌ Eliminado método `delete()` (no existe en backend)

#### **maquina.service.ts**
- ✅ Métodos actualizados para usar paginación
- ✅ `cambiarEstado()` ahora usa PATCH y acepta solo estados válidos
- ✅ Método `getStats()` para obtener estadísticas

#### **incidencia.service.ts**
- ✅ Métodos actualizados para usar paginación
- ✅ Agregado método `cerrar()` para cerrar incidencias
- ❌ Eliminados métodos `update()` y `delete()` (no existen en backend)

---

### 4. **Componentes**

#### **login.page**
- ✅ Campo `usuario` cambiado a `email`
- ✅ Validación de email agregada
- ✅ Longitud mínima de contraseña reducida a 6 caracteres
- ✅ HTML actualizado para mostrar "Email" en lugar de "Usuario"

#### **trabajadores.component**
- ✅ `cargarTrabajadores()` usa paginación: `response.content`
- ✅ Método `eliminar()` ahora usa `toggleActivacion()` para desactivar en lugar de eliminar

#### **maquinas.component**
- ✅ `cargarMaquinas()` usa paginación: `response.content`
- ✅ Estados en mayúsculas: `ACTIVA`, `MANTENIMIENTO`, `INACTIVA`
- ✅ Filtrado de máquinas actualizado para usar estados correctos

#### **incidencias.component**
- ✅ Formulario actualizado:
  - `estado` → `estadoIncidencia`
  - `trabajador_id` → `trabajadorId`
  - `maquina_id` → `maquinaId`
- ✅ Estados y prioridades en mayúsculas
- ✅ Método `eliminar()` ahora usa `cerrar()` para cerrar incidencias

---

### 5. **DTOs (Clases)**

#### **trabajador.dto.ts**
- ✅ Tipo `rol` cambiado a `'ADMIN' | 'TRABAJADOR'`
- ✅ Agregado campo opcional `enabled`

#### **maquina.dto.ts**
- ✅ Simplificada a campos básicos del backend
- ✅ Tipo `estado` con valores: `'ACTIVA' | 'MANTENIMIENTO' | 'INACTIVA'`

#### **incidencia.dto.ts**
- ✅ Ahora incluye objetos `maquina` y `trabajador` completos
- ✅ Estados y prioridades tipados
- ❌ Eliminados campos `trabajador_id` y `maquina_id` (se usan objetos completos)

---

## 🔑 Endpoints del Backend

### Autenticación
- `POST /api/auth/login` - Login de usuario

### Trabajadores
- `GET /api/trabajadores` - Listar trabajadores (paginado)
- `POST /api/trabajadores` - Crear trabajador
- `GET /api/trabajadores/me` - Perfil del usuario autenticado
- `PUT /api/trabajadores/me` - Actualizar perfil
- `PATCH /api/trabajadores/{id}/activacion` - Activar/desactivar trabajador

### Máquinas
- `GET /api/maquinas` - Listar máquinas (paginado)
- `POST /api/maquinas` - Crear máquina
- `PUT /api/maquinas/{id}/estado` - Actualizar máquina
- `PATCH /api/maquinas/{id}/estado` - Cambiar estado de máquina
- `DELETE /api/maquinas/{id}` - Eliminar máquina
- `GET /api/maquinas/stats` - Estadísticas de máquinas

### Incidencias
- `GET /api/incidencias` - Listar incidencias (paginado)
- `GET /api/incidencias/{id}` - Obtener incidencia por ID
- `POST /api/incidencias` - Crear incidencia
- `PATCH /api/incidencias/{id}/cerrar` - Cerrar incidencia

---

## 🚀 Estructura de Respuestas Spring Boot

### Respuesta Paginada
```typescript
{
  content: T[],           // Array de elementos
  pageable: {...},
  totalPages: number,
  totalElements: number,
  size: number,
  number: number,        // Número de página (0-indexed)
  first: boolean,
  last: boolean,
  empty: boolean
}
```

### Respuesta de Login
```typescript
{
  token: string,
  user: {
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    dni: string,
    telefono: string,
    fechaAlta: string,
    rol: string
  }
}
```

---

## ⚠️ Notas Importantes

### Estados y Enums
Todos los estados y enums deben estar en **MAYÚSCULAS** para coincidir con el backend:

**Rol:** `ADMIN`, `TRABAJADOR`

**Estado Máquina:** `ACTIVA`, `MANTENIMIENTO`, `INACTIVA`

**Estado Incidencia:** `ABIERTA`, `EN_PROGRESO`, `RESUELTA`

**Prioridad:** `BAJA`, `MEDIA`, `ALTA`

### Campos Eliminados
Los siguientes campos de máquina fueron eliminados (no existen en backend):
- `imagen`, `tipo`, `ubicacion`, `descripcion`
- `potenciaCv`, `tipoCombustible`, `capacidadRemolque`
- `tipoCultivo`, `anchoCorte`, `capacidadTolva`
- `tipoBala`, `capacidadEmpaque`

### Operaciones No Disponibles
- ❌ No hay endpoint de registro de usuarios
- ❌ No hay DELETE de trabajadores (usar activación/desactivación)
- ❌ No hay UPDATE/DELETE de incidencias (usar cerrar)

---

## 🧪 Testing

### Pasos para probar la integración:

1. **Iniciar Backend:**
   ```bash
   cd AgroApp-Api-Spring/AgroAPP
   ./mvnw spring-boot:run
   ```

2. **Iniciar Frontend:**
   ```bash
   cd AgroApp-Web/AgroApp-Web
   npm start
   ```

3. **Verificar que el backend esté en:** `http://localhost:8080`

4. **Probar login con credenciales válidas**

5. **Verificar que los datos se carguen correctamente en:**
   - Lista de trabajadores
   - Lista de máquinas
   - Lista de incidencias

---

## 📝 Pendientes / Mejoras Futuras

- [ ] Crear interceptor para agregar token JWT automáticamente a todas las peticiones
- [ ] Implementar manejo de errores HTTP centralizado
- [ ] Agregar componentes para visualizar detalles de trabajadores/máquinas/incidencias
- [ ] Implementar formularios de edición completos
- [ ] Agregar validaciones de formularios más robustas
- [ ] Implementar paginación completa en los componentes (navegación entre páginas)
- [ ] Agregar spinners/loaders durante las peticiones HTTP
- [ ] Crear guards para proteger rutas según roles de usuario

---

## 👨‍💻 Autor

Cambios realizados por: **GitHub Copilot**
Fecha: **4 de febrero de 2026**
Proyecto: **AgroApp - Sistema de Gestión Agrícola**
