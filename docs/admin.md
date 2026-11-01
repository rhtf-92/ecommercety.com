# Panel de administración — guía rápida

Ruta: `/admin` (en español). Protegido por `src/proxy.ts` (cookie de
sesión firmada) y por `requireAdmin()` en cada página y acción.

## Configuración (una sola vez por entorno)

En `.env` (nunca en git):

```
DATABASE_URL=...
ADMIN_EMAIL=correo-del-admin
ADMIN_PASSWORD=contraseña-fuerte
SESSION_SECRET=cadena-aleatoria-larga
```

## Base de datos

- Local con Docker: `docker compose up -d` (PostgreSQL 16, ver
  `docs/database.md`), luego `npx prisma migrate deploy` y
  `npm run db:seed` para crear las 6 categorías.
- Nube: Neon (nivel gratuito); usa la misma `DATABASE_URL` en el hosting.

## Rutina al actualizar el proyecto (importante)

Cada vez que Dayana publica cambios que tocan la base de datos, en tu
PC sigue este orden y **reinicia el servidor al final**:

```
git pull
npm install                 # el postinstall regenera el cliente Prisma
npx prisma migrate deploy   # crea/actualiza las tablas
npm run dev                 # arranca de nuevo (Ctrl+C al anterior)
```

Por qué: `migrate deploy` crea las tablas pero **no** actualiza el
cliente Prisma generado que usa el servidor. Si el cliente quedó de
una versión anterior, el panel muestra valores por defecto y los
ajustes (interruptor de imágenes, logo, banner) no guardan. La tarjeta
**Estado del sistema** del Resumen detecta ese caso y te dice el
comando exacto; si ya estás en medio del problema, basta:

```
npx prisma generate
npm run dev   # tras detener el servidor anterior
```

## Flujo de carga de un producto

1. En Amazon.com, abre el producto y genera el enlace con **SiteStripe**
   usando el Tracking ID del canal (WEB: `ecommercety00-20`).
2. En el panel: **Nuevo producto** → ASIN, título propio, categoría, URL
   de Amazon, enlace de SiteStripe, imagen oficial y descripción propia.
3. El sistema valida: ASIN de 10 caracteres y único, dominio Amazon.com,
   `tag=` oficial en el enlace. Sin enlace válido no se puede publicar.
4. Publica desde el formulario (estado Publicado) o desde el listado.

## Auditoría

Cada crear/editar/publicar/despublicar/eliminar escribe en `AuditLog`
con antes/después y el actor (correo del admin; en el futuro:
`dayana-verification` y `dayana-trends` para los ciclos automáticos).

## Seguridad

- Contraseñas solo por variables de entorno; la sesión es una cookie
  `httpOnly` firmada con HMAC-SHA256 (`SESSION_SECRET`), válida 12 h.
- El panel no se indexa (`robots: noindex` en el login y rutas internas
  fuera del sitemap).

## Carga por lotes (Dayana)

Los lotes curados viven en `data/products/batch-*.ts` con título y
descripción propios y el enlace SiteStripe exacto de cada producto.
Para publicarlos todos de una vez (idempotente, upsert por ASIN):

```
npm run db:import               # importa y publica
npm run db:import -- --dry-run  # solo valida, sin escribir
```

El importador valida ASIN, dominio y Tracking ID antes de escribir, y
deja constancia en `AuditLog` con actor `dayana-import`.
