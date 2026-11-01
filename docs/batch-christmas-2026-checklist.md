# Lote NAVIDEÑO 2026 — checklist para generar enlaces SiteStripe

**Primera carga de producción** (decisión de Renato, 2026-11-01): la
tienda abre SOLO con esta campaña navideña — 12 productos, 2 por
categoría, elegidos por demanda de regalo y tradición de oferta de
temporada (Black Friday 27-nov y temporada alta), ASIN verificados
en URLs reales de Amazon.com. Los lotes 001 y 002 quedan en el repo
para sumarse después. Títulos, descripciones y destacados: redacción
propia de T&F Picks, listos en este documento. Sin precios escritos:
por cumplimiento, el precio visible saldrá solo de la Creators API
cuando Amazon habilite la cuenta (10 ventas/30 días).

**Único paso pendiente (Renato, en su navegador):** abrir cada
producto, confirmar que sigue disponible, generar el enlace con
SiteStripe (tag `ecommercety00-20`, canal WEB) y pegar los 12
enlaces en el chat. Con eso Dayana crea
`data/products/batch-christmas-2026.ts`, lo publica en GitHub y la
primera carga de producción será `db:seed` + importación de este
lote en Neon.

## Hogar y Cocina (home-kitchen)

1. **KitchenAid Artisan Series 5 Stand Mixer** — `B0C59MGW5J`
   https://www.amazon.com/dp/B0C59MGW5J
   Señal: el regalo grande de cocina por excelencia; descuento
   tradicional en Black Friday/Prime Days (~25% en cobertura 2026).
   - Título propio: "KitchenAid Artisan Series 5 Stand Mixer — The Heirloom Gift Every Holiday Baker Dreams About"
   - Descripción propia: "Some gifts get used once; this one becomes a family tradition. The Artisan 5 tackles holiday cookie marathons, bread dough and whipped cream without breaking a sweat, and its 20+ colors make it the rare appliance people proudly leave on the counter all year."
   - Highlights: "5-quart bowl mixes up to 9 dozen cookies in a single batch" / "10 speeds, from a gentle stir to a fast whip" / "Tilt-head design with 59-point planetary mixing action" / "Over 20 colors to match any kitchen — Porcelain shown"
   - Enlace SiteStripe: _(pendiente)_

2. **COSORI TurboBlaze 9-in-1 Air Fryer 6 Qt** — `B0C33CHG99`
   https://www.amazon.com/dp/B0C33CHG99
   Señal: liderazgo sostenido en la categoría air fryer; precio de
   regalo medio con tradición de descuento fuerte de temporada.
   - Título propio: "COSORI TurboBlaze 9-in-1 Air Fryer 6 Qt — Crispy Holiday Sides Without the Oven Chaos"
   - Descripción propia: "When the oven is busy with the main event, this 6-quart air fryer saves the sides. It crisps, roasts, bakes and even proofs dough, turning out golden results up to 40% faster — a practical gift any home cook will reach for long after the holidays."
   - Highlights: "9 functions: air fry, roast, bake, broil, proof and more" / "6 Qt basket fits family-size holiday portions" / "TurboBlaze fan reaches 450°F for fast, even crisping" / "Ceramic-coated, dishwasher-safe basket and crisper plate"
   - Enlace SiteStripe: _(pendiente)_

## Tecnología y Hogar Inteligente (tech-smart-home)

3. **Apple AirPods 4** — `B0DGHMNQ5Z`
   https://www.amazon.com/dp/B0DGHMNQ5Z
   Señal: #1 en las listas "Most Wished For" de electrónica esta
   misma semana; Amazon mueve su precio en Black Friday.
   - Título propio: "Apple AirPods 4 — The Can't-Miss Gift for Every iPhone Owner on Your List"
   - Descripción propia: "AirPods sit at the very top of Amazon's Most Wished For electronics for a reason: everybody wants them and nobody buys their own pair twice. This generation adds a redesigned all-day fit, spatial audio and clearer calls — premium feel at a gift-friendly price."
   - Highlights: "Apple H2 chip with personalized spatial audio" / "Redesigned contour for secure all-day comfort" / "Up to 30 hours of listening with the USB-C case" / "Sweat and water resistant; Find My built in"
   - Enlace SiteStripe: _(pendiente)_

