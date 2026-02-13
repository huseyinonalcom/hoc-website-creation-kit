import "server-only";

import { del } from "@/server/db/query";

export const deletePage = async ({ id }: { id: string }) => {
  return {
    result: await del("pages", { id }).execute(),
    total: 1,
  };
};
