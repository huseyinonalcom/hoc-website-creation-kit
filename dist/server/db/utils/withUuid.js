import { sql } from "kysely";
export default function withUuid(qb) {
    return qb.addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql `gen_random_uuid()`));
}
//# sourceMappingURL=withUuid.js.map