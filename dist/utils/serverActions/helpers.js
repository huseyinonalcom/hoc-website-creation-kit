/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { cookies } from "next/headers";
import { ZodError } from "zod";
import { verifyAccessToken } from "../../server/domain/auth/utils/jwt";
import { isCustomError } from "../errors/customerrors";
// --- Shared Helpers ---
/**
 * centralized auth check that returns the user or throws a "soft" error object
 * that the wrappers can return immediately.
 */
export async function checkAuth(allowedRoles) {
    if (!allowedRoles)
        return { success: true, user: undefined };
    const cookieStore = await cookies();
    const token = cookieStore.get("access-token")?.value;
    if (!token) {
        return { success: false, error: "Oturum açmanız gerekiyor" };
    }
    try {
        const payload = await verifyAccessToken(token);
        const user = { id: payload.userId, role: payload.role };
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            return { success: false, error: "Bu işlem için yetkiniz yok" };
        }
        return { success: true, user };
    }
    catch {
        return { success: false, error: "Geçersiz oturum" };
    }
}
/**
 * Centralized error handler to map Zod/Generic errors to ActionState
 */
export function handleActionError(error, rawData) {
    if (error instanceof ZodError) {
        const errorString = error.issues.map((e) => e.message).join(", ");
        return {
            ...rawData,
            result: "error",
            error: errorString,
        };
    }
    if (isCustomError(error)) {
        return {
            ...rawData,
            result: "error",
            error: error.message,
        };
    }
    return {
        ...rawData,
        result: "error",
        error: "Bilinmeyen bir hata oluştu",
    };
}
//# sourceMappingURL=helpers.js.map