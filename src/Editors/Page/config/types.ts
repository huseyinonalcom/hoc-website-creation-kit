import type { ChangeEvent, ComponentType } from "react";

import type { SliderShowcaseBlockProps } from "../Componentsa/Media/SliderShowcaseBlock/type";
import type { ThreeColumnLayoutProps } from "../Componentsa/Layout/ThreeColumnLayout/type";
import type { FourColumnLayoutProps } from "../Componentsa/Layout/FourColumnLayout/type";
import type { SingleAccordionProps } from "../Componentsa/Content/SingleAccordion/type";
import type { ImageOverlayTextProps } from "../Componentsa/Media/ImageOverlayText/type";
import type { CombinationLockProps } from "../Componentsa/Content/CombinationLock/type";
import type { TwoColumnLayoutProps } from "../Componentsa/Layout/TwoColumnLayout/type";
import type { GoogleMapsEmbedProps } from "../Componentsa/Embed/GoogleMapsEmbed/type";
import type { VerticalSpacerProps } from "../Componentsa/Layout/VerticalSpacer/type";
import type { AccordionBlockData } from "../Componentsa/Content/AccordionBlock/type";
import type { RichTextBlockProps } from "../Componentsa/Content/RichTextBlock/type";
import type { HeadingBlockProps } from "../Componentsa/Content/HeadingBlock/type";
import type { ImageWithTextProps } from "../Componentsa/Media/ImageWithText/type";
import type { ImageWithSlotProps } from "../Componentsa/Media/ImageWithSlot/type";
import type { YoutubeEmbedProps } from "../Componentsa/Embed/YoutubeEmbed/type";
import type { SingleImageProps } from "../Componentsa/Media/SingleImage/type";
import type { SliderBlockProps } from "../Componentsa/Media/SliderBlock/type";
import type { ButtonLinkProps } from "../Componentsa/Actions/ButtonLink/type";
import type { LinkBarProps } from "../Componentsa/Actions/LinkBar/type";
import type { GalleryProps } from "../Componentsa/Media/Gallery/type";

export type { BaseComponentProps } from "../Componentsa/type";

export type BaseRootProps = {
  title?: string;
  description?: string;
};

export type BaseEditorProps = {
  TwoColumnLayout: TwoColumnLayoutProps;
  ThreeColumnLayout: ThreeColumnLayoutProps;
  FourColumnLayout: FourColumnLayoutProps;
  VerticalSpacer: VerticalSpacerProps;
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
  AccordionBlock: AccordionBlockData;
  SingleAccordion: SingleAccordionProps;
  CombinationLock: CombinationLockProps;
  SingleImage: SingleImageProps;
  ImageWithText: ImageWithTextProps;
  ImageWithSlot: ImageWithSlotProps;
  ImageOverlayText: ImageOverlayTextProps;
  SliderBlock: SliderBlockProps;
  SliderShowcaseBlock: SliderShowcaseBlockProps;
  Gallery: GalleryProps;
  LinkBar: LinkBarProps;
  ButtonLink: ButtonLinkProps;
  YoutubeEmbed: YoutubeEmbedProps;
  GoogleMapsEmbed: GoogleMapsEmbedProps;
};

export type FormInputFieldProps = {
  label?: string;
  className?: string;
  type?: string;
  value?: string | number;
  min?: number;
  step?: number;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type FormInputFieldComponent = ComponentType<FormInputFieldProps>;
