"use client";

import { useEffect, useMemo, useState } from "react";

import { Center } from "@/components/layout/Center";
import { GameStatic } from "@/components/game/GameStatic";
import { PauseIcon } from "@/components/icons/PauseIcon";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Slider } from "@/components/slider/Slider";
import { Timer } from "@/components/game/Timer";
import { decodeReplayData } from "@/game/replay/decodeReplayData";
import { usePointerUp } from "@/hooks/usePointerUp";

const MIN_TIME = -1;

export type GameVideoProps = {
  replayData: string;
};

export function GameVideo({ replayData }: GameVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(1);

  const [isScrubbing, setIsScrubbing] = useState(false);
  usePointerUp(() => setIsScrubbing(false));

  const [currentTime, setCurrentTime] = useState(MIN_TIME);

  const togglePlay = () => {
    if (currentTime >= maxTime) {
      setCurrentTime(0);
    }

    setIsPlaying((isPlaying) => !isPlaying);
  };

  const togglePlaySpeed = () => {
    const speeds = [1, 2, 3];

    setPlaySpeed(
      (playSpeed) => speeds[speeds.indexOf(playSpeed) + 1] || speeds[0]
    );
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
      setIsPlaying(false);
      return;
    }

    const id = requestAnimationFrame(() => {
      const delta = 40 * playSpeed;

      setCurrentTime((currentTime) => (currentTime += delta));
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [isPlaying, isScrubbing, currentTime, maxTime]);

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

          <button className="text-fg-50 font-bold" onClick={togglePlaySpeed}>
            {playSpeed}x
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
