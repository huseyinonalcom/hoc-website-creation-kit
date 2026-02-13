import "server-only";

import { get } from "../../db/query";

export const getMeta = async () => {
  const query = get("meta");

  return {
    result: await query.selectAll().execute(),
    total: 1,
  };
};
