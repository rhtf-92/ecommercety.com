import { describe, it, expect } from "vitest";
import { mapAmazonItem } from "@/modules/amazon/creators";

describe("mapAmazonItem (Creators API → ProductPrice)", () => {
  it("elige la oferta ganadora del Buy Box y mapea precio e imagen", () => {
    const item = mapAmazonItem({
      asin: "B0FNWCYLZN",
      images: { primary: { large: { url: "https://img/large.jpg" } } },
      offersV2: {
        listings: [
          {
            isBuyBoxWinner: false,
            price: { money: { amount: 59.99, currency: "USD" } },
          },
          {
            isBuyBoxWinner: true,
            price: {
              money: { amount: 44.99, currency: "USD" },
              savings: { percent: 25 },
            },
            savingBasis: { money: { amount: 59.99 } },
            availability: { message: "In Stock" },
            deliveryInfo: { isPrimeEligible: true },
            dealDetails: {
              badgeLabel: "Limited time deal",
              endTime: "2026-11-27T07:59:59Z",
            },
          },
        ],
      },
    });
    expect(item.asin).toBe("B0FNWCYLZN");
    expect(item.priceAmount).toBe(44.99);
    expect(item.listAmount).toBe(59.99);
    expect(item.savingsPercent).toBe(25);
    expect(item.imageLarge).toBe("https://img/large.jpg");
    expect(item.primeEligible).toBe(true);
    expect(item.dealBadge).toBe("Limited time deal");
    expect(item.dealEndsAt).toBe("2026-11-27T07:59:59Z");
  });

  it("calcula el % de ahorro cuando la API no lo trae", () => {
    const item = mapAmazonItem({
      asin: "B000000000",
      offersV2: {
        listings: [
          {
            price: { money: { amount: 30, currency: "USD" } },
            savingBasis: { money: { amount: 40 } },
          },
        ],
      },
    });
    expect(item.savingsPercent).toBe(25);
  });

  it("sin ofertas devuelve nulos sin romperse", () => {
    const item = mapAmazonItem({ asin: "B111111111" });
    expect(item.priceAmount).toBeNull();
    expect(item.imageLarge).toBeNull();
    expect(item.currency).toBe("USD");
  });

  it("usa la imagen mediana si falta la grande", () => {
    const item = mapAmazonItem({
      asin: "B222222222",
      images: { primary: { medium: { url: "https://img/med.jpg" } } },
    });
    expect(item.imageLarge).toBe("https://img/med.jpg");
  });
});
