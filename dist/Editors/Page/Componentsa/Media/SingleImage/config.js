import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponentsd/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { SingleImage } from "./Component";
const { imageModeToggleField, numberInput } = defaultFieldHelpers;
export const singleImageConfig = {
    label: "Görsel Blok",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "SingleImage" }),
        },
        src: {
            label: "Görsel",
            type: "custom",
            render: ({ value, onChange }) => (_jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: (next) => onChange(next) })),
        },
        alt: { type: "text", label: "Alternatif Metin" },
        height: numberInput("Yükseklik (px)", {
            min: 100,
            placeholder: "Örn: 480",
        }),
        imageMode: imageModeToggleField,
        href: {
            label: "Bağlantı URL'si",
            type: "text",
            placeholder: "https://...",
        },
    },
    render: SingleImage,
};
//# sourceMappingURL=config.js.map