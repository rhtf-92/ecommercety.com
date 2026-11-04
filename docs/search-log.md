# Búsquedas internas (Fase 3, 2a parte)

## Qué es

La página pública `/search` registra cada búsqueda en la tabla
`SearchLog`: término normalizado, nº de resultados y momento. Nada
más. El reporte `/admin/reportes` agrega los últimos 30 días en dos
tablas: términos más buscados y **demanda sin oferta** (términos que
alguna vez dieron 0 resultados).

## Qué se registra y qué no

| Superficie | ¿Se registra? | Por qué |
|---|---|---|
| Página `/search` | Sí, un registro por render con `?q=` | Es la búsqueda navegada y compartible |
| Desplegable en vivo del header (`/api/search`) | No | Contaría dos veces la misma búsqueda |
| Buscador del panel (`/api/admin/search`) | No | Es uso interno, no demanda de visitantes |

- **Sin IP, sin usuario, sin cookies.** En la misma línea que
  `PageView` (ruta + momento): es demanda agregada, no perfilado, y
  nunca se expone en público.
- **Normalización** (`modules/search/log.ts`): espacios recortados y
  colapsados, minúsculas, máximo 80 caracteres, mínimo 2. Los acentos
  se conservan para mostrar la demanda tal como se escribió.
- **Matiz del debounce:** el formulario de `/search` actualiza `?q=`
  con 300 ms de pausa, así que un término intermedio ("air") puede
  quedar registrado junto al final ("air fryer"). La agregación lo
  absorbe: los términos finales dominan el ranking.

## Cómo se usa

1. En `/admin/reportes`, sección "Búsquedas internas": mira los
   términos con más búsquedas y, sobre todo, la demanda sin oferta.
2. Si un término sin resultados se repite, busca el producto en
   Amazon y añádelo como candidato en `/admin/tendencias` (un término
   solo no basta para crear un candidato: hace falta el ASIN).
3. Un término con resultados pero sin clics posteriores ya se ve en
   el resto del reporte (visitas a ficha y CTR): ahí el problema es
   la ficha o el encaje, no la falta de oferta.

## Despliegue

La migración `20261104050000_search_logs` crea la tabla. Tras
fusionar el PR, aplicarla en Neon antes de confiar en la sección
(`npx prisma migrate deploy` con `DATABASE_URL` de producción). Si
la tabla aún no existe, la sección muestra "tabla aún no migrada"
y el resto del reporte y de la búsqueda siguen funcionando: el
registro de búsquedas nunca rompe la página pública.

## Archivos

- `prisma/schema.prisma` (modelo `SearchLog`) y
  `prisma/migrations/20261104050000_search_logs/migration.sql`.
- `src/modules/search/log.ts` (normalización y agregación, puras) y
  `tests/search-log.test.ts`.
- `src/app/(site)/search/page.tsx` (registro, con try/catch).
- `src/app/admin/(panel)/reportes/page.tsx` (sección del reporte).