4. **Amazon Fire TV Stick 4K Max** — `B0BP9SNVH9`
   https://www.amazon.com/dp/B0BP9SNVH9
   Señal: los dispositivos Amazon son los más descontados del
   catálogo cada Black Friday (40-50% histórico en Fire TV).
   - Título propio: "Amazon Fire TV Stick 4K Max — Turn Any TV Into a Holiday Movie-Night Upgrade"
   - Descripción propia: "The easiest stocking stuffer in tech: plug it in and any TV becomes a fast 4K streaming hub with Dolby Vision, voice search and even a gallery-style ambient mode for family photos. It is Amazon's most powerful stick, and the one device gift that gets installed the same night."
   - Highlights: "Fastest Fire TV Stick: 2.0 GHz quad-core processor" / "Wi-Fi 6E support for smooth 4K in busy households" / "Dolby Vision, HDR10+ and Dolby Atmos support" / "16 GB storage — double the standard 4K stick"
   - Enlace SiteStripe: _(pendiente)_

## Belleza y Cuidado Personal (beauty-personal-care)

5. **LANEIGE Midnight Minis Holiday Set** — `B0F24ZZN95`
   https://www.amazon.com/dp/B0F24ZZN95
   Señal: edición limitada solo de temporada, +20K compras en el
   último mes; el cuidado de labios es lo que más rota en Q4.
   - Título propio: "LANEIGE Midnight Minis Set — Five Festive Lip Masks for Round-the-Clock Hydration"
   - Descripción propia: "LANEIGE's limited-edition holiday set packs five mini Lip Sleeping Masks in seasonal flavors, from Eggnog Latte to Caramel, plus the ritual everyone already loves from the full-size jar. It is the rare beauty gift that works for teens, coworkers and stocking stuffers alike — small box, cult following, zero guesswork."
   - Highlights: "Five mini lip masks in limited holiday flavors" / "Overnight hydration with vitamin C and berry extracts" / "The viral Lip Sleeping Mask ritual, in giftable minis" / "Ready-to-gift seasonal box, no wrapping needed"
   - Enlace SiteStripe: _(pendiente)_

6. **Sol de Janeiro Bum Bum Jet Set** — `B0B4HKNDLQ`
   https://www.amazon.com/SOL-JANEIRO-Bum-Jet-Set/dp/B0B4HKNDLQ
   Señal: Best Seller en Skin Care Sets & Kits, +30K compras/mes en
   temporada; aparece marcado como oferta de Black Friday cada año.
   - Título propio: "Sol de Janeiro Bum Bum Jet Set — The Cult Brazilian Trio in Travel Sizes"
   - Descripción propia: "The three steps behind the internet's favorite body-care scent, sized for a carry-on: the firming Bum Bum Cream, the creamy Brazilian 4 Play shower gel and the Cheirosa 62 pistachio-caramel mist. A safe, crowd-pleasing gift for anyone who has ever stopped you to ask what perfume you are wearing."
   - Highlights: "Full routine in one pouch: wash, cream and fragrance mist" / "Signature Cheirosa 62 scent — pistachio and salted caramel" / "TSA-friendly sizes, ideal for holiday travel" / "Best Seller in Skin Care Sets & Kits on Amazon"
   - Enlace SiteStripe: _(pendiente)_

## Mascotas (pet-supplies)

7. **Milk-Bone Holiday 12-Day Treat Calendar** — `B0DXVXN17T`
   https://www.amazon.com/dp/B0DXVXN17T
   Señal: #1 New Release de su subcategoría, +6K compras en el mes;
   precio de impulso (~US$10) que convierte sin fricción.
   ⚠️ **Listing estacional:** confirmar en el navegador que la
   edición vigente sigue disponible al generar el enlace.
   - Título propio: "Milk-Bone 12 Days of Woofmas Calendar — A Daily Treat Countdown for Your Dog"
   - Descripción propia: "Twelve punch-out doors hide a rotating mix of MaroSnacks, holiday biscuits and yogurt-dipped treats, turning the run-up to Christmas into a daily ritual your dog will learn to wait for. At stocking-stuffer price, it is the easiest yes on any dog lover's list this season."
   - Highlights: "12 daily doors with a different treat behind each" / "MaroSnacks, holiday biscuits and yogurt-dipped varieties" / "From America's best-known dog treat brand" / "Budget-friendly stocking stuffer for dog households"
   - Enlace SiteStripe: _(pendiente)_

