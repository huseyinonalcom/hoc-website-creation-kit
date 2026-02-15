import { sliderShowcaseBlockConfig } from "./Media/SliderShowcaseBlock/config";
import { threeColumnLayoutConfig } from "./Layout/ThreeColumnLayout/config";
import { fourColumnLayoutConfig } from "./Layout/FourColumnLayout/config";
import { singleAccordionConfig } from "./Content/SingleAccordion/config";
import { combinationLockConfig } from "./Content/CombinationLock/config";
import { imageOverlayTextConfig } from "./Media/ImageOverlayText/config";
import { twoColumnLayoutConfig } from "./Layout/TwoColumnLayout/config";
import { googleMapsEmbedConfig } from "./Embed/GoogleMapsEmbed/config";
import { verticalSpacerConfig } from "./Layout/VerticalSpacer/config";
import { richTextBlockConfig } from "./Content/RichTextBlock/config";
import { headingBlockConfig } from "./Content/HeadingBlock/config";
import { imageWithTextConfig } from "./Media/ImageWithText/config";
import { imageWithSlotConfig } from "./Media/ImageWithSlot/config";
import { accordionBlockConfig } from "./Content/Accordion/config";
import { youtubeEmbedConfig } from "./Embed/YoutubeEmbed/config";
import { buttonLinkConfig } from "./Actions/ButtonLink/config";
import { singleImageConfig } from "./Media/SingleImage/config";
import { sliderBlockConfig } from "./Media/SliderBlock/config";
import { linkBarConfig } from "./Actions/LinkBar/config";
import { galleryConfig } from "./Media/Gallery/config";

export const components = {
  TwoColumnLayout: twoColumnLayoutConfig,
  ThreeColumnLayout: threeColumnLayoutConfig,
  FourColumnLayout: fourColumnLayoutConfig,
  VerticalSpacer: verticalSpacerConfig,
  HeadingBlock: headingBlockConfig,
  RichTextBlock: richTextBlockConfig,
  AccordionBlock: accordionBlockConfig,
  SingleAccordion: singleAccordionConfig,
  CombinationLock: combinationLockConfig,
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
};
