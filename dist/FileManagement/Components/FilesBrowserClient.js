"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowUturnLeftIcon, FolderIcon, XMarkIcon, } from "@heroicons/react/24/outline";
import { useMemo, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";
import { Button } from "../../Editors/Page/Components/Actions/ButtonLink/Button";
import { uploadFileInitialState } from "../state";
import cn from "../../utils/classnames";
import * as FMApi from "../api";
const inputClassName = "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400";
export function FilesBrowserClient({ files, directories, onSelect, onSelectionChange, onMoveFiles, onFileCreate, onDirectoryCreate, onDirectoryChange, onUploadFile, onCreateDirectory, className, emptyStateMessage = "Henuz yuklenmis dosya yok.", initialDirectoryId = null, activeDirectoryId: controlledDirectoryId, showFiles = true, showDirectories = true, showUpload = true, showDirectoryCreate = true, multiSelect = false, enableDragDrop = false, selectedFileIds, }) {
    // Provide default implementations that call the package API so the component
    // works out-of-the-box when props are not supplied.
    const uploadFileDefault = async (input) => {
        try {
            const data = await FMApi.uploadFile(input);
            if (data && data.result === "success" && data.file) {
                return {
                    result: "success",
                    error: "",
                    uploadedFile: FMApi.mapDbFileToSerializable(data.file),
                };
            }
            return {
                result: "error",
                error: data?.error || "Upload failed",
                uploadedFile: null,
            };
        }
        catch (err) {
            return {
                result: "error",
                error: err?.message || String(err),
                uploadedFile: null,
            };
        }
    };
    const createDirectoryDefault = async (input) => {
        try {
            const data = await FMApi.createDirectory(input);
            // API may wrap the result in different shapes; attempt to extract the directory row
            const dirRow = data?.directory ??
                data?.result?.directory ??
                data?.result?.result?.directory ??
                null;
            if (dirRow) {
                return {
                    result: "success",
                    directory: FMApi.mapDbDirToSerializable(dirRow),
                };
            }
            return {
                result: "error",
                error: data?.error || "Could not create directory",
            };
        }
        catch (err) {
            return { result: "error", error: err?.message || String(err) };
        }
    };
    const resolvedOnUploadFile = onUploadFile ?? uploadFileDefault;
    const resolvedOnCreateDirectory = onCreateDirectory ?? createDirectoryDefault;
    const [internalDirectoryId, setInternalDirectoryId] = useState(initialDirectoryId ?? null);
    const [internalSelectedIds, setInternalSelectedIds] = useState([]);
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [directoryName, setDirectoryName] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [dragOverTarget, setDragOverTarget] = useState(null);
    const activeDirectoryId = controlledDirectoryId !== undefined
        ? controlledDirectoryId
        : internalDirectoryId;
    const resolvedSelectedIds = selectedFileIds ?? internalSelectedIds;
    const canCreateDirectory = showDirectoryCreate && Boolean(resolvedOnCreateDirectory);
    const canUpload = showUpload && Boolean(resolvedOnUploadFile);
    const updateSelectedIds = (next) => {
        if (onSelectionChange) {
            onSelectionChange(next);
        }
        else {
            setInternalSelectedIds(next);
        }
    };
    const updateDirectoryId = (next) => {
        if (onDirectoryChange) {
            onDirectoryChange(next);
        }
        if (controlledDirectoryId === undefined) {
            setInternalDirectoryId(next);
        }
    };
    const [clientError, setClientError] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isCreatingDirectory, setIsCreatingDirectory] = useState(false);
    const fileInputRef = useRef(null);
    const [uploadState, setUploadState] = useState(() => ({
        ...uploadFileInitialState,
    }));
    const directoryMap = useMemo(() => {
        const map = new Map();
        directories.forEach((dir) => map.set(dir.id, dir));
        return map;
    }, [directories]);
    const visibleDirectories = useMemo(() => {
        if (!showDirectories)
            return [];
        return directories
            .filter((dir) => (dir.parentId ?? null) === activeDirectoryId)
            .sort((a, b) => a.name.localeCompare(b.name, "tr"));
    }, [activeDirectoryId, directories, showDirectories]);
    const visibleFiles = useMemo(() => {
        if (!showFiles)
            return [];
        return files
            .filter((file) => isVisibleFile(file))
            .filter((file) => (file.directoryId ?? null) === activeDirectoryId)
            .sort((a, b) => getDisplayName(a).localeCompare(getDisplayName(b), "tr"));
    }, [activeDirectoryId, files, showFiles]);
    const parentDirectoryId = activeDirectoryId && directoryMap.get(activeDirectoryId)
        ? (directoryMap.get(activeDirectoryId).parentId ?? null)
        : null;
    const handleSelect = (file, index, event) => {
        if (!multiSelect) {
            updateSelectedIds([file.id]);
            setLastSelectedIndex(index);
            onSelect?.(file);
            return;
        }
        const isMeta = event.metaKey || event.ctrlKey;
        const isShift = event.shiftKey;
        if (isShift && lastSelectedIndex !== null) {
            const start = Math.min(lastSelectedIndex, index);
            const end = Math.max(lastSelectedIndex, index);
            const rangeIds = visibleFiles
                .slice(start, end + 1)
                .map((item) => item.id);
            const next = isMeta
                ? Array.from(new Set([...resolvedSelectedIds, ...rangeIds]))
                : rangeIds;
            updateSelectedIds(next);
            setLastSelectedIndex(index);
            if (next.length === 1) {
                onSelect?.(file);
            }
            return;
        }
        if (isMeta) {
            const exists = resolvedSelectedIds.includes(file.id);
            const next = exists
                ? resolvedSelectedIds.filter((id) => id !== file.id)
                : [...resolvedSelectedIds, file.id];
            updateSelectedIds(next);
            setLastSelectedIndex(index);
            if (next.length === 1) {
                onSelect?.(file);
            }
            return;
        }
        updateSelectedIds([file.id]);
        setLastSelectedIndex(index);
        onSelect?.(file);
    };
    const handleEnterDirectory = (directoryId) => {
        updateDirectoryId(directoryId);
        updateSelectedIds([]);
        setLastSelectedIndex(null);
    };
    const resolveDragIds = (fileId) => {
        if (multiSelect && resolvedSelectedIds.includes(fileId)) {
            return resolvedSelectedIds.length > 0 ? resolvedSelectedIds : [fileId];
        }
        return [fileId];
    };
    const handleDragStart = (fileId) => (event) => {
        if (!enableDragDrop)
            return;
        const dragIds = resolveDragIds(fileId);
        event.dataTransfer.setData("application/json", JSON.stringify(dragIds));
        event.dataTransfer.effectAllowed = "move";
    };
    const handleDragOverTarget = (targetId) => (event) => {
        if (!enableDragDrop)
            return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        setDragOverTarget(targetId ?? "__root__");
    };
    const handleDragLeaveTarget = () => {
        if (!enableDragDrop)
            return;
        setDragOverTarget(null);
    };
    const handleDropTarget = (directoryId) => (event) => {
        if (!enableDragDrop || !onMoveFiles)
            return;
        event.preventDefault();
        setDragOverTarget(null);
        try {
            const raw = event.dataTransfer.getData("application/json");
            const parsed = JSON.parse(raw);
            const ids = Array.isArray(parsed)
                ? parsed.filter((id) => typeof id === "string")
                : [];
            if (ids.length > 0) {
                onMoveFiles(directoryId, ids);
            }
        }
        catch {
            // Ignore invalid drag payloads.
        }
    };
    const handleCreateDirectory = async () => {
        if (!directoryName.trim()) {
            setClientError("Lutfen klasor adi girin.");
            return;
        }
        if (!resolvedOnCreateDirectory) {
            setClientError("Klasor olusturma yapilandirilmamis.");
            return;
        }
        setClientError("");
        setIsCreatingDirectory(true);
        try {
            const response = await resolvedOnCreateDirectory({
                name: directoryName,
                parentId: activeDirectoryId,
            });
            if (response.result === "error") {
                setClientError(response.error || "Klasor olusturulamadi.");
                return;
            }
            if (response.result === "success" && response.directory) {
                onDirectoryCreate?.(response.directory);
            }
            setDirectoryName("");
            setIsCreateModalOpen(false);
        }
        finally {
            setIsCreatingDirectory(false);
        }
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            setClientError("Lutfen yuklemek icin bir dosya secin.");
            return;
        }
        if (!resolvedOnUploadFile) {
            setClientError("Dosya yukleme yapilandirilmamis.");
            return;
        }
        setClientError("");
        setIsUploading(true);
        try {
            setUploadState(() => ({ ...uploadFileInitialState }));
            const result = await resolvedOnUploadFile({
                file: selectedFile,
                directoryId: activeDirectoryId,
            });
            setUploadState(result);
            if (result.result === "success" && result.uploadedFile) {
                updateSelectedIds([result.uploadedFile.id]);
                onSelect?.(result.uploadedFile);
                onFileCreate?.(result.uploadedFile);
                setIsUploadModalOpen(false);
            }
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
        catch {
            const fallbackError = "Dosya yuklenirken beklenmedik bir hata olustu. Lutfen tekrar deneyin.";
            setClientError(fallbackError);
            setUploadState({
                ...uploadFileInitialState,
                result: "error",
                error: fallbackError,
                uploadedFile: null,
            });
        }
        finally {
            setIsUploading(false);
        }
    };
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("section", { className: "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900", children: [_jsxs("header", { className: "mb-4 flex items-center justify-between", children: [_jsx("div", { children: _jsx("p", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: showFiles ? "Dosyalar" : "Klasorler" }) }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [canCreateDirectory ? (_jsx(Button, { type: "button", variant: "outline", onClick: () => setIsCreateModalOpen(true), children: "Klasor Olustur" })) : null, canUpload ? (_jsx(Button, { type: "button", onClick: () => setIsUploadModalOpen(true), children: "Dosya Yukle" })) : null] })] }), visibleDirectories.length === 0 && visibleFiles.length === 0 ? (_jsx("p", { className: "rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-white/10 dark:text-gray-400", children: emptyStateMessage })) : (_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [activeDirectoryId ? (_jsxs("button", { className: cn("flex items-center gap-3 rounded-xl border border-dashed border-gray-300 px-4 py-3 text-left text-sm text-gray-600 transition hover:border-indigo-400 dark:border-white/10 dark:text-gray-300 dark:hover:border-indigo-400", dragOverTarget === "__up__"
                                    ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-500/10"
                                    : null), type: "button", onClick: () => handleEnterDirectory(parentDirectoryId), onDragOver: handleDragOverTarget("__up__"), onDragLeave: handleDragLeaveTarget, onDrop: handleDropTarget(parentDirectoryId), children: [_jsx(ArrowUturnLeftIcon, { className: "h-5 w-5" }), "Ust Klasore Cik"] })) : null, showDirectories
                                ? visibleDirectories.map((directory) => (_jsxs("button", { className: cn("flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left text-sm text-gray-700 transition hover:border-indigo-400 dark:border-white/10 dark:text-gray-200 dark:hover:border-indigo-400", dragOverTarget === directory.id
                                        ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-500/10"
                                        : null), type: "button", onClick: () => handleEnterDirectory(directory.id), onDragOver: handleDragOverTarget(directory.id), onDragLeave: handleDragLeaveTarget, onDrop: handleDropTarget(directory.id), children: [_jsx(FolderIcon, { className: "h-5 w-5 text-indigo-500" }), directory.name] }, directory.id)))
                                : null, showFiles
                                ? visibleFiles.map((file, i) => (_jsx("button", { className: cn("flex flex-col overflow-hidden rounded-xl border text-left transition focus-visible:outline-2 focus-visible:outline-indigo-500", resolvedSelectedIds.includes(file.id)
                                        ? "border-indigo-600 ring-2 ring-indigo-600 dark:border-indigo-400 dark:ring-indigo-400"
                                        : "border-gray-200 hover:border-indigo-400 dark:border-white/10 dark:hover:border-indigo-400"), type: "button", draggable: enableDragDrop, onClick: (event) => handleSelect(file, i, event), onDragStart: handleDragStart(file.id), children: _jsx("div", { className: "relative h-40 w-full bg-gray-50 dark:bg-gray-800", children: _jsx(Image, { fill: true, unoptimized: true, alt: getDisplayName(file), className: "object-cover", sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw", src: file.url }) }) }, file.id + "-filebrowser-thumb-" + i)))
                                : null] }))] }), _jsxs(Dialog, { className: "relative z-50", open: isCreateModalOpen, onClose: () => setIsCreateModalOpen(false), children: [_jsx("div", { "aria-hidden": "true", className: "fixed inset-0 bg-black/40" }), _jsx("div", { className: "fixed inset-0 overflow-y-auto", children: _jsx("div", { className: "flex min-h-full items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-gray-900", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx(DialogTitle, { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Klasor Olustur" }), _jsxs(Button, { type: "button", variant: "ghost", onClick: () => setIsCreateModalOpen(false), children: [_jsx("span", { className: "sr-only", children: "Kapat" }), _jsx(XMarkIcon, { className: "h-5 w-5" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", htmlFor: "directory-name", children: "Klasor Adi" }), _jsx("input", { className: inputClassName, id: "directory-name", placeholder: "Orn: duyurular", value: directoryName, onChange: (event) => setDirectoryName(event.target.value) }), clientError ? (_jsx("p", { className: "text-sm text-red-600", children: clientError })) : null, _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setIsCreateModalOpen(false), children: "Vazgec" }), _jsx(Button, { disabled: isCreatingDirectory, type: "button", onClick: handleCreateDirectory, children: isCreatingDirectory ? "Olusturuluyor..." : "Kaydet" })] })] })] }) }) })] }), _jsxs(Dialog, { className: "relative z-50", open: isUploadModalOpen, onClose: () => setIsUploadModalOpen(false), children: [_jsx("div", { "aria-hidden": "true", className: "fixed inset-0 bg-black/40" }), _jsx("div", { className: "fixed inset-0 overflow-y-auto", children: _jsx("div", { className: "flex min-h-full items-center justify-center p-4", children: _jsxs(DialogPanel, { className: "w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-gray-900", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx(DialogTitle, { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Dosya Yukle" }), _jsxs(Button, { type: "button", variant: "ghost", onClick: () => setIsUploadModalOpen(false), children: [_jsx("span", { className: "sr-only", children: "Kapat" }), _jsx(XMarkIcon, { className: "h-5 w-5" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("label", { className: "text-sm font-medium text-gray-700 dark:text-gray-200", htmlFor: "file", children: "Dosya" }), _jsx("input", { ref: fileInputRef, className: inputClassName, disabled: isUploading, id: "file", name: "file", type: "file", onChange: (event) => {
                                                    setSelectedFile(event.target.files?.[0] ?? null);
                                                    setClientError("");
                                                } }), _jsxs("div", { className: "space-y-1 text-sm", children: [clientError && _jsx("p", { className: "text-red-600", children: clientError }), uploadState.result === "error" && uploadState.error && (_jsx("p", { className: "text-red-600", children: uploadState.error })), uploadState.result === "success" &&
                                                        uploadState.uploadedFile ? (_jsxs("p", { className: "text-green-600", children: [getDisplayName(uploadState.uploadedFile), " basariyla eklendi."] })) : null] }), _jsxs("div", { className: "flex items-center justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setIsUploadModalOpen(false), children: "Vazgec" }), _jsx(Button, { disabled: isUploading, type: "button", onClick: handleUpload, children: isUploading ? "Yukleniyor..." : "Yukle" })] })] })] }) }) })] })] }));
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
const getDisplayName = (file) => file.label?.trim() || deriveFileName(file.url);
function isHiddenFile(file) {
    return file.url?.includes("/uyeler/");
}
function isVisibleFile(file) {
    return !file.isDeleted && !isHiddenFile(file);
}
//# sourceMappingURL=FilesBrowserClient.js.map