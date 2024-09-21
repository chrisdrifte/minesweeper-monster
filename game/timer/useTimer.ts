"use client";

import { useCallback, useEffect, useState } from "react";

const getTimestamp = () => performance.now();

export function useTimer(isEnabled = true) {
  const [startTimestamp, setStartTimestamp] = useState(getTimestamp);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const start = useCallback(() => {
    setStartTimestamp(getTimestamp);
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

    setSeconds((getTimestamp() - startTimestamp) / 1000);
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
