# Guion de la Presentación: Clase 6 (PLG, Freemium & GTM)

Este es el guion detallado para acompañar las diapositivas de la Clase 6.

## MÓDULO 1: El Baño de Realidad (Go-To-Market)

**Diapositiva 1: Título**
- **Texto:** Clase 6: Front-end Interactivo, Modelo Freemium & Go-To-Market.
- **Guion:** "En las clases anteriores usamos IA para armar autenticación y pagos en tiempo récord. El problema es que todo el mundo está haciendo lo mismo. Hoy la ventaja competitiva no es quién escribe código más rápido, sino quién sabe llevar su producto al mercado (GTM)."

**Diapositiva 2: El Cementerio del SaaS**
- **Texto:** El 90% de las apps mueren con 0 usuarios activos.
- **Guion:** "Muchos desarrolladores construyen su app en secreto durante meses. Cuando la lanzan, solo sus familiares la usan. Hoy aprenderemos a evitar esto integrando la venta directamente dentro de nuestro código."

## MÓDULO 2: Product-Led Growth y Modelo Freemium

**Diapositiva 3: ¿Qué es Product-Led Growth (PLG)?**
- **Texto:** Tu producto es tu mejor vendedor.
- **Guion:** "PLG significa que la adquisición y retención es impulsada por el producto mismo. Pensemos en Zoom o Notion: nadie te los vendió por teléfono; los probaste gratis, te encantaron y luego pagaste."

**Diapositiva 4: El "Aha! Moment"**
- **Texto:** El instante en que tu usuario entiende el valor.
- **Guion:** "En nuestro modelo Freemium, no vamos a cobrar de entrada. Vamos a permitir que el usuario use nuestro Chatbot gratis. Ese es el 'Aha! Moment'. Una vez que sienta la magia, le cerraremos la puerta."

**Diapositiva 5: Anatomía de nuestro Paywall (El Limitador)**
- **Texto:** Da el primer bocado gratis. Cobra por la comida completa.
- **Guion:** "Cuando el usuario intente usar la app de nuevo, nuestra base de datos (Supabase) detectará que ya usó su cuota gratuita y lanzará este Muro de Pago."

## MÓDULO 3: Arquitectura Técnica (AWS S3)

**Diapositiva 6: El Problema de los Archivos Pesados**
- **Texto:** No subas archivos pesados a tu servidor web.
- **Guion:** "Si 10 usuarios suben un PDF de 5MB a la vez, el servidor colapsará. La solución profesional es usar URLs prefirmadas para que suban directo a Amazon S3 o Cloudflare R2."

## MÓDULO 4: Analítica de Producto

**Diapositiva 7: Tráfico vs. Producto**
- **Texto:** Google Analytics es para Marketing. PostHog es para Developers.
- **Guion:** "Tener 1,000 visitas no sirve si no sabes qué hacen adentro de tu app. GA4 te dice quién llegó; PostHog te dice por qué se fueron."

**Diapositiva 8: El Superpoder de PostHog**
- **Texto:** Grabaciones de Sesión y Embudos.
- **Guion:** "PostHog nos permite ver un video de cómo el usuario usa nuestra app. Hoy configuraremos una alerta silenciosa (evento) cada vez que alguien choca con nuestro límite Freemium para saber cuántos pagan."

## MÓDULO 5: Tu primer Go-To-Market

**Diapositiva 9: La Regla de los 100 Usuarios**
- **Texto:** Haz cosas que no escalan.
- **Guion:** "A los primeros 100 usuarios no se les consigue con anuncios de Facebook, se les consigue yendo uno a uno y regalando valor masivo a cambio de un email (Lead Magnets)."
