"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Center } from "@/components/layout/Center";
import { GameStatic } from "@/components/game/GameStatic";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Slider } from "@/components/slider/Slider";
import { Timer } from "@/components/game/Timer";
import { decodeReplayData } from "@/game/replay/decodeReplayData";
import { now } from "@/helpers/now";
import { usePointerUp } from "@/hooks/usePointerUp";
import { useReplaySpeed } from "@/game/replay/useReplaySpeed";

const MIN_TIME = -1;

export type GameVideoProps = {
  replayData: string;
};

export function GameVideo({ replayData }: GameVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  const { replaySpeed, toggleReplaySpeed } = useReplaySpeed();

  usePointerUp(() => {
    setIsScrubbing(false);
    frameTimeRef.current = now();
  });

  const [currentTime, setCurrentTime] = useState(MIN_TIME);
  const frameTimeRef = useRef<number>();

  const togglePlay = () => {
    if (currentTime >= maxTime) {
      setCurrentTime(0);
    }

    if (!isPlaying) {
      startPlaying();
      return;
    }

    stopPlaying();
  };

  const startPlaying = () => {
    setIsPlaying(true);
    frameTimeRef.current = now();
  };

  const stopPlaying = () => {
    setIsPlaying(false);
    frameTimeRef.current = undefined;
  };

  const { levelDataByTime, targetsByTime } = useMemo(() => {
    if (!replayData) {
      return { levelDataByTime: {}, targetsByTime: {} };
    }

    return decodeReplayData(replayData);
  }, [replayData]);

  const times = Object.keys(levelDataByTime)
    .map(Number)
    .sort((a, b) => a - b);

  const maxTime = times.at(MIN_TIME) ?? 0;

  let keyTime = MIN_TIME;
  for (const time of times) {
    if (time > currentTime) {
      break;
    }

    keyTime = time;
  }

  const levelData = levelDataByTime?.[keyTime];
  const highlightedCellId = targetsByTime?.[keyTime];

  useEffect(() => {
    if (!isPlaying || isScrubbing) {
      return;
    }

    if (currentTime >= maxTime) {
      stopPlaying();
      return;
    }

    const id = requestAnimationFrame(() => {
      const frameTime = frameTimeRef.current;

      frameTimeRef.current = now();

      if (typeof frameTime === "undefined") {
        return;
      }

      const frameDuration = now() - frameTime;
      const delta = frameDuration * replaySpeed;

      setCurrentTime((currentTime) => currentTime + delta);
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [isPlaying, isScrubbing, currentTime, maxTime, replaySpeed]);

  if (!levelData) {
    return <div>Failed to load!</div>;
  }

  return (
    <Center>
      <div className="grid gap-4 grid-cols-[1fr,min-content,1fr] mb-8 w-full items-center">
        <div className="min-w-14 justify-self-start items-center flex space-x-4">
          <button onClick={togglePlay}>
            {!isPlaying && <PlayIcon className="size-8 fill-fg-100" />}
            {isPlaying && <PauseIcon className="size-8 fill-fg-100" />}
          </button>

          <button
            className="text-fg-50 font-bold select-none"
            onClick={toggleReplaySpeed}
          >
            {replaySpeed}x
          </button>
        </div>

        <div onPointerDown={() => setIsScrubbing(true)}>
          <Slider
            min={MIN_TIME}
            max={maxTime}
            onValueChange={setCurrentTime}
            value={currentTime}
          />
        </div>
        <div className="min-w-14 justify-self-end">
          <Timer seconds={Math.max(0, currentTime / 1000)} />
        </div>
      </div>

      <div onClick={togglePlay}>
        <GameStatic
          levelData={levelData}
          highlightedCellId={highlightedCellId}
          allowInvalid
        />
      </div>
    </Center>
  );
}
