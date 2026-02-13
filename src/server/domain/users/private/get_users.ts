import "server-only";

import { dbRo } from "@/server/db/config";
import { get } from "@/server/db/query";

import { authCheckMiddleware } from "../../auth/acCheck";

export const getUsers = authCheckMiddleware({
  allowedRoles: ["admin"],
  fn: async ({
    nameFilter,
    count = 30,
    page = 1,
  }: {
    nameFilter?: string;
    kidemNoFilter?: string;
    count?: number;
    page?: number;
  }) => {
    const buildFilteredQuery = () => {
      let q = get("users");
      if (nameFilter) {
        q = q.where("full_name", "ilike", `%${nameFilter}%`);
      }

      return q;
    };

    const safeCount = Math.min(Math.max(count, 1), 100);
    const safePage =
      Number.isFinite(page as number) && page && page > 0
        ? Math.floor(page)
        : 1;
    const offset = (safePage - 1) * safeCount;

    const result = await buildFilteredQuery()
      .orderBy("full_name", "asc")
      .limit(safeCount)
      .offset(offset)
      .selectAll()
      .execute();

    const total = await buildFilteredQuery()
      .select(dbRo.fn.count<number>("id").as("totalCount"))
      .executeTakeFirstOrThrow()
      .then((res) => res.totalCount);

    const resultWithoutPasswords = result.map(
      ({ password_hash: _password_hash, ...user }) => user,
    );

    return {
      result: resultWithoutPasswords,
      total: Number(total),
    };
  },
});
