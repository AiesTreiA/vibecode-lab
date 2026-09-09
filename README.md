# 🚀 Vibecode Lab: De Cero a SaaS Validado

> **¡Bienvenido/a a la experiencia de construcción y lanzamiento de software más intensa y práctica!**  
> En **Vibecode Lab** no solo aprenderás a escribir código moderno; aprenderás a **crear productos digitales reales, salir al mercado rápidamente y validar tu idea de SaaS con usuarios reales.**

> 📺 **Clases Grabadas & Plataforma de Alumnos:**  
> Puedes ver todas las sesiones grabadas y acceder al material de las clases en [www.javiermujica.com/vibecodelab](https://www.javiermujica.com/vibecodelab).

---

## 💡 La Filosofía: Build + Market Fit

El mercado no premia el código guardado en tu computadora local. El mercado premia la **velocidad de ejecución**, la **resolución de problemas reales** y la **capacidad de iterar con usuarios vivos**.

En este Bootcamp desarrollarás dos superpoderes esenciales:
1. 🛠️ **The Builder Mindset:** Construir micro-servicios e interfaces de nivel profesional usando Vibe Coding, Inteligencia Artificial y arquitecturas escalables.
2. 📈 **The Marketer & Founder Mindset:** Validar ideas, lanzar campañas de captación de *early adopters*, integrar pasarelas de pago y medir métricas reales de negocio.

---

## 🛠️ El Tech Stack del Bootcamp

Hemos seleccionado un conjunto de tecnologías de alto rendimiento utilizadas por las startups más ágiles del mundo:

| Capa | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Frontend & Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white) | Desarrollo full-stack optimizado para SEO, velocidad y renderizado híbrido. |
| **Backend & Microservicios** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) ![Go](https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white) | Lógica de servidor ultrarrápida con Node.js y microservicios de alto rendimiento en Go. |
| **Base de Datos & Auth** | ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) | PostgreSQL gestionado, autenticación instantánea, almacenamiento de archivos y Row Level Security. |
| **Inteligencia Artificial** | ![Google AI Studio](https://img.shields.io/badge/Google%20AI%20Studio-4285F4?style=flat-square&logo=google&logoColor=white) | Integración directa con los modelos **Gemini** para potenciar tu SaaS con capacidades de IA. |
| **Hosting & Cloud** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Despliegues automatizados con CI/CD global a través de Vercel. |
| **Monetización & Mails** | `Mercado Pago` / `Resend` | Procesamiento de pagos reales y automatización de correos transaccionales. |

---

## 🏁 Guía de Inicio Rápido para Alumnos

Sigue estos pasos para dejar tu entorno listo en menos de 5 minutos:

### 1. Clonar el repositorio
```bash
git clone git@github.com:AiesTreiA/vibecode-lab.git
cd vibecode-lab
```

### 2. Configurar las variables de entorno
Copia la plantilla de credenciales `.env.example` y crea tu archivo `.env` local:

* **Windows (PowerShell):**
  ```powershell
  cp .env.example .env
  ```
* **Mac / Linux / Git Bash:**
  ```bash
  cp .env.example .env
  ```

> 🔒 **Nota de Seguridad:** El archivo `.env` contiene tus claves privadas y nunca se subirá a GitHub. Tu `.gitignore` ya está configurado para proteger tus secretos.

### 3. Verificar tu entorno con el "Doctor CLI"
Ejecuta el script de diagnóstico para asegurar que tienes todas las herramientas necesarias (Node.js, Git, Go, etc.) instaladas en tu equipo:

```bash
node doctor.js
```

Si el script muestra `🚀 ¡Entorno 100% listo para construir en Vibecode Lab!`, ¡estás listo para empezar!

---

## 📚 Recursos & Materiales por Clase

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

### ⚡ Clase 2: Construcción del MVP & Automatizaciones
- 📄 **[Guía Oficial de Laboratorio (PDF)](documentos-pdf/Vibecode_Clase_2_Guia_MVP_y_Automatizaciones.pdf)**: Manual detallado paso a paso con botones de cron-job.org, SQL RLS y despliegue en Vercel.
- 📄 **[Cheat Sheet de Vibecoding (PDF)](documentos-pdf/Clase_2_CheatSheet_Vibecoding.pdf)**: Ficha rápida de 1 página con el Prompt Maestro completo de producción.
- 🗄️ **[Script SQL para Supabase](clase-2/setup-clase-2-quotes.sql)**: Tabla `quotes` con Row Level Security para el SQL Editor.
- 💻 **[Endpoint Keep-Alive](clase-2/keep-alive-route.ts)**: Código de persistencia gratuita para `app/api/keep-alive/route.ts`.
- 💻 **[Endpoint Cotizador Gemini](clase-2/quote-route.ts)**: Código de orquestación IA y cálculo matemático para `app/api/quote/route.ts`.

---

### 📖 Documentos & Guías de Referencia General
En la carpeta [`documentos-pdf/`](documentos-pdf/) encontrarás todas las guías oficiales:
- 📊 `Presentacion_Clase_3_Auth_Google_OAuth_RLS.pdf` — Diapositivas oficiales Clase 3.
- 🛠️ `Instructivo_Configuracion_SSH_GitHub.pdf` — Conexión segura con GitHub.
- 🗄️ `Instructivo_Configuracion_Supabase.pdf` — Configuración de base de datos y variables de entorno.
- 💻 `Guia_de_Comandos_Terminal.pdf` — Cheat sheet esencial para consola.
- 🤖 `Glosario_Chatbot_Omnicanal_IA.pdf` & `Optimizacion_Tokens_Contexto_IA.pdf` — Fundamentos de IA y gestión de contexto.
- 🔒 `Prompts_Auditoria_Seguridad_IA.pdf` — Auditoría de código asistida por IA.
- 📄 `Vibecode Lab - Offer Doc.pdf` — Documento del programa.

---

## 🗺️ Hoja de Ruta del Bootcamp

- [x] **Fase 1: Preparación del Entorno & Tooling (Día 1)**
  - Configuración de repositorio, Node.js, Go, Git y Doctor CLI.
- [x] **Fase 2: Arquitectura del MVP & Automatizaciones (Día 2)**
  - Cotizador con Gemini AI, Persistencia Supabase, Keep-Alive y Vercel.
- [x] **Fase 3: Autenticación Segura & Gestión de Usuarios (Día 3)**
  - Google OAuth con Supabase Auth, Row Level Security (RLS) y Next.js Middleware.
- [ ] **Fase 4: Landing Page de Alta Conversión & Captación**
  - UI/UX moderna, captura de leads e integración de analíticas.
- [ ] **Fase 5: Monetización, Despliegue en Vercel & Lanzamiento**
  - Cobros reales con Mercado Pago/Stripe, despliegue continuo y salida oficial al mercado.

---

## 🤝 Soporte & Comunidad

Si te trabas en algún paso o tienes dudas con el código:
1. Ejecuta `node doctor.js` para revisar errores de dependencias.
2. Consulta el canal de soporte del Bootcamp.
3. Recuerda la regla de oro: **"Ship fast, learn faster"** (Publica rápido, aprende más rápido).

---

<p align="center">
  Hecho con ❤️ para la comunidad de <b>Vibecode Lab</b>. ¡A construir tu próximo SaaS! 🚀<br>
  © <b>Mujica AI Lab SpA</b> — Material de uso formativo exclusivo para alumnos de Vibecode Lab.
</p>
