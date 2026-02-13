import { jsx as _jsx } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
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