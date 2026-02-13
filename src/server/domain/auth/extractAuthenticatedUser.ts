import "server-only";

import { verifyAccessToken } from "./utils/jwt";
import { AuthenticatedRequest } from "../../types/apitypes";

export async function extractAuthenticatedUser(
  token: string | undefined,
): Promise<AuthenticatedRequest> {
  if (!token) throw new Error("Unauthorized");

  const payload = await verifyAccessToken(token);

  return {
    user: {
      userId: payload.userId,
      role: payload.role,
    },
  } as AuthenticatedRequest;
}
