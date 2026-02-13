# File Management — Database & Storage Requirements

This document describes the minimal database schema and required environment variables to enable the file management features (R2-backed object storage + Postgres via Kysely).

## Required environment variables

- `DATABASE_URL` — Postgres connection string used for read/write operations.
- `DATABASE_URL_RO` — (optional) read-only Postgres connection string used for read-only queries.
- `R2_ACCESS_KEY_ID` — R2 / S3 access key id.
- `R2_SECRET_ACCESS_KEY` — R2 / S3 secret access key.
- `R2_BUCKET` — name of the R2 bucket to store uploaded objects.
- `R2_ENDPOINT` — S3-compatible endpoint (e.g. `https://<account>.r2.cloudflarestorage.com`).
- `R2_REGION` — S3 region or `auto` for R2.
- `R2_PUBLIC_URL` — public base url for objects (no trailing slash), e.g. `https://cdn.example.com`.

Make sure these variables are set in your deployment environment before enabling file management. The code will assume these variables are present and will throw if missing.

## Minimal DB schema (tables)

This is a reduced schema derived from an example migration and tailored for the file-management needs of the kit.

### `file_directories`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `name` text NOT NULL
- `parent_id` uuid REFERENCES file_directories(id) ON DELETE CASCADE
- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP

Index: unique on (`parent_id`, `name`) to prevent duplicate sibling names.

### `files`

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `url` text NOT NULL -- public URL to object storage
- `uploaded_by_user_id` uuid REFERENCES users(id) ON DELETE SET NULL
- `uploaded_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
- `tag` text -- original filename or tag
- `label` text -- human-readable label
- `is_deleted` boolean NOT NULL DEFAULT false
- `deleted_at` timestamp
- `directory_id` uuid REFERENCES file_directories(id) ON DELETE SET NULL

Notes:

- For privacy or scoped assets, you can store paths/namespaced folders in the object key and keep `url` as the full public URL.

### (Optional) `users`

File-management stores the `uploaded_by_user_id` as a foreign key to a users table. A minimal `users` table might include:

- `id` uuid PRIMARY KEY DEFAULT gen_random_uuid()
- `full_name` text NOT NULL
- `email` text NOT NULL UNIQUE
- `password_hash` text NOT NULL
- `role` text NOT NULL DEFAULT 'member'
- `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP

If you already have a user table, link `files.uploaded_by_user_id` to it.

## Usage notes

- The object storage (R2/S3) client should be configured with the `R2_*` env variables. Store objects under stable folders (e.g. `uploads/<yyyy-mm-dd>/<uuid>-name.ext`) to avoid name collisions and to simplify cleanup.
- Use Kysely for DB queries; you can create a small `src/server/db/config.ts` to build Kysely instances for read/write and read-only access.
- Ensure the `R2_PUBLIC_URL` does not have a trailing slash; the public URL stored in the DB is usually `${R2_PUBLIC_URL}/${objectKey}`.

## Migration

Use a Kysely migration that creates the above two tables (`file_directories`, `files`) and the unique index on directories. Example migrations are included in many starter projects; adapt them to your environment.

---

This file is a minimal reference for integrating the kit's file management with your Postgres + R2-backed storage.
