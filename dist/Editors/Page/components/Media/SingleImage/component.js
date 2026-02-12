import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
export const SingleImage = ({ src, alt, height, imageMode, href }) => {
    if (!src)
        return _jsx(_Fragment, {});
    const resolvedHeight = typeof height === "number" && height > 0 ? height : 480;
    const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
    const resolvedHref = typeof href === "string" ? href.trim() : "";
    const hasHref = resolvedHref.length > 0;
    const imageContent = (_jsx("div", { className: "relative w-full overflow-hidden", style: { minHeight: `${resolvedHeight}px` }, children: _jsx(Image, { fill: true, alt: alt ?? "İlgili Görsel", className: objectFitClass, sizes: "100vw", src: src }) }));
    if (hasHref) {
        return (_jsx(Link, { className: "block", href: resolvedHref, children: imageContent }));
    }
    return imageContent;
};
//# sourceMappingURL=Component.js.map