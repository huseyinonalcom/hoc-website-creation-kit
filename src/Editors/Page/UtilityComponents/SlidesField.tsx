"use client";

import type { ComponentType } from "react";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import { Button } from "../../../Components/Simple/Button";
import { RichTextEditor } from "../../Text/Editor";

export type SlideProps = {
  imageUrl?: string;
  text?: string;
};

type SlideImageFieldProps = {
  value?: string;

  onChange: (next: string) => void;
};

type SlidesFieldProps = {
  value?: SlideProps[];

  onChange: (next: SlideProps[]) => void;
  ImageField: ComponentType<SlideImageFieldProps>;
  componentName: string;
};

const sanitizeSlides = (raw: unknown): SlideProps[] | null => {
  if (!Array.isArray(raw)) {
    return null;
  }

  return raw.map((slide) => ({
    imageUrl: typeof slide?.imageUrl === "string" ? slide.imageUrl : "",
    text: typeof slide?.text === "string" ? slide.text : "",
  }));
};

export function SlidesField({ value, onChange, ImageField }: SlidesFieldProps) {
  const slides = sanitizeSlides(value) ?? [];

  const updateSlide = (index: number, payload: Partial<SlideProps>) => {
    const cloned = [...slides];
    const nextSlide = { ...cloned[index], ...payload };
    cloned[index] = nextSlide;
    onChange(cloned);
  };

  const handleAddSlide = () => {
    onChange([...slides, { imageUrl: "", text: "" }]);
  };

  const handleRemoveSlide = (index: number) => {
    const cloned = slides.filter((_, idx) => idx !== index);
    onChange(cloned);
  };

  const handleMoveSlide = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= slides.length) {
      return;
    }

    const cloned = [...slides];
    const [moved] = cloned.splice(fromIndex, 1);
    cloned.splice(toIndex, 0, moved);
    onChange(cloned);
  };

  return (
    <div className="space-y-4">
      {slides.map((slide, index) => (
        <div
          key={`slider-slide-${index}`}
          className="rounded-2xl border border-gray-200 p-4"
        >
          <div className="space-y-4">
            <div>
              <ImageField
                value={typeof slide.imageUrl === "string" ? slide.imageUrl : ""}
                onChange={(next) => updateSlide(index, { imageUrl: next })}
              />
            </div>
            <div>
              <RichTextEditor
                key={`slider-slide-text-${index}`}
                initialData={slide.text ?? ""}
                onChange={(data) => updateSlide(index, { text: data })}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <Button
                  disabled={index === 0}
                  type="button"
                  variant="ghost"
                  onClick={() => handleMoveSlide(index, index - 1)}
                >
                  <ChevronUpIcon className="h-4 w-4" />
                </Button>
                <Button
                  disabled={index === slides.length - 1}
                  type="button"
                  variant="ghost"
                  onClick={() => handleMoveSlide(index, index + 1)}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
              </div>
              <Button
                className="text-sm text-red-600 hover:text-red-700"
                type="button"
                variant="ghost"
                onClick={() => handleRemoveSlide(index)}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        className="w-full"
        type="button"
        variant="outline"
        onClick={handleAddSlide}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
