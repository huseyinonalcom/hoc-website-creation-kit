"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";

import {
  UploadFileInput,
  CreateDirectoryInput,
  CreateDirectoryResponse,
  UpdateFileInput,
  UpdateFileResponse,
  DeleteFileInput,
  DeleteFileResponse,
  UpdateDirectoryInput,
  UpdateDirectoryResponse,
  DeleteDirectoryInput,
  DeleteDirectoryResponse,
  SerializableFileRecord,
  SerializableDirectoryRecord,
} from "../types";
import { Button } from "../../Editors/Page/Componentsa/Actions/ButtonLink/Button";
import { useFilesData } from "../Providers/FilesDataProvider";
import { FilesBrowserClient } from "./FilesBrowserClient";
import { FilesMoveModal } from "./FilesMoveModal";
import { UploadFileState } from "../state";
import cn from "../../utils/classnames";
import * as FMApi from "../api";

const inputClassName =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400";

type StatusState = { type: "success" | "error"; message: string } | null;

export type FilesManagerClientProps = {
  onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
  onCreateDirectory?: (
    input: CreateDirectoryInput,
  ) => Promise<CreateDirectoryResponse>;
  onUpdateFile?: (input: UpdateFileInput) => Promise<UpdateFileResponse>;
  onDeleteFile?: (input: DeleteFileInput) => Promise<DeleteFileResponse>;
  onUpdateDirectory?: (
    input: UpdateDirectoryInput,
  ) => Promise<UpdateDirectoryResponse>;
  onDeleteDirectory?: (
    input: DeleteDirectoryInput,
  ) => Promise<DeleteDirectoryResponse>;
};

