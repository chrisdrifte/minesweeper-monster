"use client";

import { GamePlay, GamePlayProps } from "@/components/game/GamePlay";
import { useEffect, useState } from "react";

import { Caption } from "../layout/Caption";
import { Center } from "../layout/Center";
import { ContentBlock } from "../layout/ContentBlock";
import Link from "next/link";
import { RestartIcon } from "@/components/icons/RestartIcon";
import { SettingsIcon } from "../icons/SettingsIcon";

export type GameClientProps = GamePlayProps & {
  settingsHref?: string;
};

export default function GamePlayWithRestart({
  settingsHref,
  ...props
}: GameClientProps) {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  useEffect(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      switch (e.code) {
        case "KeyR":
          return restart();
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => window.removeEventListener("keydown", handleKeyboardShortcut);
  });

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

      <div className="hidden sm:block">
        <ContentBlock>
          <Center>
            <Caption>Tip: you can also right click to place flags</Caption>
          </Center>
        </ContentBlock>
      </div>
    </>
  );
}
