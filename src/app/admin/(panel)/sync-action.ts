"use server";

import { requireAdmin } from "@/lib/auth";
import { syncAmazonData } from "@/modules/amazon/sync";

export type SyncState = { message?: string };

export async function runSyncAction(
  _prev: SyncState,
  _formData: FormData,
): Promise<SyncState> {
  void _prev;
  void _formData;
  const actor = await requireAdmin();
  const result = await syncAmazonData(actor);
  return { message: result.message };
}
