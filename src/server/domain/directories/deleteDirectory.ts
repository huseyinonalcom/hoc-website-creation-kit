import "server-only";

import { db } from "../../db/config";

// Deletes a directory and its descendants only if no non-deleted files exist in them.
export const deleteDirectory = async ({ id }: { id: string }) => {
  const directories = await db
    .selectFrom("file_directories")
    .selectAll()
    .execute();

  // collect descendants (simple DFS)
  const byParent = new Map<
    string | null,
    { id: string; parent_id: string | null }[]
  >();
  directories.forEach((d: any) => {
    const list = byParent.get(d.parent_id ?? null) ?? [];
    list.push(d as any);
    byParent.set(d.parent_id ?? null, list);
  });

  const stack = [id];
  const targetIds: string[] = [];
  while (stack.length > 0) {
    const cur = stack.pop();
    if (!cur || targetIds.includes(cur)) continue;
    targetIds.push(cur);
    const children = byParent.get(cur) ?? [];
    children.forEach((c) => stack.push(c.id));
  }

  if (targetIds.length === 0) throw new Error("Directory not found");

  const filesInDir = await db
    .selectFrom("files")
    .select(["id"])
    .where("is_deleted", "=", false)
    .where("directory_id", "in", targetIds)
    .execute();

  if (filesInDir.length > 0) {
    throw new Error(
      "Cannot delete directory because it (or descendants) contain files",
    );
  }

  await db
    .deleteFrom("file_directories")
    .where("id", "in", targetIds)
    .execute();

  return { deletedIds: targetIds };
};

export default deleteDirectory;
