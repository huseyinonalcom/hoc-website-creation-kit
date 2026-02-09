"use client";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { createUsePuck, Puck } from "@puckeditor/core";
const usePuck = createUsePuck();
export function PuckEditor({ config, data, height, path, viewports, theme = "light", className, onPublish, renderHeaderActions }) {
    const themeClassName = theme === "dark" ? "puck-theme-dark" : undefined;
    const wrapperClassName = ["puck-editor", themeClassName, className].filter(Boolean).join(" ");
    const wrapperRef = useRef(null);
    useEffect(() => {
        const frame = wrapperRef.current?.querySelector("iframe");
        if (!frame) {
            return;
        }
        let rafId = null;
        let attempts = 0;
        const applyTheme = () => {
            const doc = frame.contentDocument;
            if (!doc) {
                return false;
            }
            const isDark = theme === "dark";
            doc.documentElement.classList.toggle("puck-theme-dark", isDark);
            doc.body?.classList.toggle("puck-theme-dark", isDark);
            return true;
        };
        const applyThemeWithRetry = () => {
            if (applyTheme()) {
                return;
            }
            if (attempts < 10) {
                attempts += 1;
                rafId = window.requestAnimationFrame(applyThemeWithRetry);
            }
        };
        applyThemeWithRetry();
        frame.addEventListener("load", applyThemeWithRetry);
        return () => {
            frame.removeEventListener("load", applyThemeWithRetry);
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [theme]);
    return (_jsx("div", { className: wrapperClassName, ref: wrapperRef, children: _jsx(Puck, { config: config, data: data, height: height, overrides: renderHeaderActions
                ? {
                    headerActions: () => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const appState = usePuck((state) => state.appState);
                        return _jsx(_Fragment, { children: renderHeaderActions({ appState, path }) });
                    },
                }
                : undefined, viewports: viewports, onPublish: onPublish }) }));
}
//# sourceMappingURL=PuckEditor.js.map