"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { deleteDirectoryAction, softDeleteFileAction, updateDirectoryAction, updateFileAction, } from "../actions";
import { Button } from "../../Editors/Page/Components/Actions/ButtonLink/Button";
import { useFilesData } from "../Providers/FilesDataProvider";
import { FilesBrowserClient } from "./FilesBrowserClient";
import { FilesMoveModal } from "./FilesMoveModal";
import cn from "../../utils/classnames";
const inputClassName = "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400";
export function FilesManagerClient() {
    const { files, directories, addFile, addDirectory, updateDirectory, updateFile, removeFile, removeDirectory, } = useFilesData();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileIds, setSelectedFileIds] = useState([]);
    const [activedirectory_id, setActivedirectory_id] = useState(null);
    const [directoryLabel, setDirectoryLabel] = useState("");
    const [label, setLabel] = useState("");
    const [status, setStatus] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [isMoveOpen, setIsMoveOpen] = useState(false);
    const [isDirectoryMoveOpen, setIsDirectoryMoveOpen] = useState(false);
    const displayName = useMemo(() => (selectedFile ? getDisplayName(selectedFile) : ""), [selectedFile]);
    const handleSelectFile = (file) => {
        setSelectedFile(file);
        setLabel(file.tag ?? "");
    };
    const handleSelectionChange = (ids) => {
        setSelectedFileIds(ids);
        if (ids.length === 1) {
            const found = files.find((item) => item.id === ids[0]) ?? null;
            setSelectedFile(found);
            setLabel(found?.tag ?? "");
            return;
        }
        setSelectedFile(null);
        setLabel("");
    };
    const handleDirectoryChange = (directory_id) => {
        setActivedirectory_id(directory_id);
        if (!directory_id) {
            setDirectoryLabel("");
            return;
        }
        const current = directories.find((dir) => dir.id === directory_id);
        setDirectoryLabel(current?.name ?? "");
    };
    const handleSave = () => {
        if (!selectedFile) {
            return;
        }
        setStatus(null);
        startTransition(async () => {
            const response = await updateFileAction({
                id: selectedFile.id,
                label,
                directory_id: selectedFile.directory_id ?? null,
            });
            if (response.result === "error") {
                setStatus({
                    type: "error",
                    message: response.error || "Dosya güncellenemedi.",
                });
                return;
            }
            updateFile(response.file);
            handleSelectFile(response.file);
            setStatus({ type: "success", message: "Dosya güncellendi." });
        });
    };
    const handleDelete = () => {
        if (!selectedFile) {
            return;
        }
        setStatus(null);
        if (!window.confirm("Bu dosyayı silmek istediğinize emin misiniz?")) {
            return;
        }
        startTransition(async () => {
            const response = await softDeleteFileAction({ id: selectedFile.id });
            if (response.result === "error") {
                setStatus({
                    type: "error",
                    message: response.error || "Dosya silinemedi.",
                });
                return;
            }
            removeFile(selectedFile.id);
            setSelectedFile(null);
            setLabel("");
            setStatus({ type: "success", message: "Dosya silindi." });
        });
    };
    const handleCopyUrl = async () => {
        if (!selectedFile?.url) {
            return;
        }
        try {
            await navigator.clipboard.writeText(selectedFile.url);
            setStatus({ type: "success", message: "URL kopyalandi." });
        }
        catch {
            setStatus({ type: "error", message: "URL kopyalanamadi." });
        }
    };
    const handleMove = (directory_id) => {
        if (selectedFileIds.length === 0) {
            return;
        }
        performMove(directory_id, selectedFileIds, true);
    };
    const handleMoveFiles = (directory_id, fileIds) => {
        if (fileIds.length === 0) {
            return;
        }
        performMove(directory_id, fileIds, false);
    };
    const performMove = (directory_id, fileIds, closeModal) => {
        setStatus(null);
        startTransition(async () => {
            const results = await Promise.all(fileIds.map((id) => updateFileAction({ id, directory_id, label: undefined })));
            const hasError = results.find((result) => result.result === "error");
            if (hasError && hasError.result === "error") {
                setStatus({
                    type: "error",
                    message: hasError.error || "Dosyalar taşınamadı.",
                });
                return;
            }
            results.forEach((result) => {
                if (result.result === "success") {
                    updateFile(result.file);
                }
            });
            setSelectedFileIds([]);
            setSelectedFile(null);
            setLabel("");
            if (closeModal) {
                setIsMoveOpen(false);
            }
            setStatus({ type: "success", message: "Dosyalar taşındı." });
        });
    };
    const handleDeleteDirectory = () => {
        if (!activedirectory_id) {
            return;
        }
        setStatus(null);
        if (!window.confirm("Bu klasörü silmek istediğinize emin misiniz?")) {
            return;
        }
        startTransition(async () => {
            const response = await deleteDirectoryAction({ id: activedirectory_id });
            if (response.result === "error") {
                setStatus({
                    type: "error",
                    message: response.error || "Klasör silinemedi.",
                });
                return;
            }
            const parentId = getParentdirectory_id(directories, activedirectory_id);
            response.deletedIds.forEach((id) => removeDirectory(id));
            setActivedirectory_id(parentId);
            setDirectoryLabel("");
            setStatus({ type: "success", message: "Klasör silindi." });
        });
    };
    const handleDirectorySave = () => {
        if (!activedirectory_id) {
            return;
        }
        setStatus(null);
        startTransition(async () => {
            const response = await updateDirectoryAction({
                id: activedirectory_id,
                name: directoryLabel,
            });
            if (response.result === "error") {
                setStatus({
                    type: "error",
                    message: response.error || "Klasör güncellenemedi.",
                });
                return;
            }
            updateDirectory(response.directory);
            setDirectoryLabel(response.directory.name);
            setStatus({ type: "success", message: "Klasör güncellendi." });
        });
    };
    const handleDirectoryMove = (directory_id) => {
        if (!activedirectory_id) {
            return;
        }
        setStatus(null);
        startTransition(async () => {
            const response = await updateDirectoryAction({
                id: activedirectory_id,
                parentId: directory_id,
            });
            if (response.result === "error") {
                setStatus({
                    type: "error",
                    message: response.error || "Klasör taşınamadı.",
                });
                return;
            }
            updateDirectory(response.directory);
            setActivedirectory_id(response.directory.parent_id ?? null);
            setDirectoryLabel("");
            setIsDirectoryMoveOpen(false);
            setStatus({ type: "success", message: "Klasör taşındı." });
        });
    };
    const activeDirectoryLabel = selectedFile
        ? getDirectoryLabel(directories, selectedFile.directory_id)
        : getDirectoryLabel(directories, activedirectory_id);
    const multiSelection = selectedFileIds.length > 1;
    const activeDirectoryFileCount = activedirectory_id
        ? countFilesInDirectory(files, directories, activedirectory_id)
        : 0;
    const canDeleteDirectory = Boolean(activedirectory_id) && activeDirectoryFileCount === 0;
    const allowedMoveDirectories = activedirectory_id
        ? directories.filter((dir) => !getDescendantIds(directories, activedirectory_id).includes(dir.id))
        : directories;
    return (_jsxs("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]", children: [_jsx(FilesBrowserClient, { enableDragDrop: true, multiSelect: true, activedirectory_id: activedirectory_id, directories: directories, files: files, selectedFileIds: selectedFileIds, onDirectoryChange: handleDirectoryChange, onDirectoryCreate: addDirectory, onFileCreate: addFile, onMoveFiles: handleMoveFiles, onSelect: handleSelectFile, onSelectionChange: handleSelectionChange }), _jsxs("section", { className: "space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900", children: [activedirectory_id ? (_jsxs("div", { className: "space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-gray-800", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: "Klas\u00F6r Ayr\u0131nt\u0131lar\u0131" }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: [activeDirectoryFileCount, " dosya bulunuyor."] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", htmlFor: "directory-label", children: "Klas\u00F6r Ad\u0131" }), _jsx("input", { className: inputClassName, id: "directory-label", value: directoryLabel, onChange: (event) => setDirectoryLabel(event.target.value) })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(Button, { disabled: isPending, type: "button", variant: "primary", onClick: handleDirectorySave, children: "Kaydet" }), _jsx(Button, { disabled: isPending, type: "button", variant: "outline", onClick: () => setIsDirectoryMoveOpen(true), children: "Ta\u015F\u0131" }), _jsx(Button, { disabled: isPending || !canDeleteDirectory, type: "button", variant: "danger", onClick: handleDeleteDirectory, children: "Klas\u00F6r\u00FC Sil" })] })] })) : null, _jsxs("div", { children: [_jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: "Dosya Ayr\u0131nt\u0131lar\u0131" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Dosya ad\u0131 ve klas\u00F6r\u00FCn\u00FC g\u00FCncelleyebilir veya dosyay\u0131 silebilirsiniz." })] }), multiSelection ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("p", { className: "text-sm text-gray-700 dark:text-gray-200", children: [selectedFileIds.length, " dosya se\u00E7ildi."] }), _jsx("div", { className: "flex flex-wrap items-center gap-3", children: _jsx(Button, { disabled: isPending, type: "button", variant: "outline", onClick: () => setIsMoveOpen(true), children: "Ta\u015F\u0131" }) })] })) : selectedFile ? (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-white/10 dark:bg-gray-800", children: _jsx(Image, { fill: true, alt: displayName, className: "object-cover", sizes: "(max-width: 1024px) 100vw, 33vw", src: selectedFile.url }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", htmlFor: "file-label", children: "G\u00F6r\u00FCnen Ad" }), _jsx("input", { className: inputClassName, id: "file-label", value: label, onChange: (event) => setLabel(event.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", children: "URL" }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("div", { className: "flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300", children: selectedFile.url }), _jsx(Button, { type: "button", variant: "outline", onClick: handleCopyUrl, children: "Kopyala" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", children: "Klas\u00F6r" }), _jsx("div", { className: "rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300", children: activeDirectoryLabel })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx(Button, { disabled: isPending, type: "button", variant: "primary", onClick: handleSave, children: isPending ? "Güncelleniyor..." : "Güncelle" }), _jsx(Button, { disabled: isPending, type: "button", variant: "outline", onClick: () => setIsMoveOpen(true), children: "Ta\u015F\u0131" }), _jsx(Button, { disabled: isPending, type: "button", variant: "danger", onClick: handleDelete, children: "Sil" })] }), status ? (_jsx("p", { className: cn("text-sm", status.type === "success" ? "text-green-600" : "text-red-600"), children: status.message })) : null] })) : (_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "\u0130\u015Flem yapmak i\u00E7in bir dosya se\u00E7in." }))] }), _jsx(FilesMoveModal, { directories: directories, open: isMoveOpen, title: "Dosyalar\u0131 Ta\u015F\u0131", onClose: () => setIsMoveOpen(false), onConfirm: handleMove }, `move-${isMoveOpen ? "open" : "closed"}`), _jsx(FilesMoveModal, { directories: allowedMoveDirectories, open: isDirectoryMoveOpen, title: "Klas\u00F6r\u00FC Ta\u015F\u0131", onClose: () => setIsDirectoryMoveOpen(false), onConfirm: handleDirectoryMove }, `dir-move-${isDirectoryMoveOpen ? "open" : "closed"}`)] }));
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
const getDisplayName = (file) => file.tag?.trim() || deriveFileName(file.url);
const getDirectoryLabel = (directories, directory_id) => {
    if (!directory_id) {
        return "Kök";
    }
    const found = directories.find((dir) => dir.id === directory_id);
    return found?.name ?? "Kök";
};
const getParentdirectory_id = (directories, directory_id) => {
    const found = directories.find((dir) => dir.id === directory_id);
    return found?.parent_id ?? null;
};
const getDescendantIds = (directories, directory_id) => {
    const byParent = new Map();
    directories.forEach((dir) => {
        const parentId = dir.parent_id ?? null;
        const list = byParent.get(parentId) ?? [];
        list.push(dir);
        byParent.set(parentId, list);
    });
    const result = [];
    const stack = [directory_id];
    while (stack.length > 0) {
        const current = stack.pop();
        if (!current || result.includes(current)) {
            continue;
        }
        result.push(current);
        const children = byParent.get(current) ?? [];
        children.forEach((child) => stack.push(child.id));
    }
    return result;
};
const countFilesInDirectory = (files, directories, directory_id) => {
    const targetIds = getDescendantIds(directories, directory_id);
    return files.filter((file) => !file.is_deleted && targetIds.includes(file.directory_id ?? "")).length;
};
//# sourceMappingURL=FilesManagerClient.js.map