import "server-only";
import { decodeJwt, jwtVerify, SignJWT } from "jose";
import { getUserByIdForAuth } from "../../users/private/get_user_by_id";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
export async function createAccessToken(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1day")
        .sign(secret);
}
export async function verifyAccessToken(token) {
    const { payload } = await jwtVerify(token, secret);
    return payload;
}
export async function createPasswordResetToken(payload) {
    const user = (await getUserByIdForAuth(payload.userId, { includePasswordHash: true })).result;
    const dynamicSecret = new TextEncoder().encode(process.env.JWT_SECRET + user.password_hash);
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("15minutes")
        .sign(dynamicSecret);
}
export async function verifyPasswordResetToken(token) {
    const decoded = decodeJwt(token);
    const userId = decoded.userId;
    if (!userId) {
        throw new Error("Şifre sıfırlama işlemi başarısız oldu.");
    }
    const { result: user } = await getUserByIdForAuth(userId, {
        includePasswordHash: true,
    });
    if (!user) {
        throw new Error("Şifre sıfırlama işlemi başarısız oldu.");
    }
    const dynamicSecret = new TextEncoder().encode(process.env.JWT_SECRET + user.password_hash);
    const { payload } = await jwtVerify(token, dynamicSecret);
    return payload;
}
//# sourceMappingURL=jwt.js.map