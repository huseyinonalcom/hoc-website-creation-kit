import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { Clipboard } from "../../../utilityComponents/UniversalClipboard";
const { numberInput } = defaultFieldHelpers;
export const threeColumnLayoutConfig = {
    label: "3 Sütun",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "ThreeColumnLayout" }),
        },
        first: {
            label: "Birinci Sütun",
            type: "slot",
        },
        second: {
            label: "İkinci Sütun",
            type: "slot",
        },
        third: {
            label: "Üçüncü Sütun",
            type: "slot",
        },
        gap: numberInput("Sütun Aralığı (px)", {
            min: 0,
            placeholder: "Örn: 32",
        }),
    },
    render: ({ first: First, second: Second, third: Third, gap }) => {
        if (!First && !Second && !Third) {
            return _jsx(_Fragment, {});
        }
        const gapValue = typeof gap === "number" && gap >= 0 ? gap : 24;
        return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3", style: { gap: `${gapValue}px` }, children: [_jsx("div", { children: First ? _jsx(First, {}) : null }), _jsx("div", { children: Second ? _jsx(Second, {}) : null }), _jsx("div", { children: Third ? _jsx(Third, {}) : null })] }));
    },
};
//# sourceMappingURL=config.js.map