import type { SerializableFileRecord } from "./types";

export type ActionResultState = "idle" | "success" | "error";

export type UploadFileState = {
  result: ActionResultState;
  error: string;
  uploadedFile: SerializableFileRecord | null;
};

export const uploadFileInitialState: UploadFileState = {
  result: "idle",
  error: "",
  uploadedFile: null,
};
