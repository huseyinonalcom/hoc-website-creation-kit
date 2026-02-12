import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "./baseEditorConfig";
import { createBaseEditorConfig } from "./baseEditorConfig";
import { RichTextRenderer } from "../../Text/Renderer";

export const createBaseRendererConfig = (): Config<BaseEditorProps> => {
  const baseConfig = createBaseEditorConfig();

  return {
    ...baseConfig,
    components: {
      ...baseConfig.components,
      RichTextBlock: {
        label: "Metin",
        render: ({ content }) => <RichTextRenderer html={content ?? ""} />,
      },
    },
  };
};
