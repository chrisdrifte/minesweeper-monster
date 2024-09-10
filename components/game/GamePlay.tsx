"use client";

import { BoardWrapper } from "./BoardWrapper";
import { Center } from "../layout/Center";
import { GameSettings } from "@/types/GameSettings";
import { Paragraph } from "../layout/Paragraph";
import { RenderCell } from "../cells/RenderCell";
import { SelectActionType } from "./SelectActionType";
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
import { spaceMono } from "@/app/fonts";
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
    if (!numMines) {
      return "Dig anywhere to start";
    }

    if (!numFlags) {
      return "Place a flag on suspected mines";
    }

    if (hasWon) {
      return "Winner!";
    }

    if (hasLost) {
      return "You lost :(";
    }

    if (numRemaining < 0) {
      return `${Math.abs(numRemaining)} incorrect flags...`;
    }

    if (numRemaining === 0) {
      return `Dig the remaining cells`;
    }

    return `${numRemaining} mines left...`;
  };

  const message = getMessage();

  return (
    <div className={spaceMono.className}>
      <Center>
        <Paragraph>{message}</Paragraph>

        <BoardWrapper
          width={gameState.width}
          height={gameState.height}
          hasControls
        >
          {gameState.cells.map((cell) => (
            <RenderCell
              key={cell.id}
              cell={cell}
              action={gameState.action}
              onClick={() => {
                if (!isPlaying) {
                  return;
                }

                switch (gameState.action) {
                  case "dig":
                    if (hasNotStarted) {
                      setGameState((prevGameState) =>
                        generate(prevGameState, cell)
                      );
                      return;
                    }

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

        <SelectActionType
          actionType={gameState.action}
          onSelectDig={() => {
            if (hasNotStarted || !isPlaying) {
              return;
            }

            setGameState((prevGameState) => selectDig(prevGameState));
          }}
          onSelectFlag={() => {
            if (hasNotStarted || !isPlaying) {
              return;
            }

            setGameState((prevGameState) => selectFlag(prevGameState));
          }}
        />
      </Center>
    </div>
  );
}
