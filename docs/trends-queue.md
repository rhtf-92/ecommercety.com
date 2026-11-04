# Cola de caza de tendencias — Fase 1

## Qué resuelve

Antes, la caza vivía en el chat y en checklists: una señal, un enlace
SiteStripe a mano, una ficha y un lote en `data/products/`. La tabla
`TrendCandidate` existía, pero nada la alimentaba y el panel solo
mostraba cuántos pendientes había, sin forma de revisarlos.

Ahora la cola vive en el panel, en `/admin/tendencias`:

1. **Añadir candidato**: ASIN (10 caracteres), título y fuente de la
   señal (Best Sellers, Movers & Shakers, Hot New Releases, Most
   Wished For, cobertura de ofertas, tendencia social, búsqueda
   interna u otro). La validación está en
   `src/modules/trends/queue.ts` y se prueba en
   `tests/trends-report.test.ts`.
2. **Aprobar o rechazar**: aprobar no publica nada. Rechazar guarda el
   motivo, para no volver a cazar el mismo ASIN por la misma razón.
3. **Crear borrador**: solo un candidato aprobado puede convertirse
   en borrador, eligiendo su categoría. El borrador se abre en
   Productos, donde se completan descripción propia, highlights,
   imagen y enlace SiteStripe. Solo entonces, con enlace válido, se
   puede publicar (regla que ya exigía `validateProductInput`).

Cada paso escribe en `AuditLog`, con actor del panel.

## Reporte de rendimiento — `/admin/reportes`

Ventana de 30 días, solo productos publicados:

- **CTR por producto** = clics / visitas a su ficha
  (`/product/<ASIN>`). Sin visitas, el CTR es “—”, no 0: sin
  exposición no hay conversión que medir.
- **CTR por categoría**, agregando visitas y clics.
- **Productos zombis**: publicados con 0 clics en 30 días. No se
  degradan solos: si tienen pocas visitas, el problema es
  exposición; si tienen visitas y 0 clics, el problema es la ficha
  o el encaje. La decisión sigue siendo editorial.
- La venta final no está en este reporte: se confirma en Associates
  Central, por Tracking ID. Aquí se mide intención (clic).

El cálculo puro vive en `src/modules/analytics/report.ts`, también
cubierto por tests, para que el panel solo agregue y presente.

## Meta operativa

De señal a publicado en menos de 24 horas. Revisar la cola cada día,
publicar 3–5 productos en rotación por categoría, y cada semana
degradar o reemplazar zombis y ampliar en guías solo los ganadores.

## Qué NO hace esta fase (a propósito)

- No raspa Amazon: las señales se registran a mano desde listas y
  cobertura pública, como exige `docs/compliance.md`.
- No automatiza la publicación: la puerta de calidad es humana.
- No muestra precios: siguen llegando solo por la Creators API
  oficial, cuando la cuenta califique.
