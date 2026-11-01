# Catálogo maestro 2026 — checklist de expansión (olas 1 y 2)

Búsqueda exhaustiva a pedido de Renato (2026-11-01): superar los
100 productos en tendencia y llegar a ~150 en TODAS las categorías
posibles. Resultado: **159 productos curados en total**:

| Bloque | Productos | Estado |
|---|---|---|
| Lote 001 | 7 | Con enlace; evaluados 2026-11-01: **7/7 vivos y en tendencia, se mantienen** (MOKiN el más flojo, en vigilancia; el Aurzen quedó confirmado vivo — D1R Air Roku TV, con 38% off activo) |
| Lote tendencias 2026 | 24 | Con enlace, completo |
| Lote 002 | 12 | Checklist propio (`docs/batch-002-checklist.md`), sin enlaces |
| Navideño 2026 | 12 | Checklist propio (`docs/batch-christmas-2026-checklist.md`), sin enlaces |
| **Ola 1 (este doc)** | **40** | Sin enlaces — abajo |
| **Ola 2, categorías nuevas (este doc)** | **64** | Sin enlaces — abajo |

Cada ASIN fue verificado dentro de una URL real de producto de
amazon.com devuelta por la búsqueda, sin repetir ningún ASIN
previo. Las señales citan la fuente de la tendencia/oferta; los
precios NO van en las fichas públicas por cumplimiento.

**Pendiente de Renato:** generar los SiteStripe (tag
`ecommercety00-20`) de los productos que quiera cargar, por tandas
y por categoría, y pegarlos en el chat. Dayana escribe las fichas
y crea los archivos de lote, como siempre.

**Categorías NUEVAS de la ola 2 (aún no existen en la plataforma):**
`toys-games` Juguetes y Juegos · `baby-products` Bebés ·
`fashion-accessories` Moda y Accesorios · `automotive`
Automotriz · `office-products` Oficina y Escuela · `video-games`
Videojuegos y Electrónica · `health-household` Salud y Hogar ·
`grocery-gourmet` Gourmet y Despensa. Crearlas implica un sprint
(semilla, identidad visual y slide por categoría).

**Actualización 2026-11-01 (tarde) — enlaces y Sprint 8:**
Renato generó los enlaces de las olas 1 y 2 y Dayana los verificó
resolviéndolos uno a uno: **101 productos de este checklist con
enlace válido** (tag oficial en todos, HTTP 200), más la
confirmación de los 22 del lote tendencias reenviados. Detalles:
- Variantes aceptadas: The Ordinary entró por su listing Pack of 2
  (`B0DDQ4MSXS` en lugar de `B01MDTVZTZ`) y el organizador SKYDUE
  por `B0GH771384` (variante, mismo bloque de oficina).
- Sin enlace (7): CeraVe `B07XP8K162`, Klein RT250 `B08QW7K1JJ`,
  HOTOR `B07VGRVKSN`, Xbox Elite `B07SFKTLZM` (no generados) y
  DualSense `B0CQKLS4RP`, chocolate Dubái `B0F1KLZB1C` y caja
  japonesa `B09VGH1ZSB` (SiteStripe no permitió generarlos).
- Duplicados inofensivos reenviados: MX Master 3S, LifePro Waver,
  ThisWorx y WD_BLACK SSD (mismo ASIN dos veces).
- **Sprint 8 ejecutado:** las 8 categorías nuevas ya existen en la
  plataforma (semilla Fase 2, respaldo sin base, identidad visual
  con matiz e icono propios y foto de slide 2048×1152 por
  categoría). Renato debe correr `npm run db:seed` tras el pull
  para crearlas en su base local; en producción entrarán con la
  primera carga.

---

## OLA 1 — Categorías actuales

### Hogar y Cocina (home-kitchen) — 10

