import type { Config, Data } from "@puckeditor/core";

import { Render } from "@puckeditor/core";
import { createBaseRendererConfig } from "./config/baseRendererConfig";

export type PageRendererProps = {
  config?: Config;
  data: Data;
  pagePathSegments: string[];
};

export function PageRenderer({ config = createBaseRendererConfig(), data, pagePathSegments }: PageRendererProps) {
  return <Render config={config} data={data} metadata={{ pagePathSegments }} />;
}
