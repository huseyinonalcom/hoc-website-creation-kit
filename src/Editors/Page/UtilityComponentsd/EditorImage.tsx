"use client";

import { useState } from "react";
import Image from "next/image";

import type {
  CreateDirectoryInput,
  CreateDirectoryResponse,
  SerializableFileRecord,
  UploadFileInput,
} from "../../../FileManagement/types";
import type { UploadFileState } from "../../../FileManagement/state";

import { FilesPickerModal } from "../../../FileManagement/Components/FilesPickerModal";
import { useFilesData } from "../../../FileManagement/Providers/FilesDataProvider";
import { Button } from "../Componentsa/Actions/ButtonLink/Button";

export type EditorImageProps = {
  value?: string;
  onChange: (next: string) => void;
  onUploadFile?: (input: UploadFileInput) => Promise<UploadFileState>;
  onCreateDirectory?: (
    input: CreateDirectoryInput,
  ) => Promise<CreateDirectoryResponse>;
};

export function EditorImage({
  value,
  onChange,
  onUploadFile,
  onCreateDirectory,
}: EditorImageProps) {
  const { files, directories, addFile, addDirectory } = useFilesData();
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleSelect = (file: SerializableFileRecord) => {
    onChange(file.url);
    setIsPickerOpen(false);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">Secilen Gorsel</p>
        </div>
        <div className="flex gap-2">
          {value && (
            <Button type="button" variant="ghost" onClick={handleClear}>
              Kaldir
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsPickerOpen(true)}
          >
            Dosya Sec
          </Button>
        </div>
      </div>

      {value && (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
          <Image
            fill
            alt={deriveFileName(value)}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            src={value}
          />
        </div>
      )}

      <FilesPickerModal
        directories={directories}
        files={files}
        open={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onCreateDirectory={onCreateDirectory}
        onDirectoryCreate={addDirectory}
        onFileCreate={addFile}
        onSelect={handleSelect}
        onUploadFile={onUploadFile}
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
