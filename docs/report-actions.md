# Reportes — Acciones sobre zombis (Fase 3, primera parte)

## Qué resuelve

`/admin/reportes` señalaba productos zombis (publicados, 0 clics en
30 días) pero no permitía actuar sobre ellos desde el reporte: para
degradar había que ir a Productos, y para reemplazar había que ir a
Tendencias, crear un borrador y acordarse de degradar el viejo. Esta
fase cierra ese círculo en la misma pantalla, sin cambiar la regla
madre: **nada se degrada ni se reemplaza solo**. Cada acción nace de
un clic humano en el reporte, con motivo y con AuditLog.

## Degradar desde el reporte

En cada fila de zombi, el formulario "Degradar" pide un motivo
opcional (si viene vacío, queda "Sin clics en 30 días") y ejecuta
`demoteZombieAction` (`src/app/admin/(panel)/reportes/actions.ts`):

- Solo si el producto está `PUBLISHED`; si ya no lo está, la acción
  se rechaza con mensaje, no se toca nada.
- `PUBLISHED` → `DEMOTED`, y AuditLog con acción `DEMOTE`,
  antes/después y motivo.

Qué significa `DEMOTED` aquí, porque no es borrar ni despublicar:

- El producto **sale de los listados públicos** (categoría,
  destacados y radar), porque esas consultas piden `PUBLISHED`.
- La **ficha directa `/product/<ASIN> sigue funcionando**: solo
  `UNPUBLISHED` devuelve 404. Degradar no rompe enlaces compartidos
  ni SEO.
- El **sincronizador de la Creators API sigue incluyendo a los
  DEMOTED**, así que si el producto vuelve a publicarse desde
  Productos, sus datos de precio ya están frescos.
- Es **reversible**: desde Productos se puede volver a publicar.

En Productos sigue existiendo el cambio de estado manual
(`toggleProductStatusAction`), sin motivo obligatorio. El flujo del
reporte es el flujo editorial para zombis (con motivo y con
`DEMOTE` en AuditLog); el de Productos queda para cambios de estado
generales.

## Reemplazar desde el reporte

En cada fila de zombi, el formulario "Reemplazar" pide elegir un
candidato **APROBADO** y ejecuta `replaceZombieAction`, en una sola
transacción:

1. Degrada el zombi (`PUBLISHED` → `DEMOTED`), con motivo por
   defecto "Sin clics en 30 días" y AuditLog `DEMOTE` que indica
   qué borrador lo reemplaza y desde qué candidato.
2. Crea un **BORRADOR** desde ese candidato, en la **misma
   categoría del zombi**, con `discoveredVia` indicando que
   reemplaza al ASIN viejo, y AuditLog `CREATE`.
3. Redirige a la edición de ese borrador en Productos.

Guardas, iguales que en Tendencias:

- El candidato debe estar `APPROVED`; si no, se rechaza.
- El ASIN del candidato no puede ser el del zombi ni existir ya
  como producto; si existe, se rechaza y se indica editarlo en
  Productos.
- El borrador **no se publica solo**: se completa en Productos con
  descripción propia y enlace SiteStripe válido antes de poder
  publicarse, como exige `validateProductInput`.
- El candidato **sigue APROBADO** hasta que ese borrador se
  publique, igual que en el flujo de Tendencias. No se marca como
  publicado en el momento de crear el borrador, porque el borrador
  aún no está publicado.

Si no hay candidatos aprobados, el reporte lo dice y enlaza a
`/admin/tendencias` para añadir uno, en vez de mostrar un selector
vacío.

## Validación testeable

Las reglas de quién se puede degradar o reemplazar viven en el
módulo puro `src/modules/catalog/zombie.ts` (sin Prisma), con
tests en `tests/zombie-actions.test.ts`: solo `PUBLISHED` se puede
degradar, el motivo se recorta a 300 caracteres y tiene valor por
defecto, reemplazar exige candidato `APPROVED` y ASIN distinto y
sin producto existente.

## Qué queda fuera de esta parte

- No hay degradación ni reemplazo automáticos, ni por cron ni por
  umbral: un zombi puede quedarse publicado si el editor lo decide.
- No se cambia el alcance del sincronizador (sigue incluyendo
  `PUBLISHED` y `DEMOTED`).
- No se tocan las otras dos partes propuestas de la Fase 3:
  registro de búsquedas internas y migración de guías de código a
  base de datos.
