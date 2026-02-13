import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponentsd/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { GalleryBlock, isGalleryImageMode } from "./Component";
const gallerySizeOptions = [
    { label: "1 sütun x 1 satır", value: "1x1" },
    { label: "2 sütun x 1 satır", value: "2x1" },
    { label: "1 sütun x 2 satır", value: "1x2" },
    { label: "2 sütun x 2 satır", value: "2x2" },
];
const galleryGridColumnsOptions = [
    { label: "4 sütun", value: 4 },
    { label: "3 sütun", value: 3 },
    { label: "2 sütun", value: 2 },
];
const galleryItemImageModeField = {
    label: "Görsel Modu (Bu Görsel)",
    type: "custom",
    render: ({ value, onChange, }) => {
        const currentValue = isGalleryImageMode(value) ? value : undefined;
        const buttonClasses = (isActive) => `rounded border px-4 py-2 text-left text-sm font-medium transition ${isActive
            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
            : "border-gray-300 text-gray-600 hover:border-indigo-400"}`;
        return (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-sm font-medium text-gray-700", children: "G\u00F6rsel Modu (Bu G\u00F6rsel)" }), _jsx("div", { className: "flex gap-3", children: ["cover", "contain"].map((mode) => (_jsx("button", { className: buttonClasses(currentValue === mode), type: "button", onClick: () => onChange(mode), children: mode === "cover" ? "Kapla" : "Sığdır" }, mode))) })] }));
    },
};
const { createButtonToggleField, imageModeToggleField } = defaultFieldHelpers;
export const galleryConfig = {
    label: "Galeri",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "Gallery" }),
        },
        items: {
            label: "Galeri Görselleri",
            type: "array",
            min: 1,
            defaultItemProps: {
                title: "",
                date: "",
                imageUrl: "",
                size: "1x1",
                href: "",
            },
            getItemSummary: (item, index) => {
                const title = item?.title?.trim();
                if (title) {
                    return title;
                }
                const path = typeof item?.imageUrl === "string" ? item.imageUrl : "";
                if (path) {
                    const segments = path.split("/");
                    const lastSegment = segments[segments.length - 1];
                    if (lastSegment) {
                        return lastSegment;
                    }
                }
                const position = typeof index === "number" ? index + 1 : 1;
                return `Görsel ${position}`;
            },
            arrayFields: {
                title: {
                    label: "Başlık",
                    type: "text",
                },
                date: {
                    label: "Tarih",
                    type: "text",
                    placeholder: "2020/02/03",
                },
                imageUrl: {
                    label: "Görsel",
                    type: "custom",
                    render: ({ value, onChange }) => (_jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: (next) => onChange(next) })),
                },
                href: {
                    label: "Bağlantı URL'si",
                    type: "text",
                    placeholder: "https://...",
                },
                size: {
                    label: "Grid Boyutu",
                    type: "radio",
                    options: gallerySizeOptions,
                },
                imageMode: galleryItemImageModeField,
            },
        },
        gridSize: createButtonToggleField("Grid Sütun Sayısı (lg)", galleryGridColumnsOptions, 3),
        imageMode: imageModeToggleField,
    },
    render: GalleryBlock,
};
//# sourceMappingURL=config.js.map