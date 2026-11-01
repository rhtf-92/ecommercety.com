# Despliegue en producción — runbook

Arquitectura de producción decidida el 2026-11-01: **Railway**
(servidor Node, desde US$5/mes) para la aplicación + **Neon**
(PostgreSQL, nivel gratuito) como base desde el día uno +
**Cloudflare Registrar** (dominio ecommercety.com). La base nace en
Neon a propósito: migrar luego a **Vercel Pro** será mover solo la
app (repo + variables + DNS), sin tocar los datos. Todo el código ya
está listo; estos pasos son de cuentas y configuración, en orden.

## 1. Base de datos de producción (Neon)

1. Crear proyecto en neon.tech (región US East, la más cercana al
   público de EE. UU.).
2. Copiar el connection string (con `?sslmode=require`).

## 2. Aplicación en Railway (verificación previa al dominio)

1. En railway.com: New Project → Deploy from GitHub repo →
   `rhtf-92/ecommercety.com`. El archivo `railway.json` del repo ya
   define build (`npm run build`), arranque con migración automática
   (`npx prisma migrate deploy && npm run start`) y healthcheck en
   `/api/health`.
2. Variables del servicio:
   - `DATABASE_URL` = connection string de Neon
   - `NEXT_PUBLIC_SITE_URL` = la URL `*.up.railway.app` por ahora;
     al conectar el dominio pasa a `https://ecommercety.com`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` (valores
     NUEVOS, distintos de los de desarrollo)
   - `CREATORS_API_CREDENTIAL_ID/SECRET` solo cuando Amazon los emita.
3. Cargar datos desde la PC, apuntando el `.env` a Neon:
   `npm run db:seed` y `npm run db:import` (lote 001 y siguientes).
   Las migraciones las aplica el propio arranque en Railway.
4. Verificar en la URL de Railway: `/api/health` responde
   `{"status":"ok", ...}`, la portada carga el catálogo y `/admin`
   entra con las credenciales de producción. Esta fase es de
   verificación interna: todavía sin dominio ni promoción.

## 3. Dominio (Renato, en Cloudflare)

1. Comprar `ecommercety.com` en Cloudflare Registrar (renovación
   automática y verificación en dos pasos activadas).
2. Crear el buzón/redirección `contact@ecommercety.com` (la página de
   contacto ya lo anuncia).
3. En Railway: Settings → Networking → Custom Domain →
   `ecommercety.com` y `www.ecommercety.com`; Railway indica los
   registros y se crean en el DNS de Cloudflare (modo proxied es
   válido aquí). Actualizar `NEXT_PUBLIC_SITE_URL` a
   `https://ecommercety.com` y redesplegar.

## 4. Declarar el sitio en Associates Central (obligatorio)

1. Associates Central → Configuración de la cuenta → Editar lista de
   sitios web y aplicaciones móviles → agregar `ecommercety.com`.
2. Sin este paso, las comisiones del dominio no se atribuyen. No se
   promociona el sitio antes de completar este paso.

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

## 6. Migración futura a Vercel Pro (cuando el tráfico lo justifique)

1. Importar el mismo repo en Vercel Pro y copiar las variables
   (el `DATABASE_URL` de Neon NO cambia: la base no se mueve).
2. Conectar el dominio en Vercel y pasar el registro de Cloudflare
   a modo DNS only para ese dominio.
3. Verificar `/api/health` en Vercel y dar de baja el servicio de
   Railway. Sin cambios de código.

## 7. Cuando Amazon apruebe la Creators API

Requisito: 10 ventas calificadas en 30 días. Entonces: Associates
Central → Herramientas → Creators API → crear aplicación → pegar las
credenciales en Railway → `npm run db:sync-amazon` (o el botón del
panel) → precios, ofertas e imágenes oficiales aparecen con su sello
de hora. Ver `docs/amazon-data.md`.
