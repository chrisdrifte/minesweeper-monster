"use client";

import { ContentBlock } from "@/components/layout/ContentBlock";
import { GamePlay } from "@/components/game/GamePlay";
import Link from "next/link";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";
import { RestartIcon } from "@/components/icons/RestartIcon";
import { useState } from "react";

export default function TutorialIntro003() {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  return (
    <>
      <ContentBlock>
        <Paragraph>
          Sometimes it is not possible to use logic alone. When multiple cells
          could contain mines, you will have to guess!
        </Paragraph>

        <Paragraph>Try to finish this game by yourself.</Paragraph>

        <GamePlay
          key={key}
          levelData={`
            1221XM
            1MM2XM
            134MXX
            XXMXXX       
          `}
        />

        <div className="flex flex-col items-center m-8">
          <button onClick={restart} title="Restart">
            <RestartIcon fill="white" className="size-8" />
          </button>
        </div>
      </ContentBlock>

      <Paragraph>
        Congratulations! You now have all the skills you need to start playing
        for real.
      </Paragraph>

      <PageMenu
        prev="/tutorial/intro/002"
        next="/game/easy"
        nextText="Play now"
      />
    </>
  );
}
