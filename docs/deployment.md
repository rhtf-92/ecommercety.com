# Despliegue en producción — runbook

Arquitectura de producción: **Render** (Web Service, plan Starter
US$7/mes) para la aplicación + **Neon** (PostgreSQL, nivel
gratuito) como base + **Cloudflare Registrar** (dominio
ecommercety.com, ya comprado el 2026-11-01).

**Ruta elegida por Renato el 2026-11-01:** Render. Descartados:
Railway (registros nuevos pausados sin fecha tras su brecha de
seguridad del 21-oct-2026) y Vercel Hobby (su plan gratuito prohíbe
uso comercial y sitios de afiliación; Vercel Pro costaba
US$20/mes). El plan **gratuito de Render tampoco sirve** para la
tienda pública: el servicio se duerme tras 15 min sin tráfico y
tarda ~1 min en despertar. El Starter queda siempre encendido.
La base en Neon es independiente del host: si mañana se migra la
app, la base no se toca. El archivo `render.yaml` en la raíz del
repo define el servicio (plan, comandos, healthcheck y variables);
`railway.json` se eliminó.

Todo el código ya está listo; estos pasos son de cuentas y
configuración, en orden.

## 1. Base de datos de producción (Neon)

1. Crear proyecto en neon.tech (región US East, la más cercana al
   público de EE. UU.). Nombre sugerido: `ecommercety-prod`.
2. Guardar FUERA del chat (nunca pegar en el chat) DOS connection
   strings, en *Connect*:
   - **Directo** (sin `-pooler`): para migraciones, seed e import
     desde la PC de Renato.
   - **Agrupado / pooled** (el host contiene `-pooler`): es el que
     usa la app en Render.

## 2. Datos iniciales (desde la PC de Renato, apuntando a Neon)

Con el `.env` local apuntando al `DATABASE_URL` **directo** de
Neon (no al Docker local), en este orden:

1. `npx prisma migrate deploy` (aplica las 5 migraciones)
2. `npm run db:seed` (crea las 14 categorías)
3. `npm run db:import` (carga los 128 productos con enlace)

La tienda abre con el catálogo completo enlazado (128 productos en
14 categorías). Los lotes sin enlace SiteStripe (002, navideño y 7
de las olas) se suman después con el mismo `db:import`.

## 3. Aplicación en Render (verificación previa al dominio)

1. En render.com: registrarse con GitHub (registros abiertos).
2. *New → Blueprint* → conectar `rhtf-92/ecommercety.com`. Render
   lee `render.yaml` y crea el servicio **ecommercety** (Node,
   región Ohio, plan Starter).
3. Al crear el Blueprint, Render pide las variables con
   `sync: false`:
   - `DATABASE_URL` = connection string **agrupado (pooled)** de Neon
   - `NEXT_PUBLIC_SITE_URL` = por ahora la URL que asigne Render
     (`https://ecommercety.onrender.com` o la que muestre el panel);
     al conectar el dominio pasa a `https://ecommercety.com`
   - `ADMIN_EMAIL` y `ADMIN_PASSWORD` = valores NUEVOS, distintos
     de los de desarrollo
   (`SESSION_SECRET` lo genera Render automáticamente.)
4. Render compila, corre `npx prisma migrate deploy` (pre-deploy) y
   arranca. Verificar en la URL `*.onrender.com`: `/api/health`
   responde `{"status":"ok", ...}`, la portada carga el catálogo
   completo y `/admin` entra con las credenciales de producción.
   Todavía sin dominio ni promoción.

## 4. Dominio (Renato, en Render y Cloudflare)

Según la guía oficial de Render para Cloudflare:

1. En Render: *servicio → Settings → Custom Domains → + Add*:
   agregar `ecommercety.com` y `www.ecommercety.com`.
2. En Cloudflare → *SSL/TLS → Overview*: modo de cifrado **Full**.
3. En Cloudflare → *DNS → Records*: borrar cualquier registro
   `AAAA` del dominio (Render usa IPv4) y crear:
   - CNAME, nombre `@`, destino `ecommercety.onrender.com`
     (el subdominio exacto que muestre Render), **DNS only**
     (nube GRIS, sin proxy). Cloudflare aplica *CNAME flattening*
     en la raíz automáticamente.
   - CNAME, nombre `www`, mismo destino, **DNS only**.
   No tocar los registros MX/TXT de Email Routing: el buzón
   `contact@ecommercety.com` sigue funcionando igual.
4. Esperar a que Render muestre ambos dominios **verificados y con
   certificado emitido** (minutos). Recomendación: dejar los CNAME
   en DNS only de forma permanente (Render ya emite y renueva el
   HTTPS; el proxy de Cloudflare sobre Render es opcional y suma
   una capa que puede dar conflictos de certificado).
5. Cambiar `NEXT_PUBLIC_SITE_URL` a `https://ecommercety.com` en
   Render (*Environment*) y redesplegar (*Manual Deploy → Deploy
   latest commit*).

## 5. Declarar el sitio en Associates Central (obligatorio)

1. Associates Central → Configuración de la cuenta → Editar lista de
   sitios web y aplicaciones móviles → agregar `ecommercety.com`.
2. Sin este paso, las comisiones del dominio no se atribuyen. No se
   promociona el sitio antes de completar este paso.

## 6. Verificación post-lanzamiento

- [ ] Portada, categorías, fichas y guías cargan con HTTPS.
- [ ] `/admin` pide login y entra con las credenciales de producción.
- [ ] Un clic en "Check price on Amazon" abre Amazon con
      `tag=ecommercety00-20` y suma en el contador del panel.
- [ ] `/sitemap.xml` y `/robots.txt` responden en el dominio.
- [ ] Registrar el dominio en Google Search Console (TXT en
      Cloudflare) y enviar el sitemap. Ver `docs/seo.md`.
- [ ] Reservar usuarios sociales: @ecommercety / @tandfpicks.
- [ ] Activar con Dayana los ciclos: verificación cada 5 horas y
      descubrimiento de tendencias en la hora 3.

## 7. Cuando Amazon apruebe la Creators API

Requisito: 10 ventas calificadas en 30 días. Entonces: Associates
Central → Herramientas → Creators API → crear aplicación → pegar
las credenciales en las variables de Render (*Environment*:
`CREATORS_API_CREDENTIAL_ID` / `CREATORS_API_CREDENTIAL_SECRET`) →
`npm run db:sync-amazon` (o el botón del panel) → precios, ofertas
e imágenes oficiales aparecen con su sello de hora. Ver
`docs/amazon-data.md`.

## Notas de operación en Render

- **Despliegues:** cada push a `main` despliega solo; el
  pre-deploy aplica migraciones nuevas antes de servir. Si un
  despliegue falla el healthcheck, Render mantiene viva la versión
  anterior.
- **Si el Starter quedara justo** (0.5 CPU / 512 MB) con el
  tráfico de temporada: *Settings → Instance Type → Standard*
  (US$25/mes), un clic, sin migración.
- **Logs:** pestaña *Logs* del servicio (el logger JSON de la app
  está pensado para esto).
