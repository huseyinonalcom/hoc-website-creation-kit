"use client";

import { useMemo, useState, useTransition } from "react";
import { Selectable } from "kysely";
import Image from "next/image";

import {
  deleteDirectoryAction,
  softDeleteFileAction,
  updateDirectoryAction,
  updateFileAction,
} from "../actions";
import { Button } from "../../Editors/Page/Components/Actions/ButtonLink/Button";
import { FileDirectories, Files } from "../../server/types/dbtypes";
import { useFilesData } from "../Providers/FilesDataProvider";
import { FilesBrowserClient } from "./FilesBrowserClient";
import { FilesMoveModal } from "./FilesMoveModal";
import cn from "../../utils/classnames";

const inputClassName =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400";

type StatusState = { type: "success" | "error"; message: string } | null;

export function FilesManagerClient() {
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
  const [selectedFile, setSelectedFile] = useState<Selectable<Files> | null>(
    null,
  );
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [activedirectory_id, setActivedirectory_id] = useState<string | null>(
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

  const handleSelectFile = (file: Selectable<Files>) => {
    setSelectedFile(file);
    setLabel(file.tag ?? "");
  };

  const handleSelectionChange = (ids: string[]) => {
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

  const handleDirectoryChange = (directory_id: string | null) => {
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
    } catch {
      setStatus({ type: "error", message: "URL kopyalanamadi." });
    }
  };

  const handleMove = (directory_id: string | null) => {
    if (selectedFileIds.length === 0) {
      return;
    }
    performMove(directory_id, selectedFileIds, true);
  };

  const handleMoveFiles = (directory_id: string | null, fileIds: string[]) => {
    if (fileIds.length === 0) {
      return;
    }

    performMove(directory_id, fileIds, false);
  };

  const performMove = (
    directory_id: string | null,
    fileIds: string[],
    closeModal: boolean,
  ) => {
    setStatus(null);

    startTransition(async () => {
      const results = await Promise.all(
        fileIds.map((id) =>
          updateFileAction({ id, directory_id, label: undefined }),
        ),
      );

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
      response.deletedIds.forEach((id: string) => removeDirectory(id));
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

  const handleDirectoryMove = (directory_id: string | null) => {
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
  const canDeleteDirectory =
    Boolean(activedirectory_id) && activeDirectoryFileCount === 0;
  const allowedMoveDirectories = activedirectory_id
    ? directories.filter(
        (dir) =>
          !getDescendantIds(directories, activedirectory_id).includes(dir.id),
      )
    : directories;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <FilesBrowserClient
        enableDragDrop
        multiSelect
        activedirectory_id={activedirectory_id}
        directories={directories}
        files={files}
        selectedFileIds={selectedFileIds}
        onDirectoryChange={handleDirectoryChange}
        onDirectoryCreate={addDirectory}
        onFileCreate={addFile}
        onMoveFiles={handleMoveFiles}
        onSelect={handleSelectFile}
        onSelectionChange={handleSelectionChange}
      />

      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900">
        {activedirectory_id ? (
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-gray-800">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Klasör Ayrıntıları
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
                Klasör Adı
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
                Taşı
              </Button>
              <Button
                disabled={isPending || !canDeleteDirectory}
                type="button"
                variant="danger"
                onClick={handleDeleteDirectory}
              >
                Klasörü Sil
              </Button>
            </div>
          </div>
        ) : null}
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Dosya Ayrıntıları
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Dosya adı ve klasörünü güncelleyebilir veya dosyayı silebilirsiniz.
          </p>
        </div>

        {multiSelection ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              {selectedFileIds.length} dosya seçildi.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                onClick={() => setIsMoveOpen(true)}
              >
                Taşı
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
                Görünen Ad
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
                Klasör
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
                {isPending ? "Güncelleniyor..." : "Güncelle"}
              </Button>
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                onClick={() => setIsMoveOpen(true)}
              >
                Taşı
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
            İşlem yapmak için bir dosya seçin.
          </p>
        )}
      </section>

      <FilesMoveModal
        key={`move-${isMoveOpen ? "open" : "closed"}`}
        directories={directories}
        open={isMoveOpen}
        title="Dosyaları Taşı"
        onClose={() => setIsMoveOpen(false)}
        onConfirm={handleMove}
      />

      <FilesMoveModal
        key={`dir-move-${isDirectoryMoveOpen ? "open" : "closed"}`}
        directories={allowedMoveDirectories}
        open={isDirectoryMoveOpen}
        title="Klasörü Taşı"
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

const getDisplayName = (file: Selectable<Files>) =>
  file.tag?.trim() || deriveFileName(file.url);

const getDirectoryLabel = (
  directories: Selectable<FileDirectories>[],
  directory_id?: string | null,
) => {
  if (!directory_id) {
    return "Kök";
  }

  const found = directories.find((dir) => dir.id === directory_id);
  return found?.name ?? "Kök";
};

const getParentdirectory_id = (
  directories: Selectable<FileDirectories>[],
  directory_id: string,
) => {
  const found = directories.find((dir) => dir.id === directory_id);
  return found?.parent_id ?? null;
};

const getDescendantIds = (
  directories: Selectable<FileDirectories>[],
  directory_id: string,
) => {
  const byParent = new Map<string | null, Selectable<FileDirectories>[]>();
  directories.forEach((dir) => {
    const parentId = dir.parent_id ?? null;
    const list = byParent.get(parentId) ?? [];
    list.push(dir);
    byParent.set(parentId, list);
  });

  const result: string[] = [];
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

const countFilesInDirectory = (
  files: Selectable<Files>[],
  directories: Selectable<FileDirectories>[],
  directory_id: string,
) => {
  const targetIds = getDescendantIds(directories, directory_id);
  return files.filter(
    (file) => !file.is_deleted && targetIds.includes(file.directory_id ?? ""),
  ).length;
};