1. **Zulay Kitchen Tornado Milk Frother** — `B0DGZQ7L35` — https://www.amazon.com/dp/B0DGZQ7L35 — #1 en Milk Frothers; hallazgo #1 de Amazon 2026 según rankings de temporada.
2. **Ninja Professional Blender BL610, 1000W** — `B00NGV4506` — https://www.amazon.com/dp/B00NGV4506 — ~27% off activo esta semana; 4K+ vendidas el último mes.
3. **Etekcity Food Kitchen Scale EK6015** — `B0113UZJE2` — https://www.amazon.com/dp/B0113UZJE2 — Best Seller histórico en básculas; regalo pequeño más útil según guías 2026.
4. **BLACK+DECKER Electric Citrus Juicer CJ625** — `B001EU9VSM` — https://www.amazon.com/dp/B001EU9VSM — +31K reseñas; fijo en tops virales de gadgets 2026.
5. **Kitchen Gizmo Snap N Strain (colador de clip)** — `B01MZ14LJV` — https://www.amazon.com/dp/B01MZ14LJV — Gadget viral, ~40K reseñas; formato problema-solución ideal para video.
6. **Bomves Electric Spin Scrubber (8 cabezales)** — `B0B7RSV894` — https://www.amazon.com/dp/B0B7RSV894 — 10K+ comprados el último mes; estrella TikTok de limpieza.
7. **Vtopmart Drawer Organizers, 25 piezas** — `B08KXKVT4K` — https://www.amazon.com/dp/B08KXKVT4K — #1 en Clothes Drawer Organizers; fijo en roundups de organización.
8. **Rubbermaid Brilliance Storage Set, 20 piezas** — `B0B1KRGD3Q` — https://www.amazon.com/dp/B0B1KRGD3Q — Línea best seller de organización de cocina (listas oct 2026).
9. **MCGOR Under Cabinet Lighting, 2-Pack** — `B0CSJRZS97` — https://www.amazon.com/dp/B0CSJRZS97 — LED magnéticas con sensor, formato viral sin cables.
10. **Bedsure Queen Comforter Set, 7 piezas** — `B07NYR18X4` — https://www.amazon.com/dp/B07NYR18X4 — 1K+ comprados en la última semana; −24% mostrado en ficha.

### Tecnología (tech-smart-home) — 10

11. **Sony WH-1000XM5 Wireless Headphones** — `B09XS7JWHH` — https://www.amazon.com/dp/B09XS7JWHH — Descuento insignia de audífonos rumbo a Black Friday (~−25%).
12. **Soundcore Q20i Hybrid ANC Headphones** — `B0C3HCD34R` — https://www.amazon.com/dp/B0C3HCD34R — −43% reportado; +77K reseñas.
13. **Apple Watch SE 3 GPS 40mm** — `B0FQFW7M9H` — https://www.amazon.com/dp/B0FQFW7M9H — Mínimo histórico ($199) en la previa de Black Friday.
14. **Meta Quest 3S 128GB VR Headset** — `B0F2GYMC8H` — https://www.amazon.com/dp/B0F2GYMC8H — Deal de Black Friday con $50 de crédito Amazon incluido.
15. **Fire TV Stick 4K (modelo más reciente)** — `B0G4XRP464` — https://www.amazon.com/dp/B0G4XRP464 — Generación 2026 del stick más vendido, en rebajas de dispositivos.
16. **Amazon Echo Dot Max** — `B0D6SX8VLQ` — https://www.amazon.com/dp/B0D6SX8VLQ — El Echo más nuevo de la línea 2026, precio de lanzamiento en oferta.
17. **Ring Battery Doorbell 2K** — `B0G2D1R15Q` — https://www.amazon.com/dp/B0G2D1R15Q — −60% a su mínimo registrado ($39.99) según listas de deals.
18. **Anker Nano Power Bank 10,000mAh 45W** — `B0FKN5RCV7` — https://www.amazon.com/dp/B0FKN5RCV7 — Amazon's Choice; de los power banks más vendidos de Anker.
19. **Insta360 GO Ultra Creator Bundle** — `B0FH21TM4L` — https://www.amazon.com/dp/B0FH21TM4L — La cámara POV viral de 53 g; −20% visto en Slickdeals.
20. **Logitech MX Master 3S Wireless Mouse** — `B0FB21526X` — https://www.amazon.com/dp/B0FB21526X — −20% en Prime Big Deal Days según cobertura de Gizmodo.

### Belleza (beauty-personal-care) — 5

21. **CeraVe Moisturizing Cream, 16 oz** — `B07XP8K162` — https://www.amazon.com/dp/B07XP8K162 — La crema #1 de la categoría; demanda invernal en alza.
22. **LANEIGE Lip Sleeping Mask Berry** — `B07XXPHQZK` — https://www.amazon.com/dp/B07XXPHQZK — Ícono K-beauty; 4K+ comprados en la última semana.
23. **e.l.f. Halo Glow Liquid Filter** — `B0B5MGBDHZ` — https://www.amazon.com/dp/B0B5MGBDHZ — El "filtro" viral; entre los best sellers de belleza 2026.
24. **CHI Original Ceramic Flat Iron 1"** — `B0009V1YR8` — https://www.amazon.com/dp/B0009V1YR8 — Amazon's Choice; ~−62% en el Holiday Beauty Event.
25. **The Ordinary Niacinamide 10% + Zinc 1%** — `B01MDTVZTZ` — https://www.amazon.com/dp/B01MDTVZTZ — El sérum económico más vendido; 20K+ la última semana.

