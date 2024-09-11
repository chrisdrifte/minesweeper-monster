"use client";

import { useMemo, useState } from "react";

import { Action } from "@/types/Action";
import { BoardWrapper } from "./BoardWrapper";
import { Caption } from "../layout/Caption";
import { CellId } from "@/types/CellId";
import { Center } from "../layout/Center";
import { RenderCell } from "../cells/RenderCell";
import { SelectActionType } from "./SelectActionType";
import { Slider } from "../slider/Slider";
import { createCellId } from "@/helpers/createCellId";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { isWinState } from "@/helpers/isWinState";
import { loadGameState } from "@/helpers/loadGameState";
import { selectDig } from "@/game/actions/selectDig";
import { selectFlag } from "@/game/actions/selectFlag";

type Step = Action & { description?: string };

export type GameTourProps = {
  levelData: string;
  steps?: Step[];
};

export function GameTour({ levelData, steps = [] }: GameTourProps) {
  const hasSteps = steps.length > 0;

  const minStep = -1;
  const maxStep = steps.length;

  const [currentStep, setStep] = useState(minStep);
  const nextStep = () => setStep((step) => Math.min(maxStep, step + 1));

  const getMessage = (step?: Step) => {
    if (step?.description) {
      return step.description;
    }

    switch (step?.type) {
      case undefined:
        return isWinState(gameState) ? "Winner!" : "Done!";

      case "select-dig":
        return "Switch to 'dig' mode.";

      case "select-flag":
        return "Switch to 'flag' mode.";

      case "dig":
        return "Dig the highlighted cell.";

      case "flag":
        return "Flag the highlighted cell.";
    }
  };

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

  const gameState = useMemo(() => {
    let _gameState = loadGameState(levelData);

    const stepsToApply = currentStep < 0 ? [] : steps.slice(0, currentStep + 1);
    for (const stepToApply of stepsToApply) {
      switch (stepToApply.type) {
        case "select-dig":
          _gameState = selectDig(_gameState);
          break;

        case "select-flag":
          _gameState = selectFlag(_gameState);
          break;

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

  const requiredAction = steps[currentStep + 1];
  const highlightedCellId = getHighlightedCellId(requiredAction);
  const message = getMessage(requiredAction);

  return (
    <Center>
      <Caption>{message}</Caption>

      <BoardWrapper
        width={gameState.width}
        height={gameState.height}
        hasControls
      >
        {gameState.cells.map((cell) => (
          <RenderCell
            key={cell.id}
            cell={cell}
            action={requiredAction?.type}
            isHighlighted={cell.id === highlightedCellId}
            onClick={() => {
              if (
                requiredAction?.type !== gameState.action ||
                cell.id !== highlightedCellId
              ) {
                return;
              }

              nextStep();
            }}
          />
        ))}
      </BoardWrapper>
      <SelectActionType
        actionType={gameState.action}
        isHighlightedDig={requiredAction?.type === "select-dig"}
        isHighlightedFlag={requiredAction?.type === "select-flag"}
        onSelectDig={() => {
          if (requiredAction?.type !== "select-dig") {
            return;
          }

          nextStep();
        }}
        onSelectFlag={() => {
          if (requiredAction?.type !== "select-flag") {
            return;
          }

          nextStep();
        }}
      />
      {hasSteps && (
        <div className="mt-8">
          <Slider
            min={minStep}
            max={maxStep - 1}
            value={currentStep}
            onValueChange={setStep}
            onValueCommit={setStep}
          />
        </div>
      )}
    </Center>
  );
}
