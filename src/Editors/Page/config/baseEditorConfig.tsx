import type { BaseEditorProps, BaseRootProps } from "./types";

import { components } from "../Componentsa";

export type { BaseEditorProps, BaseRootProps };

export const baseEditorConfig = {
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
      components: [
        "TwoColumnLayout",
        "ThreeColumnLayout",
        "FourColumnLayout",
        "VerticalSpacer",
      ],
    },
    content: {
      title: "İçerik",
      components: [
        "HeadingBlock",
        "RichTextBlock",
        "AccordionBlock",
        "SingleAccordion",
        "CombinationLock",
      ],
    },
    media: {
      title: "Görsel",
      components: [
        "SingleImage",
        "ImageWithText",
        "ImageWithSlot",
        "ImageOverlayText",
        "SliderBlock",
        "SliderShowcaseBlock",
        "Gallery",
      ],
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
  components: components,
};
