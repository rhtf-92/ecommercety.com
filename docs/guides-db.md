# Guías editoriales en base de datos (Fase 3, 3a parte)

## Qué cambia

Las 11 guías vivían solo en `src/modules/guides/content.ts`. Ahora
viven también en la base: el modelo `Guide` (que ya existía pero
no se usaba) se amplía con descripción, categoría, minutos de
lectura, veredicto, secciones y grupos (JSON) y posición editorial,
y los productos enlazados van en `GuideProduct` (posición + FK).
Las páginas `/guides`, `/guides/[slug]`, el sitemap y `/llms.txt`
leen de la base primero y del código como respaldo.

## Por qué con respaldo (diseño reversible)

Fusionar el PR **no cambia nada visible**: si la base aún no
tiene guías (sin seed) o no está migrada, las páginas sirven el
contenido del código, idéntico al de hoy. El cambio visible llega
solo al correr el seed tras la migración, y el contenido sembrado
es el mismo que el del código: la paridad ida y vuelta
(código → base → código) se prueba en `tests/guides-db.test.ts`
para las 11 guías.

`content.ts` se retira en un PR de limpieza posterior, solo
después de verificar la paridad en producción. Retirarlo en este
mismo PR dejaría al sitio sin respaldo si el seed falla.

## Despliegue (en orden, tras fusionar)

1. `npx prisma migrate deploy` (migración
   `20261104060000_guides_db`, con el `.env` directo de Neon).
2. `npm run db:seed-guides` (script nuevo en `package.json`):
   upsert por slug, idempotente, se puede correr de nuevo sin
   duplicar. Un ASIN sin producto en base se salta con aviso;
   la página ya filtra hoy esos productos, así que no se rompe
   nada. El orden editorial se conserva con `position` (el
   mismo orden del arreglo del código).
3. Verificar en producción: `/guides` muestra las 11 guías en el
   mismo orden, una ficha (p. ej. `/guides/holiday-gift-guide-2026`)
   muestra sus grupos y su veredicto, y `/sitemap.xml` sigue
   listando las guías. Si algo no cuadra, no hace falta revertir
   código: borrar las filas de `Guide` devuelve el sitio al
   contenido del código.

## Limpieza posterior al PR #7 (paridad verificada en producción el 2026-11-04)

Con el seed aplicado (11 guías, 0 ASINs saltados) y la paridad
verificada en vivo (`/guides` con las 11 guías en el mismo orden,
la ficha navideña con sus grupos y su veredicto, todo idéntico
al código), el respaldo se retiró:

- Se borraron `src/modules/guides/content.ts` y
  `scripts/seed-guides.ts`, y el script `db:seed-guides` de
  `package.json`. Los tipos `Guide`, `GuideSection` y `GuideGroup`
  viven ahora en `src/modules/guides/data.ts`, que es la única
  capa de lectura: sin base, el hub queda vacío y la ficha da
  404, sin respaldo que lo oculte.
- Los metadatos de `/guides/[slug]` ya no vienen del código:
  `generateMetadata` lee la guía de la base.
- `tests/guides-db.test.ts` ya no usa el código retirado: prueba
  el mapeo puro con fixtures pequeños (una guía con grupos y
  otra con secciones).
- Nota operativa, aprendida del primer seed fallido: tras
  cualquier cambio de esquema, corre `npx prisma generate`
  antes de cualquier script que use el cliente Prisma (un `git
  pull` no lo regenera; `postinstall` solo lo hace al instalar).
  No actualizar a Prisma 8: el aviso durante `migrate deploy`
  es solo un notice.
- Autoría a partir de aquí: una guía nueva o editada se escribe
  directo en base (Prisma Studio, SQL o un upsert con
  `guideToDbPayload`); no hay panel de guías todavía. Un entorno
  nuevo se siembra copiando las filas `Guide`/`GuideProduct`
  desde producción. Sin respaldo en código, un borrado accidental
  de filas ya no se recupera solo: la copia de seguridad de Neon
  es la red de seguridad.

## Archivos (tras la limpieza)

- `prisma/schema.prisma` (campos nuevos en `Guide`) y
  `prisma/migrations/20261104060000_guides_db/migration.sql`.
- `src/modules/guides/data.ts` (mapeo puro + lectura solo de
  base, tras la limpieza) y `tests/guides-db.test.ts`.
- Páginas y rutas que usan la capa de datos: `/guides`,
  `/guides/[slug]`, `sitemap.xml`, `/llms.txt`.
- Retirados en la limpieza: `src/modules/guides/content.ts`,
  `scripts/seed-guides.ts` y el script `db:seed-guides`.
