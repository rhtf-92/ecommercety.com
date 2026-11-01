// Inyecta un bloque JSON-LD en la página. El contenido lo construyen
// las funciones puras de src/modules/seo/jsonld.ts.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
