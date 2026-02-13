import type { ColumnType } from "kysely";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [x: string]: JsonValue | undefined;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface FileDirectories {
  created_at: Generated<Timestamp>;
  id: Generated<string>;
  name: string;
  parent_id: string | null;
  updated_at: Generated<Timestamp>;
}

export interface Files {
  deleted_at: Timestamp | null;
  directory_id: string | null;
  url: string;
  id: Generated<string>;
  is_deleted: Generated<boolean>;
  tag: string | null;
  label: string | null;
  uploaded_at: Generated<Timestamp>;
  uploaded_by_user_id: string | null;
}

export interface Meta {
  content: Json | null;
  id: Generated<string>;
  name: string;
  updated_by_user_id: string | null;
}

export interface Pages {
  content: Json | null;
  created_at: Generated<Timestamp>;
  created_by_user_id: string | null;
  id: Generated<string>;
  site_map_id: string | null;
  status: Generated<string>;
  updated_at: Generated<Timestamp>;
  updated_by_user_id: string | null;
}

export interface SiteMap {
  active_page_id: string | null;
  created_at: Generated<Timestamp>;
  id: Generated<string>;
  is_active: Generated<boolean>;
  updated_at: Generated<Timestamp>;
  updated_by_user_id: string | null;
  url: string;
}

export interface Users {
  created_at: Generated<Timestamp>;
  email: string;
  full_name: string;
  id: Generated<string>;
  last_login_at: Timestamp | null;
  password_hash: string;
  role: Generated<string>;
  status: Generated<string>;
  updated_at: Generated<Timestamp>;
  verified_at: Timestamp | null;
}

export interface DB {
  file_directories: FileDirectories;
  files: Files;
  meta: Meta;
  pages: Pages;
  site_map: SiteMap;
  users: Users;
}
