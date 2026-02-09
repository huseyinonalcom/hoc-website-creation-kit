import type { Config } from "@puckeditor/core";

import type { BaseEditorConfigOptions, BaseEditorProps } from "./baseEditorConfig";
import { createBaseEditorConfig } from "./baseEditorConfig";
import { RichTextRenderer } from "../components/TextEditor/Renderer";

export const createBaseRendererConfig = (options: BaseEditorConfigOptions = {}): Config<BaseEditorProps> => {
  const baseConfig = createBaseEditorConfig(options);

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
