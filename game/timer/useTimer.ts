"use client";

import { useCallback, useEffect, useState } from "react";

const getTimestamp = () => performance.now() / 10;

export function useTimer() {
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
    if (!isRunning) {
      return;
    }

    setSeconds((getTimestamp() - startTimestamp) / 100);
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
