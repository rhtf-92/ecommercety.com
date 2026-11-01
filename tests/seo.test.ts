import { describe, expect, it } from "vitest";
import {
  breadcrumbLd,
  faqLd,
  itemListLd,
  organizationLd,
  productLd,
  websiteLd,
} from "@/modules/seo/jsonld";
import { absoluteUrl } from "@/modules/seo/site";

describe("SEO / datos estructurados", () => {
  it("la organización y el sitio usan la marca y el dominio oficiales", () => {
    const org = organizationLd();
    expect(org.name).toBe("T&F Picks");
    expect(org.legalName).toBe("E-Commerce T&F");
    expect(String(org.url)).toContain("ecommercety.com");
    const site = websiteLd();
    const action = site.potentialAction as { target: { urlTemplate: string } };
    expect(action.target.urlTemplate).toContain("/search?q={search_term_string}");
  });

  it("las migas y listas numeran posiciones desde 1 con URL absolutas", () => {
    const crumbs = breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Toys", path: "/category/toys-games" },
    ]);
    const items = crumbs.itemListElement as { position: number; item: string }[];
    expect(items.map((i) => i.position)).toEqual([1, 2]);
    expect(items[1].item).toBe(absoluteUrl("/category/toys-games"));
    const list = itemListLd([{ name: "A", path: "/product/B012345678" }]);
    expect(Array.isArray(list.itemListElement)).toBe(true);
  });

  it("el FAQ refleja las preguntas y respuestas entregadas", () => {
    const faq = faqLd([{ q: "¿Pregunta?", a: "Respuesta." }]);
    const entity = (faq.mainEntity as { name: string }[])[0];
    expect(entity.name).toBe("¿Pregunta?");
  });

  it("un producto SIN precio fresco NO emite Offer (cumplimiento)", () => {
    const ld = productLd({
      asin: "B012345678",
      title: "Producto de prueba",
      categoryName: "Tech",
      amazonUrl: "https://www.amazon.com/dp/B012345678",
    });
    expect(ld.offers).toBeUndefined();
    expect(ld.sku).toBe("B012345678");
  });

  it("un producto CON precio fresco emite Offer hacia Amazon", () => {
    const ld = productLd({
      asin: "B012345678",
      title: "Producto de prueba",
      brand: "Marca",
      categoryName: "Tech",
      amazonUrl: "https://www.amazon.com/dp/B012345678?tag=ecommercety00-20",
      freshOffer: { amount: 19.99, currency: "USD" },
    });
    const offers = ld.offers as { price: number; priceCurrency: string; url: string };
    expect(offers.price).toBe(19.99);
    expect(offers.priceCurrency).toBe("USD");
    expect(offers.url).toContain("amazon.com");
  });
});
