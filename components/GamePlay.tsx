"use client";

import { BoardWrapper } from "./BoardWrapper";
import { GameSettings } from "@/types/GameSettings";
import { RenderCell } from "./RenderCell";
import { RenderControls } from "./RenderControls";
import { createGameState } from "@/helpers/createGameState";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { generate } from "@/game/actions/generate";
import { isInitialState } from "@/helpers/isInitialState";
import { isLoseState } from "@/helpers/isLoseState";
import { isWinState } from "@/helpers/isWinState";
import { loadGameState } from "@/helpers/loadGameState";
import { selectDig } from "@/game/actions/selectDig";
import { selectFlag } from "@/game/actions/selectFlag";
import { useState } from "react";

export type GamePlayProps =
  | {
      levelData: string;
    }
  | {
      settings: GameSettings;
    };

export function GamePlay(props: GamePlayProps) {
  const [gameState, setGameState] = useState(() => {
    if ("levelData" in props) {
      return loadGameState(props.levelData);
    }

    if ("settings" in props) {
      return createGameState(props.settings);
    }

    throw new Error("Invalid game props");
  });

  const numMines = gameState.cells.filter((cell) => cell.hasMine).length;
  const numFlags = gameState.cells.filter(
    (cell) => cell.state === "flagged"
  ).length;
  const numRemaining = numMines - numFlags;

  const hasNotStarted = isInitialState(gameState);
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

    if (!numMines) {
      return "Dig anywhere to start";
    }

    if (!numFlags) {
      return "Place a flag on suspected mines";
    }

    return `${numRemaining} mines left`;
  };

  const message = getMessage();

  return (
    <div>
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell
            key={cell.id}
            cell={cell}
            onClick={() => {
              if (hasNotStarted) {
                setGameState((prevGameState) => generate(prevGameState, cell));
                return;
              }

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
