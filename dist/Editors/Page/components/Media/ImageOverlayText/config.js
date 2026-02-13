import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponents/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { RichTextEditor } from "../../../../Text/Editor.client";
import { ImageOverlayText } from "./Component";
const { imageModeToggleField, numberInput } = defaultFieldHelpers;
export const imageOverlayTextConfig = {
    label: "Üst Yazılı Görsel",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "ImageOverlayText" }),
        },
        src: {
            label: "Görsel",
            type: "custom",
            render: ({ value, onChange }) => (_jsx(EditorImage, { value: typeof value === "string" ? value : "", onChange: onChange })),
        },
        alt: { type: "text", label: "Alternatif Metin" },
        overlay: {
            label: "Metin",
            type: "custom",
            render: ({ value, onChange, id }) => (_jsx(RichTextEditor, { initialData: value ?? "", onChange: onChange }, id ?? "image-overlay")),
        },
        height: numberInput("Yükseklik (px)", {
            min: 200,
            placeholder: "Örn: 400",
            defaultValue: 200,
        }),
        imageMode: imageModeToggleField,
        href: {
            label: "Bağlantı URL'si",
            type: "text",
            placeholder: "https://...",
        },
    },
    render: ImageOverlayText,
};
//# sourceMappingURL=config.js.map