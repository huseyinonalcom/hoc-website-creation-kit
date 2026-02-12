import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TwoColumnLayout = ({ left: Left, right: Right, gap, columnRatio }) => {
    if (!Left && !Right) {
        return _jsx(_Fragment, {});
    }
    const gapValue = typeof gap === "number" && gap >= 0 ? gap : 32;
    const ratio = columnRatio ?? "1-1";
    const containerClass = ratio === "1-1" ? "grid grid-cols-1 lg:grid-cols-2" : "grid grid-cols-1 lg:grid-cols-3";
    const leftColClass = (() => {
        if (ratio === "1-2")
            return "lg:col-span-1";
        if (ratio === "2-1")
            return "lg:col-span-2";
        return "";
    })();
    const rightColClass = (() => {
        if (ratio === "1-2")
            return "lg:col-span-2";
        if (ratio === "2-1")
            return "lg:col-span-1";
        return "";
    })();
    return (_jsxs("div", { className: containerClass, style: { gap: `${gapValue}px` }, children: [_jsx("div", { className: leftColClass, children: Left ? _jsx(Left, {}) : null }), _jsx("div", { className: rightColClass, children: Right ? _jsx(Right, {}) : null })] }));
};
//# sourceMappingURL=Component.js.map