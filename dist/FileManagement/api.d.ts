import type { SerializableDirectoryRecord, SerializableFileRecord, UploadFileInput, CreateDirectoryInput, UpdateFileInput, UpdateDirectoryInput } from "./types";
export declare const mapDbFileToSerializable: (row: any) => SerializableFileRecord;
export declare const mapDbDirToSerializable: (row: any) => SerializableDirectoryRecord;
export declare function fetchFiles(includeDeleted?: boolean): Promise<SerializableFileRecord[]>;
export declare function fetchDirectories(): Promise<SerializableDirectoryRecord[]>;
export declare function createDirectory(input: CreateDirectoryInput): Promise<any>;
export declare function uploadFile(input: UploadFileInput): Promise<any>;
export declare function updateFile(input: UpdateFileInput): Promise<any>;
export declare function deleteFile(id: string): Promise<any>;
export declare function updateDirectory(input: UpdateDirectoryInput): Promise<any>;
export declare function deleteDirectory(id: string): Promise<any>;
//# sourceMappingURL=api.d.ts.map