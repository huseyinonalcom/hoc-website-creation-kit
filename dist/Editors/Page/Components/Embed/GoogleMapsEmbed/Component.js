import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
const GOOGLE_HOST_REGEX = /(^|\.)google\.[a-z.]+$/i;
const buildEmbedSrc = (rawValue) => {
    if (!rawValue) {
        return undefined;
    }
    const value = rawValue.trim();
    if (!value) {
        return undefined;
    }
    const ensureUrl = (input) => input.startsWith("http://") || input.startsWith("https://")
        ? input
        : `https://www.google.com/maps?q=${encodeURIComponent(input)}&output=embed`;
    try {
        const parsedUrl = new URL(ensureUrl(value));
        if (!GOOGLE_HOST_REGEX.test(parsedUrl.hostname)) {
            return undefined;
        }
        if (!parsedUrl.pathname.startsWith("/maps/embed") &&
            !parsedUrl.pathname.startsWith("/maps/d/embed") &&
            parsedUrl.searchParams.get("output") !== "embed") {
            parsedUrl.searchParams.set("output", "embed");
        }
        parsedUrl.protocol = "https:";
        return parsedUrl.toString();
    }
    catch {
        return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
    }
};
export const GoogleMapsEmbed = ({ url, title, height, allowFullScreen, }) => {
    const embedSrc = buildEmbedSrc(url);
    if (!embedSrc) {
        return _jsx(_Fragment, {});
    }
    try {
        if (typeof height === "string") {
            height = parseInt(height, 10);
        }
    }
    catch {
        height = 9;
    }
    if (!height) {
        height = 9;
    }
    return (_jsx("div", { className: "relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-gray-800/40", style: { aspectRatio: `16 / ${height}` }, children: _jsx("iframe", { allowFullScreen: allowFullScreen, className: "h-full w-full", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", src: embedSrc, style: { border: 0 }, title: title?.trim() || "Google Maps konumu" }) }));
};
export default GoogleMapsEmbed;
//# sourceMappingURL=Component.js.map