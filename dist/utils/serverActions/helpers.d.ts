import "server-only";
import { UserRoles } from "../../server/domain/users/types";
export type ActionContext<TInput = Record<string, any>> = {
    data: TInput;
    user?: {
        id: string;
        role: UserRoles;
    };
};
export type ActionState<T> = {
    result: "success" | "error" | "idle";
    error?: string;
    redirectUrl?: string;
    [key: string]: any;
} & Omit<T, "redirectUrl">;
/**
 * centralized auth check that returns the user or throws a "soft" error object
 * that the wrappers can return immediately.
 */
export declare function checkAuth(allowedRoles?: UserRoles[]): Promise<{
    success: boolean;
    user: undefined;
    error?: undefined;
} | {
    success: boolean;
    error: string;
    user?: undefined;
} | {
    success: boolean;
    user: {
        id: string;
        role: "admin";
    };
    error?: undefined;
}>;
/**
 * Centralized error handler to map Zod/Generic errors to ActionState
 */
export declare function handleActionError(error: unknown, rawData: any): ActionState<any>;
//# sourceMappingURL=helpers.d.ts.map