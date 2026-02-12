import { baseEditorConfig } from "./baseEditorConfig";
import { RichTextRenderer } from "../../Text/Renderer";
import { Config } from "@puckeditor/core";

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
