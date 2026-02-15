"use client";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { createUsePuck, Puck } from "@puckeditor/core";
import { useRef } from "react";
import { baseEditorConfig } from "./config/baseEditorConfig";
const usePuck = createUsePuck();
export function PageEditor({ config = baseEditorConfig, data, height, path, viewports, theme = "light", className, onPublish, renderHeaderActions, }) {
    const themeClassName = theme === "dark" ? "puck-theme-dark" : undefined;
    const wrapperClassName = ["puck-editor", themeClassName, className].filter(Boolean).join(" ");
    const editorDataRef = useRef(data);
    return (_jsx("div", { className: wrapperClassName, children: _jsx(Puck, { config: config, data: editorDataRef.current, height: height, onChange: (next) => {
                editorDataRef.current = next;
            }, overrides: renderHeaderActions
                ? {
                    headerActions: () => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const appState = usePuck((state) => state.appState);
                        return _jsx(_Fragment, { children: renderHeaderActions({ appState, path }) });
                    },
                }
                : undefined, viewports: viewports, onPublish: onPublish }, theme) }));
}
//# sourceMappingURL=PageEditor.js.map