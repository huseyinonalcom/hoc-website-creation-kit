import type { Config, Data } from "@puckeditor/core";

import { Render } from "@puckeditor/core";

export function PublicRenderer<TProps>({
  config,
  data,
  pagePathSegments,
}: {
  config: Config<TProps>;
  data: Data;
  pagePathSegments: string[];
}) {
  return <Render config={config} data={data} metadata={{ pagePathSegments }} />;
}
