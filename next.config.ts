import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formatos modernos primero: AVIF/WebP reducen el peso del slide
    // y de los banners ~40-60% frente al JPG original (LCP).
    formats: ["image/avif", "image/webp"],
    // Topes de producción (instancia pequeña, 0.5 CPU): sin este tope
    // Next ofrece variantes de hasta 3840px y codificar AVIF a ese
    // tamaño satura la CPU y la memoria, tumbando el servicio (502).
    // 1920px basta para fondos a pantalla completa (las fuentes son
    // 2048px) y el resto de imágenes es menor.
    deviceSizes: [640, 750, 1080, 1920],
    // Las imágenes propias (slides/banners) son estáticas: caché de
    // optimización de 30 días para codificar cada variante una sola
    // vez por despliegue, no en cada visita.
    minimumCacheTTL: 2592000,
    // Imágenes oficiales de producto servidas por Amazon (SiteStripe / API).
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      { protocol: "https", hostname: "images.amazon.com" },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