### Mascotas (pet-supplies) — 5

26. **Earth Rated Poop Bags, 120 uds.** — `B0088LIINY` — https://www.amazon.com/dp/B0088LIINY — Entre lo más reseñado de Pet Supplies; compra recurrente constante.
27. **Multipet Lamb Chop Plush Dog Toy** — `B003XVYKVI` — https://www.amazon.com/dp/B003XVYKVI — El peluche icónico de Amazon; pico en temporada de regalos.
28. **Furbo 360° Dog Camera (lanza premios)** — `B09GDQZLD1` — https://www.amazon.com/dp/B09GDQZLD1 — Líder pet-tech; de lo más rebajado en cada evento de ofertas.
29. **Rocco & Roxie Stain & Odor Eliminator, 1 gal** — `B00J9MYM5O` — https://www.amazon.com/dp/B00J9MYM5O — Best seller histórico de limpieza pet; 1K+ la última semana.
30. **Potaroma Flopping Fish Cat Toy** — `B083S3ZXDF` — https://www.amazon.com/dp/B083S3ZXDF — Los interactivos dominan el top 50 de Cat Toys; 6K+ el último mes.

### Deportes (sports-outdoors) — 5

31. **Yaktrax Walk Traction Cleats** — `B0094GO8Q8` — https://www.amazon.com/dp/B0094GO8Q8 — #1 en Shoe Ice & Snow Grips; despega con la primera helada.
32. **Fit Simplify Resistance Bands, set de 5** — `B01AVDVHTI` — https://www.amazon.com/dp/B01AVDVHTI — #1 en Resistance Bands; 10K+ la última semana.
33. **TrailBuddy Trekking Poles (par)** — `B07CC49R4C` — https://www.amazon.com/dp/B07CC49R4C — El bastón más vendido de su nicho (~8.5K/mes).
34. **Gaiam Yoga Mat Premium 6mm** — `B086BSKM92` — https://www.amazon.com/dp/B086BSKM92 — Marca con sello "Trending" y 100K+ pedidos en 3 meses.
35. **LifePro Waver Vibration Plate** — `B0794BXVY4` — https://www.amazon.com/dp/B0794BXVY4 — El fenómeno fitness viral del momento; líder del segmento.

### Herramientas (tools-home-improvement) — 5

36. **Klein Tools RT250 GFCI Outlet Tester** — `B08QW7K1JJ` — https://www.amazon.com/dp/B08QW7K1JJ — Titular de Bob Vila (1-nov): Klein hasta −54% pre-Black Friday.
37. **HOTO Electric Screwdriver Kit, 25 piezas** — `B0BLMQ8BXB` — https://www.amazon.com/dp/B0BLMQ8BXB — −40% reportado; regalo DIY under $50 según Bob Vila.
38. **Crescent 170-Piece Mechanics Tool Set** — `B00F4AVRGW` — https://www.amazon.com/dp/B00F4AVRGW — Rebajas del 37–66% rastreadas esta temporada.
39. **DEWALT 20V MAX XR Oscillating Multi-Tool Kit** — `B085B253MD` — https://www.amazon.com/dp/B085B253MD — $99 verificado (31-oct): mínimo histórico del kit.
40. **Huepar Laser Level 4x360° W04CG** — `B0D9V7TL9S` — https://www.amazon.com/dp/B0D9V7TL9S — Huepar domina el nicho de niveles láser en Amazon.

---

## OLA 2 — Categorías NUEVAS

### Juguetes y Juegos (toys-games) — 12

