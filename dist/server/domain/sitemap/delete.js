import "server-only";
import { del } from "../../db/query";
export const deleteRoute = async ({ id }) => {
    return {
        result: await del("site_map", { id }).execute(),
    };
};
//# sourceMappingURL=delete.js.map