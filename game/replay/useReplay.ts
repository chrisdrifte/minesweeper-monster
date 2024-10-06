import { useCallback, useRef } from "react";

import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { encodeGameStateDiff } from "./encodeGameStateDiff";
import { encodeInitialGameState } from "./encodeInitialGameState";
import { encodeTarget } from "./encodeTarget";
import { encodeTime } from "./encodeTime";
import { isLoseState } from "@/helpers/isLoseState";
import { isWinState } from "@/helpers/isWinState";

export function useGameRecorder() {
  const prevGameStateRef = useRef<GameState>();
  const startTimeRef = useRef<number>();
  const replayDataRef = useRef<string>();

  const resetReplayData = useCallback(() => {
    prevGameStateRef.current = undefined;
    startTimeRef.current = undefined;
    replayDataRef.current = undefined;
  }, []);

  const recordInteraction = useCallback((target: Target) => {
    const startTime = startTimeRef.current;

    const now = new Date().getTime();
    const time = now - (startTime ?? now);

    if (!startTime) {
      startTimeRef.current = now;
    }

    replayDataRef.current += encodeTime(time) + encodeTarget(target);
  }, []);

  const recordGameState = useCallback((gameState: GameState) => {
    if (!prevGameStateRef.current) {
      replayDataRef.current = encodeInitialGameState(gameState);
    }

    if (prevGameStateRef.current) {
      replayDataRef.current += encodeGameStateDiff(
        prevGameStateRef.current,
        gameState
      );
    }

    const hasWon = isWinState(gameState);
    const hasLost = isLoseState(gameState);

    if (hasWon) {
      replayDataRef.current += "WIN";
    }

    if (hasLost) {
      replayDataRef.current += "LOSE";
    }

    if (hasWon || hasLost) {
      saveReplayData();
    }

    prevGameStateRef.current = gameState;
  }, []);

  const getReplayData = useCallback(() => {
    const time = startTimeRef.current;
    const replayData = replayDataRef.current;

    if (!time || !replayData) {
      return;
    }

    const version = "V1";
    const date = new Date(time).toISOString();

    return `${version};${date};${replayData}`;
  }, []);

  const saveReplayData = useCallback(() => {
    if (!startTimeRef.current) {
      return;
    }

    const indexKey = "replayDataKeys";
    const dataKey = `replayData:${startTimeRef.current.toString()}`;
    const data = getReplayData();

    if (!data) {
      return;
    }

    let existingKeys = [];

    try {
      existingKeys = JSON.parse(window.localStorage.getItem(indexKey) ?? "");
    } catch (err) {
      // do nothing
    }

    window.localStorage.setItem(
      indexKey,
      JSON.stringify(Array.from(new Set([...existingKeys, dataKey])))
    );

    window.localStorage.setItem(dataKey, data);
  }, [getReplayData]);

  return {
    recordInteraction,
    recordGameState,
    getReplayData,
    saveReplayData,
    resetReplayData,
  };
}
