"use client";

import { useMemo, useState } from "react";

import { Action } from "@/types/Action";
import { BoardWrapper } from "./BoardWrapper";
import { RenderCell } from "./RenderCell";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { loadGameState } from "@/helpers/loadGameState";

export type GameReplayProps = {
  levelData: string;
  steps?: Action[];
};

export function GameReplay({ levelData, steps = [] }: GameReplayProps) {
  const hasSteps = steps.length > 0;

  const minStep = -1;
  const maxStep = steps.length - 1;

  const [currentStep, setStep] = useState(minStep);

  const firstStep = () => setStep(minStep);
  const prevStep = () => setStep((step) => Math.max(minStep, step - 1));
  const nextStep = () => setStep((step) => Math.min(maxStep, step + 1));
  const lastStep = () => setStep(maxStep);

  const gameState = useMemo(() => {
    let _gameState = loadGameState(levelData);

    const stepsToApply = currentStep < 0 ? [] : steps.slice(0, currentStep + 1);
    for (const stepToApply of stepsToApply) {
      switch (stepToApply.type) {
        case "dig":
          _gameState = dig(_gameState, stepToApply.target);
          break;

        case "flag":
          _gameState = flag(_gameState, stepToApply.target);
          break;
      }
    }

    return _gameState;
  }, [levelData, currentStep]);

  return (
    <div>
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell cell={cell} />
        ))}
      </BoardWrapper>
      {hasSteps && (
        <div>
          <div>
            Step {currentStep + 2}/{maxStep + 2}
          </div>
          <button onClick={firstStep}>⏮️</button>
          <button onClick={prevStep}>⏪</button>
          <button onClick={nextStep}>⏩</button>
          <button onClick={lastStep}>⏭️</button>
        </div>
      )}
    </div>
  );
}
