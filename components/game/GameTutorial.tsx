"use client";

import { useMemo, useState } from "react";

import { Action } from "@/types/Action";
import { BoardWrapper } from "./BoardWrapper";
import { CellId } from "@/types/CellId";
import { Center } from "../layout/Center";
import { RenderCell } from "../cells/RenderCell";
import { Slider } from "../slider/Slider";
import { createCellId } from "@/helpers/createCellId";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { loadGameState } from "@/helpers/loadGameState";

export type GameTutorialProps = {
  levelData: string;
  steps?: Action[];
};

export function GameTutorial({ levelData, steps = [] }: GameTutorialProps) {
  const hasSteps = steps.length > 0;

  const minStep = -1;
  const maxStep = steps.length - 1;

  const [currentStep, setStep] = useState(minStep);

  const nextStep = () => setStep((step) => Math.min(maxStep, step + 1));

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
  }, [levelData, currentStep, steps]);

  const getHighlightedCellId = (action?: Action): CellId | undefined => {
    switch (action?.type) {
      case undefined:
      case "select-dig":
      case "select-flag":
        return;

      case "dig":
      case "flag":
        return createCellId(action.target);
    }
  };

  const nextAction = steps[currentStep + 1];
  const highlightedCellId = getHighlightedCellId(nextAction);

  return (
    <Center>
      <div onClick={nextStep} className="cursor-pointer">
        <div className="pointer-events-none">
          <BoardWrapper width={gameState.width} height={gameState.height}>
            {gameState.cells.map((cell) => (
              <RenderCell
                key={cell.id}
                cell={cell}
                action={nextAction?.type}
                highlight={highlightedCellId === cell.id ? "always" : "none"}
              />
            ))}
          </BoardWrapper>
        </div>
      </div>

      {hasSteps && (
        <div className="mt-8">
          <Slider
            min={minStep}
            max={maxStep}
            value={currentStep}
            onValueChange={setStep}
            onValueCommit={setStep}
          />
        </div>
      )}
    </Center>
  );
}
