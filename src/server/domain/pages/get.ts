import "server-only";

import { get } from "@/server/db/query";

export const getPageById = async ({ id }: { id: string }) => {
  return {
    result: await get("pages")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow(),
    total: 1,
  };
};
