import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
const { numberInput } = defaultFieldHelpers;
export const fourColumnLayoutConfig = {
    label: "4 Sütun",
    fields: {
        clipboard: {
            type: "custom",
            render: () => _jsx(Clipboard, { componentName: "FourColumnLayout" }),
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
        fourth: {
            label: "Dördüncü Sütun",
            type: "slot",
        },
        gap: numberInput("Sütun Aralığı (px)", {
            min: 0,
            placeholder: "Örn: 24",
        }),
    },
    render: ({ first: First, second: Second, third: Third, fourth: Fourth, gap, }) => {
        if (!First && !Second && !Third && !Fourth) {
            return _jsx(_Fragment, {});
        }
        const gapValue = typeof gap === "number" && gap >= 0 ? gap : 24;
        return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4", style: { gap: `${gapValue}px` }, children: [_jsx("div", { children: First ? _jsx(First, {}) : null }), _jsx("div", { children: Second ? _jsx(Second, {}) : null }), _jsx("div", { children: Third ? _jsx(Third, {}) : null }), _jsx("div", { children: Fourth ? _jsx(Fourth, {}) : null })] }));
    },
};
//# sourceMappingURL=config.js.map