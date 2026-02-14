import { Selectable } from "kysely";

import { ActionResultState } from "../utils/serverActions/types";
import { Files } from "../server/types/dbtypes";

export type UploadFileState = {
  result: ActionResultState;
  error: string;
  uploadedFile: Selectable<Files> | null;
};

export const uploadFileInitialState: UploadFileState = {
  result: "idle",
  error: "",
  uploadedFile: null,
};
