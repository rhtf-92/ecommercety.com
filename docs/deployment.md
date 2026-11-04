# Despliegue en producción — runbook

Arquitectura de producción: **Vercel** (plan Hobby, región iad1)
para la aplicación + **Neon** (PostgreSQL, nivel gratuito) como
base + **Cloudflare Registrar** (dominio ecommercety.com, comprado
el 2026-11-01). El ciclo de sincronización cada 5 horas NO usa
Vercel Cron (en Hobby solo se admiten crons diarios): lo dispara
GitHub Actions; ver `docs/automation.md`.

**Historia de la ruta:** el lanzamiento del 2026-11-01 salió en
Render Starter (US$7/mes), pero su instancia única (0.5 CPU /
512 MB) se saturó con el tráfico normal de la tienda y sirvió
errores 502 intermitentes desde el primer día, incluso tras
optimizar el código (topes al optimizador de imágenes). El mismo
2026-11-01 Renato decidió migrar la app a **Vercel**: cómputo
serverless (Fluid) que escala por petición, sin instancia única
que se caiga. La base en Neon **no se mueve**: solo cambia dónde
corre la app. Esa independencia fue la decisión de diseño original
y es lo que hace esta migración un trámite de DNS y variables.

Todo el código ya está listo; estos pasos son de cuentas y
configuración, en orden.

## 1. Base de datos de producción (Neon) — sin cambios

1. Proyecto `ecommercety-prod` en neon.tech, región AWS US East 2
   (Ohio). Ya creado y cargado; no se toca en esta migración.
2. Guardar FUERA del chat (nunca pegar en el chat) DOS connection
   strings, en *Connect*:
   - **Directo** (sin `-pooler`): para migraciones, seed e import
     desde la PC de Renato.
   - **Agrupado / pooled** (el host contiene `-pooler`): es el que
     usa la app en Vercel (ideal para serverless: muchas funciones,
     pocas conexiones reales).

## 2. Datos iniciales (desde la PC de Renato, apuntando a Neon)

Con el `.env` local apuntando al `DATABASE_URL` **directo** de
Neon (no al Docker local), en este orden:

1. `npx prisma migrate deploy` (aplica las migraciones pendientes)
2. `npm run db:seed` (crea las 14 categorías)
3. `npm run db:import` (carga los 128 productos con enlace)

Ya ejecutado el 2026-11-01. Las migraciones futuras se aplican
igual, desde la PC de Renato contra el string directo: **ningún
despliegue corre migraciones** (en Render el pre-deploy sí lo
hacía; en Vercel ese paso no existe y no hace falta).

## 3. Aplicación en Vercel (verificación previa al dominio)

1. En vercel.com: registrarse con GitHub (`rhtf-92`). El equipo
   actual es **Hobby** (verificado en el panel de Vercel); por
   eso el ciclo cada 5 horas se dispara desde GitHub Actions y
   no desde Vercel Cron (ver `docs/automation.md`).
2. *Add New → Project → Import* `rhtf-92/ecommercety.com`.
   Framework **Next.js** detectado automáticamente; raíz `./`;
   comandos por defecto (install/build). El `postinstall` genera
   el cliente Prisma. El archivo `vercel.json` del repo fija la
   región de funciones en **iad1** (US East, la más cercana a
   Neon Ohio).
3. Antes de desplegar, cargar las variables de entorno
   (ambiente **Production**):
   - `DATABASE_URL` = connection string **agrupado (pooled)** de
     Neon (el mismo que usa la app desde el lanzamiento; Render
     ya fue retirado, ver §7)
   - `NEXT_PUBLIC_SITE_URL` = `https://ecommercety.com` (el valor
     final desde el inicio, igual que se hizo en Render)
   - `NEXT_PUBLIC_BRAND_NAME` = `T&F Picks`
   - `ADMIN_EMAIL` y `ADMIN_PASSWORD` = las credenciales de
     producción del panel
   - `SESSION_SECRET` = cadena aleatoria NUEVA y larga (32+
     caracteres; puede salir de un generador de contraseñas)
4. *Deploy*. Verificar en la URL `*.vercel.app` asignada:
   `/api/health` responde `{"status":"ok","database":true,...}`,
   la portada carga el catálogo completo, `/admin` pide login y
   entra con las credenciales de producción. Todavía sin mover
   el dominio.

