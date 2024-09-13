"use client";

import { useEffect, useMemo, useState } from "react";

import { BoardWrapper } from "./BoardWrapper";
import { Caption } from "../layout/Caption";
import { Cell } from "@/types/Cell";
import { Center } from "../layout/Center";
import Confetti from "react-confetti";
import { ContentBlock } from "../layout/ContentBlock";
import { GameSettings } from "@/types/GameSettings";
import Link from "next/link";
import { RenderCell } from "../cells/RenderCell";
import { RestartIcon } from "../icons/RestartIcon";
import { SelectActionType } from "./SelectActionType";
import { SettingsIcon } from "../icons/SettingsIcon";
import { Timer } from "./Timer";
import classNames from "classnames";
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
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useTimer } from "@/game/timer/useTimer";
import useWindowSize from "@/hooks/useWindowSize";

type BaseGamePlayProps = {
  settingsHref?: string;
  tipText?: string;
};

export type GamePlayProps =
  | (BaseGamePlayProps & {
      levelData: string;
    })
  | (BaseGamePlayProps & {
      settings: GameSettings;
    });

export function GamePlay({ settingsHref, tipText, ...props }: GamePlayProps) {
  const originalState = useMemo(() => {
    if ("levelData" in props) {
      return Object.freeze(loadGameState(props.levelData));
    }

    if ("settings" in props) {
      return Object.freeze(createGameState(props.settings));
    }

    throw new Error("Invalid game props");
  }, []);

  const [gameState, setGameState] = useState(originalState);

  const numMines = gameState.cells.filter((cell) => cell.hasMine).length;
  const numFlags = gameState.cells.filter(
    (cell) => cell.state === "flagged"
  ).length;
  const numRemaining = numMines - numFlags;

  const hasNotStarted = isInitialState(gameState);
  const hasWon = isWinState(gameState);
  const hasLost = isLoseState(gameState);
  const isPlaying = !hasWon && !hasLost;

  const timer = useTimer();

  useEffect(() => {
    if (hasWon || hasLost) {
      timer.stop();
    }
  }, [hasWon, hasLost]);

  const getMessage = () => {
    if (hasWon) {
      return "Winner!";
    }

    if (hasLost) {
      return "Game over...";
    }

    if (!numMines) {
      return "Dig anywhere to start.";
    }

    if (!numFlags) {
      return "Place a flag on suspected mines.";
    }

    if (numRemaining < 0) {
      return `${Math.abs(numRemaining)} incorrect flags...`;
    }

    if (numRemaining === 0) {
      return `Dig the remaining cells.`;
    }

    return `${numRemaining} mines left...`;
  };

  const handleRestart = () => {
    setGameState(originalState);
    timer.reset();
  };

  const handleClickCell = (cell: Cell) => {
    if (!isPlaying) {
      return;
    }

    if (!timer.seconds) {
      timer.start();
    }

    switch (gameState.action) {
      case "dig":
        if (hasNotStarted) {
          setGameState((prevGameState) => generate(prevGameState, cell));
          return;
        }

        setGameState((prevGameState) => dig(prevGameState, cell));
        return;

      case "flag":
        setGameState((prevGameState) => flag(prevGameState, cell));
        return;
    }
  };

  const handleAltClickCell = (cell: Cell) => {
    if (hasNotStarted) {
      return;
    }

    if (!isPlaying) {
      return;
    }

    setGameState((prevGameState) => flag(prevGameState, cell));
  };

  const handleSelectDig = () => {
    if (hasNotStarted || !isPlaying) {
      return;
    }

    setGameState((prevGameState) => selectDig(prevGameState));
  };

  const handleSelectFlag = () => {
    if (hasNotStarted || !isPlaying) {
      return;
    }

    setGameState((prevGameState) => selectFlag(prevGameState));
  };

  useKeyboardShortcuts({
    KeyD: handleSelectDig,
    KeyF: handleSelectFlag,
    KeyR: handleRestart,
  });

  const message = getMessage();

  const { width, height } = useWindowSize();

  return (
    <div>
      {hasWon && (
        <div className="fixed w-screen h-screen top-0 left-0 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={100}
            colors={["white"]}
            recycle={false}
          />
        </div>
      )}

      <Center>
        {gameState.showTimer ? (
          <div className="grid gap-4 grid-cols-2 mb-8 w-full">
            <div className="self-center justify-self-start text-sm text-fg-50 font-bold">
              {message}
            </div>
            <div className="self-center justify-self-end">
              <Timer seconds={timer.seconds} />
            </div>
          </div>
        ) : (
          <>
            <Caption>{message}</Caption>
          </>
        )}

        <div className={classNames({ "sm:pointer-events-none": !isPlaying })}>
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
                isExploded={hasLost}
                onClick={() => handleClickCell(cell)}
                onAltClick={() => handleAltClickCell(cell)}
              />
            ))}
          </BoardWrapper>

          <SelectActionType
            actionType={gameState.action}
            onSelectDig={handleSelectDig}
            onSelectFlag={handleSelectFlag}
          />
        </div>
      </Center>

      <div className="flex justify-center m-8 space-x-8">
        <button onClick={handleRestart} title="Restart">
          <RestartIcon className="fill-fg-100 size-8" />
        </button>

        {settingsHref ? (
          <Link href={settingsHref} title="Edit settings">
            <SettingsIcon className="fill-fg-100 size-8" />
          </Link>
        ) : null}
      </div>

      {tipText && (
        <div className="hidden sm:block">
          <ContentBlock>
            <Center>
              <Caption>{tipText}</Caption>
            </Center>
          </ContentBlock>
        </div>
      )}
    </div>
  );
}
