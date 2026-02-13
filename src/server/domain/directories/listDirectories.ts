import "server-only";

import { db } from "../../db/config";

export const listDirectories = async () => {
  const result = await db.selectFrom("file_directories").selectAll().execute();
  return { result };
};

export default listDirectories;