## 4. Dominio (Renato, en Vercel y Cloudflare)

1. En Vercel: *proyecto → Settings → Domains → Add*:
   `ecommercety.com` y `www.ecommercety.com`. Configurar `www`
   como **redirect** hacia el dominio raíz.
2. En Cloudflare → *DNS → Records*: **borrar** los dos CNAME que
   apuntan a `ecommercety.onrender.com` y crear (si el panel de
   Vercel mostrara valores distintos, mandan los de Vercel):
   - A, nombre `@`, destino `76.76.21.21`, **DNS only** (nube
     GRIS, sin proxy).
   - CNAME, nombre `www`, destino `cname.vercel-dns.com`,
     **DNS only**.
   No tocar los registros MX/TXT de Email Routing: el buzón
   `contact@ecommercety.com` sigue funcionando igual.
3. Esperar a que Vercel muestre ambos dominios con
   **configuración válida y certificado emitido** (minutos).
   `NEXT_PUBLIC_SITE_URL` ya tiene el valor final: no requiere
   redespliegue por el dominio.
4. Verificación de Dayana desde fuera: el dominio responde con
   cabeceras de Vercel, salud en verde y el barrido completo de
   rutas sin 502.

## 5. Declarar el sitio en Associates Central (obligatorio)

1. Associates Central → Configuración de la cuenta → Editar lista
   de sitios web y aplicaciones móviles → agregar
   `ecommercety.com`.
2. Sin este paso, las comisiones del dominio no se atribuyen. No
   se promociona el sitio antes de completar este paso.

## 6. Verificación post-lanzamiento

- [ ] Portada, categorías, fichas y guías cargan con HTTPS.
- [ ] `/admin` pide login y entra con las credenciales de
      producción.
- [ ] Un clic en "Check price on Amazon" abre Amazon con
      `tag=ecommercety00-20` y suma en el contador del panel.
- [ ] `/sitemap.xml` y `/robots.txt` responden en el dominio.
- [ ] Registrar el dominio en Google Search Console (el TXT ya
      existe en Cloudflare) y enviar el sitemap. Ver
      `docs/seo.md`.
- [ ] Reservar usuarios sociales: @ecommercety / @tandfpicks.
- [ ] Ciclos de Dayana activos: verificación cada 5 horas y
      descubrimiento de tendencias en la hora 3.

## 7. Retiro de Render (al confirmar estabilidad en Vercel)

1. Con el dominio sirviendo desde Vercel y estable: Render →
   servicio **ecommercety** → *Settings* → **Delete Web
   Service**. Esto detiene la facturación del Starter (US$7/mes).
2. Dayana elimina `render.yaml` del repo en el commit de cierre
   (hacerlo antes de borrar el servicio podría disparar una
   sincronización del Blueprint que proponga borrar recursos).

## 8. Cuando Amazon apruebe la Creators API

Requisito: 10 ventas calificadas en 30 días. Entonces: Associates
Central → Herramientas → Creators API → crear aplicación → pegar
las credenciales en las variables de Vercel (*Settings →
Environment Variables*: `CREATORS_API_CREDENTIAL_ID` /
`CREATORS_API_CREDENTIAL_SECRET`) → `npm run db:sync-amazon`
(o el botón del panel) → precios, ofertas e imágenes oficiales
aparecen con su sello de hora. Ver `docs/amazon-data.md`.

## Notas de operación en Vercel

- **Despliegues:** cada push a `main` despliega solo. Ante un
  despliegue malo, *Deployments → ⋯ → Rollback* vuelve al
  anterior al instante (no hay «instancia» que reiniciar).
- **Cómputo:** funciones Fluid con 2 GB / 1 vCPU por defecto
  (hasta 4 GB / 2 vCPU si una ruta lo necesitara); el tiempo
  esperando a la base no consume CPU activa. La región está
  fijada en `iad1` por `vercel.json`.
- **Imágenes:** el optimizador es el de Vercel; los topes del
  repo (`deviceSizes` hasta 1920px, caché de 30 días) mantienen
  las transformaciones dentro de las 5.000 incluidas en Pro.
- **Rate limiting:** es en memoria por instancia de función
  (best-effort en serverless): frena abuso básico por IP; no es
  un contador global.
- **Logs:** pestaña *Logs* del proyecto (el logger JSON de la
  app está pensado para esto).
