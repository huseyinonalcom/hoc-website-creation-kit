"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import type { SerializableDirectoryRecord, SerializableFileRecord } from "../types";

const FilesContext = createContext<{
  files: SerializableFileRecord[];
  directories: SerializableDirectoryRecord[];
  addFile: (file: SerializableFileRecord) => void;
  updateFile: (file: SerializableFileRecord) => void;
  removeFile: (fileId: string) => void;
  addDirectory: (directory: SerializableDirectoryRecord) => void;
  updateDirectory: (directory: SerializableDirectoryRecord) => void;
  removeDirectory: (directoryId: string) => void;
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
  initialFiles: SerializableFileRecord[];
  initialDirectories: SerializableDirectoryRecord[];
  children: ReactNode;
}) {
  const [files, setFiles] = useState(initialFiles);
  const [directories, setDirectories] = useState(initialDirectories);

  const addFile = (file: SerializableFileRecord) => setFiles((prev) => (prev.some((f) => f.id === file.id) ? prev : [file, ...prev]));

  const updateFile = (file: SerializableFileRecord) => setFiles((prev) => prev.map((item) => (item.id === file.id ? file : item)));

  const removeFile = (fileId: string) => setFiles((prev) => prev.filter((item) => item.id !== fileId));

  const addDirectory = (directory: SerializableDirectoryRecord) =>
    setDirectories((prev) => (prev.some((item) => item.id === directory.id) ? prev : [directory, ...prev]));

  const updateDirectory = (directory: SerializableDirectoryRecord) =>
    setDirectories((prev) => prev.map((item) => (item.id === directory.id ? directory : item)));

  const removeDirectory = (directoryId: string) => setDirectories((prev) => prev.filter((item) => item.id !== directoryId));

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
