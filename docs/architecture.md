# Arquitectura — T&F Picks (ecommercety.com)

## Principios
- **Monolito modular** sobre Next.js + TypeScript: un solo despliegue,
  módulos de dominio separados (ver `src/modules/`). Sin microservicios
  hasta que una métrica real lo justifique.
- **PostgreSQL** como base principal (Prisma ORM). Redis se suma cuando
  existan caché de consultas y colas en producción. El buscador dedicado
  (Typesense/Meilisearch) entra cuando el catálogo supere el MVP.
- **Sitio público en inglés de EE. UU.**; panel de administración en español.

## Flujo de datos de afiliación
1. Cada producto se registra una sola vez por ASIN.
2. Su enlace de afiliado se genera con **SiteStripe** y se guarda por canal
   con el Tracking ID correspondiente (ver `src/modules/affiliate/tracking.ts`).
3. Los clics salientes se registran en `ClickEvent` antes de redirigir a
   Amazon, con `rel="sponsored nofollow"` en los enlaces públicos.
4. **Precios**: nunca escritos a mano. Solo se mostrarán cuando provengan de
   la API oficial de Amazon (cuando la cuenta califique), con fecha/hora de
   consulta. Mientras tanto: "Check price on Amazon".

## Procesos automáticos (cuando la plataforma esté publicada)
- **Verificación cada 5 horas**: contraste de todos los productos publicados
  contra Amazon.com; resultados en `VerificationRun` y cambios en `AuditLog`.
- **Radar de tendencias a la hora 3** de cada ciclo: candidatos en
  `TrendCandidate`, con puerta de calidad antes de publicar.

## Entornos
- Local: `npm run dev` + PostgreSQL local o en la nube (`.env`).
- Producción: despliegue en Vercel (plan Hobby, región iad1) +
  PostgreSQL en Neon, dominio ecommercety.com vía Cloudflare.
  (Lanzamiento inicial en Render Starter el 2026-11-01; migrado a
  Vercel el mismo día por inestabilidad de la instancia única. Ver
  docs/deployment.md. El ciclo cada 5 horas lo dispara GitHub
  Actions, no Vercel Cron; ver docs/automation.md.)
