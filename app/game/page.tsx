"use client";

import { GamePlay } from "@/components/GamePlay";
import { useState } from "react";

export default function Game() {
  const [key, setKey] = useState(0);

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
      <button onClick={() => setKey((prevKey) => prevKey + 1)}>Restart</button>
    </>
  );
}
