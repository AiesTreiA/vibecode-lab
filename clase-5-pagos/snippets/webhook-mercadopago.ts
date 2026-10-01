import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { Resend } from "resend";
// import { createClient } from "@supabase/supabase-js";

// ── Clientes ──────────────────────────────────────────────────────────────────
const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

const resend = new Resend(process.env.RESEND_API_KEY);

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// ── Handler ───────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);

    // Mercado Pago puede enviar el ID como ?id= o como ?data.id=
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("id") || url.searchParams.get("data.id");

    if (topic === "payment" && id) {
      // ⚠️ CRÍTICO: Siempre verificar consultando la API de MP.
      // NUNCA confiar solo en los datos del POST inicial.
      const paymentApi = new Payment(mpClient);
      const paymentData = await paymentApi.get({ id });

      if (paymentData.status === "approved") {
        const payerEmail = paymentData.payer?.email || paymentData.metadata?.user_email;
        const payerName  = paymentData.metadata?.user_name || "Cliente";
        const amount     = paymentData.transaction_amount;

        console.log(`✅ Pago aprobado: $${amount} CLP de ${payerEmail}`);

        // 1. Guardar en base de datos
        // const { error: dbError } = await supabase
        //   .from("orders")
        //   .upsert({
        //     payment_id: id,
        //     status: "approved",
        //     email: payerEmail,
        //     amount,
        //     approved_at: new Date().toISOString(),
        //   });
        // if (dbError) console.error("DB error:", dbError);

        // 2. Correo de confirmación al cliente
        if (payerEmail) {
          await resend.emails.send({
            from: "Tu Startup <hola@tudominio.cl>",   // ← Cambiar por tu dominio verificado
            to: payerEmail,
            subject: "🎉 ¡Tu reserva Early Adopter ha sido confirmada!",
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e2e8f0;border-radius:8px;">
                <h2 style="color:#0f172a;">¡Bienvenido/a, ${payerName}!</h2>
                <p style="color:#334155;">Tu pago de <strong>$${amount} CLP</strong> fue procesado con éxito.</p>
                <div style="background:#f1f5f9;padding:12px;border-radius:6px;margin:16px 0;">
                  <p style="margin:0;font-size:13px;color:#475569;">
                    <strong>ID de Transacción:</strong> ${id}<br/>
                    <strong>Estado:</strong> ✅ Aprobado
                  </p>
                </div>
                <p style="color:#334155;">Nos pondremos en contacto en breve para coordinar tu acceso.</p>
              </div>
            `,
          });

          // 3. Alerta interna al squad
          await resend.emails.send({
            from: "Tu Startup <hola@tudominio.cl>",
            to: "squad@tuemail.com",   // ← Cambiar por el email del squad
            subject: `🚨 Nueva venta: $${amount} CLP de ${payerName}`,
            html: `
              <p><strong>Email:</strong> ${payerEmail}</p>
              <p><strong>Monto:</strong> $${amount} CLP</p>
              <p><strong>ID:</strong> ${id}</p>
            `,
          });
        }
      }
    }

    // ⚠️ SIEMPRE retornar 200 OK.
    // Si retornas otro código, Mercado Pago reintentará hasta 3 veces.
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error("Webhook error:", error);
    // Retornar 200 igualmente para evitar reintentos en errores transitorios
    return NextResponse.json({ received: true, warning: error.message }, { status: 200 });
  }
}
