import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../utilityComponentsa/UniversalClipboard";
import { LinkListField } from "./LinkListField";
import { LinkBarBlock } from "./Component";

export const linkBarConfig: Config<BaseEditorProps>["components"]["LinkBar"] = {
  label: "Bağlantı Listesi",
  fields: {
    clipboard: {
      type: "custom",
      render: () => <Clipboard componentName="LinkBar" />,
    },
    links: {
      label: "Bağlantılar",
      type: "custom",
      render: ({ value, onChange }) => {
        const items = Array.isArray(value)
          ? (value as { label?: string; path?: string }[]).map((link) => ({
              label: link.label ?? "",
              path: link.path ?? "",
            }))
          : [];

        return <LinkListField value={items} onChange={onChange} />;
      },
    },
  },
  render: LinkBarBlock,
};
