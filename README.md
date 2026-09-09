# 🚀 Vibecode Lab — Repositorio Oficial de Material para Alumnos

Bienvenido al repositorio central de recursos, guías técnicas, scripts SQL y snippets de código del programa **Vibecode Lab**.

Este repositorio contiene todo el material práctico utilizado durante las clases en vivo para acelerar tu desarrollo de software con Inteligencia Artificial.

---

## 📚 Índice de Contenidos por Clase

### 🔐 Clase 3: Autenticación Segura, Creación de Usuarios y RLS
- **📊 Presentación Oficial en PDF (16:9):** [`clase-3-auth/Presentacion_Clase_3_Auth_Google_OAuth_RLS.pdf`](clase-3-auth/Presentacion_Clase_3_Auth_Google_OAuth_RLS.pdf)
- **🖥️ Presentación Web Interactiva (HTML):** [`clase-3-auth/presentacion_clase_3.html`](clase-3-auth/presentacion_clase_3.html)
- **📑 Instructivo Paso a Paso Google OAuth (PDF):** [`clase-3-auth/Instructivo_Configuracion_Google_OAuth_Supabase_Clase3.pdf`](clase-3-auth/Instructivo_Configuracion_Google_OAuth_Supabase_Clase3.pdf)
- **🛡️ Guía Teórica de Seguridad:** [`clase-3-auth/GUIA_AUTH_SEGURA.md`](clase-3-auth/GUIA_AUTH_SEGURA.md) — Pilares de login seguro, roles de claves Supabase (Anon vs Service Role) y prevención de vulnerabilidades.
- **🎯 Reto Práctico (60 min):** [`clase-3-auth/RETO_PRACTICO.md`](clase-3-auth/RETO_PRACTICO.md) — Ejercicios paso a paso para la sesión.
- **🗄️ Script SQL:** [`clase-3-auth/sql/01_profiles_and_trigger.sql`](clase-3-auth/sql/01_profiles_and_trigger.sql) — Tabla `profiles`, políticas RLS y Trigger automático en PostgreSQL.
- **⚛️ Snippets de Código:**
  - [`clase-3-auth/snippets/login-form.tsx`](clase-3-auth/snippets/login-form.tsx) — Formulario de Login/Registro con Zod, Tailwind y Google OAuth.
  - [`clase-3-auth/snippets/auth-callback-route.ts`](clase-3-auth/snippets/auth-callback-route.ts) — Route Handler `/auth/callback` para intercambio de código PKCE.
  - [`clase-3-auth/snippets/middleware.ts`](clase-3-auth/snippets/middleware.ts) — Middleware para protección de rutas privadas.

---

### ⚡ Clase 2: Construcción de MVP & Automatizaciones
- **Scripts SQL:** [`clase-2/setup-clase-2-quotes.sql`](clase-2/setup-clase-2-quotes.sql) — Estructura de tabla de cotizaciones.
- **Rutas de Automatización:**
  - [`clase-2/keep-alive-route.ts`](clase-2/keep-alive-route.ts) — Endpoint de persistencia para base de datos Supabase.
  - [`clase-2/quote-route.ts`](clase-2/quote-route.ts) — Endpoint para cálculo de cotizaciones inteligentes con IA.
- **Instructivos PDF:**
  - [`documentos-pdf/Vibecode_Clase_2_Guia_MVP_y_Automatizaciones.pdf`](documentos-pdf/Vibecode_Clase_2_Guia_MVP_y_Automatizaciones.pdf)
  - [`documentos-pdf/Clase_2_CheatSheet_Vibecoding.pdf`](documentos-pdf/Clase_2_CheatSheet_Vibecoding.pdf)

---

### 📖 Documentos & Guías de Referencia General
En la carpeta [`documentos-pdf/`](documentos-pdf/) encontrarás todas las guías oficiales:
- 📊 `Presentacion_Clase_3_Auth_Google_OAuth_RLS.pdf` — Diapositivas oficiales Clase 3.
- 🛠️ `Instructivo_Configuracion_SSH_GitHub.pdf` — Conexión segura con GitHub.
- 🗄️ `Instructivo_Configuracion_Supabase.pdf` — Configuración de base de datos y variables de entorno.
- 💻 `Guia_de_Comandos_Terminal.pdf` — Cheat sheet esencial para consola.
- 🤖 `Glosario_Chatbot_Omnicanal_IA.pdf` & `Optimizacion_Tokens_Contexto_IA.pdf` — Fundamentos de IA y gestión de contexto.
- 🔒 `Prompts_Auditoria_Seguridad_IA.pdf` — Auditoría de código asistida por IA.

---

## 🛠️ Cómo Utilizar este Repositorio

1. **Clona el repositorio localmente:**
   ```bash
   git clone git@github.com:AiesTreiA/vibecode-lab.git
   ```
2. **Navega a la carpeta de la clase:**
   ```bash
   cd vibecode-lab/clase-3-auth
   ```
3. **Copia los scripts y prompts en tu proyecto de trabajo o pídele a Antigravity que los integre directamente.**

---
© **Mujica AI Lab SpA** — Material de uso formativo exclusivo para alumnos de Vibecode Lab.
