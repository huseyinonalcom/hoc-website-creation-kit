import "server-only";
import { del } from "../../db/query";
export const deletePage = async ({ id }) => {
    return {
        result: await del("pages", { id }).execute(),
        total: 1,
    };
};
//# sourceMappingURL=delete.js.map