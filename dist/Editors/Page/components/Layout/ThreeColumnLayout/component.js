import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ThreeColumnLayout = ({ first: First, second: Second, third: Third, gap }) => {
    if (!First && !Second && !Third) {
        return _jsx(_Fragment, {});
    }
    const gapValue = typeof gap === "number" && gap >= 0 ? gap : 24;
    return (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3", style: { gap: `${gapValue}px` }, children: [_jsx("div", { children: First ? _jsx(First, {}) : null }), _jsx("div", { children: Second ? _jsx(Second, {}) : null }), _jsx("div", { children: Third ? _jsx(Third, {}) : null })] }));
};
//# sourceMappingURL=Component.js.map