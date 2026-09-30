# Guía Maestra: Mercado Pago, Webhooks & Resend

## Clase 5 — Vibecode Lab

> Integración de pagos reales en Chile, procesamiento de eventos en tiempo real y correos transaccionales automáticos.

---

## 1. Variables de Entorno Requeridas

Agrega en tu `.env.local` (y en Vercel → Settings → Environment Variables):

```bash
# Mercado Pago (obtener en: https://www.mercadopago.cl/developers/es/docs/credentials)
MP_ACCESS_TOKEN=APP_USR-xxxxxxx-xxxxxx-xxxxxx          # NUNCA al frontend
NEXT_PUBLIC_MP_PUBLIC_KEY=APP_USR-xxxxxxx-xxxxxx       # Sí va al frontend

# URL de tu app (Vercel)
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app

# Resend (obtener en: https://resend.com/api-keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxx                        # NUNCA al frontend
```

---

## 2. Instalación de Dependencias

```bash
npm install mercadopago resend
```

---

## 3. Checkout Pro — Crear Preferencia

**Archivo:** `app/api/checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const { email, name, amount, planId } = await req.json();
    const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: [
          {
            id: planId || "early-bird-pass",
            title: "Pase Preventa Early Adopter",
            description: "Reserva de cupo con acceso preferencial",
            quantity: 1,
            unit_price: Number(amount) || 9990,
            currency_id: "CLP",
          },
        ],
        payer: { email, name },
        back_urls: {
          success: `${origin}/landing?status=approved`,
          failure: `${origin}/landing?status=failure`,
          pending: `${origin}/landing?status=pending`,
        },
        auto_return: "approved",
        metadata: { user_email: email, user_name: name },
        notification_url: `${origin}/api/webhooks/mercadopago`,
      },
    });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 4. Webhook Seguro — Verificación Server-to-Server

**Archivo:** `app/api/webhooks/mercadopago/route.ts`

> ⚠️ **Regla crítica:** Nunca uses `back_urls` para confirmar ventas. El webhook es la única fuente de verdad.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { Resend } from "resend";

const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("id") || url.searchParams.get("data.id");

    if (topic === "payment" && id) {
      // Verificar con la Payment API (NO confiar solo en el POST inicial)
      const paymentApi = new Payment(mpClient);
      const paymentData = await paymentApi.get({ id });

      if (paymentData.status === "approved") {
        const payerEmail = paymentData.payer?.email || paymentData.metadata?.user_email;
        const payerName  = paymentData.metadata?.user_name || "Innovador";
        const amount     = paymentData.transaction_amount;

        // 1. Guardar en Supabase
        // await supabase.from("orders").upsert({ payment_id: id, status: "approved", email: payerEmail, amount });

        // 2. Correo al cliente
        if (payerEmail) {
          await resend.emails.send({
            from: "Tu Startup <hola@tudominio.cl>",
            to: payerEmail,
            subject: "🎉 ¡Tu reserva Early Adopter ha sido confirmada!",
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
                <h2>¡Bienvenido/a a bordo, ${payerName}!</h2>
                <p>Hemos recibido tu pago por <strong>$${amount} CLP</strong>.</p>
                <p><strong>ID de Transacción:</strong> ${id}</p>
                <p>Nos pondremos en contacto contigo en breve para coordinar tu acceso.</p>
              </div>
            `,
          });

          // 3. Alerta interna al squad
          await resend.emails.send({
            from: "Tu Startup <hola@tudominio.cl>",
            to: "squad@vibecodelab.cl", // Cambiar por el email del squad
            subject: `🚨 Nueva venta: $${amount} CLP de ${payerName}`,
            html: `<p>Pago aprobado de <strong>${payerEmail}</strong> por $${amount} CLP. ID: ${id}</p>`,
          });
        }
      }
    }

    // SIEMPRE responder 200 OK para que MP no reintente
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 5. Testing Local con ngrok

```bash
# 1. Instalar ngrok
npm install -g ngrok
# o desde https://ngrok.com/download

# 2. Levantar tu servidor de Next.js
npm run dev

# 3. En otra terminal, crear el túnel
ngrok http 3000

# 4. Copiar la URL HTTPS pública (ej: https://a1b2-c3d4.ngrok-free.app)
# 5. En Mercado Pago Developers → Tu App → Webhooks:
#    URL: https://a1b2-c3d4.ngrok-free.app/api/webhooks/mercadopago
#    Evento: Pagos (Payments)

# 6. Usar tarjetas de prueba de la documentación oficial de MP:
#    https://www.mercadopago.cl/developers/es/docs/checkout-pro/test-integration
```

---

## 6. Tarjetas de Prueba Sandbox (Chile)

| Tipo | Número | CVV | Vencimiento | Resultado |
|:-----|:-------|:----|:------------|:----------|
| Visa aprobada | 4509 9535 6623 3704 | 123 | 11/25 | Pago aprobado |
| Mastercard aprobada | 5031 7557 3453 0604 | 123 | 11/25 | Pago aprobado |
| Visa rechazada | 4000 0000 0000 0002 | 123 | 11/25 | Pago rechazado |

> Para usar las tarjetas de prueba necesitas iniciar sesión con una cuenta **de prueba** de Mercado Pago (no tu cuenta real). Crear cuentas de prueba en: MP Developers → Tus apps → Cuentas de prueba.
