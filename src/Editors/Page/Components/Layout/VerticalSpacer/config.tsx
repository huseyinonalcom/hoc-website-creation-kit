import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../utilityComponentsa/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import { VerticalSpacer } from "./Component";

const { numberInput } = defaultFieldHelpers;

export const verticalSpacerConfig: Config<BaseEditorProps>["components"]["VerticalSpacer"] =
  {
    label: "Dikey Aralık",
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="VerticalSpacer" />,
      },
      height: numberInput("Yükseklik (px)", {
        min: 8,
        placeholder: "Örn: 48",
      }),
    },
    render: VerticalSpacer,
  };
