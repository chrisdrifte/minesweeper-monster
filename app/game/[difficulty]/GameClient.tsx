"use client";

import { GamePlay } from "@/components/GamePlay";
import Link from "next/link";
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
          numMines: 20,
        };

      case "hard":
        return {
          width: 11,
          height: 15,
          numMines: 40,
        };

      case "expert":
        return {
          width: 11,
          height: 15,
          numMines: 60,
        };
    }
  };

  return (
    <>
      <GamePlay key={key} settings={getSettings()} />
      <div className="flex flex-col items-start">
        <button onClick={restart}>Restart</button>
        <Link href="/">Back to home</Link>
      </div>
    </>
  );
}
