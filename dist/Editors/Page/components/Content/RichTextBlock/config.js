import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { RichTextRenderer } from "../../../../Text/Renderer";
import { RichTextEditor } from "../../../../Text/Editor";
export const richTextBlockConfig = {
    label: "Metin",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "RichTextBlock" }),
        },
        content: {
            type: "custom",
            render: ({ value, onChange, id, }) => {
                const key = id ?? "richtext";
                return (_jsx(RichTextEditor, { initialData: value ?? "", onChange: onChange }, key));
            },
        },
    },
    render: ({ content }) => _jsx(RichTextRenderer, { content: content ?? "" }),
};
//# sourceMappingURL=config.js.map