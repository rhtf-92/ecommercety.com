# Endurecimiento técnico (Sprint 5)

Cuatro frentes que preparan la plataforma para producción real:
pruebas, rendimiento de imágenes, protección anti abuso y
observabilidad con analítica propia.

## 1. Pruebas automatizadas (Vitest)

- Comando: `npm run test` (la CI lo ejecuta en cada push, antes del build).
- Ubicación: `tests/` — lógica pura de negocio, sin base de datos ni red:
  - `validation.test.ts`: reglas del panel (ASIN, URLs de Amazon,
    enlace obligatorio con Tracking ID oficial para publicar,
    destacados editoriales).
  - `creators-map.test.ts`: mapeo de la Creators API (Buy Box,
    ahorro calculado, imágenes, ofertas) — la primera línea de
    defensa cuando Amazon cambie su respuesta.
  - `rules.test.ts`: Tracking IDs, regla "sin imagen no hay bloque",
    diagnósticos del panel y la regla de precios de 24 h.
  - `rate-limit.test.ts`: ventana fija y extracción de IP.
- Al agregar lógica de negocio nueva, su prueba va en el mismo cambio.

## 2. Rendimiento de imágenes

- El slide de portada y los banners de página usan `next/image`
  (antes `<img>` directo): el optimizador sirve AVIF/WebP y el
  tamaño justo por dispositivo (`formats` en `next.config.ts`).
- La primera diapositiva y el banner de cada página cargan con
  prioridad (son el LCP); el resto del carrusel carga diferido.

## 3. Rate limiting (`src/lib/rate-limit.ts`)

Ventana fija en memoria, por IP (tras el proxy de producción):

| Ruta                  | Límite              | Efecto al exceder            |
| --------------------- | ------------------- | ---------------------------- |
| Login del panel       | 5 intentos / 10 min | Mensaje con espera en minutos |
| `POST /api/click`     | 120 / min           | 429 (el clic ya navegó)      |
| `POST /api/view`      | 240 / min           | 429                          |

Alcance: una instancia. Si se escala a varias, migrar el almacén a
Upstash/Redis conservando la interfaz `rateLimit(clave, límite, ventana)`.

## 4. Observabilidad y analítica propia

- **Logger estructurado** (`src/lib/log.ts`): una línea JSON por
  evento (`login.failed`, `login.rate_limited`, `click.record_failed`,
  `settings.*_save_failed`...), visible en los logs de Vercel sin
  servicios externos. Punto único de conexión si se adopta un
  agregador (Sentry/Axiom).
- **Visitas propias** (tabla `PageView`, migración
  `20261031040000_page_views`): el sitio envía una señal por ruta
  pública visitada (`/api/view`, componente `ViewBeacon`). Sin
  cookies, sin IP, sin terceros; los bots evidentes se descartan y
  las rutas del panel nunca se registran.
- El Resumen del panel muestra **Visitas (30 días)** y el bloque
  **Páginas más vistas**, junto a los clics: con eso se mide el
  embudo visita → clic sin depender de nadie.

## Actualización local tras este sprint

Hay migración nueva (la quinta): `git pull`, `npm install` (instala
Vitest y regenera el cliente Prisma), `npx prisma migrate deploy`
y reiniciar el servidor.
