export const deriveFileName = (url) => {
    try {
        const decoded = decodeURIComponent(url);
        const parts = decoded.split("/");
        return parts[parts.length - 1] || decoded;
    }
    catch {
        return url;
    }
};
export const getDisplayName = (file) => file.tag?.trim() || deriveFileName(file.url);
//# sourceMappingURL=fileUtils.js.map