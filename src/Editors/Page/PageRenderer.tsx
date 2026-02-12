import type { Config, Data } from "@puckeditor/core";

import { Render } from "@puckeditor/core";
import { baseRendererConfig } from "./config/baseRendererConfig";

export type PageRendererProps = {
  config?: Config;
  data: Data;
  pagePathSegments: string[];
};

export function PageRenderer({ config = baseRendererConfig, data, pagePathSegments }: PageRendererProps) {
  return <Render config={config} data={data} metadata={{ pagePathSegments }} />;
}
