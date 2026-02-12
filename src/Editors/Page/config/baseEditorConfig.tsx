import type { Config } from "@puckeditor/core";

import { createComponents } from "../components";
import type { BaseEditorProps, BaseRootProps } from "./types";

export type { BaseEditorProps, BaseRootProps };

export const createBaseEditorConfig = (): Config<BaseEditorProps, BaseRootProps> => {
  return {
    root: {
      defaultProps: {
        title: "",
        description: "",
      },
      fields: {
        title: { label: "Başlık", type: "text" },
        description: { label: "Açıklama", type: "textarea" },
      },
    },
    categories: {
      layout: {
        title: "Yerleşim",
        components: ["TwoColumnLayout", "ThreeColumnLayout", "FourColumnLayout", "VerticalSpacer"],
      },
      content: {
        title: "İçerik",
        components: ["HeadingBlock", "RichTextBlock", "AccordionBlock", "SingleAccordion"],
      },
      media: {
        title: "Görsel",
        components: ["SingleImage", "ImageWithText", "ImageWithSlot", "ImageOverlayText", "SliderBlock", "SliderShowcaseBlock", "Gallery"],
      },
      actions: {
        title: "Bağlantılar",
        components: ["LinkBar", "ButtonLink"],
      },
      embed: {
        title: "Gömülü İçerik",
        components: ["YoutubeEmbed", "GoogleMapsEmbed"],
      },
    },
    components: createComponents(),
  };
};
