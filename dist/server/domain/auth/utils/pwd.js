import "server-only";
import argon2 from "argon2";
export async function hashPassword(password) {
    return argon2.hash(password);
}
export async function verifyPassword(password, hash) {
    return argon2.verify(hash, password);
}
//# sourceMappingURL=pwd.js.map