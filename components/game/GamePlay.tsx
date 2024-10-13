"use client";

import { useCallback, useEffect, useState } from "react";

import { BoardWrapper } from "./BoardWrapper";
import { Caption } from "../layout/Caption";
import { Cell } from "@/types/Cell";
import { Center } from "../layout/Center";
import Confetti from "react-confetti";
import { ContentBlock } from "../layout/ContentBlock";
import { GameState } from "@/types/GameState";
import Link from "next/link";
import { RenderCell } from "../cells/RenderCell";
import { RestartIcon } from "../icons/RestartIcon";
import { SelectActionType } from "./SelectActionType";
import { SettingsIcon } from "../icons/SettingsIcon";
import { Timer } from "./Timer";
import classNames from "classnames";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { generate } from "@/game/actions/generate";
import { generateFromSeed } from "@/game/actions/generateFromSeed";
import { isFlaggableState } from "@/helpers/isFlaggableState";
import { isInitialState } from "@/helpers/isInitialState";
import { isLoseState } from "@/helpers/isLoseState";
import { isWinState } from "@/helpers/isWinState";
import { noop } from "@/helpers/noop";
import { revealBoard } from "@/game/actions/revealBoard";
import { selectDig } from "@/game/actions/selectDig";
import { selectFlag } from "@/game/actions/selectFlag";
import { toParamsString } from "@/helpers/toParams";
import { track } from "@vercel/analytics";
import { useCurrentTheme } from "@/game/theme/useCurrentTheme";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useTimer } from "@/game/timer/useTimer";
import useWindowSize from "@/hooks/useWindowSize";

export type GamePlayProps = {
  initialGameState: GameState;
  settingsHref?: string;
  tipText?: string;
  showRestart?: boolean;
  onWin?: (gameState: GameState) => void;
};

