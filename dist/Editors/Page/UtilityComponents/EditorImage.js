"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Image from "next/image";
import { FilesPickerModal } from "../../../FileManagement/Components/FilesPickerModal";
import { useFilesData } from "../../../FileManagement/Providers/FilesDataProvider";
import { Button } from "../Components/Actions/ButtonLink/Button";
export function EditorImage({ value, onChange, onUploadFile, onCreateDirectory, }) {
    const { files, directories, addFile, addDirectory } = useFilesData();
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const handleSelect = (file) => {
        onChange(file.url);
        setIsPickerOpen(false);
    };
    const handleClear = () => {
        onChange("");
    };
    return (_jsxs("div", { className: "space-y-4 rounded-2xl border border-gray-200 p-4 shadow-sm", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsx("div", { children: _jsx("p", { className: "text-sm font-semibold text-gray-900", children: "Secilen Gorsel" }) }), _jsxs("div", { className: "flex gap-2", children: [value && (_jsx(Button, { type: "button", variant: "ghost", onClick: handleClear, children: "Kaldir" })), _jsx(Button, { type: "button", variant: "outline", onClick: () => setIsPickerOpen(true), children: "Dosya Sec" })] })] }), value && (_jsx("div", { className: "relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50", children: _jsx(Image, { fill: true, alt: deriveFileName(value), className: "object-cover", sizes: "(max-width: 768px) 100vw, 50vw", src: value }) })), _jsx(FilesPickerModal, { directories: directories, files: files, open: isPickerOpen, onClose: () => setIsPickerOpen(false), onCreateDirectory: onCreateDirectory, onDirectoryCreate: addDirectory, onFileCreate: addFile, onSelect: handleSelect, onUploadFile: onUploadFile })] }));
}
const deriveFileName = (url) => {
    try {
        const decoded = decodeURIComponent(url);
        const parts = decoded.split("/");
        return parts[parts.length - 1] || decoded;
    }
    catch {
        return url;
    }
};
//# sourceMappingURL=EditorImage.js.map