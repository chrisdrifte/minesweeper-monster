"use client";

import { useEffect, useMemo, useState } from "react";

import { Center } from "@/components/layout/Center";
import { GameStatic } from "@/components/game/GameStatic";
import { Slider } from "@/components/slider/Slider";
import { Target } from "@/types/Target";
import { Timer } from "@/components/game/Timer";

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
    const dataKey = `replayData:${key}`;
    const savedReplayData = window.localStorage.getItem(dataKey);

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

  const levelDataByTime = useMemo(() => {
    if (!replayData) {
      return {};
    }

    return toPlayableData(replayData);
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
        <div className="self-center justify-self-start text-sm text-fg-50 font-bold">
          Game Replay
        </div>
        <div className="self-center justify-self-end">
          <Timer seconds={Math.max(0, currentTime / 1000)} />
        </div>
      </div>

      <GameStatic levelData={levelData} allowInvalid />

      <button onClick={togglePlay}>Play</button>

      <Slider
        min={MIN_TIME}
        max={maxTime}
        onValueChange={setCurrentTime}
        value={currentTime}
      />
    </Center>
  );
}

function toPlayableData(replayData: string) {
  const replayDataParts = replayData.split(";");
  const version = replayDataParts[0];
  const data = replayDataParts[2];

  if (version !== "V1") {
    throw new Error("Unsupported version");
  }

  let mode = "";
  let mem = "";

  type BoardData = { width: number; height: number; numMines: number };
  type ChangedCell = { x: number; y: number; value: string };

  let boardData: BoardData | undefined;

  let target: Target | undefined;

  let time = 0;

  let changedCells: ChangedCell[] = [];

  const readMem = (mem: string, mode: string) => {
    switch (mode) {
      case "!": {
        const [width, height, ...numMines] = mem;

        boardData = {
          width: decodeNumber(width),
          height: decodeNumber(height),
          numMines: decodeNumber(numMines),
        };

        break;
      }

      case "@": {
        const [x, y] = mem;
        target = { x: decodeNumber(x), y: decodeNumber(y) };
        break;
      }

      case "#": {
        time = decodeNumber(mem);
        break;
      }

      case "$": {
        const [value, x, y] = mem;
        const cell = {
          x: decodeNumber(x),
          y: decodeNumber(y),
          value,
        };

        changedCells.push(cell);
        break;
      }
    }
  };

  const levelDataByTime: Record<number, string> = {};
  const targetsByTime: Record<number, Target> = {};

  let prevLevelData: string | undefined;

  const makeFrame = ({
    boardData,
    target,
    time,
    changedCells,
  }: {
    boardData: BoardData;
    target: Target;
    time: number;
    changedCells: ChangedCell[];
  }) => {
    if (!prevLevelData) {
      prevLevelData = `${"X".repeat(boardData.width)}\n`.repeat(
        boardData.height
      );
      levelDataByTime[MIN_TIME] = prevLevelData;
    }

    const levelData2dArray = prevLevelData
      .split("\n")
      .map((row) => row.split(""));

    for (const changedCell of changedCells) {
      levelData2dArray[changedCell.y][changedCell.x] = changedCell.value;
    }

    const levelData = levelData2dArray.map((row) => row.join("")).join("\n");

    levelDataByTime[time] = levelData;
    targetsByTime[time] = target;

    prevLevelData = levelData;
  };

  for (let i = 0; i < data.length; i++) {
    const head = data[i];

    switch (head) {
      default:
        mem += head;
        break;

      case "!":
      case "@":
      case "#":
      case "$":
      case "W":
      case "L": {
        if (changedCells.length) {
          if (mode !== "$" || head === "W" || head === "L") {
            if (!boardData || !target) {
              throw new Error("Invalid replay data");
            }

            makeFrame({ boardData, target, time, changedCells });

            target = undefined;
            time += 1;
            changedCells = [];
          }
        }

        if (mem) {
          readMem(mem, mode);
        }

        mode = head;
        mem = "";
      }
    }
  }

  if (mem) {
    throw new Error("Invalid replay data");
  }

  return levelDataByTime;
}

function decodeNumber(n: string | string[]) {
  return parseInt(Array.isArray(n) ? n.join("") : n, 36);
}
