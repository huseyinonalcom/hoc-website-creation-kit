"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import type {
  CreateDirectoryInput,
  CreateDirectoryResponse,
  SerializableDirectoryRecord,
  SerializableFileRecord,
  UploadFileInput,
} from "./types";

import type { UploadFileState } from "./state";
import { FilesBrowserClient } from "./FilesBrowserClient";
import { Button } from "../Editors/Page/Components/Actions/ButtonLink/Button";

export type FilesPickerModalProps = {
  open: boolean;
  onClose: () => void;
  files: SerializableFileRecord[];
  directories: SerializableDirectoryRecord[];
  onSelect: (file: SerializableFileRecord) => void;
  onFileCreate?: (file: SerializableFileRecord) => void;
  onDirectoryCreate?: (directory: SerializableDirectoryRecord) => void;
  onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
  onCreateDirectory?: (
    input: CreateDirectoryInput,
  ) => Promise<CreateDirectoryResponse>;
  title?: string;
  closeOnSelect?: boolean;
};

export function FilesPickerModal({
  open,
  onClose,
  files,
  directories,
  onSelect,
  onFileCreate,
  onDirectoryCreate,
  onUploadFile,
  onCreateDirectory,
  title = "Dosya Sec",
  closeOnSelect = true,
}: FilesPickerModalProps) {
  const handleSelect = (file: SerializableFileRecord) => {
    onSelect(file);
    if (closeOnSelect) {
      onClose();
    }
  };

  return (
    <Dialog className="relative z-50" open={open} onClose={onClose}>
      <div aria-hidden="true" className="fixed inset-0 bg-black/40" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>
              <Button type="button" variant="ghost" onClick={onClose}>
                <span className="sr-only">Kapat</span>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            <FilesBrowserClient
              directories={directories}
              files={files}
              onCreateDirectory={onCreateDirectory}
              onDirectoryCreate={onDirectoryCreate}
              onFileCreate={onFileCreate}
              onSelect={handleSelect}
              onUploadFile={onUploadFile}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
