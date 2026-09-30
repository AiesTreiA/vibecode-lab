# 🏗️ Prompt Maestro: Landing de Validación Instantánea

> **Instrucciones:** Copia este prompt completo en Antigravity sobre tu repositorio Next.js actual.
> Reemplaza las **5 variables entre `[CORCHETES]`** con los datos reales de tu squad antes de ejecutar.

---

## El Prompt (copiar desde aquí)

```
Actúa como un Diseñador UX y Desarrollador Full-Stack Senior especializado en startups y validación temprana (Lean Startup).

Necesito crear una nueva ruta de alta conversión en mi proyecto Next.js 14+ (App Router) en:
`app/landing/page.tsx`

Mis datos de negocio son:
- [NOMBRE_PROYECTO]: "Ej: DataPulse AI"
- [DOLOR_PRINCIPAL]: "Ej: Los directores financieros pierden 12 horas semanales consolidando reportes en Excel de 4 bancos diferentes"
- [PROPUESTA_VALOR]: "Ej: Consolida tus cuentas bancarias y predice tu flujo de caja en 60 segundos con IA"
- [OFERTA_VALIDACION]: "Ej: Acceso Early Bird al 50% ($9.990 CLP / mes de por vida) para los primeros 20 inscritos"
- [PERFIL_CLIENTE]: "Ej: CFOs de PYMEs y fundadores en Chile"

Requisitos de diseño y código:

1. Stack: Next.js 14 (App Router), Tailwind CSS y Lucide Icons (o react-icons).

2. Estructura visual de la landing:
   - Hero Section: Hook potente enfocado en el dolor, badge "Preventa Exclusiva / Cupos Limitados",
     mockup visual del producto (tarjeta o imagen placeholder estilizada) y CTA principal.
   - El Problema vs La Solución: 3 puntos de dolor reales vs cómo los resolvemos.
   - Bento Grid de Beneficios: 3 o 4 tarjetas visuales modernas (estilo Vercel/Linear
     con bordes tenues y gradientes sutiles).
   - Formulario de Intención / Conversión:
     - Campos: Nombre, Email, Empresa y Teléfono (WhatsApp).
     - Botón primario: "Quiero Reservar mi Cupo Early Bird".
     - Al enviar: conectarse a un Server Action o API Route `/api/leads` que guarde en Supabase.
       Si no hay Supabase configurado aún, mostrar un estado de éxito visual con confetti o
       mensaje animado y redirigir al checkout de Mercado Pago.
   - Contador de urgencia: "Solo quedan X cupos disponibles" (número hardcodeado está bien).
   - FAQ de 3 preguntas clave:
     1. ¿Cuándo se lanza el producto?
     2. ¿Qué pasa si no me sirve? (Garantía de devolución)
     3. ¿Cómo funciona el cobro / acceso Early Bird?
   - Garantía visual: badge "100% libre de riesgo — Devolución garantizada".
   - Footer minimalista con el nombre del proyecto.

3. Diseño y UX:
   - Tema oscuro (dark mode nativo, fondo #09090b o similar).
   - Tipografía: Inter o Geist (ya disponibles en Next.js por defecto).
   - Colores de acento: elige 1 color primario que represente la categoría del producto
     (azul para fintech, verde para salud, violeta para IA, etc.).
   - Responsive: 100% optimizado para móvil (pauta de Instagram/LinkedIn se ve en teléfono).
   - Animaciones sutiles: fade-in al hacer scroll en las secciones (usa framer-motion si
     ya está instalado, o CSS transitions simples si no).

4. Código:
   - No rompas ninguna ruta existente de mi aplicación.
   - Crea la landing como una página autocontenida en `app/landing/page.tsx`.
   - Si necesitas componentes, créalos en `app/landing/_components/`.
   - Usa metadata de Next.js (title, description, og:image) optimizada para compartir en redes.
   - El formulario debe tener validación básica (email válido, campos requeridos) antes de enviar.
```

---

## ✅ Checklist Post-Generación

Antes de hacer commit, verifica:

- [ ] `app/landing/page.tsx` creada sin errores de compilación (`npm run build`)
- [ ] El formulario captura al menos: **Nombre + Email + WhatsApp**
- [ ] El CTA principal es visible en el hero sin hacer scroll (above the fold)
- [ ] La página se ve bien en móvil (Chrome DevTools → Toggle device toolbar)
- [ ] No hay errores en consola del navegador

Luego de verificar:

```bash
git add .
git commit -m "feat(landing): add validation landing page for [NOMBRE_PROYECTO]"
git push
```

Esperar el ✅ verde de Vercel y **compartir la URL en el chat de la clase**:
```
https://tu-proyecto.vercel.app/landing
```

---

## 📊 Meta de esta semana

Con tu landing publicada, activa **una** de estas opciones de tracción:

| Canal | Inversión | Meta |
|:------|:----------|:-----|
| Meta Ads (Instagram/Facebook) | $10.000 - $15.000 CLP | > 80 visitantes únicos |
| LinkedIn Ads (B2B) | ~$15 USD | > 80 visitantes únicos |
| Outreach en frío (DMs) | 30 mensajes personalizados | > 5 respuestas |

**Entregable para la Clase 6:** Llena la `TARJETA_METRICAS_CLASE6.md` con tus resultados reales.

---

*Vibecode Lab — Clase 5: Mercado Pago, Webhooks & Resend*
