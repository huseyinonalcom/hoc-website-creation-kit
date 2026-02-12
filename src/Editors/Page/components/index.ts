import type { Config } from "@puckeditor/core";

import type { BaseEditorProps } from "../config/types";

import { twoColumnLayoutConfig } from "./Layout/TwoColumnLayout/config";
import { threeColumnLayoutConfig } from "./Layout/ThreeColumnLayout/config";
import { fourColumnLayoutConfig } from "./Layout/FourColumnLayout/config";
import { verticalSpacerConfig } from "./Layout/VerticalSpacer/config";
import { headingBlockConfig } from "./Content/HeadingBlock/config";
import { richTextBlockConfig } from "./Content/RichTextBlock/config";
import { accordionBlockConfig } from "./Content/AccordionBlock/config";
import { singleAccordionConfig } from "./Content/SingleAccordion/config";
import { singleImageConfig } from "./Media/SingleImage/config";
import { imageWithTextConfig } from "./Media/ImageWithText/config";
import { imageWithSlotConfig } from "./Media/ImageWithSlot/config";
import { imageOverlayTextConfig } from "./Media/ImageOverlayText/config";
import { sliderBlockConfig } from "./Media/SliderBlock/config";
import { sliderShowcaseBlockConfig } from "./Media/SliderShowcaseBlock/config";
import { galleryConfig } from "./Media/Gallery/config";
import { linkBarConfig } from "./Actions/LinkBar/config";
import { buttonLinkConfig } from "./Actions/ButtonLink/config";
import { youtubeEmbedConfig } from "./Embed/YoutubeEmbed/config";
import { googleMapsEmbedConfig } from "./Embed/GoogleMapsEmbed/config";

export const createComponents = (): Config<BaseEditorProps>["components"] => ({
  TwoColumnLayout: twoColumnLayoutConfig,
  ThreeColumnLayout: threeColumnLayoutConfig,
  FourColumnLayout: fourColumnLayoutConfig,
  VerticalSpacer: verticalSpacerConfig,
  HeadingBlock: headingBlockConfig,
  RichTextBlock: richTextBlockConfig,
  AccordionBlock: accordionBlockConfig,
  SingleAccordion: singleAccordionConfig,
  SingleImage: singleImageConfig,
  ImageWithText: imageWithTextConfig,
  ImageWithSlot: imageWithSlotConfig,
  ImageOverlayText: imageOverlayTextConfig,
  SliderBlock: sliderBlockConfig,
  SliderShowcaseBlock: sliderShowcaseBlockConfig,
  Gallery: galleryConfig,
  LinkBar: linkBarConfig,
  ButtonLink: buttonLinkConfig,
  YoutubeEmbed: youtubeEmbedConfig,
  GoogleMapsEmbed: googleMapsEmbedConfig,
});
