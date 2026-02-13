import "server-only";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

import { extractAuthenticatedUser } from "./extractAuthenticatedUser";
import { isUserRole, UserRoles } from "../users/types";

type AnyFn = (...args: never[]) => unknown;

export function authCheckMiddleware<T extends AnyFn>({
  allowedRoles,
  fn,
}: {
  allowedRoles: UserRoles[];
  fn: T;
}): T {
  return (async (...args: Parameters<T>) => {
    try {
      await ensureAccess({
        cookies: await cookies(),
        allowedRoles,
      });
      return fn(...args);
    } catch {
      throw {
        result: "error",
        error: "Giriş yetkiniz yok",
      };
    }
  }) as T;
}

const ensureAccess = async ({
  cookies,
  allowedRoles,
}: {
  cookies: ReadonlyRequestCookies;
  allowedRoles: UserRoles[];
}) => {
  const user = (
    await extractAuthenticatedUser(cookies.get("access-token")?.value)
  ).user;

  if (!isUserRole(user.role) || !allowedRoles.includes(user.role)) {
    throw new Error("Unauthorized");
  }
};
