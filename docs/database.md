# Base de datos — puesta en marcha

La plataforma usa **PostgreSQL** vía Prisma. Hay dos caminos equivalentes:

## Opción A: local con Docker (recomendada para desarrollo)
1. Instala Docker Desktop.
2. En la raíz del proyecto: `docker compose up -d`
3. Copia `.env.example` como `.env` (su `DATABASE_URL` ya coincide
   con las credenciales del compose).
4. Aplica la estructura y los datos iniciales:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

## Opción B: nube gratuita (Neon)
1. Crea una cuenta en neon.tech y un proyecto (región EE. UU.).
2. Copia su connection string en `DATABASE_URL` de `.env`.
3. Ejecuta `npx prisma migrate deploy` y `npm run db:seed`.

## Notas
- Las migraciones viven en `prisma/migrations/` y se aplican en orden;
  nunca edites una migración ya aplicada.
- El sitio público funciona en modo lectura-respaldo sin base de datos
  (muestra las 6 categorías de Fase 1), pero los productos, clics y el panel
  requieren la base conectada.
