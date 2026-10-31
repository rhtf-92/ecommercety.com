import { getDb } from "@/lib/db";
import type { Prisma } from "@prisma/client";

/** Registra un cambio en AuditLog (antes/después). Nunca lanza: la
 *  auditoría no debe tumbar la operación principal, pero sí intentarse
 *  siempre que haya base de datos. */
export async function writeAudit(params: {
  entityType: string;
  entityId: string;
  action: string;
  before?: Prisma.InputJsonValue;
  after?: Prisma.InputJsonValue;
  actor: string;
}): Promise<void> {
  try {
    const db = await getDb();
    await db.auditLog.create({
      data: {
        entityType: params.entityType,
        entityId: params.entityId,
        action: params.action,
        before: params.before,
        after: params.after,
        actor: params.actor,
      },
    });
  } catch {
    // Sin base de datos no hay dónde auditar; la operación ya ocurrió.
  }
}
