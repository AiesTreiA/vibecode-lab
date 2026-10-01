# 🎯 Paso a Paso: Activación de Campaña en Meta Ads para Validación de MVP

> **Objetivo de Validación:**
> Para validar tracción comercial con un MVP de forma ágil y con poco presupuesto, el objetivo **no es vender a gran escala de inmediato**, sino **medir intención de compra real** (leads calificados, registros o clics en botones de acción como *"Comprar"* o *"Agendar"*) al menor costo por aprendizaje posible.

---

## 1. Medición e Infraestructura en la Landing (Vercel)

Meta necesita saber qué hace la gente en tu web para optimizar los anuncios y encontrar a las personas más propensas a convertir.

### A. Obtener el Pixel ID
1. Entra a [Meta Events Manager](https://adsmanager.facebook.com/events_manager2).
2. Crea un nuevo origen de datos Web (**Meta Pixel**).
3. Copia tu **Pixel ID** (secuencia numérica de ~15-16 dígitos).

---

### B. Implementar el Pixel en tu proyecto Next.js / React en Vercel

#### Opción 1: En `app/layout.tsx` (Recomendada con Script de Next.js)
```tsx
import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "TU_PIXEL_ID_AQUI";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Opción 2 (Alternativa rápida sin tocar mucho código):
Usa **Google Tag Manager (GTM)** en Vercel y dispara la etiqueta del Meta Pixel desde el contenedor de GTM.

---

### C. Definir el Evento de Conversión Clave (MVP)

* **Si tienes un formulario de captura:**
  Dispara el evento estándar `Lead` al momento del submit exitoso (o al cargar la URL `/gracias` o `/landing?status=lead`):
  ```typescript
  // Disparar en el onSubmit exitoso o en el callback:
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead", {
      content_name: "Reserva Early Adopter",
      currency: "CLP",
      value: 9990,
    });
  }
  ```

* **Si aún no hay pasarela de pago activa:**
  Coloca un botón *"Comprar ahora / Solicitar demo"* que dispare un evento personalizado o estándar como `InitiateCheckout` o `Intent_Buy` al hacer clic:
  ```typescript
  // En el onClick del botón de compra/reserva:
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      content_name: "Pase Preventa",
    });
  }
  ```

---

### D. Verificación del Pixel
1. Instala la extensión oficial de Chrome: **[Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)**.
2. Abre tu landing desplegada en Vercel (`https://tu-proyecto.vercel.app/landing`).
3. Interactúa con el botón o envía el formulario de prueba.
4. Confirma en el icono de la extensión que el evento pase de `PageView` a `Lead` o `InitiateCheckout` con el check verde.

---

## 2. Configuración en Meta Ads Manager

Crea la estructura dentro de **[Meta Ads Manager](https://adsmanager.facebook.com/)**.

### 🔹 Nivel Campaña
* **Objetivo de campaña:** Elige **Clientes potenciales (Leads)** o **Ventas (Sales)**.
  > ⚠️ **Evita elegir "Tráfico":** Meta solo te enviará clics curiosos y bots de muy baja intención.
* **Presupuesto (CBO vs ABO):** Para un MVP rápido, usa **presupuesto a nivel de conjunto de anuncios (ABO - Ad Set Budget)** para controlar exactamente cuánto gasta cada hipótesis de audiencia (ej. **$5 a $10 USD diarios por conjunto**).

---

### 🔹 Nivel Conjunto de Anuncios (Ad Set)
* **Ubicación de la conversión:** Selecciona **Sitio web**.
* **Evento de conversión:** Selecciona el evento configurado (`Lead` o `Purchase` / `InitiateCheckout`).
* **Segmentación:**
  * **Ubicación geográfica:** Tu mercado objetivo primario (ej: Chile, o ciudades específicas si aplica).
  * **Intereses / Audiencia abierta (Advantage+):** Para un MVP, crea **2 conjuntos de anuncios** para contrastar hipótesis:
    * **Conjunto A (Abierto / Broad):** Solo edad (ej. 25-50 años) y país, dejando que el algoritmo busque a los interesados según el mensaje del anuncio.
    * **Conjunto B (Nicho / Intereses específicos):** Segmenta por competidores directos, herramientas afines o intereses vinculados al dolor puntual.
* **Ubicaciones (Placements):** Deja **Ubicaciones Advantage+** (recomendado para abaratar costos iniciales) o limítate a **Feeds e Stories/Reels** de Instagram y Facebook.

---

## 3. Creativos y Mensajes de Testeo (Ads)

El copy y el video/imagen deben hacer el filtro de calificación **antes de que el usuario haga clic**, asegurando que quien visite tu landing realmente sufra el dolor.

### Estructura mínima recomendada: 3 creativos distintos por conjunto de anuncios

1. **Ángulo 1 (Dolor / Problema directo):**
   * *Hook:* "¿Cansado de perder 12 horas a la semana conciliando planillas de Excel?"
   * *Enfoque:* Atacar la frustración del día a día del usuario.
2. **Ángulo 2 (Beneficio / Solución directa):**
   * *Hook:* "Cómo automatizar tus reportes financieros con IA en 60 segundos y sin gastar una fortuna."
   * *Enfoque:* Promesa clara de ahorro de tiempo o dinero.
3. **Ángulo 3 (Curiosidad / Prueba social o Demo rápida):**
   * *Hook:* Grabación de pantalla o GIF de 10 segundos mostrando la interfaz o el entregable en acción.
   * *Enfoque:* Reducir la incertidumbre mostrando que el producto es real y tangible.

* **Llamado a la acción (CTA):** *"Registrarse"*, *"Más información"* o *"Comprar"*.
* **URL de destino con parámetros UTM:**
  Asegúrate de incluir parámetros UTM para medir analítica limpia en Vercel / Google Analytics:
  ```url
  https://tu-dominio.vercel.app/landing?utm_source=meta&utm_medium=paid&utm_campaign=mvp_test
  ```

---

## 4. Ejecución y Métricas de Decisión (Fase de Validación)

Corre la prueba durante **3 a 5 días** o hasta alcanzar un mínimo estadístico (al menos **300 a 500 visitas** a la landing).

| Métrica | Qué evalúa | Benchmark saludable (MVP) | Acción si falla |
| :--- | :--- | :--- | :--- |
| **CTR único (enlace)** | Atractivo del anuncio y relevancia del gancho | **> 1.2% – 1.5%** | Si es `< 1%`, cambia creativos, ganchos visuales o títulos. El dolor no llama la atención. |
| **CPC (Costo por clic)** | Costo de adquisición de tráfico calificado | **$0.15 – $0.80 USD** ($150 – $750 CLP) | Si es muy alto, amplía la audiencia o simplifica el mensaje. |
| **Tasa de Conversión (CVR)** | Claridad y propuesta de valor de la landing | **> 3% – 8%** (para registros gratuitos / leads) | Si el CTR es alto pero nadie convierte, el problema es la propuesta de valor, la velocidad de carga o la promesa de la landing. |
| **CPA (Costo por Lead / Intención)** | Viabilidad económica preliminar del negocio | Definido según tu margen o LTV esperado | Si el CPA es viable frente al valor del cliente, **tienes luz verde para construir e iterar el producto**. |

---

> 💡 **Regla de Oro para la Clase 6:**
> No apagues la campaña antes de recopilar al menos 80-100 visitas únicas. Trae estos 4 números anotados en tu `TARJETA_METRICAS_CLASE6.md` para diagnosticar si tu squad escala, ajusta el mensaje o pivota.
