import type { DeleteQueryBuilder, Kysely, Selectable, SelectQueryBuilder, UpdateQueryBuilder } from "kysely";
import "server-only";
import { DB } from "../types/dbtypes";
type TableName = keyof DB;
type TableWithId = {
    [K in TableName]: "id" extends keyof DB[K] ? K : never;
}[TableName];
type IdOf<T extends TableWithId> = Selectable<DB[T]> extends {
    id: infer I;
} ? I : never;
type DbLike = Pick<Kysely<DB>, "selectFrom" | "updateTable" | "insertInto" | "deleteFrom">;
export declare function get<T extends TableWithId>(table: T, options?: {
    id?: IdOf<T>;
    db?: DbLike;
}): SelectQueryBuilder<DB, T, Selectable<DB[T]>>;
export declare function update<T extends TableWithId>(table: T, options?: {
    id?: IdOf<T>;
    db?: DbLike;
}): UpdateQueryBuilder<DB, T, T, DB[T]>;
export declare function insert<T extends TableName>(table: T, options?: {
    db?: DbLike;
}): import("kysely").InsertQueryBuilder<DB, T, import("kysely").InsertResult>;
export declare function del<T extends TableWithId>(table: T, options?: {
    id?: IdOf<T>;
    db?: DbLike;
}): DeleteQueryBuilder<DB, T, DB[T]>;
export {};
//# sourceMappingURL=query.d.ts.map