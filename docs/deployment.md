# Despliegue en producción — runbook

Arquitectura de producción (niveles gratuitos): **Vercel** (Next.js) +
**Neon** (PostgreSQL) + **Cloudflare Registrar** (dominio
ecommercety.com). Todo el código ya está listo; estos pasos son de
cuentas y configuración, en orden.

## 1. Dominio (Renato, en Cloudflare)

1. Comprar `ecommercety.com` en Cloudflare Registrar.
2. Crear el buzón/redirección `contact@ecommercety.com` (la página de
   contacto ya lo anuncia).

## 2. Declarar el sitio en Associates Central (obligatorio)

1. Associates Central → Configuración de la cuenta → Editar lista de
   sitios web y aplicaciones móviles → agregar `ecommercety.com`.
2. Sin este paso, las comisiones del dominio no se atribuyen.

## 3. Base de datos de producción (Neon)

1. Crear proyecto en neon.tech (región US East).
2. Copiar el connection string (con `?sslmode=require`).
3. Desde la PC, apuntando a esa URL:
   `npx prisma migrate deploy`, `npm run db:seed`,
   `npm run db:import` (lote 001 y siguientes).

## 4. Vercel

1. Importar el repo `rhtf-92/ecommercety.com` en Vercel.
2. Variables de entorno (Production):
   - `DATABASE_URL` = connection string de Neon
   - `NEXT_PUBLIC_SITE_URL` = `https://ecommercety.com`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` (valores nuevos,
     distintos de los de desarrollo)
   - `CREATORS_API_CREDENTIAL_ID/SECRET` solo cuando Amazon los emita.
3. Conectar el dominio `ecommercety.com` (Vercel indica los DNS;
   Cloudflare en modo DNS only para ese registro).
4. Verificar: `https://ecommercety.com/api/health` debe dar
   `{"status":"ok", ...}`.

## 5. Verificación post-lanzamiento

- [ ] Portada, categorías, fichas y guías cargan con HTTPS.
- [ ] `/admin` pide login y entra con las credenciales de producción.
- [ ] Un clic en "Check price on Amazon" abre Amazon con
      `tag=ecommercety00-20` y suma en el contador del panel.
- [ ] `/sitemap.xml` y `/robots.txt` responden en el dominio.
- [ ] Registrar el dominio en Google Search Console y enviar el sitemap.
- [ ] Reservar usuarios sociales: @ecommercety / @tandfpicks.
- [ ] Activar con Dayana los ciclos: verificación + sincronización
      cada 5 horas y descubrimiento de tendencias en la hora 3.

## 6. Cuando Amazon apruebe la Creators API

Requisito: 10 ventas calificadas en 30 días. Entonces: Associates
Central → Herramientas → Creators API → crear aplicación → pegar las
credenciales en Vercel → `npm run db:sync-amazon` (o el botón del
panel) → precios, ofertas e imágenes oficiales aparecen con su sello
de hora. Ver `docs/amazon-data.md`.
