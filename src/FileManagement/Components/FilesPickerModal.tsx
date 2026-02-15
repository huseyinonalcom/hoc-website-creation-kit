"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Selectable } from "kysely";

import { FileDirectories, Files } from "../../server/types/dbtypes";
import { FilesBrowserClient } from "./FilesBrowserClient";
import { Button } from "../../Components/Simple/Button";

export type FilesPickerModalProps = {
  open: boolean;
  onClose: () => void;
  files: Selectable<Files>[];
  directories: Selectable<FileDirectories>[];
  onSelect: (file: Selectable<Files>) => void;
  onFileCreate?: (file: Selectable<Files>) => void;
  onDirectoryCreate?: (directory: Selectable<FileDirectories>) => void;
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
  title = "Dosya Seç",
  closeOnSelect = true,
}: FilesPickerModalProps) {
  const handleSelect = (file: Selectable<Files>) => {
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
              onDirectoryCreate={onDirectoryCreate}
              onFileCreate={onFileCreate}
              onSelect={handleSelect}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
