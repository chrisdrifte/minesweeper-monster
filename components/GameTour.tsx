"use client";

import { useMemo, useState } from "react";

import { Action } from "@/types/Action";
import { BoardWrapper } from "./BoardWrapper";
import { CellId } from "@/types/CellId";
import { RenderCell } from "./RenderCell";
import { SelectActionType } from "./SelectActionType";
import { createCellId } from "@/helpers/createCellId";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { isWinState } from "@/helpers/isWinState";
import { loadGameState } from "@/helpers/loadGameState";
import { selectDig } from "@/game/actions/selectDig";
import { selectFlag } from "@/game/actions/selectFlag";

export type GameTourProps = {
  levelData: string;
  steps?: Action[];
};

export function GameTour({ levelData, steps = [] }: GameTourProps) {
  const hasSteps = steps.length > 0;

  const minStep = -1;
  const maxStep = steps.length;

  const [currentStep, setStep] = useState(minStep);
  const prevStep = () => setStep((step) => Math.max(minStep, step - 1));
  const nextStep = () => setStep((step) => Math.min(maxStep, step + 1));

  const getMessage = (action?: Action) => {
    switch (action?.type) {
      case undefined:
        return isWinState(gameState) ? "Winner!" : "Done!";

      case "select-dig":
        return "Click the 'dig' button";

      case "select-flag":
        return "Click the 'flag' button";

      case "dig":
      case "flag":
        return "Click the highlighted cell";
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
  }, [levelData, currentStep]);

  const requiredAction = steps[currentStep + 1];
  const highlightedCellId = getHighlightedCellId(requiredAction);
  const message = getMessage(requiredAction);

  return (
    <div>
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell
            key={cell.id}
            cell={cell}
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

      <div className="my-8">{message}</div>

      {hasSteps && (
        <div>
          <div>
            Step {currentStep + 2}/{maxStep + 1}
          </div>
          {currentStep > minStep && <button onClick={prevStep}>⏪</button>}
        </div>
      )}
    </div>
  );
}
