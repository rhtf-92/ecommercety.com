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

## Archivos

- `prisma/schema.prisma` (campos nuevos en `Guide`) y
  `prisma/migrations/20261104060000_guides_db/migration.sql`.
- `src/modules/guides/data.ts` (mapeo puro + lectura con
  respaldo) y `tests/guides-db.test.ts`.
- `scripts/seed-guides.ts` y script `db:seed-guides`.
- Páginas y rutas que ahora usan la capa de datos: `/guides`,
  `/guides/[slug]`, `sitemap.xml`, `/llms.txt`.
