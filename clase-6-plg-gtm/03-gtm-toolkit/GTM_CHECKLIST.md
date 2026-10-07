# Checklist: Go-To-Market & Tracción (Primeros 100 Usuarios)

Este documento es tu plan de acción para el lanzamiento de tu aplicación (Módulo PLG). El objetivo no es escalar a 1 millón de usuarios el día uno, sino conseguir los primeros 100 usuarios activos para validar el Product-Led Growth y las mecánicas de retención.

## FASE 1: Preparación Técnica (Product-Led Growth & Analíticas)

- [ ] **Configurar Analíticas de Embudos (PostHog)**
  - Instalar `posthog-js` e integrarlo en el `layout.tsx` de Next.js.
  - Crear un evento personalizado `paywall_shown` para saber cuántas personas chocan con el límite Freemium.
  - Crear un evento personalizado `checkout_started` para los que hacen clic en "Actualizar a Pro".
  - Configurar grabación de sesiones para ver dónde se confunden los primeros 20 usuarios.

- [ ] **Afinar la barrera Freemium (Paywall)**
  - Asegurar que la experiencia gratuita entregue valor real antes de pedir la tarjeta (Ej. subir 1 archivo y analizarlo con IA es gratis).
  - El modal de "Actualizar a Pro" debe mostrarse *después* de que el usuario entendió el valor del producto (ej. en el segundo intento de subida).

- [ ] **Optimizar Performance y SEO Básico**
  - Configurar las etiquetas `<title>` y `<meta name="description">` en `app/layout.tsx` o `page.tsx`.
  - Asegurar que la imagen `opengraph-image.png` (o `vibecode-og.png`) exista para cuando los usuarios compartan el enlace en WhatsApp o LinkedIn.

## FASE 2: Estrategia de Adquisición (Lead Magnet & Distribución)

- [ ] **Crear un "Lead Magnet" (Atracción)**
  - Ofrecer una herramienta pequeña y 100% gratuita que resuelva un problema rápido.
  - *Ejemplo en nuestro contexto:* Una plantilla descargable (alojada en S3) a la que acceden solo dejando su correo electrónico.

- [ ] **Lanzamiento en Círculos Cercanos (Soft Launch - Usuarios 1 a 20)**
  - Compartir en LinkedIn y Twitter con un enfoque de "Construyendo en Público" (Build in Public).
  - Enviar un mensaje directo (DM) a 10 personas que sabes que tienen el problema que tu app resuelve. Dales acceso "Pro" gratuito a cambio de feedback (y mídelos en PostHog).

- [ ] **Lanzamiento en Comunidades (Usuarios 20 a 100)**
  - Product Hunt / Hacker News / Reddit (Subreddits especializados).
  - Escribir el post enfocándose en el *problema resuelto*, no en la tecnología.
  - Configurar PostHog para rastrear desde qué canal de adquisición (Referrer) llegan los usuarios que más pagan.

## FASE 3: Iteración y Retención

- [ ] **Revisar Embudos de PostHog (Día 7)**
  - ¿Cuántos usuarios llegaron al Paywall? Si es 0%, el límite Freemium es muy alto o no están descubriendo la función (S3 Upload).
  - ¿Cuántos se registraron pero no subieron ningún archivo? Considerar enviarles un email automatizado usando **Resend** (Clase 5).

- [ ] **Cierre del Ciclo (Monetización)**
  - Revisar el Dashboard administrativo de Supabase/MercadoPago para confirmar los primeros ingresos reales.