41. **LEGO Botanicals Happy Plants (10349)** — `B0DRW6C2RF` — https://www.amazon.com/dp/B0DRW6C2RF — En el catálogo navideño de juguetes de Amazon 2026, rebajado.
42. **LEGO Star Wars Advent Calendar 2026** — `B0G5QKD8ZS` — https://www.amazon.com/dp/B0G5QKD8ZS — #6 en Building Toys; ~−33% reportado.
43. **MAGNA-TILES Classic, 32 piezas** — `B000CBSNKQ` — https://www.amazon.com/dp/B000CBSNKQ — La marca magnética original; en el Top 100 de juguetes 2026.
44. **CATAN Board Game (base)** — `B00U26V4VQ` — https://www.amazon.com/dp/B00U26V4VQ — Clásico fijo en Best Sellers de juegos de mesa.
45. **Ticket to Ride (2025 Refresh)** — `B0F8PKN4B7` — https://www.amazon.com/dp/B0F8PKN4B7 — Edición renovada del juego de trenes más vendido.
46. **Barbie Dreamhouse Pool Party** — `B0BLJTJ38M` — https://www.amazon.com/dp/B0BLJTJ38M — El playset insignia de Barbie, regalo grande de cada Navidad.
47. **Squishmallows 5" 10-Pack (Amazon Exclusive)** — `B0DK7YBPPZ` — https://www.amazon.com/dp/B0DK7YBPPZ — Squishmallows domina peluches y coleccionables 2026.
48. **Hot Wheels City Ultimate Garage + 10 vehículos** — `B0CSJT36FP` — https://www.amazon.com/dp/B0CSJT36FP — Bundle exclusivo de Amazon con sello Amazon's Choice.
49. **Snap Circuits Jr. SC-100** — `B00008BFZH` — https://www.amazon.com/dp/B00008BFZH — Kit STEM de referencia; fijo en guías de regalos educativos.
50. **Stomp Rocket Dueling Launcher, 8 cohetes** — `B00G9WR0RE` — https://www.amazon.com/dp/B00G9WR0RE — #1 Best Seller en Kids' Play Rockets.
51. **Dolanus RC Transform Robot Car** — `B0D4YK93DV` — https://www.amazon.com/dp/B0D4YK93DV — Amazon's Choice; el RC que se transforma, formato buscado.
52. **Crayola Art Set, 125 piezas (Amazon Exclusive)** — `B0FCHNHX17` — https://www.amazon.com/dp/B0FCHNHX17 — Posicionado oficialmente como regalo navideño.

### Bebés (baby-products) — 8

53. **Ubbi Steel Diaper Pail** — `B00821FLT4` — https://www.amazon.com/dp/B00821FLT4 — #1 en Diaper Pails; 8K+ el último mes; "Registry Must-Have".
54. **Momcozy KleanPal Pro Bottle Washer** — `B0CWLHKQNT` — https://www.amazon.com/dp/B0CWLHKQNT — #2 en esterilizadores; lo más registrado en Babylist 2026.
55. **Hatch Rest Baby (2nd Gen)** — `B08QVG9759` — https://www.amazon.com/dp/B08QVG9759 — Esencial de registro; 3K–4K+ la última semana.
56. **Love to Dream Swaddle UP Original** — `B00MJXHM48` — https://www.amazon.com/dp/B00MJXHM48 — El swaddle "arms up" más recomendado en registros.
57. **Nanit Pro Smart Baby Monitor** — `B0FTSL4FXJ` — https://www.amazon.com/dp/B0FTSL4FXJ — Mejor monitor inteligente 2026 según múltiples roundups.
58. **Fisher-Price Kick & Play Piano Gym** — `B0DK7YM1NS` — https://www.amazon.com/dp/B0DK7YM1NS — El gimnasio de desarrollo 0+ más vendido de su clase.
59. **Ergobaby Omni Classic Carrier** — `B0743KZY9C` — https://www.amazon.com/dp/B0743KZY9C — El portabebés de referencia; best seller perenne.
60. **Graco Modes Pramette Travel System** — `B07Y5VQYFW` — https://www.amazon.com/dp/B07Y5VQYFW — Best Seller en Travel Systems; Black Friday Deal activo.

### Moda y Accesorios (fashion-accessories) — 10

