# Sistema responsivo — contrato para TODAS las páginas

Objetivo: ninguna página (actual o futura) desborda ni pierde espacio
en horizontal o vertical en ningún dispositivo, de 320 px a 4K.
Auditoría y sistema implementados el 2026-10-31.

## Breakpoints (Tailwind)

| Prefijo | Desde | Uso típico |
| --- | --- | --- |
| (base) | 0 | Móvil: 1 columna, tipografía base |
| `sm:` | 640 px | 2 columnas en rejillas, subtítulos grandes |
| `md:` | 768 px | Panel: aparece la barra lateral; rejillas de 3 |
| `lg:` | 1024 px | Escritorio: nav completa, 3 columnas, héroes a 2 columnas |
| `xl:` | 1280 px | Solo si el contenido lo pide |

## Reglas estructurales (ya en el código base)

1. **Guarda anti-desborde global**: `overflow-x: clip` en `html` y
   `body` (globals.css). `clip` no rompe `position: sticky`.
2. **Contenedor único**: `.container-x` — fluido, máx. 72rem, respiro
   16/24/32 px según ancho. Toda sección pública lo usa; el panel usa
   su contenedor (`max-w-6xl` con `px-4 sm:px-6`).
3. **Viewport explícito** en `layout.tsx` (`device-width`,
   `viewportFit: cover`, `themeColor`).
4. **Medios contenidos**: `img, video, svg { max-width: 100% }`; las
   fotos de banner/slide van `absolute inset-0 object-cover`.
5. **`prefers-reduced-motion`**: apaga Ken Burns, entradas del slide
   y transiciones decorativas.
6. **Tokens completos**: todo color usado debe existir en `@theme`
   (el velo del slide usa `ink-950`: si el token falta, Tailwind no
   genera la clase y el fallo es silencioso — verificar en el CSS
   compilado al añadir tokens).

## Patrones obligados por tipo de contenido

- **Rejillas**: siempre `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`
  (o el equivalente); nunca columnas fijas sin breakpoint.
- **Tablas**: envoltorio `overflow-x-auto` + `min-w-[…]` en la tabla.
  La tabla se desplaza dentro de su tarjeta; la página jamás.
- **Tiras horizontales** (nav móvil): `overflow-x-auto` +
  `.scrollbar-none` + hijos `whitespace-nowrap shrink-0`.
- **Titulares**: escala por breakpoint (`text-4xl sm:text-5xl
  lg:text-6xl`); chips y etiquetas con `max-w-full` + `truncate`.
- **Texto largo de usuario** (títulos de producto): `break-words` o
  `line-clamp-*`; migas de pan con `min-w-0` + `truncate` en el
  elemento actual y `shrink-0` en los enlaces.
- **Botones en fila**: `flex flex-wrap`; objetivos táctiles ≥ 44 px
  en controles (flechas del slide: `h-11 w-11`).
- **Panel**: barra lateral solo ≥ `md:`; en móvil, cabecera con
  navegación deslizable y cierre de sesión. Contenido con `min-w-0`.
- **Formularios**: campos `w-full`, rejillas `sm:grid-cols-2`.

## Checklist al crear una página nueva

1. ¿Usa `.container-x` (o el contenedor del panel) y ningún ancho fijo en px?
2. ¿Toda rejilla declara su comportamiento en móvil (1 columna)?
3. ¿Tablas y tiras con su patrón de desplazamiento interno?
4. ¿Imágenes con `object-cover`/`contain` dentro de cajas con tamaño?
5. ¿Titulares y chips con escala/truncado en pantallas de 320–360 px?
6. Probar mentalmente en 360×640, 768×1024 y 1440×900: sin scroll
   horizontal, sin huecos verticales muertos, footer al fondo
   (`flex min-h-full` del layout ya lo garantiza).
