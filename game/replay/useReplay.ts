import { useCallback, useRef } from "react";

import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { encodeGameStateDiff } from "./encodeGameStateDiff";
import { encodeInitialGameState } from "./encodeInitialGameState";
import { encodeTarget } from "./encodeTarget";
import { encodeTime } from "./encodeTime";

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

    prevGameStateRef.current = gameState;
  }, []);

  const getReplayData = useCallback(() => {
    return replayDataRef.current;
  }, []);

  return {
    recordInteraction,
    recordGameState,
    getReplayData,
    resetReplayData,
  };
}
