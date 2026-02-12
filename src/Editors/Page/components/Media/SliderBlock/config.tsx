import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";

import { SlidesField } from "../../../utilityComponents/SlidesField";
import { EditorImage } from "../../../utilityComponents/EditorImage";
import { Clipboard } from "../../../utilityComponents/UniversalClipboard";

import Slider from "./Component";

const { imageModeToggleField, numberInput } = defaultFieldHelpers;

export const sliderBlockConfig: Config<BaseEditorProps>["components"]["SliderBlock"] = {
  label: "Görsel Kaydırıcı",
  fields: {
    clipboard: {
      type: "custom",
      render: () => <Clipboard componentName="SliderBlock" />,
    },
    slides: {
      label: "Slaytlar",
      type: "custom",
      render: ({ value, onChange }) => (
        <SlidesField
          componentName="SliderShowcaseBlock"
          ImageField={EditorImage}
          value={Array.isArray(value) ? value : []}
          onChange={(next) => onChange(next)}
        />
      ),
    },
    autoPlay: {
      label: "Otomatik oynatma",
      type: "radio",
      options: [
        { label: "Evet", value: true },
        { label: "Hayır", value: false },
      ],
    },
    autoPlayInterval: numberInput("Otomatik oynatma süresi (ms)", {
      min: 2000,
      placeholder: "Örn: 6000",
      defaultValue: 6000,
    }),
    imageMode: imageModeToggleField,
  },
  render: Slider,
};
