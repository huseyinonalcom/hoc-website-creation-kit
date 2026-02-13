import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponentsd/UniversalClipboard";
import { RichTextRenderer } from "../../../../Text/Renderer";
import { RichTextEditor } from "../../../../Text/Editor";

export const richTextBlockConfig: Config<BaseEditorProps>["components"]["RichTextBlock"] =
  {
    label: "Metin",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="RichTextBlock" />,
      },
      content: {
        type: "custom",
        render: ({
          value,
          onChange,
          id,
        }: {
          value?: string;
          onChange: (next: string) => void;
          id?: string;
        }) => {
          const key = id ?? "richtext";
          return (
            <RichTextEditor
              key={key}
              initialData={value ?? ""}
              onChange={onChange}
            />
          );
        },
      },
    },
    render: ({ content }) => <RichTextRenderer content={content ?? ""} />,
  };
