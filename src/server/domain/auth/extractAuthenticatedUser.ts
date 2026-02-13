import "server-only";

import { AuthenticatedRequest } from "../../types/apitypes";
import { verifyAccessToken } from "./utils/jwt";

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
