import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import { EditorImage } from "../../../UtilityComponentsd/EditorImage";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { RichTextEditor } from "../../../../Text/Editor.client";
import { ImageWithText } from "./Component";
const { imageModeToggleField, imagePositionToggleField, numberInput, stackOrderToggleField, } = defaultFieldHelpers;
export const imageWithTextConfig = {
    label: "Görsel + Metin",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "ImageWithText" }),
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
            label: "Metin",
            type: "custom",
            render: ({ value, onChange, id }) => (_jsx(RichTextEditor, { initialData: value ?? "", onChange: onChange }, id ?? "image-with-text")),
        },
    },
    render: ImageWithText,
};
//# sourceMappingURL=config.js.map