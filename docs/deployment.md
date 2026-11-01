# Despliegue en producción — runbook

Arquitectura de producción: **Vercel Pro** (US$20/mes) para la
aplicación + **Neon** (PostgreSQL, nivel gratuito) como base +
**Cloudflare Registrar** (dominio ecommercety.com).

**Cambio de ruta (2026-11-01):** el plan original era arrancar en
Railway, pero Railway sufrió una brecha de seguridad el 21-oct-2026
(variables de entorno de clientes descifradas) y mantiene los
registros nuevos **pausados sin fecha de reapertura**. No se espera:
se lanza directo en Vercel Pro, que era el destino final previsto.
La base en Neon no cambia (esa decisión blindó el lanzamiento: la
base es independiente del host de la app). El archivo `railway.json`
queda en el repo sin efecto; Vercel lo ignora.

Todo el código ya está listo; estos pasos son de cuentas y
configuración, en orden.

## 1. Base de datos de producción (Neon)

1. Crear proyecto en neon.tech (región US East, la más cercana al
   público de EE. UU.).
2. Copiar el connection string (con `?sslmode=require`).

## 2. Datos iniciales (desde la PC de Renato, apuntando a Neon)

Con el `.env` local apuntando al `DATABASE_URL` de **Neon** (no al
Docker local), en este orden:

1. `npx prisma migrate deploy` (aplica las 5 migraciones)
2. `npm run db:seed` (crea las 14 categorías)
3. `npm run db:import` (carga los 128 productos con enlace)

En Vercel no hay migración al arranque: la base queda lista antes
del primer despliegue, y los cambios futuros de esquema se aplican
igual, desde la PC o desde CI.

## 3. Aplicación en Vercel Pro (verificación previa al dominio)

1. En vercel.com: registrarse con GitHub → plan **Pro** (el plan
   gratuito Hobby prohíbe uso comercial y sitios de afiliación).
2. *Add New → Project* → importar `rhtf-92/ecommercety.com`.
   Framework detectado automáticamente: Next.js; build `npm run
   build`; sin cambios.
3. Variables de entorno (Production):
   - `DATABASE_URL` = connection string de Neon
   - `NEXT_PUBLIC_SITE_URL` = la URL `*.vercel.app` por ahora; al
     conectar el dominio pasa a `https://ecommercety.com`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET` (valores
     NUEVOS, distintos de los de desarrollo)
   - `CREATORS_API_CREDENTIAL_ID/SECRET` solo cuando Amazon los emita.
4. Verificar en la URL de Vercel: `/api/health` responde
   `{"status":"ok", ...}`, la portada carga el catálogo y `/admin`
   entra con las credenciales de producción. Todavía sin dominio ni
   promoción.

## 4. Dominio (Renato, en Cloudflare)

1. En Vercel: *Project → Settings → Domains* → agregar
   `ecommercety.com` y `www.ecommercety.com`. Vercel muestra los
   registros DNS exactos a crear (valores típicos: A `@` →
   `76.76.21.21` y CNAME `www` → `cname.vercel-dns.com`); se usan
   los que Vercel muestre.
2. En Cloudflare → DNS → Records, crearlos en modo **DNS only
   (nube GRIS, sin proxy)**. Con Vercel, el proxy de Cloudflare
   causa bucles de redirección y problemas de certificado: el HTTPS
   y los certificados los gestiona Vercel automáticamente.
   (Esto reemplaza la guía "proxied + Full (strict)" que aplicaba a
   Railway.)
3. Actualizar `NEXT_PUBLIC_SITE_URL` a `https://ecommercety.com`
   en Vercel y redesplegar.
4. El buzón `contact@ecommercety.com` (Email Routing de Cloudflare)
   no se ve afectado por el cambio de DNS del sitio.

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
- [ ] Registrar el dominio en Google Search Console y enviar el sitemap.
- [ ] Reservar usuarios sociales: @ecommercety / @tandfpicks.
- [ ] Activar con Dayana los ciclos: verificación + sincronización
      cada 5 horas y descubrimiento de tendencias en la hora 3.

## 7. Cuando Amazon apruebe la Creators API

Requisito: 10 ventas calificadas en 30 días. Entonces: Associates
Central → Herramientas → Creators API → crear aplicación → pegar las
credenciales en las variables de Vercel → `npm run db:sync-amazon`
(o el botón del panel) → precios, ofertas e imágenes oficiales
aparecen con su sello de hora. Ver `docs/amazon-data.md`.
