"use client";

import { useCallback, useEffect, useState } from "react";

import { now } from "@/helpers/now";

export function useTimer(isEnabled = true) {
  const [startTimestamp, setStartTimestamp] = useState(now);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const start = useCallback(() => {
    setStartTimestamp(now);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  const set = useCallback((seconds: number) => {
    setSeconds(seconds);
    setIsRunning(false);
  }, []);

  const [frame, setFrame] = useState({});
  const nextFrame = () => setFrame({});

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    if (!isRunning) {
      return;
    }

    setSeconds((now() - startTimestamp) / 1000);
    const id = requestAnimationFrame(nextFrame);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [frame, isRunning]);

  return {
    seconds,
    start,
    stop,
    reset,
    set,
  };
}
