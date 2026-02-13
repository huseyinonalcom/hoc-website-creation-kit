# Database schema — full reference (derived from 001_init migration)

This document is a complete reference for the database schema used by the kit, derived from the `src/server/db/migrations/001_init.ts` migration.

This file intentionally excludes the `announcements` table as requested. All tables created by the migration are included except that one.

Notes:

- All tables created with `withUuid(...)` include an `id uuid PRIMARY KEY DEFAULT gen_random_uuid()` column.
- Timestamps default to `CURRENT_TIMESTAMP` where defined in the migration.
- Several foreign key constraints use `ON DELETE SET NULL` or `ON DELETE CASCADE` as noted.

## Tables

### `users`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `full_name` text NOT NULL
- `email` text NOT NULL UNIQUE
- `password_hash` text NOT NULL
- `role` text NOT NULL DEFAULT 'member'
- `status` text NOT NULL DEFAULT 'unverified'
- `verified_at` timestamp
- `last_login_at` timestamp
- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP

Purpose: user accounts. `email` is unique.

### `file_directories`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `name` text NOT NULL
- `parent_id` uuid REFERENCES file_directories(id) ON DELETE CASCADE
- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP

Index:

- `file_directories_parent_name_idx` (unique on `(parent_id, name)`) — prevents duplicate sibling names.

Purpose: hierarchical directories/namespaces for files.

### `files`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `url` text NOT NULL
- `uploaded_by_user_id` uuid REFERENCES users(id) ON DELETE SET NULL
- `uploaded_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `tag` text
- `label` text
- `is_deleted` boolean NOT NULL DEFAULT false
- `deleted_at` timestamp
- `directory_id` uuid REFERENCES file_directories(id) ON DELETE SET NULL

Purpose: stores metadata for uploaded objects. `url` is the public object URL (e.g. `${R2_PUBLIC_URL}/${objectKey}`).

Behavioral notes:

- `is_deleted` can be used for soft deletes; `deleted_at` stores when the file was marked deleted.

### `site_map`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `url` text NOT NULL UNIQUE
- `is_active` boolean NOT NULL DEFAULT false
- `active_page_id` uuid -- FK to `pages.id` (added via alter table)
- `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `updated_by_user_id` uuid REFERENCES users(id) ON DELETE SET NULL

Foreign key (added after table creation):

- `site_map_active_page_id_pages_id_fk` — foreign key on `active_page_id` references `pages(id)` ON DELETE SET NULL.

Purpose: top-level site map entries (one per hostname/path) and link to the active page.

### `pages`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `status` text NOT NULL DEFAULT 'draft'
- `site_map_id` uuid REFERENCES site_map(id) ON DELETE SET NULL
- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `created_by_user_id` uuid REFERENCES users(id) ON DELETE SET NULL
- `updated_by_user_id` uuid REFERENCES users(id) ON DELETE SET NULL
- `content` jsonb

Purpose: editable pages. `content` stores the page payload (rich JSON structure).

### `meta`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `name` text NOT NULL UNIQUE
- `content` jsonb
- `updated_by_user_id` uuid REFERENCES users(id) ON DELETE SET NULL

Purpose: generic key/value JSON metadata used for things like header/nav/footer content, leadership lists, etc.

## Indexes & Constraints summary

- `file_directories_parent_name_idx` UNIQUE(parent_id, name)
- `announcements_first_published_at_idx` created in migration (omitted table here)
- `site_map.url` is UNIQUE
- `users.email` is UNIQUE
- `meta.name` is UNIQUE

Foreign keys summary:

- `files.uploaded_by_user_id` -> `users.id` ON DELETE SET NULL
- `files.directory_id` -> `file_directories.id` ON DELETE SET NULL
- `file_directories.parent_id` -> `file_directories.id` ON DELETE CASCADE
- `site_map.active_page_id` -> `pages.id` ON DELETE SET NULL
- `site_map.updated_by_user_id` -> `users.id` ON DELETE SET NULL
- `pages.site_map_id` -> `site_map.id` ON DELETE SET NULL
- `pages.created_by_user_id` / `pages.updated_by_user_id` -> `users.id` ON DELETE SET NULL
- `meta.updated_by_user_id` -> `users.id` ON DELETE SET NULL

## Migration notes & expectations

- The original migration uses a helper `withUuid(...)` to add an `id` column defaulting to `gen_random_uuid()`; ensure the `pgcrypto` or `uuid-ossp` extension that supplies `gen_random_uuid()` is available in your Postgres instance (or swap to `uuid_generate_v4()` if using `uuid-ossp`).
- `jsonb` columns (`pages.content`, `meta.content`) are used for flexible structured content.
- `created_at` and `updated_at` default to `CURRENT_TIMESTAMP` and can be updated by triggers or application code when records change.

## Suggested additions for production

- Add indexes on `files.directory_id` and `files.uploaded_by_user_id` for queries that filter by directory or uploader.
- Consider adding soft-delete filters (e.g. partial indexes) or archive/cleanup jobs for `is_deleted` files.
- Add `ON UPDATE` timestamp triggers to maintain `updated_at` automatically if desired.

---

If you want, I can also generate a Kysely migration file that matches this schema exactly and add suggested indexes/triggers. Next I can implement server-side file management actions (create directory, list directories, upload file to R2 and insert `files` row, update/move, delete/soft-delete) that use the `db` and `r2` helpers already added.
