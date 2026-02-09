"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/Button";
const DEFAULT_STATUS_MESSAGES = {
    copied: "İçerik panoya kopyalandı.",
    pasted: "İçerik başarıyla yapıştırıldı.",
    mismatch: "Panodaki veri bu alanla eşleşmiyor.",
    invalid: "Panodaki veri geçersiz.",
    error: "Pano işlemi başarısız oldu.",
    unsupported: "Tarayıcı pano erişimini desteklemiyor.",
};
export function ClipboardFormSection({ componentKey, title, children, getValue, sanitize, onPaste, description, copyLabel = "Kopyala", pasteLabel = "Yapıştır", statusMessages, }) {
    const [status, setStatus] = useState("idle");
    const [clipboardSupported, setClipboardSupported] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const resetTimerRef = useRef(null);
    const mergedStatusMessages = useMemo(() => ({ ...DEFAULT_STATUS_MESSAGES, ...statusMessages }), [statusMessages]);
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
            scheduleStatusReset("unsupported");
            return;
        }
        setIsBusy(true);
        try {
            const payload = JSON.stringify({
                component: componentKey,
                value: getValue(),
            });
            await navigator.clipboard.writeText(payload);
            scheduleStatusReset("copied");
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
            scheduleStatusReset("unsupported");
            return;
        }
        setIsBusy(true);
        try {
            const text = await navigator.clipboard.readText();
            const parsed = JSON.parse(text);
            if (parsed?.component !== componentKey) {
                scheduleStatusReset("mismatch");
                return;
            }
            const sanitized = sanitize(parsed?.value);
            if (sanitized == null) {
                scheduleStatusReset("invalid");
                return;
            }
            onPaste(sanitized);
            scheduleStatusReset("pasted");
        }
        catch {
            scheduleStatusReset("error");
        }
        finally {
            setIsBusy(false);
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-800", children: title }), status !== "idle" ? (_jsx("p", { className: "text-xs text-gray-500", children: mergedStatusMessages[status] })) : description ? (_jsx("p", { className: "text-xs text-gray-500", children: description })) : null] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { disabled: !clipboardSupported || isBusy, type: "button", variant: "outline", onClick: handleCopy, children: copyLabel }), _jsx(Button, { disabled: !clipboardSupported || isBusy, type: "button", variant: "outline", onClick: handlePaste, children: pasteLabel })] })] }), children ?? null] }));
}
//# sourceMappingURL=ClipboardFormSection.js.map