8. **BarkBox Dog Advent Calendar** — `B0FN181VQG`
   https://www.amazon.com/dp/B0FN181VQG
   Señal: el calendario premium de la categoría (~US$50), +2K
   compras en el mes; juguetes + premios para "el perro de la
   familia", el segmento que más crece en Q4.
   - Título propio: "BarkBox Dog Advent Calendar — 24 Days of Plush Toys and Bakery-Style Treats"
   - Descripción propia: "The premium counterpart to the treat-only calendars: eight festive plush toys with squeakers and crinkle textures, plus sixteen bakery-style treats in holiday shapes, all in a box made to sit under the tree. For the dog who is not a pet but a family member with his own gift budget."
   - Highlights: "8 custom plush toys — squeakers, crinkle and tug textures" / "16 bakery-style treats in frosted holiday shapes" / "A surprise for every December day, toys and treats alike" / "Gift-worthy box from the best-known dog brand in the US"
   - Enlace SiteStripe: _(pendiente)_

## Deportes, Fitness y Aire Libre (sports-outdoors)

9. **TOLOCO EM26 Deep Tissue Massage Gun** — `B0B2Z5JHN4`
   https://www.amazon.com/dp/B0B2Z5JHN4
   Señal: líder de rankings de masajeadores con decenas de miles de
   reseñas; su precio toca mínimo histórico cada temporada.
   - Título propio: "TOLOCO EM26 Massage Gun — Deep-Tissue Recovery That Fits in a Gym Bag"
   - Descripción propia: "A quiet, full-size percussion massager with 10 interchangeable heads, this is the recovery gift athletes actually ask for. It loosens post-workout soreness in minutes and shows up on best-seller lists every holiday season."
   - Highlights: "12 mm stroke depth and up to 3,200 RPM for real deep-tissue work" / "10 massage heads to cover back, legs, shoulders and arms" / "Brushless motor stays under 40 dB — quiet enough for the couch" / "USB-rechargeable battery with LED display for speed and charge"
   - Enlace SiteStripe: _(pendiente)_

10. **Buztrio Walking Pad Treadmill (Under-Desk)** — `B0GW6WSFCG`
    https://www.amazon.com/dp/B0GW6WSFCG
    Señal: #1 Best Seller en Treadmills; la demanda explota entre
    Black Friday y los propósitos de Año Nuevo (+900 compras/mes ya).
    - Título propio: "Buztrio Walking Pad — Walk Off the Holidays Without Leaving Your Desk"
    - Descripción propia: "Amazon's #1 Best Seller in Treadmills, this slim walking pad slides under a desk so steps keep adding up during calls and emails. It arrives ready to use — no assembly — making it a smart, big-ticket gift for anyone starting a healthier routine in January."
    - Highlights: "#1 Best Seller in Treadmills on Amazon" / "0.6–4.0 mph range for desk walking or light exercise" / "LED display and remote control for speed, time and calories" / "No assembly required; stores flat under a desk or bed"
    - Enlace SiteStripe: _(pendiente)_

## Herramientas y Mejoras del Hogar (tools-home-improvement)

11. **DEWALT DCD771C2 20V MAX Drill/Driver Kit** — `B00ET5VMTU`
    https://www.amazon.com/dp/B00ET5VMTU
    Señal: clásico absoluto de Black Friday en herramientas (~45%
    de descuento recurrente; mínimos de temporada con cupón).
    - Título propio: "DEWALT DCD771C2 20V MAX Drill Kit — The Starter Drill Every Home Eventually Needs"
    - Descripción propia: "A compact 1/2-inch drill/driver with two batteries, charger and contractor bag included — everything a new homeowner needs in one box. Year after year this kit is one of the headline Black Friday doorbusters in the tool aisle."
    - Highlights: "Two-speed transmission (0–450 / 0–1,500 RPM) for drilling and driving" / "Compact, lightweight body that fits between studs and into cabinets" / "16-position clutch for consistent screw depth without stripping" / "Includes 2 batteries, charger and contractor bag — gift-ready kit"
    - Enlace SiteStripe: _(pendiente)_

12. **Bosch PS31-2A 12V Max Drill/Driver Kit** — `B003BEE2LU`
    https://www.amazon.com/dp/B003BEE2LU
    Señal: años como Amazon's Choice en taladros compactos; Bosch
    descuenta su línea 12V Max cada Black Friday.
    - Título propio: "Bosch PS31-2A 12V Max Drill Kit — Pro Precision in a Two-Pound Body"
    - Descripción propia: "At just 1.8 pounds with a short 7-inch head, this compact Bosch drill handles furniture builds, cabinet work and overhead jobs without wearing out your arm. It ships with two batteries, a charger and a case, and is a perennial favorite in holiday tool gift guides."
    - Highlights: "Only 1.8 lb — the lightest in its class, ideal for overhead work" / "265 in-lbs of torque with two speeds up to 1,300 RPM" / "20+1 clutch settings for precise, repeatable driving" / "Two 12V batteries, 30-minute charger and carrying case included"
    - Enlace SiteStripe: _(pendiente)_
