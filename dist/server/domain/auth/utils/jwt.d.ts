import "server-only";
import { JWTPayload } from "jose";
import { UserRoles } from "../../users/types";
export interface AccessTokenPayload extends JWTPayload {
    userId: string;
    role: UserRoles;
}
export declare function createAccessToken(payload: AccessTokenPayload): Promise<string>;
export declare function verifyAccessToken(token: string): Promise<AccessTokenPayload>;
export declare function createPasswordResetToken(payload: {
    userId: string;
}): Promise<string>;
export declare function verifyPasswordResetToken(token: string): Promise<{
    userId: string;
}>;
//# sourceMappingURL=jwt.d.ts.map