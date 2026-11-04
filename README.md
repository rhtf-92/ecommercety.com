# T&F Picks — by E-Commerce T&F

Plataforma de afiliación de Amazon EE. UU. en producción en
**https://ecommercety.com**: recomendaciones curadas, guías y
comparativas, con enlaces de afiliado generados con SiteStripe y
Tracking ID por canal. El sitio no vende nada: el checkout ocurre
siempre en Amazon.

Sitio público en inglés; panel de administración en español.

## Qué incluye hoy

### Sitio público
- **Catálogo curado en 14 categorías** (Home & Kitchen, Tech,
  Beauty, Pet Supplies, Sports, Tools, Toys & Games, Baby, Fashion,
  Automotive, Office, Video Games, Health y Grocery), con fichas de
  producto, ofertas del día (`/todays-deals`) y búsqueda (`/search`).
- **11 guías editoriales** (`/guides` y `/guides/[slug]`), incluida
  la guía navideña con grupos por destinatario y veredicto. Las
  guías viven **solo en la base de datos** (ver
  [Guías](#guías-editoriales)); no queda contenido editorial en
  código.
- **SEO y distribución**: sitemap, `/llms.txt`, JSON-LD (artículo y
  migas), metadatos por guía y categoría, y aviso de afiliación
  siempre visible.
- **Medición**: vistas (`PageView`), clics salientes (`ClickEvent`)
  y búsquedas internas (`SearchLog`, solo desde `/search`, sin IP
  ni cookies) alimentan el panel.

### Panel de administración (`/admin`, con sesión)
- **Productos**: alta, edición y publicación del catálogo.
- **Tendencias** (`/admin/tendencias`): cola de candidatos
  (ASIN, título, fuente) con aprobar/rechazar con motivo; un
  borrador solo se crea desde un candidato aprobado. Cada paso
  queda en `AuditLog`.
- **Reportes** (`/admin/reportes`): CTR a 30 días por producto y
  por categoría, productos zombi (publicados con 0 clics, nunca
  degradados automáticamente) y demanda sin oferta (términos
  buscados sin resultados, con enlace a Tendencias).
- **Acciones sobre zombis**: degradar (PUBLISHED → DEMOTED, con
  motivo) o reemplazar (degrada el zombi y crea un borrador en su
  misma categoría desde un candidato aprobado). Un producto
  degradado sale de los listados pero su ficha directa sigue
  funcionando y el sincronizador lo sigue actualizando: es
  reversible.
- **Configuración** del sitio y acciones de sincronización manual.

## Stack y arquitectura
- **Next.js 16 + TypeScript** (App Router, React 19), monolito
  modular: un solo despliegue, módulos de dominio separados, sin
  microservicios.
- **PostgreSQL + Prisma 6** (Neon en producción).
- **Tailwind CSS 4**.
- Módulos en `src/modules/`: `catalog`, `affiliate`, `trends`,
  `analytics`, `search`, `guides`, `automation`, `amazon`, `seo`,
  `settings`, `admin` y `audit`.
- API propia mínima: `/api/health`, `/api/click`, `/api/view`,
  `/api/search`, `/api/subscribe` y `/api/cron/sync`
  (sincronización; ver [Automatización](#automatización)).

## Despliegue real (verificado, no el del lanzamiento)
- **Vercel, plan Hobby, región `iad1`** (equipo TyF_SIC) +
  **Neon PostgreSQL** (proyecto `ecommercety-prod`, AWS US East 2)
  + dominio en **Cloudflare Registrar**. El lanzamiento inicial
  fue Render Starter el 2026-11-01 y se migró a Vercel el mismo
  día por errores 502 de su instancia única.
- **Consecuencia del plan Hobby**: Vercel rechaza en el despliegue
  cualquier cron más frecuente que una vez al día, así que
  `vercel.json` no declara ningún cron (solo `regions: ["iad1"]`).
  El ciclo cada 5 horas lo dispara GitHub Actions (ver abajo).

## Automatización
- **Workflow `.github/workflows/cron-sync.yml`**: cada 5 horas
  (UTC) y bajo demanda (`workflow_dispatch`), llama con `curl`
  a `GET /api/cron/sync` con `Authorization: Bearer $CRON_SECRET`.
  El mismo secreto debe estar en Vercel (Production) y en GitHub
  Secrets; el workflow falla si falta.
- **La ruta es fail-closed** (`src/modules/automation/cron.ts`):
  sin `CRON_SECRET` responde 503, con secreto incorrecto 401, y
  sin credenciales de la Creators API responde 200
  `NOT_CONFIGURED` sin escribir nada.
- **Precios y disponibilidad: aún no se muestran.** La API
  anterior (PA-API 5.0) fue retirada y la nueva Creators API
  solo se emite con al menos 10 ventas calificadas en los
  últimos 30 días. Mientras tanto, el sitio muestra
  "Check price on Amazon" y nunca precios escritos a mano ni
  extraídos por scraping. Cuando lleguen las credenciales
  (`CREATORS_API_CREDENTIAL_ID` / `CREATORS_API_CREDENTIAL_SECRET`
  en Vercel + redespliegue), el ciclo de 5 horas sincronizará
  solo. Detalle en `docs/automation.md` y `docs/amazon-data.md`.
- La cuenta de Associates está en periodo inicial: necesita 3
  ventas calificadas antes del 2027-04-29 para conservarse.

## Desarrollo local
```bash
npm install
cp .env.example .env   # ajusta DATABASE_URL (local o Neon)
npx prisma generate    # obligatorio tras cualquier cambio de esquema:
                       # un git pull NO regenera el cliente Prisma
npx prisma migrate dev       # o migrate deploy contra una base existente
npm run db:seed              # 14 categorías iniciales
npm run db:import            # importa los lotes de data/products/
npm run dev                  # http://localhost:3000
```

Validación de un lote sin tocar la base:
```bash
npm run db:import -- --batch batch-crescent-replacement --dry-run
```

## Scripts
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servidor de producción
- `npm run lint` — ESLint
- `npm run typecheck` — verificación de tipos TypeScript
- `npm run test` — suite Vitest (81 tests)
- `npm run db:generate` — regenera el cliente Prisma
- `npm run db:migrate` — migraciones en desarrollo
- `npm run db:seed` — datos iniciales (categorías)
- `npm run db:import` — importa lotes de productos por ASIN
- `npm run db:sync-amazon` — sincronización manual con Amazon

## Flujos editoriales
- **Añadir productos**: se definen como lotes en
  `data/products/batch-*.ts` (un registro por ASIN, con enlace
  SiteStripe y Tracking ID), se registran en
  `scripts/import-products.ts` y se importan con `db:import`
  (idempotente por ASIN; `--dry-run` valida sin escribir).
- **Tendencias**: candidato → aprobado → borrador → publicación,
  siempre con motivo y `AuditLog`. Nunca se publica directo
  desde un candidato sin aprobar, ni se degrada nada en
  automático.
- **Reportes**: revisar CTR y zombis cada ciclo, degradar o
  reemplazar desde `/admin/reportes`, y convertir la demanda sin
  oferta de `/search` en candidatos de Tendencias.

## Guías editoriales
Las guías viven en las tablas `Guide` / `GuideProduct` (prosa en
JSON: secciones o grupos por tema, posición editorial, veredicto).
El seed original ya se aplicó en producción y el script de seed se
retiró junto con el contenido en código: **no hay
`db:seed-guides`**. Una guía nueva o editada se escribe directo
en base (Prisma Studio, SQL o un upsert con `guideToDbPayload` de
`src/modules/guides/data.ts`); un entorno nuevo se siembra
copiando las filas desde producción. Historia completa y
advertencias en `docs/guides-db.md`. Sin respaldo en código, un
borrado accidental de filas se recupera desde la copia de
seguridad de Neon, no desde el repo.

## Cumplimiento (leer antes de publicar)
`docs/compliance.md` es obligatorio: precios y ofertas solo desde
la API oficial de Amazon, **prohibido el scraping**, nada de
copiar descripciones, fotos ni reseñas de Amazon, aviso de
afiliación siempre visible, y las comisiones nunca compran
posicionamiento en los listados.

## Estructura
- `src/app/` — rutas: sitio público en `src/app/(site)/`
  (inglés), panel en `src/app/admin/` (español), API en
  `src/app/api/`
- `src/modules/` — dominio (ver lista en Stack)
- `src/components/` — UI compartida
- `src/lib/` — cliente Prisma, autenticación, rate limit
- `prisma/` — esquema, migraciones y seed
- `scripts/` — import de lotes y sincronización
- `data/products/` — lotes de productos por ASIN
- `docs/` — arquitectura, despliegue, automatización,
  cumplimiento y guías operativas

## Calidad y flujo Git
- `main` es la rama estable. Todo trabajo va en ramas
  `feature/<nombre>` y entra a `main` por Pull Request con la CI
  en verde. La rama se borra solo después de fusionar, una vez
  que el `pull` de `main` muestra el merge (un `git branch -d`
  que dice "merged to origin/..." solo confirma la copia remota
  de la rama, no la fusión en `main`).
- Antes de cada PR: `npm run lint`, `npm run typecheck`,
  `npm test` y `npm run build` en verde.

## Documentación relacionada
- `docs/architecture.md` — principios y flujo de datos
- `docs/deployment.md` — despliegue real (Vercel Hobby + Neon)
- `docs/automation.md` — ciclo cada 5 horas y `CRON_SECRET`
- `docs/compliance.md` — reglas de Amazon Associates
- `docs/trends-queue.md` — cola de tendencias
- `docs/report-actions.md` — degradar y reemplazar zombis
- `docs/search-log.md` — registro de búsquedas internas
- `docs/guides-db.md` — guías en base de datos
- `docs/admin.md` — guía rápida del panel
- `docs/database.md` — base de datos y migraciones
- `docs/seo.md` — SEO, sitemap y `/llms.txt`
