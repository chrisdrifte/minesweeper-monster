"use client";

import { BoardWrapper } from "./BoardWrapper";
import { RenderCell } from "./RenderCell";
import { RenderControls } from "./RenderControls";
import { dig } from "@/game/actions/dig";
import { flag } from "@/game/actions/flag";
import { loadGameState } from "@/helpers/loadGameState";
import { selectDig } from "@/game/actions/selectDig";
import { selectFlag } from "@/game/actions/selectFlag";
import { useState } from "react";

export type GamePlayProps = {
  levelData: string;
};

export function GamePlay({ levelData }: GamePlayProps) {
  const [gameState, setGameState] = useState(() => loadGameState(levelData));

  return (
    <div>
      <BoardWrapper width={gameState.width} height={gameState.height}>
        {gameState.cells.map((cell) => (
          <RenderCell
            cell={cell}
            onClick={() => {
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
    </div>
  );
}
