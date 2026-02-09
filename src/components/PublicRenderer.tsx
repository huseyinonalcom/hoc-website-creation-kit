import type { Config, Data } from "@puckeditor/core";

import { Render } from "@puckeditor/core";

export function PublicRenderer({ config, data, pagePathSegments }: { config: Config; data: Data; pagePathSegments: string[] }) {
  return <Render config={config} data={data} metadata={{ pagePathSegments }} />;
}
