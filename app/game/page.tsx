"use client";

import { GamePlay } from "@/components/GamePlay";
import Link from "next/link";
import { useState } from "react";

export default function Game() {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  return (
    <>
      <GamePlay
        key={key}
        settings={{
          width: 10,
          height: 10,
          numMines: 20,
        }}
      />
      <div className="flex flex-col items-start">
        <button onClick={restart}>Restart</button>
        <Link href="/tutorial/intro">How to play</Link>
      </div>
    </>
  );
}
