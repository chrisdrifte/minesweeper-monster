"use client";

import { BoardWrapper } from "./BoardWrapper";
import { RenderCell } from "./RenderCell";
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
    <div>
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell cell={cell} />
        ))}
      </BoardWrapper>
    </div>
  );
}
