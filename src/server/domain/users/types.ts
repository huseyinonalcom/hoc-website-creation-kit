import { Selectable } from "kysely";

import "server-only";
import { DB } from "../../types/dbtypes";
export const userRoles = ["admin"] as const;

export type UserRoles = (typeof userRoles)[number];

export const isUserRole = (role: string): role is UserRoles =>
  userRoles.includes(role as UserRoles);

export const userStatuses = ["active"] as const;

export type UserStatus = (typeof userStatuses)[number];

export type UserRow = Selectable<DB["users"]>;
export type UserWithoutPassword = Omit<UserRow, "password_hash">;
export type GetUserOptions = { includePasswordHash?: boolean };
export type GetUserResponse<T extends GetUserOptions> = {
  result: T["includePasswordHash"] extends true ? UserRow : UserWithoutPassword;
  total: number;
};

export type RequestUser = {
  userId: string;
  role: string;
};
