# Prompt Maestro: Landing de Validación Instantánea

> Copia este prompt en Antigravity sobre tu repositorio Next.js actual.
> Reemplaza las 5 variables entre `[CORCHETES]` con los datos de tu squad.

---

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
   - Hero Section: Hook potente enfocado en el dolor, badge "Preventa Exclusiva / Cupos Limitados", video mockup o tarjeta visual del producto y CTA principal.
   - El Problema vs La Solución: 3 puntos de dolor reales vs cómo los resolvemos.
   - Bento Grid de Beneficios: 3 o 4 tarjetas visuales modernas (estilo Vercel/Linear con bordes tenues y gradientes sutiles).
   - Formulario de Intención / Conversión:
     - Permite ingresar Nombre, Email, Empresa y Teléfono (WhatsApp).
     - Botón primario: "Quiero Reservar mi Cupo Early Bird".
     - Al enviar, debe conectarse a un Server Action o API Route `/api/leads` que guarde en Supabase (o fallback a un estado de éxito visual).
   - FAQ de 3 preguntas clave (¿Cuándo se lanza?, ¿Qué pasa si no me sirve?, ¿Cómo funciona el cobro?).
   - Garantía de devolución 100% libre de riesgo.
3. Responsive: 100% optimizado para visualización móvil (pauta de Instagram/LinkedIn).
4. No rompas ninguna ruta existente de mi aplicación. Crea componentes limpios o deja la landing autocontenida.
```

---

## Checklist Post-Generación

- [ ] `app/landing/page.tsx` creada sin errores de compilación
- [ ] `app/api/leads/route.ts` creada y guardando en Supabase (o en estado local)
- [ ] Formulario funcional: nombre + email + WhatsApp mínimo
- [ ] CTA visible y diferenciado en el hero
- [ ] `git add . && git commit -m "feat(landing): add validation landing page" && git push`
- [ ] Deploy confirmado en Vercel (`https://tu-proyecto.vercel.app/landing`)
- [ ] URL compartida en el chat de clase ✅
