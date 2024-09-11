"use client";

import { GamePlay } from "@/components/game/GamePlay";
import Link from "next/link";
import { RestartIcon } from "@/components/icons/RestartIcon";
import { useState } from "react";

export type GameClientProps = {
  difficulty: "easy" | "hard" | "expert";
};

export default function GameClient({ difficulty }: GameClientProps) {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  const getSettings = () => {
    switch (difficulty) {
      case "easy":
        return {
          width: 10,
          height: 10,
          numMines: 12,
        };

      case "hard":
        return {
          width: 11,
          height: 11,
          numMines: 24,
        };

      case "expert":
        return {
          width: 11,
          height: 15,
          numMines: 48,
        };
    }
  };

  return (
    <>
      <GamePlay key={key} settings={getSettings()} />

      <div className="flex flex-col items-center m-8">
        <button onClick={restart} title="Restart">
          <RestartIcon fill="white" className="size-8" />
        </button>
      </div>
    </>
  );
}
