import { useCallback, useRef } from "react";

import { GameState } from "@/types/GameState";
import { Target } from "@/types/Target";
import { encodeBoardData } from "./encodeBoardData";
import { encodeGameStateDiff } from "./encodeGameStateDiff";
import { encodeInteraction } from "./encodeInteraction";
import { encodeReplayKey } from "./encodeReplayKey";
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

    replayDataRef.current += encodeTime(time) + encodeInteraction(target);
  }, []);

  const recordGameState = useCallback((gameState: GameState) => {
    if (!prevGameStateRef.current) {
      replayDataRef.current = encodeBoardData(gameState);
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
      replayDataRef.current += "W";
    }

    if (hasLost) {
      replayDataRef.current += "L";
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
    const encodedKey = encodeReplayKey(startTimeRef.current.toString());
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
      JSON.stringify(Array.from(new Set([...existingKeys, encodedKey])))
    );

    window.localStorage.setItem(encodedKey, data);
  }, [getReplayData]);

  return {
    recordInteraction,
    recordGameState,
    getReplayData,
    saveReplayData,
    resetReplayData,
  };
}