61. **New Balance Women's 327 Sneaker** — `B0DM3D36F4` — https://www.amazon.com/dp/B0DM3D36F4 — #1 en Women's Fashion Sneakers.
62. **UGG Women's Classic Ultra Mini Platform** — `B0BGJ8D64D` — https://www.amazon.com/dp/B0BGJ8D64D — La bota de frío icónica; protagonista de fall fashion deals.
63. **BOSTANTEN Crossbody Bag (cuero vegano)** — `B0B7NLBKG9` — https://www.amazon.com/dp/B0B7NLBKG9 — #1 en Women's Crossbody Handbags.
64. **Fossil Raquel Watch (ES5417)** — `B0FCVKH4TS` — https://www.amazon.com/dp/B0FCVKH4TS — 800+/mes en su línea; sello Black Friday Deal.
65. **Timex Expedition Scout 40mm** — `B099TB4J8Q` — https://www.amazon.com/dp/B099TB4J8Q — #6 en relojes de hombre; hasta −35% rumbo a Black Friday.
66. **PAVOI Gold Plated Hoops 30mm** — `B07ML324GG` — https://www.amazon.com/dp/B07ML324GG — 2K+ el último mes; la joyería viral de Amazon.
67. **SOJOS Retro Aviator Sunglasses** — `B09RZS3B83` — https://www.amazon.com/dp/B09RZS3B83 — Destacado en Prime Day Fashion Deals 2026 (PureWow).
68. **Carhartt Knit Cuffed Beanie A18** — `B00N9BT1AC` — https://www.amazon.com/dp/B00N9BT1AC — #1 en Beanies; ha sido #1 en todo Clothing.
69. **Fleece Lined Leggings con bolsillos, 3-Pack** — `B0C7GCGHJF` — https://www.amazon.com/dp/B0C7GCGHJF — Amazon's Choice; compra estacional fuerte de noviembre.
70. **Levi's Ribcage Straight Jeans** — `B0D3SH3TFS` — https://www.amazon.com/dp/B0D3SH3TFS — Hasta −61% reportado en cobertura de fashion deals.

### Automotriz (automotive) — 8

71. **NOCO Boost GB40 Jump Starter** — `B015TKUPIC` — https://www.amazon.com/dp/B015TKUPIC — El arrancador más vendido del departamento.
72. **Chemical Guys 16-Piece Wash Kit** — `B07PGQTNR6` — https://www.amazon.com/dp/B07PGQTNR6 — Kit insignia de detailing; fijo en Today's Deals.
73. **Armor All Wipes, Pack de 3** — `B079SQJCB4` — https://www.amazon.com/dp/B079SQJCB4 — Best Seller en Cleaning Kits; 20K–30K+ el último mes.
74. **ThisWorx Car Vacuum 12V** — `B06ZY896ZM` — https://www.amazon.com/dp/B06ZY896ZM — La aspiradora de auto clásica de Amazon.
75. **HOTOR Car Trash Can, 2 gal** — `B07VGRVKSN` — https://www.amazon.com/dp/B07VGRVKSN — Best seller de organización de cabina.
76. **AstroAI Tire Inflator 160 PSI** — `B094XLW473` — https://www.amazon.com/dp/B094XLW473 — Su gama lidera el volumen de la subcategoría.
77. **ROVE R2-4K DUAL Dash Cam** — `B0D6J5B98H` — https://www.amazon.com/dp/B0D6J5B98H — Las dash cams son el #1 en volumen automotriz; −50% visto.
78. **SCC Auto-Trac Tire Chains** — `B003T6154W` — https://www.amazon.com/dp/B003T6154W — Demanda estacional de invierno inmediata.

### Oficina y Escuela (office-products) — 6

79. **OPNICE Monitor Stand con cajón** — `B0FM79P497` — https://www.amazon.com/dp/B0FM79P497 — Best Seller en Computer Workstations; 5K+ el último mes.
80. **Simple Trending 7-Tier Desk Organizer** — `B07R7FZ6RG` — https://www.amazon.com/dp/B07R7FZ6RG — "Best Overall" en comparativas de escritorio 2026.
81. **SKYDUE 360 Rotating Pen Organizer** — `B0C9ZHWC9K` — https://www.amazon.com/dp/B0C9ZHWC9K — Best Seller en Pen Holders; 8K+ el último mes.
82. **Sharpie S-Gel Pens, 12-Pack** — `B082PMXT2M` — https://www.amazon.com/dp/B082PMXT2M — El bolígrafo de gel de oficina por excelencia; −22–30% en variantes.
83. **Nelko P21 Bluetooth Label Maker** — `B0CHJR142G` — https://www.amazon.com/dp/B0CHJR142G — Precio bajo rastreado; en listas de organización 2026.
84. **Logitech Signature M650 Mouse** — `B09KXBJS7N` — https://www.amazon.com/dp/B09KXBJS7N — Deal activo verificado el 29-oct por DealNews.

### Videojuegos y Electrónica (video-games) — 8

