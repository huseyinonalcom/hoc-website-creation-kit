import "server-only";

import { GetUserOptions, GetUserResponse } from "../types";
import { generatePlaceholderUser } from "../placeholder";
import { authCheckMiddleware } from "../../auth/acCheck";
import { get } from "../../../db/query";

const getUserByIdInternal = async <
  T extends GetUserOptions = { includePasswordHash?: false },
>(
  id: string,
  options?: T,
): Promise<GetUserResponse<T>> => {
  const includePasswordHash = options?.includePasswordHash ?? false;

  if (id === "0") {
    const placeholderUser = generatePlaceholderUser();

    if (includePasswordHash) {
      return {
        result: placeholderUser,
        total: 1,
      } as GetUserResponse<T>;
    }

    const { password_hash: _password_hash, ...userWithoutPassword } =
      placeholderUser;

    return {
      result: userWithoutPassword,
      total: 1,
    } as unknown as GetUserResponse<T>;
  }

  const query = get("users", { id });

  const result = await query.selectAll().executeTakeFirstOrThrow();

  if (includePasswordHash) {
    return {
      result,
      total: 1,
    } as GetUserResponse<T>;
  }

  const { password_hash: _password_hash, ...userWithoutPassword } = result;

  return {
    result: userWithoutPassword,
    total: 1,
  } as GetUserResponse<T>;
};

export const getUserById = authCheckMiddleware({
  allowedRoles: ["admin"],
  fn: getUserByIdInternal,
});

export const getUserByIdForAuth = getUserByIdInternal;
