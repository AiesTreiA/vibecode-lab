import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Inicializar cliente con Access Token de servidor (NUNCA exponer al frontend)
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

export async function POST(req: NextRequest) {
  try {
    const { email, name, amount, planId } = await req.json();
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

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
        payer: {
          email: email,
          name: name,
        },
        back_urls: {
          success: `${origin}/landing?status=approved`,
          failure: `${origin}/landing?status=failure`,
          pending: `${origin}/landing?status=pending`,
        },
        auto_return: "approved",
        metadata: {
          user_email: email,
          user_name: name,
        },
        // ⚠️ Esta URL recibirá la notificación del webhook cuando el pago sea procesado
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      },
    });

    return NextResponse.json({ init_point: response.init_point });
  } catch (error: any) {
    console.error("Error creando preferencia Mercado Pago:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
