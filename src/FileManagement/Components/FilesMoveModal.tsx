"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import type { FileDirectories } from "@/components/Files/types";

import { FilesBrowserClient } from "@/components/Files/FilesBrowserClient";
import { Button } from "@/components/Simple/Button";

export type FilesMoveModalProps = {
  open: boolean;
  directories: FileDirectories[];
  onClose: () => void;
  onConfirm: (directory_id: string | null) => void;
  initialdirectory_id?: string | null;
  title?: string;
};

export function FilesMoveModal({
  open,
  directories,
  onClose,
  onConfirm,
  initialdirectory_id = null,
  title = "Klasör Seç",
}: FilesMoveModalProps) {
  const [activedirectory_id, setActivedirectory_id] = useState<string | null>(
    initialdirectory_id,
  );

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
              activedirectory_id={activedirectory_id}
              directories={directories}
              files={[]}
              showDirectoryCreate={false}
              showFiles={false}
              showUpload={false}
              onDirectoryChange={setActivedirectory_id}
            />

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Vazgeç
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onConfirm(activedirectory_id ?? null);
                }}
              >
                Buraya Taşı
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
