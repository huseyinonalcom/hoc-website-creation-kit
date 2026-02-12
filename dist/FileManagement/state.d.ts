import type { SerializableFileRecord } from "./types";
export type ActionResultState = "idle" | "success" | "error";
export type UploadFileState = {
    result: ActionResultState;
    error: string;
    uploadedFile: SerializableFileRecord | null;
};
export declare const uploadFileInitialState: UploadFileState;
//# sourceMappingURL=state.d.ts.map