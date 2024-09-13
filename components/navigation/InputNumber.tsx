"use client";

import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type InputNumberProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function InputNumber({
  value = "0",
  onChange = noop,
}: React.PropsWithChildren<InputNumberProps>) {
  return (
    <input
      className={classNames(
        spaceMono.className,
        "text-center w-16 text-lg text-fg-100 bg-bg border-2 border-fg-100 rounded-sm py-2 px-4"
      )}
      maxLength={2}
      type="text"
      inputMode="numeric"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}
