"use client";

import classNames from "classnames";
import { spaceMono } from "@/app/fonts";

export type TimerProps = {
  seconds: number;
};

export function Timer({ seconds }: TimerProps) {
  return (
    <div className={classNames(spaceMono.className)}>{seconds.toFixed(3)}</div>
  );
}
