"use client";

import { useCallback, useEffect, useState } from "react";

import { DailySolution } from "./types/DailySolution";
import { getFormattedTimeToNextDailyPuzzle } from "./getFormattedTimeToNextDailyPuzzle";

export function useFormattedTimeToNextDailyPuzzle(
  dailySolutionSeed?: DailySolution["seed"]
) {
  const updateTime = useCallback(
    () =>
      setFormattedTime(getFormattedTimeToNextDailyPuzzle(dailySolutionSeed)),
    [dailySolutionSeed]
  );

  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [updateTime]);

  return formattedTime;
}
