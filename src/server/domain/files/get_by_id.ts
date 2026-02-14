import "server-only";

import type { Selectable } from "kysely";

import { Files } from "../../types/dbtypes";
import { get } from "../../db/query";


export const getFileById = async (id: string): Promise<Selectable<Files>> => {
  const file = await get("files", { id }).selectAll().executeTakeFirstOrThrow();
  return file;
};
