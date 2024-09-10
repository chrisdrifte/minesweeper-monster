"use client";

import { BoardWrapper } from "./BoardWrapper";
import { RenderCell } from "../cells/RenderCell";
import { loadGameState } from "@/helpers/loadGameState";
import { useMemo } from "react";

export type GameStaticProps = {
  levelData: string;
};

export function GameStatic({ levelData }: GameStaticProps) {
  const gameState = useMemo(() => {
    const _gameState = loadGameState(levelData);

    // reveal all cells
    _gameState.cells
      .filter((cell) => cell.state === "hidden")
      .forEach((cell) => (cell.state = "visible"));

    return _gameState;
  }, [levelData]);

  return (
    <div className="pointer-events-none">
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell key={cell.id} cell={cell} />
        ))}
      </BoardWrapper>
    </div>
  );
}