export function GamePlay({
  initialGameState,
  settingsHref,
  tipText,
  showRestart = false,
  onWin = noop,
}: GamePlayProps) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const { id: currentThemeId } = useCurrentTheme();

  const [gameState, setGameState] = useState(initialGameState);
  const timeLimit = gameState.timeLimit;
  const action = gameState.action;

  const {
    reset: timerReset,
    start: timerStart,
    stop: timerStop,
    set: timerSet,
    seconds: timerSeconds,
  } = useTimer(gameState.showTimer);

  const numMines = gameState.cells.filter((cell) => cell.hasMine).length;

  const numFlags = gameState.cells.filter(
    (cell) => cell.state === "flagged"
  ).length;

  const numRemaining = numMines - numFlags;

  const hasGeneratedMap = !isInitialState(gameState);
  const hasWon = isWinState(gameState);
  const hasLost = isLoseState(gameState);
  const hasFinished = hasWon || hasLost;
  const isPlaying = hasGeneratedMap && !hasFinished;

  const getRevealedPercent = (gameState: GameState) => {
    const numRevealed = gameState.cells.filter(
      (cell) => cell.state === "visible" && !cell.hasMine
    ).length;
    const numRevealable = gameState.cells.filter(
      (cell) => !cell.hasMine
    ).length;

    return ((numRevealed / numRevealable) * 100).toFixed(0) + "%";
  };

  const getMessage = () => {
    if (hasWon) {
      return "Winner!";
    }

    if (hasLost) {
      const revealedPercent = getRevealedPercent(gameState);

      return `BOOM! (${revealedPercent} complete)`;
    }

    if (!numMines) {
      return "Dig anywhere to start.";
    }

    if (!numFlags) {
      return "Place a flag on suspected mines.";
    }

    if (numRemaining < 0) {
      return `${Math.abs(numRemaining)} overflagged...`;
    }

    if (numRemaining === 0) {
      return `Dig the remaining cells.`;
    }

    return `${numRemaining} mines left...`;
  };

  const userParams = toParamsString({
    screenSize: `${windowWidth}x${windowHeight}`,
    themeId: currentThemeId,
  });

  const gameParams = toParamsString({
    seed: gameState.seed,
    boardSize: `${gameState.width}x${gameState.height}`,
    numMines: gameState.numMines,
    showTimer: gameState.showTimer,
    noGuess: gameState.noGuess,
    noAdjacentMinesOnFirstClick: gameState.noAdjacentMinesOnFirstClick,
    revealContiguousNumbers: gameState.revealContiguousNumbers,
    revealBoardOnLoss: gameState.revealBoardOnLoss,
    autoRestart: gameState.autoRestart,
    timeLimit: gameState.timeLimit,
  });

  const handleStart = useCallback(
    async (cell: Cell) => {
      if (hasGeneratedMap) {
        return;
      }

      if (isPlaying) {
        return;
      }

      if (hasFinished) {
        return;
      }

      const seed = gameState.seed;

      let nextGameState: GameState;

      nextGameState = seed
        ? await generateFromSeed(gameState)
        : await generate(gameState, cell);

      nextGameState = dig(nextGameState, cell);

      setGameState(nextGameState);
      timerStart();

      // only two custom event properties allowed on vercel pro
      // keys and values must be less than 255 characters
      track("MinesweeperGame", {
        user: userParams,
        game: gameParams,
      });
    },
    [
      hasGeneratedMap,
      isPlaying,
      hasFinished,
      timerStart,
      userParams,
      gameParams,
    ]
  );

  const handleRestart = useCallback(() => {
    setGameState(initialGameState);
    timerReset();
  }, [initialGameState, timerReset]);

  const handleClickCell = useCallback(
    (cell: Cell) => {
      if (hasFinished) {
        return;
      }

      if (!hasGeneratedMap) {
        handleStart(cell);
        return;
      }

      switch (action) {
        case "dig":
          setGameState((prevGameState) => dig(prevGameState, cell));
          return;

        case "flag":
          setGameState((prevGameState) => flag(prevGameState, cell));
          return;
      }
    },
    [hasFinished, hasGeneratedMap, handleStart, action]
  );

  const handleAltClickCell = useCallback(
    (cell: Cell) => {
      if (!isPlaying) {
        return;
      }

      setGameState((prevGameState) => flag(prevGameState, cell));
    },
    [isPlaying]
  );

  const handleSelectDig = useCallback(() => {
    if (!isPlaying) {
      return;
    }

    setGameState((prevGameState) => selectDig(prevGameState));
  }, [isPlaying]);

  const handleSelectFlag = useCallback(() => {
    if (!isPlaying) {
      return;
    }

    setGameState((prevGameState) => selectFlag(prevGameState));
  }, [isPlaying]);

  const handleForceLoss = useCallback(() => {
    setGameState((prevGameState) => {
      if (isInitialState(prevGameState)) {
        return prevGameState;
      }

      if (isLoseState(prevGameState)) {
        return prevGameState;
      }

      if (isWinState(prevGameState)) {
        return prevGameState;
      }

      return revealBoard(prevGameState);
    });

    timerSet(timeLimit);
  }, [timerSet, timeLimit]);

  useKeyboardShortcuts({
    KeyD: handleSelectDig,
    KeyF: handleSelectFlag,
    KeyR: handleRestart,
    Space: handleRestart,
  });

  // automatically stop timer
  useEffect(() => {
    if (hasFinished) {
      timerStop();
    }
  }, [hasFinished, timerStop]);

  // force loss after time limit
  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    if (!timeLimit) {
      return;
    }

    const timeoutId = setTimeout(handleForceLoss, timeLimit * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, timeLimit, handleForceLoss]);

  // automatically restart on loss
  const autoRestart = gameState.autoRestart;
  useEffect(() => {
    if (!autoRestart) {
      return;
    }

    if (!hasLost) {
      return;
    }

    const timeoutId = setTimeout(handleRestart, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoRestart, hasLost, handleRestart]);

  // fire event listeners
  useEffect(() => {
    if (hasWon) {
      onWin(gameState);
    }
  }, [gameState, hasWon, onWin]);

  return (
    <div>
      {hasWon && (
        <div className="fixed w-screen h-screen top-0 left-0 pointer-events-none">
          <Confetti
            width={windowWidth}
            height={windowHeight}
            numberOfPieces={100}
            colors={["white"]}
            recycle={false}
          />
        </div>
      )}

      <Center>
        {gameState.showTimer ? (
          <div className="grid gap-4 grid-cols-[1fr,min-content] mb-8 w-full">
            <div className="self-center justify-self-start text-sm text-fg-50 font-bold">
              {getMessage()}
            </div>
            <div className="self-center justify-self-end">
              <Timer seconds={timerSeconds} />
            </div>
          </div>
        ) : (
          <>
            <Caption>{getMessage()}</Caption>
          </>
        )}

        <div
          className={classNames(
            { "sm:pointer-events-none": hasFinished },
            "grid grid-cols-1 justify-items-center"
          )}
        >
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
            isFlaggingEnabled={isFlaggableState(gameState)}
            onSelectDig={handleSelectDig}
            onSelectFlag={handleSelectFlag}
          />
        </div>
      </Center>

      <div className="flex justify-center m-8 space-x-8">
        {showRestart ? (
          <button onClick={handleRestart} title="Restart">
            <RestartIcon className="fill-fg-100 size-8" />
          </button>
        ) : null}

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
