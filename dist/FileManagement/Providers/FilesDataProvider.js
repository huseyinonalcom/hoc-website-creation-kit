"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
import { getDirectoriesAction, getFilesAction } from "../actions";
const FilesContext = createContext(null);
export function useFilesData() {
    const ctx = useContext(FilesContext);
    if (!ctx)
        throw new Error("FilesDataProvider missing");
    return ctx;
}
export function FilesDataProvider({ children }) {
    const [files, setFiles] = useState([]);
    const [directories, setDirectories] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const filesReq = await getFilesAction({ includeDeleted: false });
            setFiles(filesReq.result);
            const directoriesResponse = await getDirectoriesAction({});
            setDirectories(directoriesResponse.result);
        }
        fetchData();
    }, []);
    const addFile = (file) => setFiles((prev) => prev.some((f) => f.id === file.id) ? prev : [file, ...prev]);
    const updateFile = (file) => setFiles((prev) => prev.map((item) => (item.id === file.id ? file : item)));
    const removeFile = (fileId) => setFiles((prev) => prev.filter((item) => item.id !== fileId));
    const addDirectory = (directory) => setDirectories((prev) => prev.some((item) => item.id === directory.id)
        ? prev
        : [directory, ...prev]);
    const updateDirectory = (directory) => setDirectories((prev) => prev.map((item) => (item.id === directory.id ? directory : item)));
    const removeDirectory = (directory_id) => setDirectories((prev) => prev.filter((item) => item.id !== directory_id));
    return (_jsx(FilesContext.Provider, { value: {
            files,
            directories,
            addFile,
            updateFile,
            removeFile,
            addDirectory,
            updateDirectory,
            removeDirectory,
        }, children: children }));
}
//# sourceMappingURL=FilesDataProvider.js.map