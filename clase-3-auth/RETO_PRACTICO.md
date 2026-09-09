# 🎯 Reto Práctico: Implementación de Autenticación & RLS en Vivo (Clase 3)

¡Es hora de codear! Sigue este reto paso a paso durante la sesión para dejar tu aplicación 100% protegida y con inicio de sesión funcional.

---

## ⏱️ Cronograma del Reto (60 minutos)

| Fase | Duración | Objetivo |
| :--- | :--- | :--- |
| **Fase 1** | 15 min | Base de datos: Tabla `profiles`, RLS y Trigger automático |
| **Fase 2** | 20 min | Frontend: Formulario de Registro/Login con Zod |
| **Fase 3** | 15 min | Social Login: Google OAuth & Callback PKCE |
| **Fase 4** | 10 min | Validación de Seguridad: Probar aislamiento RLS y Middleware |

---

## 📝 Paso a Paso del Alumno

### 🔹 Fase 1: Base de Datos & Trigger en Supabase (15 min)
1. Abre tu panel de **Supabase Dashboard** ➔ Ve a **SQL Editor**.
2. Copia y pega el contenido del archivo `sql/01_profiles_and_trigger.sql`.
3. Haz clic en **RUN** y verifica que aparezca: `Success. No rows returned`.
4. Ve a **Table Editor** y comprueba que la tabla `profiles` aparezca con el icono de un candado (**RLS Enabled**).

---

### 🔹 Fase 2: Formulario de Login & Registro en Next.js (20 min)
1. Pídele a **Antigravity** que integre el componente de formulario:
   > *"Integra el formulario de login y registro ubicado en `clase-3-auth/snippets/login-form.tsx` en la ruta `app/login/page.tsx`. Asegura que soporte alternar entre Iniciar Sesión y Crear Cuenta, con manejo de errores y estados de carga."*
2. Ejecuta `npm run dev` en tu terminal.
3. Abre `http://localhost:3000/login` y crea un usuario de prueba (ej: `alumno@test.com`, clave `Password123!`).
4. Revisa en Supabase:
   - En **Authentication > Users** debe aparecer el nuevo usuario.
   - En **Table Editor > profiles** debe haberse creado automáticamente el registro con su `id` y `full_name`.

---

### 🔹 Fase 3: Google OAuth en Vivo (15 min)
1. Sigue las instrucciones de tu PDF `Instructivo_Configuracion_Google_OAuth_Supabase_Clase3.pdf`.
2. Habilita Google en **Supabase > Authentication > Providers**.
3. Pega el prompt maestro en Antigravity para crear el botón de Google y la ruta `app/auth/callback/route.ts`.
4. Haz clic en **Continuar con Google** y verifica que al autorizar te redirija de vuelta a tu app ya autenticado.

---

### 🔹 Fase 4: Auditoría de Seguridad RLS (10 min)
1. Inicia sesión con el Usuario A. Crea una cotización / nota.
2. Abre una ventana de incógnito e inicia sesión con el Usuario B.
3. Intenta consultar la cotización del Usuario A:
   - **Resultado esperado:** Supabase devuelve un arreglo vacío `[]` gracias a la política `auth.uid() = user_id`.
   - **Verificación:** ¡Tu sistema es seguro y resistente a fugas de datos entre clientes!

---

## 🏆 Criterios de Aceptación (Checklist de Entrega)
- [x] Registro por email/password con validación de fortaleza.
- [x] Trigger de Postgres replicando usuarios en `public.profiles`.
- [x] Inicio de sesión con Google funcional.
- [x] Rutas privadas inaccesibles para usuarios anónimos.
- [x] RLS validado y activo en todas las tablas del proyecto.
