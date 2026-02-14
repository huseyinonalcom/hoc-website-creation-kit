"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Selectable } from "kysely";

import { FileDirectories, Files } from "../../server/types/dbtypes";

const FilesContext = createContext<{
  files: Selectable<Files>[];
  directories: Selectable<FileDirectories>[];
  addFile: (file: Selectable<Files>) => void;
  updateFile: (file: Selectable<Files>) => void;
  removeFile: (fileId: string) => void;
  addDirectory: (directory: Selectable<FileDirectories>) => void;
  updateDirectory: (directory: Selectable<FileDirectories>) => void;
  removeDirectory: (directory_id: string) => void;
} | null>(null);

export function useFilesData() {
  const ctx = useContext(FilesContext);
  if (!ctx) throw new Error("FilesDataProvider missing");
  return ctx;
}

export default function FilesDataProvider({
  initialFiles,
  initialDirectories,
  children,
}: {
  initialFiles: Selectable<Files>[];
  initialDirectories: Selectable<FileDirectories>[];
  children: ReactNode;
}) {
  const [files, setFiles] = useState(initialFiles);
  const [directories, setDirectories] = useState(initialDirectories);

  const addFile = (file: Selectable<Files>) =>
    setFiles((prev) =>
      prev.some((f) => f.id === file.id) ? prev : [file, ...prev],
    );

  const updateFile = (file: Selectable<Files>) =>
    setFiles((prev) => prev.map((item) => (item.id === file.id ? file : item)));

  const removeFile = (fileId: string) =>
    setFiles((prev) => prev.filter((item) => item.id !== fileId));

  const addDirectory = (directory: Selectable<FileDirectories>) =>
    setDirectories((prev) =>
      prev.some((item) => item.id === directory.id)
        ? prev
        : [directory, ...prev],
    );

  const updateDirectory = (directory: Selectable<FileDirectories>) =>
    setDirectories((prev) =>
      prev.map((item) => (item.id === directory.id ? directory : item)),
    );

  const removeDirectory = (directory_id: string) =>
    setDirectories((prev) => prev.filter((item) => item.id !== directory_id));

  return (
    <FilesContext.Provider
      value={{
        files,
        directories,
        addFile,
        updateFile,
        removeFile,
        addDirectory,
        updateDirectory,
        removeDirectory,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
}
