import "server-only";

import { db } from "../../db/config";

export const getFileById = async (id: string) => {
  const file = await db.selectFrom("files").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
  return file;
};

export default getFileById;
