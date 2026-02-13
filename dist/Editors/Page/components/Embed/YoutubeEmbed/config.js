import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import YoutubeEmbed from "./Component";
const { numberInput } = defaultFieldHelpers;
export const youtubeEmbedConfig = {
    label: "YouTube Video",
    defaultProps: {
        startSeconds: 0,
        autoPlay: false,
        muted: false,
    },
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "YoutubeEmbed" }),
        },
        url: {
            label: "YouTube URL'si veya Video ID",
            type: "text",
            placeholder: "https://www.youtube.com/watch?v=...",
        },
        title: {
            label: "Başlık",
            type: "text",
        },
        startSeconds: numberInput("Başlangıç Zamanı (sn)", {
            min: 0,
            placeholder: "Örn: 30",
            step: 1,
        }),
        autoPlay: {
            label: "Otomatik oynatma",
            type: "radio",
            options: [
                { label: "Kapalı", value: false },
                { label: "Açık", value: true },
            ],
        },
        muted: {
            label: "Sessiz başlat",
            type: "radio",
            options: [
                { label: "Kapalı", value: false },
                { label: "Açık", value: true },
            ],
        },
    },
    render: YoutubeEmbed,
};
//# sourceMappingURL=config.js.map