import "server-only";
import { db, dbRo } from "./config";
function applyIdFilter(builder, id) {
    return builder.where("id", "=", id);
}
export function get(table, options) {
    const usedDb = options?.db ?? dbRo;
    let builder = usedDb.selectFrom(table);
    const id = options?.id;
    if (id !== undefined) {
        builder = applyIdFilter(builder, id);
    }
    return builder;
}
export function update(table, options) {
    const usedDb = options?.db ?? db;
    let builder = usedDb.updateTable(table);
    const id = options?.id;
    if (id !== undefined) {
        builder = applyIdFilter(builder, id);
    }
    return builder;
}
export function insert(table, options) {
    const usedDb = options?.db ?? db;
    return usedDb.insertInto(table);
}
export function del(table, options) {
    const usedDb = options?.db ?? db;
    let builder = usedDb.deleteFrom(table);
    const id = options?.id;
    if (id !== undefined) {
        builder = applyIdFilter(builder, id);
    }
    return builder;
}
//# sourceMappingURL=query.js.map