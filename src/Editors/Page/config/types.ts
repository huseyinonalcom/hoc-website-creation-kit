import type { ChangeEvent, ComponentType } from "react";

import type { TwoColumnLayoutProps } from "../components/Layout/TwoColumnLayout/type";
import type { ThreeColumnLayoutProps } from "../components/Layout/ThreeColumnLayout/type";
import type { FourColumnLayoutProps } from "../components/Layout/FourColumnLayout/type";
import type { VerticalSpacerProps } from "../components/Layout/VerticalSpacer/type";
import type { HeadingBlockProps } from "../components/Content/HeadingBlock/type";
import type { RichTextBlockProps } from "../components/Content/RichTextBlock/type";
import type { AccordionBlockData } from "../components/Content/AccordionBlock/type";
import type { SingleAccordionProps } from "../components/Content/SingleAccordion/type";
import type { SingleImageProps } from "../components/Media/SingleImage/type";
import type { ImageWithTextProps } from "../components/Media/ImageWithText/type";
import type { ImageWithSlotProps } from "../components/Media/ImageWithSlot/type";
import type { ImageOverlayTextProps } from "../components/Media/ImageOverlayText/type";
import type { SliderBlockProps } from "../components/Media/SliderBlock/type";
import type { SliderShowcaseBlockProps } from "../components/Media/SliderShowcaseBlock/type";
import type { GalleryProps } from "../components/Media/Gallery/type";
import type { LinkBarProps } from "../components/Actions/LinkBar/type";
import type { ButtonLinkProps } from "../components/Actions/ButtonLink/type";
import type { YoutubeEmbedProps } from "../components/Embed/YoutubeEmbed/type";
import type { GoogleMapsEmbedProps } from "../components/Embed/GoogleMapsEmbed/type";

export type { BaseComponentProps } from "../components/type";

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
