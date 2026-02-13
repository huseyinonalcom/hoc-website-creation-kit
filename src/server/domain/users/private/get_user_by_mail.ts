import "server-only";

import { GetUserOptions, GetUserResponse } from "../types";
import { get } from "../../../db/query";

export const getUserByMail = async <
  T extends GetUserOptions = { includePasswordHash?: false },
>({
  email,
  includePasswordHash,
}: {
  email: string;
} & T): Promise<GetUserResponse<T>> => {
  const includeHash = includePasswordHash ?? false;

  const userData = await get("users")
    .where("email", "=", email)
    .selectAll()
    .executeTakeFirstOrThrow();

  if (includeHash) {
    return {
      result: userData,
      total: 1,
    } as GetUserResponse<T>;
  }

  const { password_hash: _password_hash, ...userWithoutPassword } = userData;

  return {
    result: userWithoutPassword,
    total: 1,
  } as GetUserResponse<T>;
};
