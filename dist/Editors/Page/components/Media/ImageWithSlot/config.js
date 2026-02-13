import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponents/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
const { imageModeToggleField, imagePositionToggleField, numberInput, stackOrderToggleField, } = defaultFieldHelpers;
export const imageWithSlotConfig = {
    label: "Görsel + Boş Alan",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "ImageWithSlot" }),
        },
        src: {
            label: "Görsel",
            type: "custom",
            render: ({ value, onChange }) => (_jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: onChange })),
        },
        imagePosition: imagePositionToggleField,
        stackOrder: stackOrderToggleField,
        height: numberInput("Görsel Yüksekliği (px)", {
            min: 150,
            placeholder: "Örn: 360",
        }),
        imageMode: imageModeToggleField,
        alt: { type: "text", label: "Alternatif Metin" },
        href: {
            label: "Bağlantı URL'si",
            type: "text",
            placeholder: "https://...",
        },
        content: {
            label: "Boş Alan İçeriği",
            type: "slot",
        },
    },
    render: ({ src, alt, content: Content, imagePosition, stackOrder, height, imageMode, href, }) => {
        if (!src && !Content) {
            return _jsx(_Fragment, {});
        }
        const layoutClass = imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row";
        const mobileOrderClass = stackOrder === "content-first" ? "flex-col-reverse" : "flex-col";
        const resolvedHeight = typeof height === "number" && height > 0 ? height : 360;
        const objectFitClass = imageMode === "contain" ? "object-contain" : "object-cover";
        const resolvedHref = typeof href === "string" ? href.trim() : "";
        const hasHref = resolvedHref.length > 0;
        const imageNode = src ? (_jsx("div", { className: "relative w-full overflow-hidden", style: { minHeight: `${resolvedHeight}px` }, children: _jsx(Image, { fill: true, alt: alt ?? "İlgili Görsel", className: objectFitClass, sizes: "(max-width: 1024px) 100vw, 50vw", src: src }) })) : null;
        return (_jsxs("div", { className: `flex ${mobileOrderClass} gap-6 lg:items-center ${layoutClass}`, children: [imageNode ? (hasHref ? (_jsx(Link, { className: "block w-full lg:w-1/2", href: resolvedHref, children: imageNode })) : (_jsx("div", { className: "w-full lg:w-1/2", children: imageNode }))) : null, Content && (_jsx("div", { className: "lg:w-1/2", children: _jsx(Content, {}) }))] }));
    },
};
//# sourceMappingURL=config.js.map