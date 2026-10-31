// Sincroniza precios/ofertas/imágenes desde la Amazon Creators API.
// Uso: npm run db:sync-amazon
// Sin credenciales (o sin cumplir la elegibilidad de Amazon) informa el
// motivo y no escribe nada: el sitio sigue en modo "Check price".

try {
  const proc = process as unknown as { loadEnvFile?: (p?: string) => void };
  proc.loadEnvFile?.(".env");
} catch {
  // Se espera el entorno ya cargado.
}

import { syncAmazonData } from "../src/modules/amazon/sync";

async function main() {
  const result = await syncAmazonData("manual-sync");
  console.log(result.message);
  if (result.reason === "NOT_CONFIGURED") {
    console.log(
      "Cuando la cuenta cumpla el requisito de Amazon (10 ventas calificadas en 30 días), crea las credenciales en Associates Central → Herramientas → Creators API y ponlas en tu .env como CREATORS_API_CREDENTIAL_ID y CREATORS_API_CREDENTIAL_SECRET.",
    );
    return;
  }
  if (!result.ok && result.reason === "ERROR") process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
