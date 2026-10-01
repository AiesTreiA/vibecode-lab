# Clase 5: Mercado Pago, Webhooks & Correos Transaccionales

**Vibecode Lab — Fase 3: Monetización & Automatización**

---

## Contenido de Esta Carpeta

```
clase-5-pagos/
├── 01-guias/
│   ├── Presentacion_Clase_5_Pagos_Webhooks_Resend.pdf  ← Slides de la clase (16:9)
│   ├── Guia_Clase_5_Pagos_Webhooks_Resend.pdf          ← Hoja de ruta imprimible (A4)
│   └── GUIA_PAGOS_WEBHOOKS_RESEND.md                   ← Guía completa con código
│
├── 02-snippets/
│   ├── api-checkout.ts          ← POST /api/checkout/route.ts (Crear Preference)
│   ├── webhook-mercadopago.ts   ← POST /api/webhooks/mercadopago/route.ts
│   ├── PROMPT_LANDING_VALIDACION.md  ← Prompt Maestro para el Sprint In-Class
│   └── .env.example             ← Variables de entorno requeridas
│
└── 03-validacion-toolkit/
    ├── TARJETA_METRICAS_CLASE6.md   ← Ficha de KPIs a completar esta semana
    ├── GUIA_MICRO_PAUTA.md          ← Resumen de canales de tracción
    └── PASO_A_PASO_ACTIVAR_CAMPANA_META.md ← Guía completa Meta Ads (Pixel, ABO, UTMs)
```

---

## Tarea para la Clase 6 (Penúltima)

1. **Deploy la landing:** URL `/landing` pública en Vercel antes del final de la clase.
2. **Activa tu tracción:** Meta Ads ($10-15 USD) o 30 mensajes B2B en frío.
3. **Completa la Tarjeta de Métricas:** `03-validacion-toolkit/TARJETA_METRICAS_CLASE6.md`
4. **Llega con datos reales** para el diagnóstico Pivot/Scale.

---

## Dependencias a Instalar

```bash
npm install mercadopago resend
```

## Recursos Complementarios

- [Documentación Mercado Pago Chile](https://www.mercadopago.cl/developers/es/docs)
- [Tarjetas de prueba Sandbox](https://www.mercadopago.cl/developers/es/docs/checkout-pro/test-integration)
- [Resend — Getting Started](https://resend.com/docs/introduction)
- [ngrok — Local Tunnels](https://ngrok.com/docs)
