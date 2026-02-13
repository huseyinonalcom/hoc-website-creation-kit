import type { ChangeEvent, ComponentType } from "react";

import type { TwoColumnLayoutProps } from "../Components/Layout/TwoColumnLayout/type";
import type { ThreeColumnLayoutProps } from "../Components/Layout/ThreeColumnLayout/type";
import type { FourColumnLayoutProps } from "../Components/Layout/FourColumnLayout/type";
import type { VerticalSpacerProps } from "../Components/Layout/VerticalSpacer/type";
import type { HeadingBlockProps } from "../Components/Content/HeadingBlock/type";
import type { RichTextBlockProps } from "../Components/Content/RichTextBlock/type";
import type { AccordionBlockData } from "../Components/Content/AccordionBlock/type";
import type { SingleAccordionProps } from "../Components/Content/SingleAccordion/type";
import type { SingleImageProps } from "../Components/Media/SingleImage/type";
import type { ImageWithTextProps } from "../Components/Media/ImageWithText/type";
import type { ImageWithSlotProps } from "../Components/Media/ImageWithSlot/type";
import type { ImageOverlayTextProps } from "../Components/Media/ImageOverlayText/type";
import type { SliderBlockProps } from "../Components/Media/SliderBlock/type";
import type { SliderShowcaseBlockProps } from "../Components/Media/SliderShowcaseBlock/type";
import type { GalleryProps } from "../Components/Media/Gallery/type";
import type { LinkBarProps } from "../Components/Actions/LinkBar/type";
import type { ButtonLinkProps } from "../Components/Actions/ButtonLink/type";
import type { YoutubeEmbedProps } from "../Components/Embed/YoutubeEmbed/type";
import type { GoogleMapsEmbedProps } from "../Components/Embed/GoogleMapsEmbed/type";

export type { BaseComponentProps } from "../Components/type";

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
