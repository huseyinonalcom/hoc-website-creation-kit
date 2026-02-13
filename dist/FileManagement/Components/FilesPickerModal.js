"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../../Editors/Page/Componentsa/Actions/ButtonLink/Button";
import { FilesBrowserClient } from "./FilesBrowserClient";
export function FilesPickerModal({ open, onClose, files, directories, onSelect, onFileCreate, onDirectoryCreate, onUploadFile, onCreateDirectory, title = "Dosya Sec", closeOnSelect = true, }) {
    const handleSelect = (file) => {
        onSelect(file);
        if (closeOnSelect) {
            onClose();
        }
    };
    return (_jsxs(Dialog, { className: "relative z-50", open: open, onClose: onClose, children: [_jsx("div", { "aria-hidden": "true", className: "fixed inset-0 bg-black/40" }), _jsx("div", { className: "fixed inset-0 overflow-y-auto", children: _jsx("div", { className: "flex min-h-full items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx(DialogTitle, { className: "text-lg font-semibold text-gray-900", children: title }), _jsxs(Button, { type: "button", variant: "ghost", onClick: onClose, children: [_jsx("span", { className: "sr-only", children: "Kapat" }), _jsx(XMarkIcon, { className: "h-5 w-5" })] })] }), _jsx(FilesBrowserClient, { directories: directories, files: files, onCreateDirectory: onCreateDirectory, onDirectoryCreate: onDirectoryCreate, onFileCreate: onFileCreate, onSelect: handleSelect, onUploadFile: onUploadFile })] }) }) })] }));
}
//# sourceMappingURL=FilesPickerModal.js.map