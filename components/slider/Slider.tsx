"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

import React from "react";
import classNames from "classnames";
import { noop } from "@/helpers/noop";

export type SliderProps = {
  min: number;
  max: number;
  value: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
};

export function Slider({
  min,
  max,
  value,
  onValueChange = noop,
  onValueCommit = noop,
}: SliderProps) {
  return (
    <SliderPrimitive.Root
      min={min}
      max={max}
      value={[value]}
      onValueChange={([value]) => onValueChange(value)}
      onValueCommit={([value]) => onValueCommit(value)}
      step={1}
      aria-label="value"
      className="relative flex h-5 w-64 touch-none items-center"
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-500">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-white" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={classNames(
          "block h-5 w-5 rounded-full bg-white cursor-grab active:cursor-grabbing",
          "focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75"
        )}
      />
    </SliderPrimitive.Root>
  );
}
