# T&F Picks — by E-Commerce T&F

Plataforma profesional de afiliación de Amazon EE. UU. (ecommercety.com):
productos recomendados, guías y comparativas, cada uno con su enlace de
afiliado generado con SiteStripe y su Tracking ID por canal.

## Stack
- **Next.js 16 + TypeScript** (App Router), monolito modular
- **PostgreSQL + Prisma ORM**
- **Tailwind CSS 4**
- Despliegue previsto: Vercel + PostgreSQL gestionado, DNS en Cloudflare

## Puesta en marcha (desarrollo)
```bash
npm install
cp .env.example .env.local   # ajusta DATABASE_URL
npx prisma generate
npx prisma migrate dev       # cuando exista una base de datos disponible
npm run db:seed              # carga las 6 categorías de la Fase 1
npm run dev                  # http://localhost:3000
```

## Scripts
- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run lint` — ESLint
- `npm run typecheck` — verificación de tipos TypeScript
- `npm run db:seed` — datos iniciales (categorías Fase 1)

## Estructura
- `src/app/` — rutas del sitio público (inglés) y del panel (español)
- `src/modules/` — módulos de dominio (catálogo, afiliación, tendencias, etc.)
- `src/lib/` — utilidades compartidas (cliente Prisma)
- `prisma/` — esquema de datos y seed
- `docs/` — arquitectura y reglas de cumplimiento de Amazon Associates

## Reglas del proyecto
Lee `docs/compliance.md` antes de publicar cualquier contenido: precios solo
desde la API oficial, nada de scraping, aviso de afiliación siempre visible.

## Flujo Git
- `main` es la rama estable. El trabajo nuevo va en ramas `feature/<nombre>`
  y entra a `main` por Pull Request con la CI en verde.
