"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ClipboardIcon, DocumentDuplicateIcon, CheckCircleIcon, XCircleIcon, } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { createUsePuck } from "@puckeditor/core";
import { Button } from "../Componentsa/Actions/ButtonLink/Button";
const usePuckStore = createUsePuck();
const isPlainObject = (value) => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
};
const stripId = (value) => {
    const { _id, ...rest } = value;
    return rest;
};
export function Clipboard({ componentName }) {
    const [status, setStatus] = useState("idle");
    const [clipboardSupported, setClipboardSupported] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const resetTimerRef = useRef(null);
    const selectedItem = usePuckStore((state) => {
        if (state.selectedItem?.type === componentName) {
            return state.selectedItem;
        }
        return null;
    });
    const dispatch = usePuckStore((state) => state.dispatch);
    const getSelectorForId = usePuckStore((state) => state.getSelectorForId);
    useEffect(() => {
        setClipboardSupported(typeof navigator !== "undefined" && Boolean(navigator.clipboard));
        return () => {
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
                resetTimerRef.current = null;
            }
        };
    }, []);
    const scheduleStatusReset = (next) => {
        setStatus(next);
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = setTimeout(() => {
            setStatus("idle");
            resetTimerRef.current = null;
        }, 2200);
    };
    const handleCopy = async () => {
        if (!clipboardSupported || typeof navigator === "undefined") {
            scheduleStatusReset("error");
            return;
        }
        if (!selectedItem || !isPlainObject(selectedItem.props)) {
            scheduleStatusReset("error");
            return;
        }
        setIsBusy(true);
        try {
            const safeProps = stripId(selectedItem.props);
            const payload = JSON.stringify({
                componentName,
                value: safeProps,
            });
            await navigator.clipboard.writeText(payload);
            scheduleStatusReset("success");
        }
        catch {
            scheduleStatusReset("error");
        }
        finally {
            setIsBusy(false);
        }
    };
    const handlePaste = async () => {
        if (!clipboardSupported || typeof navigator === "undefined") {
            scheduleStatusReset("error");
            return;
        }
        if (!selectedItem || !isPlainObject(selectedItem.props)) {
            scheduleStatusReset("error");
            return;
        }
        setIsBusy(true);
        try {
            const text = await navigator.clipboard.readText();
            const parsed = JSON.parse(text);
            if (parsed?.componentName !== componentName) {
                scheduleStatusReset("error");
                return;
            }
            const sanitized = isPlainObject(parsed?.value)
                ? stripId(parsed.value)
                : null;
            if (!sanitized) {
                scheduleStatusReset("error");
                return;
            }
            const selectedId = selectedItem.props.id;
            if (typeof selectedId !== "string" || selectedId.length === 0) {
                scheduleStatusReset("error");
                return;
            }
            const selector = getSelectorForId(selectedId);
            if (!selector) {
                scheduleStatusReset("error");
                return;
            }
            dispatch({
                type: "setData",
                data: (previous) => {
                    const updateItemProps = (item) => ({
                        ...item,
                        props: {
                            ...(isPlainObject(item.props) ? item.props : {}),
                            ...sanitized,
                        },
                    });
                    if (selector.zone && previous.zones?.[selector.zone]) {
                        const zoneItems = previous.zones[selector.zone];
                        const updatedZone = zoneItems.map((item, index) => index === selector.index
                            ? updateItemProps(item)
                            : item);
                        return {
                            zones: {
                                ...previous.zones,
                                [selector.zone]: updatedZone,
                            },
                        };
                    }
                    const updatedContent = previous.content.map((item, index) => index === selector.index
                        ? updateItemProps(item)
                        : item);
                    return {
                        content: updatedContent,
                    };
                },
            });
            scheduleStatusReset("success");
        }
        catch {
            scheduleStatusReset("error");
        }
        finally {
            setIsBusy(false);
        }
    };
    return (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsx("div", { children: _jsx("p", { className: "text-sm font-semibold text-gray-800 dark:text-gray-200", children: componentName }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { disabled: !clipboardSupported || isBusy, type: "button", variant: "outline", onClick: handleCopy, children: _jsx(DocumentDuplicateIcon, {}) }), _jsx(Button, { disabled: !clipboardSupported || isBusy, type: "button", variant: "outline", onClick: handlePaste, children: _jsx(ClipboardIcon, {}) }), status === "success" ? (_jsx(CheckCircleIcon, { className: "h-4 w-4 text-green-500", "aria-hidden": "true" })) : status === "error" ? (_jsx(XCircleIcon, { className: "h-4 w-4 text-red-500", "aria-hidden": "true" })) : null] })] }) }));
}
//# sourceMappingURL=UniversalClipboard.js.map