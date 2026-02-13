import "server-only";
import { decodeJwt, JWTPayload, jwtVerify, SignJWT } from "jose";

import { getUserByIdForAuth } from "../../users/private/get_user_by_id";
import { UserRoles } from "../../users/types";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export interface AccessTokenPayload extends JWTPayload {
  userId: string;
  role: UserRoles;
}

export async function createAccessToken(
  payload: AccessTokenPayload,
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(secret);
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as AccessTokenPayload;
}

export async function createPasswordResetToken(payload: {
  userId: string;
}): Promise<string> {
  const user = (
    await getUserByIdForAuth(payload.userId, { includePasswordHash: true })
  ).result;

  const dynamicSecret = new TextEncoder().encode(
    process.env.JWT_SECRET + user.password_hash,
  );

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15minutes")
    .sign(dynamicSecret);
}

export async function verifyPasswordResetToken(
  token: string,
): Promise<{ userId: string }> {
  const decoded = decodeJwt(token);
  const userId = decoded.userId as string;

  if (!userId) {
    throw new Error("Şifre sıfırlama işlemi başarısız oldu.");
  }

  const { result: user } = await getUserByIdForAuth(userId, {
    includePasswordHash: true,
  });

  if (!user) {
    throw new Error("Şifre sıfırlama işlemi başarısız oldu.");
  }

  const dynamicSecret = new TextEncoder().encode(
    process.env.JWT_SECRET + user.password_hash,
  );

  const { payload } = await jwtVerify(token, dynamicSecret);

  return payload as { userId: string };
}
