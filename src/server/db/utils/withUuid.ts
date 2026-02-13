import { CreateTableBuilder, sql } from "kysely";

export default function withUuid(
  qb: CreateTableBuilder<never, never>,
): CreateTableBuilder<never, never> {
  return qb.addColumn("id", "uuid", (col) =>
    col.primaryKey().defaultTo(sql`gen_random_uuid()`),
  );
}
