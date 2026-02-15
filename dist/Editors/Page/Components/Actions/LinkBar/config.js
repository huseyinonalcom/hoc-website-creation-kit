import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { LinkListField } from "./LinkListField";
import { LinkBar } from "./Component";
export const linkBarConfig = {
    label: "Bağlantı Listesi",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "LinkBar" }),
        },
        links: {
            label: "Bağlantılar",
            type: "custom",
            render: ({ value, onChange }) => {
                const items = Array.isArray(value)
                    ? value.map((link) => ({
                        label: link.label ?? "",
                        path: link.path ?? "",
                    }))
                    : [];
                return _jsx(LinkListField, { value: items, onChange: onChange });
            },
        },
    },
    render: ({ links }) => _jsx(LinkBar, { links: Array.isArray(links) ? links : [] }),
};
//# sourceMappingURL=config.js.map