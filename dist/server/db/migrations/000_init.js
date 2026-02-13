import { sql } from "kysely";
import withUuid from "../utils/withUuid";
export async function up(db) {
    await withUuid(db.schema
        .createTable("users")
        .addColumn("full_name", "text", (col) => col.notNull())
        .addColumn("email", "text", (col) => col.notNull().unique())
        .addColumn("password_hash", "text", (col) => col.notNull())
        .addColumn("role", "text", (col) => col.notNull().defaultTo("member"))
        .addColumn("status", "text", (col) => col.notNull().defaultTo("unverified"))
        .addColumn("verified_at", "timestamp")
        .addColumn("last_login_at", "timestamp")
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())
        .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())).execute();
    await withUuid(db.schema
        .createTable("file_directories")
        .addColumn("name", "text", (col) => col.notNull())
        .addColumn("parent_id", "uuid", (col) => col.references("file_directories.id").onDelete("cascade"))
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())
        .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())).execute();
    await db.schema
        .createIndex("file_directories_parent_name_idx")
        .on("file_directories")
        .column("parent_id")
        .column("name")
        .unique()
        .execute();
    await withUuid(db.schema
        .createTable("files")
        .addColumn("url", "text", (col) => col.notNull())
        .addColumn("uploaded_by_user_id", "uuid", (col) => col.references("users.id").onDelete("set null"))
        .addColumn("uploaded_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())
        .addColumn("tag", "text")
        .addColumn("label", "text")
        .addColumn("is_deleted", "boolean", (col) => col.defaultTo(false).notNull())
        .addColumn("deleted_at", "timestamp")
        .addColumn("directory_id", "uuid", (col) => col.references("file_directories.id").onDelete("set null"))).execute();
    await withUuid(db.schema
        .createTable("site_map")
        .addColumn("url", "text", (col) => col.notNull().unique())
        .addColumn("is_active", "boolean", (col) => col.notNull().defaultTo(false))
        .addColumn("active_page_id", "uuid")
        .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())
        .addColumn("updated_by_user_id", "uuid", (col) => col.references("users.id").onDelete("set null"))).execute();
    await withUuid(db.schema
        .createTable("pages")
        .addColumn("status", "text", (col) => col.notNull().defaultTo("draft"))
        .addColumn("site_map_id", "uuid", (col) => col.references("site_map.id").onDelete("set null"))
        .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())
        .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql `CURRENT_TIMESTAMP`).notNull())
        .addColumn("created_by_user_id", "uuid", (col) => col.references("users.id").onDelete("set null"))
        .addColumn("updated_by_user_id", "uuid", (col) => col.references("users.id").onDelete("set null"))
        .addColumn("content", "jsonb")).execute();
    await withUuid(db.schema
        .createTable("meta")
        .addColumn("name", "text", (col) => col.notNull().unique())
        .addColumn("content", "jsonb")
        .addColumn("updated_by_user_id", "uuid", (col) => col.references("users.id").onDelete("set null"))).execute();
    await db.schema
        .alterTable("site_map")
        .addForeignKeyConstraint("site_map_active_page_id_pages_id_fk", ["active_page_id"], "pages", ["id"], (cb) => cb.onDelete("set null"))
        .execute();
}
//# sourceMappingURL=000_init.js.map