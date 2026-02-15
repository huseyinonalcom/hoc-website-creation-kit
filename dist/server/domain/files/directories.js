import "server-only";
import { throwCustomError } from "../../../utils/errors/customerrors";
import { get, insert } from "../../db/query";
import db from "../../db/config";
export const getDirectories = async () => {
    return {
        result: await get("file_directories").selectAll().execute(),
        total: 1,
    };
};
export const createDirectory = async ({ name, parentId, }) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
        throwCustomError("Klasör adı boş olamaz.");
    }
    const existing = await get("file_directories")
        .select(["id"])
        .where("name", "=", trimmedName)
        .where("parent_id", "is", parentId && parentId.length > 0 ? parentId : null)
        .executeTakeFirst();
    if (existing) {
        throwCustomError("Bu klasör zaten mevcut.");
    }
    const inserted = await insert("file_directories")
        .values({
        name: trimmedName,
        parent_id: parentId ?? null,
    })
        .returningAll()
        .executeTakeFirstOrThrow();
    return {
        result: inserted,
        total: 1,
    };
};
export const deleteDirectory = async ({ id, }) => {
    const directories = await get("file_directories").selectAll().execute();
    const targetIds = collectDescendants(id, directories);
    if (targetIds.length === 0) {
        throwCustomError("Klasör bulunamadı.");
    }
    const filesInDir = await db
        .selectFrom("files")
        .select(["id"])
        .where("is_deleted", "=", false)
        .where("directory_id", "in", targetIds)
        .execute();
    if (filesInDir.length > 0) {
        throwCustomError("Klasörde silinmemiş dosyalar var.");
    }
    await db
        .deleteFrom("file_directories")
        .where("id", "in", targetIds)
        .execute();
    return { deletedIds: targetIds };
};
export const updateDirectory = async ({ id, name, parentId, }) => {
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const nextName = trimmedName.length > 0 ? trimmedName : null;
    const nextParent = typeof parentId === "string" && parentId.trim().length > 0
        ? parentId.trim()
        : null;
    if (!nextName && parentId === undefined) {
        throwCustomError("Güncellenecek alan bulunamadı.");
    }
    if (nextParent === id) {
        throwCustomError("Klasör kendisine taşınamaz.");
    }
    const current = await get("file_directories", { id })
        .selectAll()
        .executeTakeFirstOrThrow();
    if (nextParent) {
        const directories = await get("file_directories").selectAll().execute();
        const descendants = collectDescendants(id, directories);
        if (descendants.includes(nextParent)) {
            throwCustomError("Klasör altına taşınamaz.");
        }
    }
    if (nextName) {
        const parentForCheck = parentId === undefined ? (current.parent_id ?? null) : nextParent;
        const existing = await get("file_directories")
            .select(["id"])
            .where("name", "=", nextName)
            .where("parent_id", "is", parentForCheck)
            .executeTakeFirst();
        if (existing && existing.id !== id) {
            throwCustomError("Bu klasör zaten mevcut.");
        }
    }
    const updatePayload = {};
    if (nextName !== null) {
        updatePayload.name = nextName;
    }
    if (parentId !== undefined) {
        updatePayload.parent_id = nextParent;
    }
    const updated = await db
        .updateTable("file_directories")
        .set(updatePayload)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirstOrThrow();
    return { result: updated };
};
const collectDescendants = (rootId, directories) => {
    const byParent = new Map();
    directories.forEach((dir) => {
        const parentId = dir.parent_id ?? null;
        const list = byParent.get(parentId) ?? [];
        list.push(dir);
        byParent.set(parentId, list);
    });
    const result = [];
    const stack = [rootId];
    while (stack.length > 0) {
        const current = stack.pop();
        if (!current || result.includes(current)) {
            continue;
        }
        result.push(current);
        const children = byParent.get(current) ?? [];
        children.forEach((child) => stack.push(child.id));
    }
    return result;
};
//# sourceMappingURL=directories.js.map