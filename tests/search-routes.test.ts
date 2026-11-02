import { describe, it, expect, vi, beforeEach } from "vitest";

// Endpoint público /api/search y endpoint del panel /api/admin/search
// con la capa de datos y la sesión simuladas: se verifica el contrato
// (forma de la respuesta, validación de entrada, 401 sin sesión), no
// la base de datos.
const liveMock = vi.fn();
const adminMock = vi.fn();
const currentAdminMock = vi.fn();

vi.mock("@/modules/catalog/data", () => ({
  searchProductsLive: (...args: unknown[]) => liveMock(...args),
  searchProductsAdmin: (...args: unknown[]) => adminMock(...args),
}));

vi.mock("@/lib/auth", () => ({
  currentAdmin: () => currentAdminMock(),
}));

import { GET as publicGET } from "@/app/api/search/route";
import { GET as adminGET } from "@/app/api/admin/search/route";
import { __resetRateLimit } from "@/lib/rate-limit";

// Cada caso usa una IP distinta: el limitador es por IP y en memoria.
let ipCounter = 0;
function req(path: string): Request {
  ipCounter += 1;
  return new Request(`http://test.local${path}`, {
    headers: { "x-forwarded-for": `10.0.0.${ipCounter}` },
  });
}

const MOM_RESULT = {
  total: 2,
  results: [
    {
      asin: "B0G6417BM1",
      title: "Momcozy Wellness 1 Warm-Massage Wearable Breast Pump",
      brand: "Momcozy",
      categoryName: "Baby Products",
      categorySlug: "baby-products",
    },
  ],
};

beforeEach(() => {
  __resetRateLimit();
  liveMock.mockReset();
  adminMock.mockReset();
  currentAdminMock.mockReset();
  liveMock.mockResolvedValue(MOM_RESULT);
  adminMock.mockResolvedValue({
    total: 1,
    results: [
      {
        id: "prod-1",
        asin: "B0G6417BM1",
        title: "Momcozy Wellness 1",
        brand: "Momcozy",
        status: "DRAFT",
        categoryName: "Baby Products",
      },
    ],
  });
  currentAdminMock.mockResolvedValue("admin@example.com");
});

describe("GET /api/search (público)", () => {
  it("sin q responde vacío inmediato sin tocar la capa de datos", async () => {
    const res = await publicGET(req("/api/search"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ query: "", total: 0, results: [] });
    expect(liveMock).not.toHaveBeenCalled();
  });

  it("devuelve coincidencias y total con la forma del desplegable", async () => {
    const res = await publicGET(req("/api/search?q=mom"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.query).toBe("mom");
    expect(body.total).toBe(2);
    expect(body.results[0]).toMatchObject({
      asin: "B0G6417BM1",
      brand: "Momcozy",
      categorySlug: "baby-products",
    });
    expect(liveMock).toHaveBeenCalledWith("mom", 8);
  });

  it("recorta la consulta a 80 caracteres y el límite a 10", async () => {
    const long = "a".repeat(120);
    await publicGET(req(`/api/search?q=${long}&limit=50`));
    const [qArg, limitArg] = liveMock.mock.calls[0];
    expect((qArg as string).length).toBe(80);
    expect(limitArg).toBe(10);
  });

  it("aplica rate limiting por IP (120/min)", async () => {
    const headers = { "x-forwarded-for": "10.9.9.9" };
    let last: Response | null = null;
    for (let i = 0; i < 121; i++) {
      last = await publicGET(
        new Request("http://test.local/api/search?q=mom", { headers }),
      );
    }
    expect(last?.status).toBe(429);
  });
});

describe("GET /api/admin/search (panel)", () => {
  it("sin sesión responde 401 y no busca", async () => {
    currentAdminMock.mockResolvedValue(null);
    const res = await adminGET(req("/api/admin/search?q=mom"));
    expect(res.status).toBe(401);
    expect(adminMock).not.toHaveBeenCalled();
  });

  it("con sesión devuelve resultados de todos los estados", async () => {
    const res = await adminGET(req("/api/admin/search?q=mom"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.total).toBe(1);
    expect(body.results[0]).toMatchObject({
      id: "prod-1",
      status: "DRAFT",
    });
    expect(adminMock).toHaveBeenCalledWith("mom", 8);
  });

  it("sin q responde vacío inmediato", async () => {
    const res = await adminGET(req("/api/admin/search"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ query: "", total: 0, results: [] });
    expect(adminMock).not.toHaveBeenCalled();
  });
});
