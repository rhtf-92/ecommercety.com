import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isCreatorsApiConfigured } from "@/modules/amazon/creators";

// Salud del despliegue: usado por el hosting/monitoreo tras publicar.
// No expone secretos; solo estados booleanos y conteos agregados.
export async function GET() {
  let database = false;
  try {
    const db = await getDb();
    await db.$queryRaw`SELECT 1`;
    database = true;
  } catch {
    database = false;
  }
  return NextResponse.json(
    {
      status: database ? "ok" : "degraded",
      database,
      creatorsApi: isCreatorsApiConfigured(),
      timestamp: new Date().toISOString(),
    },
    { status: database ? 200 : 503 },
  );
}
