"use client";

import { useEffect, useMemo, useState } from "react";

import { Annotation } from "@/types/Annotation";
import { BoardWrapper } from "./BoardWrapper";
import { CellId } from "@/types/CellId";
import { RenderCell } from "../cells/RenderCell";
import { loadGameState } from "@/helpers/loadGameState";

export type GameStaticProps = {
  levelData: string;
  annotations?: Record<CellId, Annotation>;
  scroll?: { x: number; y: number };
  highlightedCellId?: CellId;
  revealAllCells?: boolean;
  allowInvalid?: boolean;
};

export function GameStatic({
  levelData,
  annotations = {},
  scroll = { x: 0, y: 0 },
  highlightedCellId = undefined,
  revealAllCells = false,
  allowInvalid = false,
}: GameStaticProps) {
  const gameState = useMemo(() => {
    const _gameState = loadGameState(levelData, undefined, allowInvalid);

    // reveal all cells
    if (revealAllCells) {
      _gameState.cells
        .filter((cell) => cell.state === "hidden")
        .forEach((cell) => (cell.state = "visible"));
    }

    return _gameState;
  }, [levelData, allowInvalid, revealAllCells]);

  return (
    <div className="pointer-events-none">
      <BoardWrapper
        width={gameState.width}
        height={gameState.height}
        scroll={scroll}
      >
        {gameState.cells.map((cell) => (
          <RenderCell
            key={cell.id}
            cell={cell}
            annotation={annotations[cell.id]}
            highlight={cell.id === highlightedCellId ? "once" : "none"}
          />
        ))}
      </BoardWrapper>
    </div>
  );
}
