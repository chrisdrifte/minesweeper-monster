"use client";

import { ContentBlock } from "@/components/layout/ContentBlock";
import { GamePlay } from "@/components/game/GamePlay";
import Link from "next/link";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";
import { RestartIcon } from "@/components/icons/RestartIcon";
import { useState } from "react";

export default function TutorialIntro006() {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  return (
    <>
      <ContentBlock>
        <Paragraph>
          Sometimes it is not possible to use logic alone. When it is multiple
          cells could contain mines, you will have to guess!
        </Paragraph>

        <GamePlay
          key={key}
          levelData={`
            1221XX
            1MM2XX
            245MXX
            XMMXXM        
          `}
        />

        <div className="flex flex-col items-center m-8">
          <button onClick={restart} title="Restart">
            <RestartIcon fill="white" className="size-8" />
          </button>
        </div>
      </ContentBlock>

      <Paragraph>
        Congratulations! You now have all the skills required to play
        minesweeper.
      </Paragraph>

      <Paragraph>
        Why not{" "}
        <Link href="/game/easy" className="underline hover:no-underline">
          play a real game
        </Link>
        ?
      </Paragraph>

      <PageMenu prev="/tutorial/intro/005" next="/" nextText="Finish" />
    </>
  );
}
