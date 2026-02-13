export const isLinkDropdownItem = (item) => {
    return Array.isArray(item?.links);
};
export const leadershipMetaNames = ["baskanlar", "yonetim-kurulu"];
const sanitizeUserIdList = (candidate) => {
    if (!Array.isArray(candidate)) {
        return [];
    }
    const uniqueIds = new Set();
    candidate.forEach((item) => {
        if (typeof item === "string") {
            const trimmed = item.trim();
            if (trimmed.length > 0) {
                uniqueIds.add(trimmed);
            }
        }
    });
    return Array.from(uniqueIds);
};
export const ensureLeadershipListMeta = (rawValue) => {
    if (rawValue &&
        typeof rawValue === "object" &&
        Array.isArray(rawValue.userIds)) {
        const ids = sanitizeUserIdList(rawValue.userIds ?? []);
        return { userIds: ids };
    }
    if (Array.isArray(rawValue)) {
        return { userIds: sanitizeUserIdList(rawValue) };
    }
    return { userIds: [] };
};
//# sourceMappingURL=types.js.map