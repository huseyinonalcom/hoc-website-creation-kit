import "server-only";
import { get } from "../../db/query";
export const getPageById = async ({ id }) => {
    return {
        result: await get("pages")
            .selectAll()
            .where("id", "=", id)
            .executeTakeFirstOrThrow(),
        total: 1,
    };
};
//# sourceMappingURL=get.js.map