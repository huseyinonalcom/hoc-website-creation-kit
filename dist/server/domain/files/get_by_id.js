import "server-only";
import { get } from "../../db/query";
export const getFileById = async (id) => {
    const file = await get("files", { id }).selectAll().executeTakeFirstOrThrow();
    return file;
};
//# sourceMappingURL=get_by_id.js.map