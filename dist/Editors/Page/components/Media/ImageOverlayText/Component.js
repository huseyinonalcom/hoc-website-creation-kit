import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { RichTextRenderer } from "../../../../Text/Renderer";
export const ImageOverlayText = ({ src, alt, overlay, height, imageMode, href }) => {
    if (!src) {
        return _jsx(_Fragment, {});
    }
    const resolvedHeight = typeof height === "number" && height > 0 ? height : 420;
    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
    const resolvedHref = typeof href === "string" ? href.trim() : "";
    const hasHref = resolvedHref.length > 0;
    const imageContent = (_jsxs("div", { className: "relative w-full overflow-hidden", style: { minHeight: `${resolvedHeight}px` }, children: [_jsx(Image, { fill: true, alt: alt ?? "İlgili Görsel", className: objectFitClass, sizes: "100vw", src: src }), overlay && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 p-6 text-center", children: _jsx("div", { className: "max-w-3xl text-white", children: _jsx(RichTextRenderer, { html: overlay }) }) }))] }));
    if (hasHref) {
        return (_jsx(Link, { className: "block", href: resolvedHref, children: imageContent }));
    }
    return imageContent;
};
//# sourceMappingURL=Component.js.map