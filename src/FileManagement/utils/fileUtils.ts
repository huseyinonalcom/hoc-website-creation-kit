import { Selectable } from "kysely";

import { Files } from "../../server/types/dbtypes";

export const deriveFileName = (url: string) => {
  try {
    const decoded = decodeURIComponent(url);
    const parts = decoded.split("/");
    return parts[parts.length - 1] || decoded;
  } catch {
    return url;
  }
};

export const getDisplayName = (file: Selectable<Files>) =>
  file.tag?.trim() || deriveFileName(file.url);
