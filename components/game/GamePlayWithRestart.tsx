"use client";

import { GamePlay, GamePlayProps } from "@/components/game/GamePlay";

import Link from "next/link";
import { RestartIcon } from "@/components/icons/RestartIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import { useState } from "react";

export type GameClientProps = GamePlayProps & {
  settingsHref?: string;
};

export default function GamePlayWithRestart({
  settingsHref,
  ...props
}: GameClientProps) {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  return (
    <>
      <GamePlay key={key} {...props} />

      <div className="flex justify-center m-8 space-x-8">
        <button onClick={restart} title="Restart">
          <RestartIcon fill="white" className="size-8" />
        </button>

        {settingsHref ? (
          <Link href={settingsHref} title="Edit settings">
            <SettingsIcon fill="white" className="size-8" />
          </Link>
        ) : null}
      </div>
    </>
  );
}
