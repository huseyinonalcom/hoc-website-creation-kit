import { Config } from "@puckeditor/core";

import { RichTextRenderer } from "../../Text/Renderer";
import { baseEditorConfig } from "./baseEditorConfig";

export const baseRendererConfig: Config = {
  ...baseEditorConfig,
  components: {
    ...baseEditorConfig.components,
    RichTextBlock: {
      label: "Metin",
      render: ({ content }) => <RichTextRenderer content={content ?? ""} />,
    },
  },
};
