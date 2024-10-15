"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Center } from "@/components/layout/Center";
import { GameStatic } from "@/components/game/GameStatic";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Slider } from "@/components/slider/Slider";
import { Timer } from "@/components/game/Timer";
import { createCellId } from "@/helpers/createCellId";
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
      setTime(0);
      setCutoff(0);
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

  const [cutoff, setCutoff] = useState(0);

  const { levelDataByTime, interactionsByTime } = useMemo(() => {
    if (!replayData) {
      return { levelDataByTime: {}, interactionsByTime: {} };
    }

    return decodeReplayData(replayData);
  }, [replayData]);

  const levelDataTimes = Object.keys(levelDataByTime)
    .map(Number)
    .sort((a, b) => a - b);

  const maxTime = levelDataTimes.at(-1) ?? 0;

  let keyTime = MIN_TIME;
  for (const time of levelDataTimes) {
    if (time > currentTime) {
      break;
    }

    keyTime = time;
  }

  const levelData = levelDataByTime?.[keyTime];

  const setTime = useCallback(
    (time: number) => {
      setCurrentTime(time);

      if (currentTime < time) {
        return;
      }

      const cutoff = Object.keys(interactionsByTime)
        .map(Number)
        .sort((a, b) => a - b)
        .filter((time) => time < currentTime).length;

      setCutoff(cutoff);
    },
    [currentTime, interactionsByTime]
  );

  // make it feel more natural by animating the interaction just before the
  // state change, so the viewer can register cause and effect more easily
  const artificialInteractionDelay = currentTime >= 0 ? 75 : 0;

  const interactionTimes = Object.keys(interactionsByTime)
    .map(Number)
    .sort((a, b) => a - b);

  const visibleInteractions = interactionTimes
    .filter((time) => time < currentTime + artificialInteractionDelay)
    .map((time) => interactionsByTime[time])
    .slice(cutoff);

  const cursor =
    interactionsByTime[
      interactionTimes.reduce((prevTime, currTime) => {
        if (currTime - 200 < currentTime) return currTime;
        return prevTime;
      }, -1)
    ];

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

      setTime(Math.min(currentTime + delta, maxTime));
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [isPlaying, isScrubbing, currentTime, maxTime, replaySpeed, setTime]);

  const { width, height } = useMemo(() => {
    const rows = levelData.split("\n");
    const cols = rows[0].split("");

    return {
      width: cols.length,
      height: rows.length - 1,
    };
  }, [levelData]);

  console.log({ width, height });

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
            onValueChange={setTime}
            value={currentTime}
          />
        </div>
        <div className="min-w-14 justify-self-end">
          <Timer seconds={Math.max(0, currentTime / 1000)} />
        </div>
      </div>

      <div className="relative" onClick={togglePlay}>
        <GameStatic levelData={levelData} allowInvalid />

        <div
          className="opacity-50 absolute left-0 top-0 rounded-sm size-8 transition-transform duration-200 ease-in-out"
          style={{
            transform: `translate(${cursor.x * 32 + 12}px, ${
              cursor.y * 32 + 12
            }px)`,
          }}
        >
          <div
            key={createCellId(cursor)}
            className="animate-spectral bg-fg-alt size-full duration-300"
          ></div>
        </div>

        {!!visibleInteractions.length && (
          <div className="size-full absolute top-0 left-0">
            {visibleInteractions.map((interaction) => (
              <div
                key={createCellId(interaction)}
                className="animate-interact border-4 border-highlight-click absolute rounded-sm size-7"
                style={{
                  left: `${interaction.x * 32 + 14}px`,
                  top: `${interaction.y * 32 + 14}px`,
                }}
                onAnimationEnd={() => {
                  setCutoff((n) => n + 1);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Center>
  );
}
