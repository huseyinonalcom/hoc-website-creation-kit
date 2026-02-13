import "server-only";
import { db } from "../../db/config";
export const updateDirectory = async ({ id, name, parentId, }) => {
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const nextName = trimmedName.length > 0 ? trimmedName : null;
    const updatePayload = {};
    if (nextName !== null)
        updatePayload.name = nextName;
    if (parentId !== undefined)
        updatePayload.parent_id = parentId ?? null;
    if (Object.keys(updatePayload).length === 0) {
        throw new Error("No updates provided");
    }
    const updated = await db
        .updateTable("file_directories")
        .set(updatePayload)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirstOrThrow();
    return { result: updated };
};
export default updateDirectory;
//# sourceMappingURL=updateDirectory.js.map