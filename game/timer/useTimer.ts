"use client";

import { useEffect, useRef, useState } from "react";

const getTimestamp = () => performance.now() / 10;

export function useTimer() {
  const [startTimestamp, setStartTimestamp] = useState(getTimestamp);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const start = () => {
    setStartTimestamp(getTimestamp);
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const set = (seconds: number) => {
    setSeconds(seconds);
    setIsRunning(false);
  };

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
