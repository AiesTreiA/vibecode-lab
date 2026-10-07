# Guía Maestra: AWS S3, PostHog y Modelo Freemium (PLG)

Esta guía condensa la implementación técnica para transformar tu aplicación en una máquina de **Product-Led Growth**. Construiremos una interfaz que permite subir archivos (usando S3), restringiremos esta capacidad con un muro de pago (Freemium) y mediremos exactamente cómo se comportan los usuarios con PostHog.

## 1. Configuración de AWS S3 (Presigned URLs)

Para subir archivos (como imágenes, PDFs o datos) sin saturar nuestro servidor Next.js, usamos **URLs prefirmadas**. 
El flujo es:
1. El cliente le dice a Next.js: *"Quiero subir un archivo llamado `doc.pdf`"*.
2. Next.js le pide permiso a AWS S3 y devuelve una URL temporal y cifrada.
3. El cliente sube el archivo directamente a esa URL en AWS S3.

### Requisitos Previos:
Necesitas las variables en tu `.env.local`:
```bash
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="tu_access_key"
AWS_SECRET_ACCESS_KEY="tu_secret_key"
AWS_S3_BUCKET_NAME="tu_bucket"
```
*(Si usas Supabase Storage, las variables y la librería cambian levemente, pero el concepto es idéntico).*

Instalación:
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

*(Ver `route-s3-upload.ts` en la carpeta de snippets para el código del servidor).*

## 2. El Limitador Freemium (Lógica PLG)

El objetivo del Product-Led Growth es que el usuario experimente el valor del producto **antes** de pagar. Le daremos 1 intento gratuito. Al intentar la segunda vez, bloqueamos la acción.

**Estrategia en Base de Datos (Supabase):**
Agregaremos una columna `s3_uploads_count` (int) y `plan_type` (text, default 'free') a nuestra tabla de `users`.

**En el Cliente (React):**
Antes de pedir la Presigned URL, el frontend llama a un *Server Action* o Endpoint (`check-freemium.ts`) que valida el límite.

*(Ver `upload-button.tsx` y `check-freemium.ts` en la carpeta de snippets).*

## 3. PostHog: Analíticas de Embudos (Funnels)

Saber cuánta gente visita tu sitio web es útil. Saber cuánta gente hace clic en "Subir Archivo", se topa con el Paywall y luego desiste, es **oro puro** para mejorar tu negocio.

### Requisitos Previos:
Créate una cuenta en [PostHog.com](https://posthog.com) (el plan gratuito es extremadamente generoso).

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_xxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_POSTHOG_HOST="https://us.i.posthog.com"
```

Instalación:
```bash
npm install posthog-js
```

### Integración en Next.js (App Router)
Debes envolver tu aplicación con el proveedor de PostHog (ver `posthog-provider.tsx`).

### Disparando Eventos Personalizados
Dentro de nuestro componente de subida de archivos, cuando el usuario choca con el límite, disparamos el evento para medir el embudo:

```javascript
import posthog from 'posthog-js'

// ... dentro de tu función de validación:
if (isLimitReached) {
  posthog.capture('paywall_shown', { feature: 's3_upload_limit' });
  setShowPaywallModal(true);
}
```

¡Eso es todo! Con esto, has completado el ciclo de vida de un producto real:
**Dar valor (S3) -> Limitar (Freemium) -> Medir (PostHog) -> Cobrar (Clase 5).**

¡Estás listo para salir al mercado y conseguir tus primeros usuarios!
