import { jsx as _jsx } from "react/jsx-runtime";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { Clipboard } from "../../../utilityComponents/UniversalClipboard";
import { VerticalSpacer } from "./Component";
const { numberInput } = defaultFieldHelpers;
export const verticalSpacerConfig = {
    label: "Dikey Aralık",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "VerticalSpacer" }),
        },
        height: numberInput("Yükseklik (px)", {
            min: 8,
            placeholder: "Örn: 48",
        }),
    },
    render: VerticalSpacer,
};
//# sourceMappingURL=config.js.map