# Automatización — Fase 2: ciclo cada 5 horas

> SUSPENDIDO 2026-11-04 por decisión de Alya: el disparo automático
> cada 5 horas está pausado hasta que Amazon emita las credenciales
> de la Creators API. Sin credenciales el sincronizador responde
> NOT_CONFIGURED y no escribe nada; la caza de productos pasa a
> revisiones manuales programadas (07, 11, 15, 19 y 23 hora Lima).
> Para reactivar: restaurar el `schedule` en
> `.github/workflows/cron-sync.yml` y quitar este aviso.

## Qué automatiza (y qué no)

Antes, el ciclo de 5 horas dependía de que alguien pulsara
"Sincronizar precios e imágenes ahora" en el panel o corriera
`npm run db:sync-amazon`. Ahora GitHub Actions dispara
`GET /api/cron/sync` cada 5 horas
(`.github/workflows/cron-sync.yml`, `0 */5 * * *` en UTC), y esa
ruta reutiliza exactamente el mismo sincronizador oficial del
panel (`src/modules/amazon/sync.ts`): Creators API, lotes de
10 ASIN, 1 solicitud/segundo, registro en `VerificationRun` y
`AuditLog`.

## Por qué no Vercel Cron (plan Hobby)

El equipo de Vercel del proyecto está en el plan **Hobby**, no
en Pro como indicaba `docs/deployment.md`. En Hobby, Vercel
rechaza en el despliegue cualquier cron más frecuente que una
vez al día, y por eso el cron `0 */5 * * *` declarado en
`vercel.json` hizo fallar los despliegues de Preview y de
Production tras el merge del PR #1, mientras el sitio seguía
vivo con el despliegue anterior. La solución, sin subir el plan,
es no declarar ningún cron en `vercel.json` y disparar la ruta
desde GitHub Actions, que es gratis y no tiene ese límite. Si
algún día el equipo sube a Pro, se puede volver a Vercel Cron
declarando el horario en `vercel.json` y desactivando este
workflow, sin tocar la ruta: la autenticación es la misma.

Lo que NO automatiza, a propósito:

- **No raspa Amazon.** No hay ninguna lectura de páginas de
  producto fuera de la Creators API oficial, como exige
  `docs/compliance.md`.
- **No publica productos.** La puerta de calidad sigue siendo
  humana, en `/admin/tendencias` (Fase 1).
- **No degrada productos solo.** Los zombis se señalan en
  `/admin/reportes`; la decisión sigue siendo editorial.

## Estado actual: listo, pero en espera de la API

Sin `CREATORS_API_CREDENTIAL_ID` / `SECRET`, el sincronizador
devuelve `NOT_CONFIGURED` y no escribe nada. Eso es correcto: el
cron queda desplegado y, en cuanto Amazon emita las credenciales
(10 ventas calificadas en 30 días), el siguiente ciclo empieza a
sincronizar precios, ofertas, disponibilidad e imágenes oficiales
sin cambiar código. Mientras tanto, el panel sigue mostrando el
botón manual y `/api/health` sigue informando
`creatorsApi: false`.

Cuando la API esté activa, cada ciclo exitoso aparece en el panel
como "Última verificación/sincronización", con su reporte
(`X actualizados, Y sin respuesta`).

## Seguridad del cron

La ruta es fail-closed, probada en `tests/cron-auth.test.ts`
(`src/modules/automation/cron.ts`):

- El llamador (GitHub Actions) envía
  `Authorization: Bearer <CRON_SECRET>`.
- Sin `CRON_SECRET` configurado en Vercel (entorno Production),
  la ruta responde 503 y nunca ejecuta la sincronización.
- Con secreto incorrecto, responde 401.
- El secreto nunca se devuelve en la respuesta ni se registra.

Configuración (una vez, mismo valor en ambos sitios):

1. Vercel → proyecto → Settings → Environment Variables →
   añadir `CRON_SECRET` con una cadena larga y aleatoria
   (32+ caracteres), entorno Production.
2. GitHub → repositorio → Settings → Secrets and variables →
   Actions → añadir el secreto `CRON_SECRET` con el mismo valor.
3. Redesplegar en Vercel (las variables solo aplican en un
   despliegue nuevo) o esperar al siguiente despliegue por push
   a `main`.
4. Verificar en GitHub → Actions → "Cron sync (5h)" que el
   workflow responde 200 con `reason: NOT_CONFIGURED` hasta que
   llegue la Creators API, y que la ruta sin secreto sigue
   respondiendo 503.

## Límites a vigilar

- La función tiene `maxDuration: 300` segundos. Con el catálogo
  actual (~200 productos, 20 lotes, 1 segundo entre lotes) un ciclo
  tarda del orden de medio minuto más la base de datos; si el
  catálogo crece a miles de productos, habrá que paginar el ciclo
  o partirlo por categorías antes de tocar el límite.
- La cuota inicial de la Creators API es 8.640 llamadas/día; un
  ciclo cada 5 horas son 5 ciclos/día, muy por dentro del límite
  con el catálogo actual.
- Si un ciclo falla a mitad (error de red con Amazon), queda
  registrado en `VerificationRun` con `issuesFound: 1` y el
  siguiente ciclo lo retoma; no se reintenta dentro del mismo
  ciclo para no duplicar llamadas.
