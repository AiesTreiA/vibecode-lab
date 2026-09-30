# 🔐 Guía Maestra: Autenticación Segura, Creación de Usuarios y RLS (Clase 3)

Bienvenido a la guía técnica de autenticación de **Vibecode Lab**. En esta sesión aprenderás a construir un flujo de login y registro seguro utilizando **Next.js (App Router)**, **Supabase Auth** y **PostgreSQL Row Level Security (RLS)**.

---

## 🧭 Arquitectura del Flujo de Autenticación

```
[ Usuario en Frontend ]
       │
       ├── (1) Envía credenciales / Inicia OAuth con Google
       ▼
[ Supabase Auth (auth.users) ]
       │
       ├── (2) Valida contraseña / Token OAuth
       ├── (3) Dispara Trigger Postgres automático
       ▼
[ Base de Datos Pública (public.profiles) ]
       │
       ├── (4) Inserta perfil público (id = auth.uid())
       ▼
[ Políticas RLS (Row Level Security) ]
       │
       └── (5) Protege lecturas y escrituras: solo el dueño puede ver/editar sus datos
```

---

## 🛡️ Los 5 Pilares de un Login Seguro

### 1. Separación de `auth.users` y `public.profiles`
- **`auth.users`:** Esquema interno y protegido de Supabase donde se guardan hashes de contraseñas, emails confirmados y metadatos de sesión. Nunca se expone directamente a los clientes.
- **`public.profiles`:** Tu tabla personalizada vinculada por clave foránea (`id UUID REFERENCES auth.users(id)`). Aquí guardas roles, avatar, nombres y datos de negocio.
- **Sincronización:** Se realiza mediante un **Trigger SQL** en PostgreSQL para que no dependa de si el frontend falla.

---

### 2. Manejo de Claves: `ANON_KEY` vs `SERVICE_ROLE_KEY`
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY` (Pública):**
  - Se usa en el navegador y componentes cliente.
  - **Seguridad:** Es segura de exponer **únicamente** porque está restringida por las políticas de **RLS** en la base de datos.
- **`SUPABASE_SERVICE_ROLE_KEY` (Privada / Servidor):**
  - Tiene permisos de superadministrador y **salta todas las políticas RLS**.
  - ⚠️ **NUNCA** debe tener el prefijo `NEXT_PUBLIC_` ni ser importada en componentes del cliente. Solo se usa en Server Actions o rutas `/api`.

---

### 3. Validación de Formularios con Zod
Nunca confíes en los datos enviados desde el frontend. Valida tipo, longitud y complejidad:
```typescript
import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  fullName: z.string().min(2, "El nombre debe tener al menos 2 letras").optional(),
});
```

---

### 4. Prevención de Enumeración de Usuarios
Al manejar errores en el login:
- ❌ **Inseguro:** *"El correo no existe en la base de datos"* o *"Contraseña incorrecta para este correo"*.
- ✅ **Seguro:** *"Credenciales inválidas. Verifica tu correo y contraseña"*.
Esto evita que atacantes descubran qué correos están registrados en tu plataforma.

---

### 5. Protección de Rutas con Middleware
Las rutas privadas (`/dashboard`, `/perfil`, `/admin`) deben verificarse en el **Middleware de Next.js** antes de que el servidor o cliente rendericen la página. Si no hay sesión activa, se redirige inmediatamente a `/login`.

---

## 🚀 Checklist para la Clase

- [ ] Ejecutar el script SQL `01_profiles_and_trigger.sql` en el SQL Editor de Supabase.
- [ ] Verificar que la tabla `public.profiles` tenga **RLS habilitado**.
- [ ] Probar el registro de un nuevo usuario y confirmar que aparece en `auth.users` y en `public.profiles`.
- [ ] Configurar el proveedor de **Google OAuth** en Google Cloud Console y Supabase Dashboard.
- [ ] Implementar el botón "Continuar con Google" y la ruta `/auth/callback`.
- [ ] Probar el acceso a rutas protegidas sin sesión y confirmar la redirección al login.