export function FilesManagerClient({
  onUploadFile,
  onCreateDirectory,
  onUpdateFile,
  onDeleteFile,
  onUpdateDirectory,
  onDeleteDirectory,
}: FilesManagerClientProps) {
  // Default handlers that call the package API so the manager works without props.
  const uploadFileDefault = async (input: UploadFileInput) => {
    try {
      const data = await FMApi.uploadFile(input);
      if (data && data.result === "success" && data.file) {
        return {
          result: "success",
          error: "",
          uploadedFile: FMApi.mapDbFileToSerializable(data.file),
        } as UploadFileState;
      }
      return {
        result: "error",
        error: data?.error || "Upload failed",
        uploadedFile: null,
      } as UploadFileState;
    } catch (err: unknown) {
      return {
        result: "error",
        error: (err as Error)?.message || String(err),
        uploadedFile: null,
      } as UploadFileState;
    }
  };

  const resolvedOnUploadFile = onUploadFile ?? uploadFileDefault;
  const resolvedOnCreateDirectory =
    onCreateDirectory ??
    (async (input: CreateDirectoryInput) => await FMApi.createDirectory(input));
  const resolvedOnUpdateFile =
    onUpdateFile ??
    (async (input: UpdateFileInput) => await FMApi.updateFile(input));
  const resolvedOnDeleteFile =
    onDeleteFile ??
    (async (input: DeleteFileInput) => await FMApi.deleteFile(input.id));
  const resolvedOnUpdateDirectory =
    onUpdateDirectory ??
    (async (input: UpdateDirectoryInput) => await FMApi.updateDirectory(input));
  const resolvedOnDeleteDirectory =
    onDeleteDirectory ??
    (async (input: DeleteDirectoryInput) =>
      await FMApi.deleteDirectory(input.id));
  const {
    files,
    directories,
    addFile,
    addDirectory,
    updateDirectory,
    updateFile,
    removeFile,
    removeDirectory,
  } = useFilesData();
  const [selectedFile, setSelectedFile] =
    useState<SerializableFileRecord | null>(null);
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [activeDirectoryId, setActiveDirectoryId] = useState<string | null>(
    null,
  );
  const [directoryLabel, setDirectoryLabel] = useState("");
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState<StatusState>(null);
  const [isPending, startTransition] = useTransition();
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isDirectoryMoveOpen, setIsDirectoryMoveOpen] = useState(false);

  const displayName = useMemo(
    () => (selectedFile ? getDisplayName(selectedFile) : ""),
    [selectedFile],
  );

  const handleSelectFile = (file: SerializableFileRecord) => {
    setSelectedFile(file);
    setLabel(file.label ?? "");
  };

  const handleSelectionChange = (ids: string[]) => {
    setSelectedFileIds(ids);
    if (ids.length === 1) {
      const found = files.find((item) => item.id === ids[0]) ?? null;
      setSelectedFile(found);
      setLabel(found?.label ?? "");
      return;
    }

    setSelectedFile(null);
    setLabel("");
  };

  const handleDirectoryChange = (directoryId: string | null) => {
    setActiveDirectoryId(directoryId);
    if (!directoryId) {
      setDirectoryLabel("");
      return;
    }

    const current = directories.find((dir) => dir.id === directoryId);
    setDirectoryLabel(current?.name ?? "");
  };

  const handleSave = () => {
    if (!selectedFile) {
      return;
    }

    setStatus(null);

    startTransition(async () => {
      const response = await resolvedOnUpdateFile({
        id: selectedFile.id,
        label,
        directoryId: selectedFile.directoryId ?? null,
      });

      if (response.result === "error") {
        setStatus({
          type: "error",
          message: response.error || "Dosya guncellenemedi.",
        });
        return;
      }

      updateFile(response.file);
      handleSelectFile(response.file);
      setStatus({ type: "success", message: "Dosya guncellendi." });
    });
  };

  const handleDelete = () => {
    if (!selectedFile) {
      return;
    }

    setStatus(null);

    if (!window.confirm("Bu dosyayi silmek istediginize emin misiniz?")) {
      return;
    }

    startTransition(async () => {
      const response = await resolvedOnDeleteFile({ id: selectedFile.id });

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
    } catch {
      setStatus({ type: "error", message: "URL kopyalanamadi." });
    }
  };

  const handleMove = (directoryId: string | null) => {
    if (selectedFileIds.length === 0) {
      return;
    }
    performMove(directoryId, selectedFileIds, true);
  };

  const handleMoveFiles = (directoryId: string | null, fileIds: string[]) => {
    if (fileIds.length === 0) {
      return;
    }

    performMove(directoryId, fileIds, false);
  };

  const performMove = (
    directoryId: string | null,
    fileIds: string[],
    closeModal: boolean,
  ) => {
    setStatus(null);

    startTransition(async () => {
      const results = await Promise.all(
        fileIds.map((id) =>
          resolvedOnUpdateFile({ id, directoryId, label: undefined }),
        ),
      );

      const hasError = results.find((result) => result.result === "error");
      if (hasError && hasError.result === "error") {
        setStatus({
          type: "error",
          message: hasError.error || "Dosyalar tasinamadi.",
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
      setStatus({ type: "success", message: "Dosyalar tasindi." });
    });
  };

  const handleDeleteDirectory = () => {
    if (!activeDirectoryId) {
      return;
    }

    setStatus(null);

    if (!window.confirm("Bu klasoru silmek istediginize emin misiniz?")) {
      return;
    }

    startTransition(async () => {
      const response = await resolvedOnDeleteDirectory({
        id: activeDirectoryId,
      });

      if (response.result === "error") {
        setStatus({
          type: "error",
          message: response.error || "Klasor silinemedi.",
        });
        return;
      }

      const parentId = getParentDirectoryId(directories, activeDirectoryId);
      response.deletedIds.forEach((id: string) => removeDirectory(id));
      setActiveDirectoryId(parentId);
      setDirectoryLabel("");
      setStatus({ type: "success", message: "Klasor silindi." });
    });
  };

  const handleDirectorySave = () => {
    if (!activeDirectoryId) {
      return;
    }

    setStatus(null);

    startTransition(async () => {
      const response = await resolvedOnUpdateDirectory({
        id: activeDirectoryId,
        name: directoryLabel,
      });

      if (response.result === "error") {
        setStatus({
          type: "error",
          message: response.error || "Klasor guncellenemedi.",
        });
        return;
      }

      updateDirectory(response.directory);
      setDirectoryLabel(response.directory.name);
      setStatus({ type: "success", message: "Klasor guncellendi." });
    });
  };

  const handleDirectoryMove = (directoryId: string | null) => {
    if (!activeDirectoryId) {
      return;
    }

    setStatus(null);

    startTransition(async () => {
      const response = await resolvedOnUpdateDirectory({
        id: activeDirectoryId,
        parentId: directoryId,
      });

      if (response.result === "error") {
        setStatus({
          type: "error",
          message: response.error || "Klasor tasinamadi.",
        });
        return;
      }

      updateDirectory(response.directory);
      setActiveDirectoryId(response.directory.parentId ?? null);
      setDirectoryLabel("");
      setIsDirectoryMoveOpen(false);
      setStatus({ type: "success", message: "Klasor tasindi." });
    });
  };

  const activeDirectoryLabel = selectedFile
    ? getDirectoryLabel(directories, selectedFile.directoryId)
    : getDirectoryLabel(directories, activeDirectoryId);
  const multiSelection = selectedFileIds.length > 1;
  const activeDirectoryFileCount = activeDirectoryId
    ? countFilesInDirectory(files, directories, activeDirectoryId)
    : 0;
  const canDeleteDirectory =
    Boolean(activeDirectoryId) && activeDirectoryFileCount === 0;
  const allowedMoveDirectories = activeDirectoryId
    ? directories.filter(
        (dir) =>
          !getDescendantIds(directories, activeDirectoryId).includes(dir.id),
      )
    : directories;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <FilesBrowserClient
        enableDragDrop
        multiSelect
        activeDirectoryId={activeDirectoryId}
        directories={directories}
        files={files}
        selectedFileIds={selectedFileIds}
        showDirectoryCreate={Boolean(resolvedOnCreateDirectory)}
        showUpload={Boolean(resolvedOnUploadFile)}
        onCreateDirectory={resolvedOnCreateDirectory}
        onDirectoryChange={handleDirectoryChange}
        onDirectoryCreate={addDirectory}
        onFileCreate={addFile}
        onMoveFiles={handleMoveFiles}
        onSelect={handleSelectFile}
        onSelectionChange={handleSelectionChange}
        onUploadFile={resolvedOnUploadFile}
      />

      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900">
        {activeDirectoryId ? (
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-gray-800">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Klasor Ayrintilari
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activeDirectoryFileCount} dosya bulunuyor.
              </p>
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="directory-label"
              >
                Klasor Adi
              </label>
              <input
                className={inputClassName}
                id="directory-label"
                value={directoryLabel}
                onChange={(event) => setDirectoryLabel(event.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                disabled={isPending}
                type="button"
                variant="primary"
                onClick={handleDirectorySave}
              >
                Kaydet
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                onClick={() => setIsDirectoryMoveOpen(true)}
              >
                Tasi
              </Button>
              <Button
                disabled={isPending || !canDeleteDirectory}
                type="button"
                variant="danger"
                onClick={handleDeleteDirectory}
              >
                Klasoru Sil
              </Button>
            </div>
          </div>
        ) : null}
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Dosya Ayrintilari
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Dosya adi ve klasorunu guncelleyebilir veya dosyayi silebilirsiniz.
          </p>
        </div>

        {multiSelection ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {selectedFileIds.length} dosya secildi.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                onClick={() => setIsMoveOpen(true)}
              >
                Tasi
              </Button>
            </div>
          </div>
        ) : selectedFile ? (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 dark:border-white/10 dark:bg-gray-800">
              <Image
                fill
                alt={displayName}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                src={selectedFile.url}
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
                htmlFor="file-label"
              >
                Gorunen Ad
              </label>
              <input
                className={inputClassName}
                id="file-label"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                URL
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300">
                  {selectedFile.url}
                </div>
                <Button type="button" variant="outline" onClick={handleCopyUrl}>
                  Kopyala
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Klasor
              </p>
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300">
                {activeDirectoryLabel}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                disabled={isPending}
                type="button"
                variant="primary"
                onClick={handleSave}
              >
                {isPending ? "Guncelleniyor..." : "Guncelle"}
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                onClick={() => setIsMoveOpen(true)}
              >
                Tasi
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant="danger"
                onClick={handleDelete}
              >
                Sil
              </Button>
            </div>

            {status ? (
              <p
                className={cn(
                  "text-sm",
                  status.type === "success" ? "text-green-600" : "text-red-600",
                )}
              >
                {status.message}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Islem yapmak icin bir dosya secin.
          </p>
        )}
      </section>

      <FilesMoveModal
        key={`move-${isMoveOpen ? "open" : "closed"}`}
        directories={directories}
        open={isMoveOpen}
        title="Dosyalari Tasi"
        onClose={() => setIsMoveOpen(false)}
        onConfirm={handleMove}
      />

      <FilesMoveModal
        key={`dir-move-${isDirectoryMoveOpen ? "open" : "closed"}`}
        directories={allowedMoveDirectories}
        open={isDirectoryMoveOpen}
        title="Klasoru Tasi"
        onClose={() => setIsDirectoryMoveOpen(false)}
        onConfirm={handleDirectoryMove}
      />
    </div>
  );
}

const deriveFileName = (url: string) => {
  try {
    const decoded = decodeURIComponent(url);
    const parts = decoded.split("/");
    return parts[parts.length - 1] || decoded;
  } catch {
    return url;
  }
};

const getDisplayName = (file: SerializableFileRecord) =>
  file.label?.trim() || deriveFileName(file.url);

const getDirectoryLabel = (
  directories: SerializableDirectoryRecord[],
  directoryId?: string | null,
) => {
  if (!directoryId) {
    return "Kok";
  }

  const found = directories.find((dir) => dir.id === directoryId);
  return found?.name ?? "Kok";
};

const getParentDirectoryId = (
  directories: SerializableDirectoryRecord[],
  directoryId: string,
) => {
  const found = directories.find((dir) => dir.id === directoryId);
  return found?.parentId ?? null;
};

const getDescendantIds = (
  directories: SerializableDirectoryRecord[],
  directoryId: string,
) => {
  const byParent = new Map<string | null, SerializableDirectoryRecord[]>();
  directories.forEach((dir) => {
    const parentId = dir.parentId ?? null;
    const list = byParent.get(parentId) ?? [];
    list.push(dir);
    byParent.set(parentId, list);
  });

  const result: string[] = [];
  const stack = [directoryId];

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

const countFilesInDirectory = (
  files: SerializableFileRecord[],
  directories: SerializableDirectoryRecord[],
  directoryId: string,
) => {
  const targetIds = getDescendantIds(directories, directoryId);
  return files.filter(
    (file) => !file.isDeleted && targetIds.includes(file.directoryId ?? ""),
  ).length;
};
