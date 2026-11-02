# Recursos de imagen de la plataforma

Inventario de la fotografía propia de T&F Picks. Todas las imágenes son
arte de la plataforma (fotografía editorial generada para el proyecto):
**nunca** son imágenes de Amazon ni de productos con marca. Dirección de
arte común: luz natural suave, navy/teal profundo y neutros cálidos,
espacio de copia a la izquierda en los banners, sin texto ni logos.

## `public/slides/` — carrusel de portada y foto por categoría (16:9)

| Archivo | Dimensiones | Dónde aparece |
| --- | --- | --- |
| `brand.jpg` | 2048×1152 | Slide de marca del carrusel; banner compacto por defecto de Disclosure, Privacidad y Búsqueda (vía `StaticPage`/`PageBanner`); imagen Open Graph en `src/app/layout.tsx` |
| `home-kitchen.jpg` | 2048×1152 | Slide y banner de la categoría Home & Kitchen; ficha y guía de esa categoría; slide de guías del carrusel (variante showcase) |
| `tech-smart-home.jpg` | 2048×1152 | Categoría Tech, Accessories & Smart Home (slide, banner, fichas, guías) |
| `beauty-personal-care.jpg` | 2048×1152 | Categoría Beauty & Personal Care |
| `pet-supplies.jpg` | 2048×1152 | Categoría Pet Supplies |
| `sports-outdoors.jpg` | 2048×1152 | Categoría Sports, Fitness & Outdoors |
| `tools-home-improvement.jpg` | 2048×1152 | Categoría Tools & Home Improvement |
| `toys-games.jpg` | 2048×1152 | Categoría Toys & Games |
| `baby-products.jpg` | 2048×1152 | Categoría Baby Products |
| `fashion-accessories.jpg` | 2048×1152 | Categoría Fashion & Accessories |
| `automotive.jpg` | 2048×1152 | Categoría Automotive |
| `office-products.jpg` | 2048×1152 | Categoría Office & School Supplies |
| `video-games.jpg` | 2048×1152 | Categoría Video Games & Electronics |
| `health-household.jpg` | 2048×1152 | Categoría Health & Household |
| `grocery-gourmet.jpg` | 1920×1080 | Categoría Grocery & Gourmet |

El mapeo categoría → foto vive en `src/modules/catalog/visuals.ts`
(`CATEGORY_VISUALS[slug].image`). No mover ni renombrar estos archivos:
hay referencias vivas en el carrusel, banners, SEO y Open Graph.

## `public/sections/` — visuales de las secciones de portada (3:2)

Generadas el 2026-11-01 para los pares paralelos de la portada
(`src/app/(site)/page.tsx`), integradas con `next/image`.

| Archivo | Dimensiones | Dónde aparece |
| --- | --- | --- |
| `buying-guides.jpg` | 1920×1280 | Portada, par 1: cabecera visual de la columna «Buying guides» (mesa editorial con libreta, laptop y café) |
| `our-method.jpg` | 1920×1280 | Portada, par 1: cabecera visual de la columna «Our method» (manos verificando una caja genérica con checklist y lupa) |
| `gift-list.jpg` | 1920×1280 | Portada, par 2: cabecera de la tarjeta «The Holiday Gift List» (flat lay de regalos envueltos) |
| `good-to-know.jpg` | 1920×1280 | Portada, par 2: cabecera visual de la columna «Good to know» / FAQ (lector en sofá con tablet y café) |

## `public/pages/` — banners de páginas internas (16:9)

Consumidas por `PageBanner` (o por `StaticPage` con prop `image`).

| Archivo | Dimensiones | Dónde aparece |
| --- | --- | --- |
| `guides.jpg` | 2048×1152 | Banner del índice de guías `/guides` (pila de guías/libros de estilo de vida con café) |
| `about.jpg` | 2048×1152 | Banner de `/about` (pequeño estudio editorial, dos personas con laptop y muestras genéricas) |
| `contact.jpg` | 2048×1152 | Banner de `/contact` (escritorio amable junto a una ventana, con libreta y café) |

Disclosure y Privacidad mantienen el banner compacto de marca
(`/slides/brand.jpg`) por sobriedad legal, y Búsqueda también.
Categoría, ficha de producto y guía individual siguen con la foto de su
categoría (`public/slides/`).
