import { jsx as _jsx } from "react/jsx-runtime";
import { baseEditorConfig } from "./baseEditorConfig";
import { RichTextRenderer } from "../../Text/Renderer";
export const baseRendererConfig = {
    ...baseEditorConfig,
    components: {
        ...baseEditorConfig.components,
        RichTextBlock: {
            label: "Metin",
            render: ({ content }) => _jsx(RichTextRenderer, { content: content ?? "" }),
        },
    },
};
//# sourceMappingURL=baseRendererConfig.js.map