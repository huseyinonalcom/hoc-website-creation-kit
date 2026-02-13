import "server-only";

import { db } from "../../db/config";

export const createDirectory = async ({
  name,
  parentId,
}: {
  name: string;
  parentId?: string | null;
}) => {
  const trimmed = String(name ?? "").trim();
  if (!trimmed) throw new Error("Directory name is required");

  // ensure unique per parent
  const existing = await db
    .selectFrom("file_directories")
    .select(["id"])
    .where("name", "=", trimmed)
    .where("parent_id", "is", parentId && parentId.length > 0 ? parentId : null)
    .executeTakeFirst();

  if (existing) {
    throw new Error(
      "A directory with this name already exists in the target parent",
    );
  }

  const inserted = await db
    .insertInto("file_directories")
    .values({ name: trimmed, parent_id: parentId ?? null })
    .returningAll()
    .executeTakeFirstOrThrow();

  return { result: inserted };
};

export default createDirectory;
