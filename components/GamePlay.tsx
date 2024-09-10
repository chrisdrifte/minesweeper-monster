"use client";

import { BoardWrapper } from "./BoardWrapper";
import { RenderCell } from "./RenderCell";
import { RenderControls } from "./RenderControls";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { isLoseState } from "@/helpers/isLoseState";
import { isWinState } from "@/helpers/isWinState";
import { loadGameState } from "@/helpers/loadGameState";
import { selectDig } from "@/game/actions/selectDig";
import { selectFlag } from "@/game/actions/selectFlag";
import { useState } from "react";

export type GamePlayProps = {
  levelData: string;
};

export function GamePlay({ levelData }: GamePlayProps) {
  const [gameState, setGameState] = useState(() => loadGameState(levelData));

  const numMines = gameState.cells.filter((cell) => cell.hasMine).length;
  const numFlags = gameState.cells.filter(
    (cell) => cell.state === "flagged"
  ).length;
  const numRemaining = numMines - numFlags;

  const hasWon = isWinState(gameState);
  const hasLost = isLoseState(gameState);
  const isPlaying = !hasWon && !hasLost;

  const getMessage = () => {
    if (hasWon) {
      return "You win!";
    }

    if (hasLost) {
      return "You lose";
    }

    if (numRemaining < 0) {
      return `Too many flags!`;
    }

    return `${numRemaining} mines left`;
  };

  const message = getMessage();

  return (
    <div>
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell
            cell={cell}
            onClick={() => {
              if (!isPlaying) {
                return;
              }

              switch (gameState.action) {
                case "dig":
                  setGameState((prevGameState) => dig(prevGameState, cell));
                  return;

                case "flag":
                  setGameState((prevGameState) => flag(prevGameState, cell));
                  return;
              }
            }}
          />
        ))}
      </BoardWrapper>

      <RenderControls
        actionType={gameState.action}
        onSelectDig={() => {
          setGameState((prevGameState) => selectDig(prevGameState));
        }}
        onSelectFlag={() => {
          setGameState((prevGameState) => selectFlag(prevGameState));
        }}
      />

      <div className="my-8">{message}</div>
    </div>
  );
}
