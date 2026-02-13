import "server-only";

import { db } from "../../db/config";

export const updateFile = async ({ id, label, directoryId }: { id: string; label?: string | null; directoryId?: string | null }) => {
  const payload: Record<string, unknown> = {};
  if (label !== undefined) payload.label = label ?? null;
  if (directoryId !== undefined) payload.directory_id = directoryId ?? null;

  if (Object.keys(payload).length === 0) throw new Error("No updates provided");

  const updated = await db.updateTable("files").set(payload).where("id", "=", id).returningAll().executeTakeFirstOrThrow();

  return { file: updated };
};

export default updateFile;
