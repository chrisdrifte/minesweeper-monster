"use client";

import { GamePlay, GamePlayProps } from "@/components/game/GamePlay";

import { RestartIcon } from "@/components/icons/RestartIcon";
import { useState } from "react";

export type GameClientProps = GamePlayProps;

export default function GamePlayWithRestart(props: GameClientProps) {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  return (
    <>
      <GamePlay key={key} {...props} />

      <div className="flex flex-col items-center m-8">
        <button onClick={restart} title="Restart">
          <RestartIcon fill="white" className="size-8" />
        </button>
      </div>
    </>
  );
}
