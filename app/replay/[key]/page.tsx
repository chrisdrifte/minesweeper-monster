"use client";

import { useEffect, useMemo, useState } from "react";

import { Center } from "@/components/layout/Center";
import { GameStatic } from "@/components/game/GameStatic";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { Slider } from "@/components/slider/Slider";
import { Timer } from "@/components/game/Timer";
import { decodeReplayData } from "@/game/replay/decodeReplayData";
import { encodeReplayKey } from "@/game/replay/encodeReplayKey";

const MIN_TIME = -1;

export type ReplayPageProps = {
  params: { key: string };
};

export default function ReplayPage({ params }: ReplayPageProps) {
  const { key } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [replayData, setReplayData] = useState<string>();
  const [currentTime, setCurrentTime] = useState(MIN_TIME);

  useEffect(() => {
    const encodedKey = encodeReplayKey(key);
    const savedReplayData = window.localStorage.getItem(encodedKey);

    if (!savedReplayData) {
      return;
    }

    setIsLoading(false);
    setReplayData(savedReplayData);
    setCurrentTime(MIN_TIME);
  }, [key]);

  const togglePlay = () => {
    if (currentTime >= maxTime) {
      setCurrentTime(0);
    }

    setIsPlaying((isPlaying) => !isPlaying);
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
    if (!isPlaying) {
      return;
    }

    if (currentTime >= maxTime) {
      setIsPlaying(false);
      return;
    }

    const id = requestAnimationFrame(() => {
      setCurrentTime((currentTime) => (currentTime += 40));
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [isPlaying, currentTime, maxTime]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!levelData) {
    return <div>Failed to load!</div>;
  }

  return (
    <Center>
      <div className="grid gap-4 grid-cols-[1fr,min-content] mb-8 w-full">
        <div className="self-center justify-self-start text-sm text-fg-50 font-bold flex items-center space-x-4">
          <button onClick={togglePlay}>
            <PlayIcon className="size-8 fill-fg-100" />
          </button>

          <Slider
            min={MIN_TIME}
            max={maxTime}
            onValueChange={setCurrentTime}
            value={currentTime}
          />
        </div>
        <div className="self-center justify-self-end">
          <Timer seconds={Math.max(0, currentTime / 1000)} />
        </div>
      </div>

      <GameStatic
        levelData={levelData}
        highlightedCellId={highlightedCellId}
        allowInvalid
      />
    </Center>
  );
}
