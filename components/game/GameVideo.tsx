"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BoardWrapper } from "./BoardWrapper";
import { Center } from "@/components/layout/Center";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { RenderCell } from "../cells/RenderCell";
import { Slider } from "@/components/slider/Slider";
import { Timer } from "@/components/game/Timer";
import { decodeReplayData } from "@/game/replay/decodeReplayData";
import { loadGameState } from "@/helpers/loadGameState";
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

  const gameState = useMemo(() => {
    return loadGameState(levelData, undefined, true);
  }, [levelData]);

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

  // make it feel more natural by animating the scroll just before the
  // state change, so animation finishes instead of starts at the scroll time
  const artificialCursorDelay = currentTime >= 0 ? 300 : 0;

  // make it feel more natural by animating the scroll just before the
  // state change, so animation finishes instead of starts at the scroll time
  const artificialScrollDelay = currentTime >= 0 ? 100 : 0;

  const clickTimes = Object.keys(interactionsByTime)
    .map(Number)
    .filter((key) => interactionsByTime[key].type === "click")
    .sort((a, b) => a - b);

  const scrollTimes = Object.keys(interactionsByTime)
    .map(Number)
    .filter((key) => interactionsByTime[key].type === "scroll")
    .sort((a, b) => a - b);

  const visibleInteractions = clickTimes
    .filter((time) => time < currentTime + artificialInteractionDelay)
    .map((time) => interactionsByTime[time])
    .slice(cutoff);

  const cursor =
    interactionsByTime[
      clickTimes.reduce((prevTime, currTime) => {
        if (currTime < currentTime + artificialCursorDelay) return currTime;
        return prevTime;
      }, -1)
    ];

  const scroll = interactionsByTime[
    scrollTimes.reduce((prevTime, currTime) => {
      if (currTime < currentTime + artificialScrollDelay) return currTime;
      return prevTime;
    }, -1)
  ] ?? { x: 0, y: 0 };

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

      <div onClick={togglePlay}>
        <BoardWrapper
          width={gameState.width}
          height={gameState.height}
          scroll={scroll}
          cursor={currentTime > 0 && isPlaying ? cursor : undefined}
          isInteractive={false}
          interactions={visibleInteractions}
          onInteractionEnd={() => {
            setCutoff((n) => n + 1);
          }}
        >
          {gameState.cells.map((cell) => (
            <RenderCell key={cell.id} cell={cell} />
          ))}
        </BoardWrapper>
      </div>
    </Center>
  );
}
