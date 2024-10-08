"use client";

import { Annotation } from "@/types/Annotation";
import { BoardWrapper } from "./BoardWrapper";
import { CellId } from "@/types/CellId";
import { RenderCell } from "../cells/RenderCell";
import { loadGameState } from "@/helpers/loadGameState";
import { useMemo } from "react";

export type GameStaticProps = {
  levelData: string;
  annotations?: Record<CellId, Annotation>;
  revealAllCells?: boolean;
  allowInvalid?: boolean;
};

export function GameStatic({
  levelData,
  annotations = {},
  revealAllCells = false,
}: GameStaticProps) {
  const gameState = useMemo(() => {
    const _gameState = loadGameState(levelData);

    // reveal all cells
    if (revealAllCells) {
      _gameState.cells
        .filter((cell) => cell.state === "hidden")
        .forEach((cell) => (cell.state = "visible"));
    }

    return _gameState;
  }, [levelData, revealAllCells]);

  return (
    <div className="pointer-events-none">
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell
            key={cell.id}
            cell={cell}
            annotation={annotations[cell.id]}
          />
        ))}
      </BoardWrapper>
    </div>
  );
}
