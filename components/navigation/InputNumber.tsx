"use client";

import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type InputNumberProps = {
  value?: number;
  onChange?: (value: number) => void;
};

export function InputNumber({
  value = 0,
  onChange = noop,
}: React.PropsWithChildren<InputNumberProps>) {
  return (
    <input
      className={classNames(
        spaceMono.className,
        "text-center w-16 text-lg text-white bg-black border-2 border-white rounded-sm py-2 px-4"
      )}
      type="text"
      value={value}
      onChange={(e) => onChange(e.currentTarget.valueAsNumber)}
    />
  );
}
