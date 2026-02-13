import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { RichTextEditor } from "../../../../Text/Editor.client";
import { ButtonLink, buttonIconOptions } from "./Component";
const { colorInput, numberInput } = defaultFieldHelpers;
export const buttonLinkConfig = {
    label: "Buton",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "ButtonLink" }),
        },
        text: {
            label: "Buton Metni",
            type: "custom",
            render: ({ value, onChange, id }) => (_jsx(RichTextEditor, { initialData: value ?? "", onChange: onChange }, id ?? "button-link-text")),
        },
        url: {
            label: "Bağlantı URL'si",
            type: "text",
            placeholder: "https://...",
        },
        icon: {
            label: "İkon",
            type: "custom",
            render: ({ value, onChange }) => (_jsx("select", { className: "w-full rounded-md border border-gray-300 px-3 py-2 text-sm", value: typeof value === "string" ? value : "link", onChange: (event) => onChange(event.target.value), children: buttonIconOptions.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) })),
        },
        color: colorInput("Arka Plan Rengi", "#4f46e5"),
        borderRadius: numberInput("Köşe Yarıçapı (px)", {
            min: 0,
            placeholder: "Örn: 12",
        }),
        openInNewTab: {
            label: "Yeni sekmede aç",
            type: "radio",
            options: [
                { label: "Evet", value: true },
                { label: "Hayır", value: false },
            ],
        },
    },
    render: ButtonLink,
};
//# sourceMappingURL=config.js.map