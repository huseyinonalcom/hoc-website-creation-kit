import type {
  DeleteQueryBuilder,
  Kysely,
  Selectable,
  SelectQueryBuilder,
  UpdateQueryBuilder,
} from "kysely";

import "server-only";

import { DB } from "../types/dbtypes";
import { db, dbRo } from "./config";

type TableName = keyof DB;
type TableWithId = {
  [K in TableName]: "id" extends keyof DB[K] ? K : never;
}[TableName];
type IdOf<T extends TableWithId> =
  Selectable<DB[T]> extends { id: infer I } ? I : never;

type DbLike = Pick<
  Kysely<DB>,
  "selectFrom" | "updateTable" | "insertInto" | "deleteFrom"
>;

function applyIdFilter<T extends TableWithId, QB>(
  builder: QB,
  id: IdOf<T>,
): QB {
  return (
    builder as unknown as { where: (lhs: string, op: "=", rhs: IdOf<T>) => QB }
  ).where("id", "=", id);
}

export function get<T extends TableWithId>(
  table: T,
  options?: { id?: IdOf<T>; db?: DbLike },
): SelectQueryBuilder<DB, T, Selectable<DB[T]>> {
  const usedDb: DbLike = options?.db ?? dbRo;
  let builder = usedDb.selectFrom(table);
  const id = options?.id;
  if (id !== undefined) {
    builder = applyIdFilter<T, typeof builder>(builder, id);
  }
  return builder as SelectQueryBuilder<DB, T, Selectable<DB[T]>>;
}

export function update<T extends TableWithId>(
  table: T,
  options?: { id?: IdOf<T>; db?: DbLike },
): UpdateQueryBuilder<DB, T, T, DB[T]> {
  const usedDb: DbLike = options?.db ?? db;
  let builder = usedDb.updateTable(table);

  const id = options?.id;
  if (id !== undefined) {
    builder = applyIdFilter<T, typeof builder>(builder, id);
  }

  return builder as UpdateQueryBuilder<DB, T, T, DB[T]>;
}

export function insert<T extends TableName>(
  table: T,
  options?: { db?: DbLike },
) {
  const usedDb = options?.db ?? db;
  return usedDb.insertInto(table);
}

export function del<T extends TableWithId>(
  table: T,
  options?: { id?: IdOf<T>; db?: DbLike },
): DeleteQueryBuilder<DB, T, DB[T]> {
  const usedDb: DbLike = options?.db ?? db;
  let builder = usedDb.deleteFrom(table);
  const id = options?.id;
  if (id !== undefined) {
    builder = applyIdFilter<T, typeof builder>(builder, id);
  }

  return builder as DeleteQueryBuilder<DB, T, DB[T]>;
}
