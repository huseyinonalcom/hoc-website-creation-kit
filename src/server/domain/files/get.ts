import "server-only";

import { get } from "../../db/query";

export const getFiles = async ({ includeDeleted = true } = {}) => {
  const query = get("files").selectAll();
  const result = includeDeleted
    ? await query.execute()
    : await query.where("is_deleted", "=", false).execute();

  return {
    result,
    total: 1,
  };
};