85. **Nintendo Switch 2 + Mario Kart World Bundle** — `B0GQWCGVFV` — https://www.amazon.com/dp/B0GQWCGVFV — La consola de la temporada; +100K el último mes en su categoría.
86. **Nintendo Switch 2 Pro Controller** — `B0F3VTFD6J` — https://www.amazon.com/dp/B0F3VTFD6J — Best Seller en controles Switch 2; 10K+ el último mes.
87. **Samsung P9 Express microSD 256GB (Switch 2)** — `B0FT99KCV8` — https://www.amazon.com/dp/B0FT99KCV8 — −40% reportado a fines de octubre.
88. **WD_BLACK SN850P SSD 1TB para PS5** — `B0C48B3RGL` — https://www.amazon.com/dp/B0C48B3RGL — El SSD de expansión PS5 más recomendado.
89. **PlayStation DualSense Controller** — `B0CQKLS4RP` — https://www.amazon.com/dp/B0CQKLS4RP — #1 en controles de PS5.
90. **Xbox Elite Controller Series 2** — `B07SFKTLZM` — https://www.amazon.com/dp/B07SFKTLZM — Amazon's Choice; 6K+ el último mes; precio recortado.
91. **Death Stranding 2: On The Beach (PS5)** — `B0F19GPDW3` — https://www.amazon.com/dp/B0F19GPDW3 — #1 en juegos de PS5; protagonista de la venta de fines de octubre.
92. **SteelSeries Arctis Nova 5 Wireless Headset** — `B0D2YBQQ1P` — https://www.amazon.com/dp/B0D2YBQQ1P — De lo más destacado en gaming del Prime Big Deal Days.

### Salud y Hogar (health-household) — 6

93. **COSLUS Water Dental Flosser C20** — `B0CHFT6T5P` — https://www.amazon.com/dp/B0CHFT6T5P — #1 en irrigadores dentales; +60K unidades el último mes.
94. **Philips Sonicare 4100 Electric Toothbrush** — `B09LD8VFS1` — https://www.amazon.com/dp/B09LD8VFS1 — Best Seller sónico; ~−40% visto en temporada.
95. **RENPHO Heating Pad XL 24"×37"** — `B0D16SQZBV` — https://www.amazon.com/dp/B0D16SQZBV — La marca dominante en thermal pads XL; regalo de temporada.
96. **Hatch Restore 3 Sunrise Alarm Clock** — `B0C5S7K1JK` — https://www.amazon.com/dp/B0C5S7K1JK — Amazon's Choice; fijo en gift guides de bienestar.
97. **MaryRuth Organics Liquid Multivitamin** — `B00MDRTV8A` — https://www.amazon.com/dp/B00MDRTV8A — Viral en suplementos líquidos; −31–46% listado.
98. **RENPHO Smart Scale & Tape Measure Set** — `B0BQ6STR1R` — https://www.amazon.com/dp/B0BQ6STR1R — Amazon's Choice; +341K valoraciones.

### Gourmet y Despensa (grocery-gourmet) — 6

99. **Eastanbul Dubai Chocolate Bar, Pistachio** — `B0F1KLZB1C` — https://www.amazon.com/dp/B0F1KLZB1C — El snack viral del momento (chocolate Dubái).
100. **Harry & David Meat and Cheese Gift Box** — `B07D19J4J1` — https://www.amazon.com/dp/B07D19J4J1 — La canasta gourmet clásica de la Navidad en EE. UU.
101. **Atlas Coffee Club Discovery Set, 8-Pack** — `B09H18PMQH` — https://www.amazon.com/dp/B09H18PMQH — Amazon's Choice en sets de café de regalo.
102. **TRUFF Sampler Pack (3 botellas)** — `B09GHM4X2W` — https://www.amazon.com/dp/B09GHM4X2W — Marca de listas "Oprah's Favorite Things"; +2K compras/mes.
103. **Freeze Dried Candy Variety Pack** — `B0F68QZC1L` — https://www.amazon.com/dp/B0F68QZC1L — Los dulces liofilizados, el viral de TikTok de la categoría.
104. **Japanese Candy & Snack Box, 40 piezas** — `B09VGH1ZSB` — https://www.amazon.com/dp/B09VGH1ZSB — Regalo recurrente en guías foodie; −15% sobre su precio típico.

---

## Conteo final

- Con enlace SiteStripe: **31** (lote 001: 7 + tendencias: 24)
- Sin enlace, en checklists: **128** (lote 002: 12 + navideño: 12 + ola 1: 40 + ola 2: 64)
- **Total curado: 159 productos en 14 categorías** (6 actuales + 8 nuevas)
