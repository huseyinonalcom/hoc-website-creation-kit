import "server-only";
import { UserRoles } from "../users/types";
type AnyFn = (...args: never[]) => unknown;
export declare function authCheckMiddleware<T extends AnyFn>({ allowedRoles, fn, }: {
    allowedRoles: UserRoles[];
    fn: T;
}): T;
export {};
//# sourceMappingURL=acCheck.d.ts.map