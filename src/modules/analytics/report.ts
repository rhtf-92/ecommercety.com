// Reporte de rendimiento (30 días): funciones puras, sin Prisma, para
// que el cálculo sea testeable y no dependa de cómo se agregaron los
// datos en la página del panel.
//
// Metodología, dicha en voz alta porque condiciona la lectura:
// - Visita a ficha = PageView cuya ruta es /product/<ASIN>. Las visitas
//   a portada, categoría o guías no cuentan aquí.
// - Clic = ClickEvent del producto en la misma ventana.
// - CTR = clics / visitas a ficha. Sin visitas, el CTR es null, no 0:
//   un producto sin tráfico no es un producto que no convierta, es un
//   producto sin exposición, y tratarlo igual distorsiona el ranking.
// - La venta final NO está aquí: se confirma en Associates Central.
//   Este reporte mide intención (clic), no comisión.

export function asinFromProductPath(path: string): string | null {
  const clean = path.split("?")[0].replace(/\/+$/, "");
  const match = /^\/product\/([A-Za-z0-9]{10})$/.exec(clean);
  return match ? match[1].toUpperCase() : null;
}

export function computeCtr(views: number, clicks: number): number | null {
  if (views <= 0) return null;
  return Math.round((clicks / views) * 1000) / 10; // un decimal
}

export type ProductPerformanceInput = {
  id: string;
  asin: string;
  title: string;
  categoryName: string;
  status: string;
};

export type ProductPerformance = ProductPerformanceInput & {
  views: number;
  clicks: number;
  ctr: number | null;
};

export function buildProductPerformance(
  products: ProductPerformanceInput[],
  viewsByAsin: Map<string, number>,
  clicksByProductId: Map<string, number>,
): ProductPerformance[] {
  return products
    .map((product) => {
      const views = viewsByAsin.get(product.asin.toUpperCase()) ?? 0;
      const clicks = clicksByProductId.get(product.id) ?? 0;
      return { ...product, views, clicks, ctr: computeCtr(views, clicks) };
    })
    .sort((a, b) => b.clicks - a.clicks || b.views - a.views);
}

export type CategoryPerformance = {
  categoryName: string;
  products: number;
  views: number;
  clicks: number;
  ctr: number | null;
};

export function buildCategoryPerformance(
  rows: ProductPerformance[],
): CategoryPerformance[] {
  const byCategory = new Map<string, CategoryPerformance>();
  for (const row of rows) {
    const current = byCategory.get(row.categoryName) ?? {
      categoryName: row.categoryName,
      products: 0,
      views: 0,
      clicks: 0,
      ctr: null,
    };
    current.products += 1;
    current.views += row.views;
    current.clicks += row.clicks;
    byCategory.set(row.categoryName, current);
  }
  return [...byCategory.values()]
    .map((row) => ({ ...row, ctr: computeCtr(row.views, row.clicks) }))
    .sort((a, b) => b.clicks - a.clicks);
}

// Productos publicados sin ningún clic en la ventana: candidatos a
// degradar o reemplazar. No se degradan solos: el reporte solo los
// señala, la decisión editorial sigue siendo humana.
export function findZombies(rows: ProductPerformance[]): ProductPerformance[] {
  return rows.filter((row) => row.status === "PUBLISHED" && row.clicks === 0);
}
