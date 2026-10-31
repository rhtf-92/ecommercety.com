# Datos de Amazon: precios, ofertas e imágenes — análisis y arquitectura

> Verificado el 2026-10-31 contra la documentación oficial de la
> Creators API (affiliate-program.amazon.com/creatorsapi/docs) y el
> estado del programa Associates.

## La pregunta

¿Puede la plataforma importar precio en tiempo real, vigencia de la
oferta e imágenes **desde el enlace de SiteStripe**? Respuesta corta:
**no, y nadie puede**. El enlace de SiteStripe es solo una URL con el
ASIN y el `tag` de afiliado; no transporta precio, oferta ni imagen.
Todo dato visible debe venir de un canal oficial, y Amazon los reparte
así:

| Dato | Canal oficial | ¿Disponible hoy para T&F Picks? |
| --- | --- | --- |
| Enlace de afiliado con tag | SiteStripe (navegador de Renato) | Sí |
| Precio, precio de lista, % de descuento | Creators API (`offersV2.listings.price`) | No todavía (elegibilidad) |
| Vigencia/badge de oferta | Creators API (`offersV2.listings.dealDetails`) | No todavía |
| Disponibilidad y Prime | Creators API (`offersV2`) | No todavía |
| Imagen oficial (grande/mediana) | Creators API (`images.primary.*`) | No todavía |
| Extraer datos raspando Amazon.com | **Prohibido** (términos de Amazon y política interna) | Nunca |

Notas que cierran caminos falsos:

- **PA-API 5.0 murió**: Amazon la retiró el 15 de mayo de 2026. Su
  sucesora es la **Creators API** (OAuth 2.0, credenciales nuevas desde
  Associates Central → Herramientas → Creators API).
- **SiteStripe ya no entrega imágenes**: Amazon retiró la opción de
  enlaces de imagen de SiteStripe (2023); hoy solo da enlaces de texto.
- **"Tiempo real" no existe en afiliación**: la licencia de datos de
  Amazon exige mostrar la hora de la última actualización y no permite
  caché mayor de 24 h. El estándar correcto es *precio refrescado con
  sello de hora*, que es exactamente lo que muestran los sitios serios.

## La puerta de elegibilidad (oficial)

Para que Amazon emita credenciales de la Creators API se requiere:

1. Cuenta de Amazon Associates **aprobada** (la nuestra está en periodo
   inicial: 3 ventas calificadas antes del 29-abr-2027 para no perderla).
2. **Al menos 10 ventas calificadas en los últimos 30 días** (ventana
   móvil: si un mes flojo baja de ahí, el acceso se pausa).
3. El titular principal crea la aplicación y las credenciales
   (Credential ID + Secret) en Associates Central.

Límites iniciales de la API: 1 solicitud/segundo, 8.640/día; cada
llamada `getItems` acepta hasta 10 ASIN.

## Qué quedó construido (listo para encender)

- **Modelo `ProductPrice`**: foto de precio por producto (precio,
  precio de lista, % de ahorro, disponibilidad, Prime, badge y fin de
  oferta cuando la API lo entrega, imagen grande oficial, `fetchedAt`
  y respuesta cruda para auditoría).
- **Cliente `src/modules/amazon/creators.ts`**: OAuth 2.0 contra Login
  with Amazon (token con caché de 1 h) y `getItems` con los recursos
  `images.primary.*` y `offersV2.*`, mapeo defensivo de la respuesta.
- **Sincronizador `src/modules/amazon/sync.ts` + `npm run db:sync-amazon`**:
  lotes de 10 ASIN respetando 1 solicitud/segundo, upsert de precios,
  relleno de la imagen oficial si la ficha no tiene, registro en
  `VerificationRun` y `AuditLog`. Sin credenciales informa el motivo y
  no escribe nada.
- **UI lista**: tarjetas y ficha muestran precio, tachado, % de
  descuento, badge de oferta con su fin (solo si la API lo trae),
  aviso Prime y el **sello obligatorio** "Price checked <hora>".
  `freshPrice()` oculta cualquier precio con más de 24 h: jamás se
  verá un precio vencido. Sin foto de precio, todo sigue en modo
  "Check price on Amazon", como exige el cumplimiento.
- **Panel**: el Resumen muestra el estado de la Creators API.

## Ruta de activación

1. Lanzar el sitio y lograr las primeras ventas (la meta inmediata:
   las 3 calificadas del periodo inicial).
2. Al sostener **10 ventas en 30 días**, Renato crea las credenciales
   en Associates Central → Herramientas → Creators API.
3. Credenciales al `.env` del servidor (`CREATORS_API_CREDENTIAL_ID`,
   `CREATORS_API_CREDENTIAL_SECRET`). Nunca por chat ni en git.
4. `npm run db:sync-amazon` → precios, ofertas e imágenes aparecen con
   su sello de hora; desde ahí, los ciclos de verificación de 5 horas
   de Dayana los mantienen frescos (muy por dentro del límite de 24 h).
