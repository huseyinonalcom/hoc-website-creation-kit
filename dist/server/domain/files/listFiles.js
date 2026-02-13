import "server-only";
import { db } from "../../db/config";
export const listFiles = async ({ includeDeleted = true } = {}) => {
    const q = db.selectFrom("files").selectAll();
    const result = includeDeleted ? await q.execute() : await q.where("is_deleted", "=", false).execute();
    return { result };
};
export default listFiles;
//# sourceMappingURL=listFiles.js.map