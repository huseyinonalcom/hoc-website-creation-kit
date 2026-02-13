import { jsx as _jsx } from "react/jsx-runtime";
import { RichTextRenderer } from "../../Text/Renderer";
import { baseEditorConfig } from "./baseEditorConfig";
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