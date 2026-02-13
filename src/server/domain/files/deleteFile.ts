import "server-only";
import { sql } from "kysely";

import { db } from "../../db/config";

export const deleteFile = async ({ id }: { id: string }) => {
  const updated = await db
    .updateTable("files")
    .set({ is_deleted: true, deleted_at: sql`CURRENT_TIMESTAMP` })
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirstOrThrow();

  return { file: updated };
};

export default deleteFile;
