import { Selectable } from "kysely";
import { ActionResultState } from "../utils/serverActions/types";
import { Files } from "../server/types/dbtypes";
export type UploadFileState = {
    result: ActionResultState;
    error: string;
    uploadedFile: Selectable<Files> | null;
};
export declare const uploadFileInitialState: UploadFileState;
//# sourceMappingURL=state.d.ts.map