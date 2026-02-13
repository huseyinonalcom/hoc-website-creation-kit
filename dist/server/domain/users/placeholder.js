import "server-only";
export function generatePlaceholderUser() {
    return {
        id: "0",
        full_name: "",
        address: null,
        verified_at: null,
        verified_by_user_id: null,
        status: "active",
        email: "",
        updated_at: new Date(),
        created_at: new Date(),
        password_hash: "",
        role: "admin",
        last_login_at: null,
        phone: null,
    };
}
//# sourceMappingURL=placeholder.js.map