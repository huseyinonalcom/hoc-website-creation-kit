import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../../../config/types";

import { Clipboard } from "../../../UtilityComponents/UniversalClipboard";
import { defaultFieldHelpers } from "../../../fields/fieldHelpers";
import YoutubeEmbed from "./Component";

const { numberInput } = defaultFieldHelpers;

export const youtubeEmbedConfig: Config<BaseEditorProps>["components"]["YoutubeEmbed"] =
  {
    label: "YouTube Video",
    defaultProps: {
      startSeconds: 0,
      autoPlay: false,
      muted: false,
    },
    fields: {
      clipboard: {
        type: "custom",
        render: () => <Clipboard componentName="YoutubeEmbed" />,
      },
      url: {
        label: "YouTube URL'si veya Video ID",
        type: "text",
        placeholder: "https://www.youtube.com/watch?v=...",
      },
      title: {
        label: "Başlık",
        type: "text",
      },
      height: {
        label: "Yükseklik (px veya %)",
        type: "text",
        placeholder: "Örn: 360px veya 50%",
      },
      startSeconds: numberInput("Başlangıç Zamanı (sn)", {
        min: 0,
        placeholder: "Örn: 30",
        step: 1,
      }),
      autoPlay: {
        label: "Otomatik oynatma",
        type: "radio",
        options: [
          { label: "Kapalı", value: false },
          { label: "Açık", value: true },
        ],
      },
      muted: {
        label: "Sessiz başlat",
        type: "radio",
        options: [
          { label: "Kapalı", value: false },
          { label: "Açık", value: true },
        ],
      },
    },
    render: YoutubeEmbed,
  };
