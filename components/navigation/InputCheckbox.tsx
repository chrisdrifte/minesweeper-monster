"use client";

import classNames from "classnames";
import { noop } from "@/helpers/noop";
import { spaceMono } from "@/app/fonts";

export type InputCheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export function InputCheckbox({
  checked = false,
  onChange = noop,
}: React.PropsWithChildren<InputCheckboxProps>) {
  return (
    <input
      className={classNames(
        spaceMono.className,
        "text-right size-8 text-lg accent-fg-50 rounded-sm py-2 px-4"
      )}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.currentTarget.checked)}
    />
  );
}
