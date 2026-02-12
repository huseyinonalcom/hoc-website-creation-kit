import { jsx as _jsx } from "react/jsx-runtime";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { Clipboard } from "../../../utilityComponents/UniversalClipboard";
import GoogleMapsEmbed from "./Component";
const { numberInput } = defaultFieldHelpers;
export const googleMapsEmbedConfig = {
    label: "Google Haritası",
    defaultProps: {
        allowFullScreen: true,
    },
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "GoogleMapsEmbed" }),
        },
        url: {
            label: "Harita URL'si veya Adres",
            type: "text",
            placeholder: "https://www.google.com/maps/...",
        },
        title: {
            label: "Başlık",
            type: "text",
        },
        height: numberInput("Harita Yüksekliği (px)", {
            min: 200,
            placeholder: "Örn: 450",
        }),
        allowFullScreen: {
            label: "Tam ekran izni",
            type: "radio",
            options: [
                { label: "Evet", value: true },
                { label: "Hayır", value: false },
            ],
        },
    },
    render: GoogleMapsEmbed,
};
//# sourceMappingURL=config.js.map