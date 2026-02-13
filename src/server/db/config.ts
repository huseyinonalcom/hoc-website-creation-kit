import { DB } from "../types/dbtypes";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({ pool }),
});

const poolRo = new Pool({
  connectionString: process.env.DATABASE_URL_RO ?? process.env.DATABASE_URL,
});

export const dbRo = new Kysely<DB>({
  dialect: new PostgresDialect({ pool: poolRo }),
});

export default db;
