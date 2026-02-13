import "server-only";

import { del } from "../../db/query";

export const deleteRoute = async ({ id }: { id: string }) => {
  return {
    result: await del("site_map", { id }).execute(),
  };
};
