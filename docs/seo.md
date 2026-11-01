# SEO técnico — T&F Picks

Objetivo: que cuando alguien busque en Google (o Bing, DuckDuckGo, o
un motor de IA) productos para comprar en Amazon — ofertas,
tendencias, "best … on Amazon" — T&F Picks sea encontrable y
elegible para resultados enriquecidos.

**Expectativa honesta:** ningún ajuste técnico garantiza el primer
lugar. El ranking depende de autoridad del dominio, contenido,
enlaces externos y tiempo. Lo que sí garantiza esta capa: que el
sitio sea 100 % rastreable, indexable, bien descrito y elegible
para rich results desde el día del lanzamiento.

## Qué incluye la plataforma (Sprint 9)

- **Metadatos con intención de compra** en todas las páginas:
  títulos y descripciones escritos para búsquedas del tipo
  "amazon deals", "trending products on amazon", "best Amazon
  {categoría} deals". URL canónica en cada página y `en-US`.
- **Open Graph / Twitter** con tarjeta grande e imagen de marca
  (`/slides/brand.jpg`), para que cada enlace compartido se vea
  profesional.
- **Datos estructurados (JSON-LD, schema.org):**
  - Portada: `Organization`, `WebSite` con `SearchAction` (habilita
    el buscador en el resultado de Google) y `FAQPage`.
  - Categoría: `BreadcrumbList` + `ItemList` de productos.
  - Producto: `BreadcrumbList` + `Product`. El bloque `Offer` solo
    se emite con precio fresco de la Creators API (misma regla de
    24 h que la ficha); nunca se inventan precios, ratings ni
    reseñas.
  - Guías: `Article` + `BreadcrumbList`.
- **Sitemap dinámico** (`/sitemap.xml`): portada, guías, páginas
  institucionales, las 14 categorías y **todos los productos
  publicados** con su fecha de actualización.
- **robots.txt:** todo lo público permitido para cualquier
  buscador; solo se excluyen `/admin` y `/api/`. La página de
  resultados de búsqueda es `noindex` (práctica estándar).
- **Manifiesto web** (`/manifest.webmanifest`) y **`/llms.txt`**
  con el resumen del sitio para motores de IA (ChatGPT,
  Perplexity, Gemini…).

## El día del lanzamiento (pasos de Renato, ~15 min)

1. **Google Search Console** (search.google.com/search-console):
   crear propiedad de **dominio** `ecommercety.com` → Google entrega
   un registro **TXT** → agregarlo en Cloudflare → DNS → verificar.
   (Alternativa sin DNS: propiedad por URL + el código en la
   variable `GOOGLE_SITE_VERIFICATION` de Railway.)
2. En Search Console → Sitemaps → enviar `sitemap.xml`.
3. **Bing Webmaster Tools**: importar el sitio desde Search
   Console (un clic) o verificar con `BING_SITE_VERIFICATION`.
4. Pedir indexación de la portada y de 2–3 categorías fuertes en
   Search Console ("Solicitar indexación").

## Ritmo esperado

- Indexación inicial: días.
- Primeras impresiones en búsquedas largas ("best amazon X deals"):
  semanas, creciendo con cada ciclo de productos y guías.
- Posiciones competitivas: meses de contenido constante + enlaces
  desde los canales (YouTube, TikTok, Pinterest usan los Tracking
  IDs propios y enlazan al sitio: eso también es SEO).
