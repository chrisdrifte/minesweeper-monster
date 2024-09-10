"use client";

import { ContentBlock } from "@/components/layout/ContentBlock";
import { GamePlay } from "@/components/game/GamePlay";
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
        <Paragraph>Complete this game to practice your new skills.</Paragraph>

        <GamePlay
          key={key}
          levelData={`
            111XXX
            1M2XXX
            112MXX
            XXXXXX        
          `}
        />

        <div className="flex flex-col items-center m-8">
          <button onClick={restart} title="Restart">
            <RestartIcon fill="white" className="size-8" />
          </button>
        </div>
      </ContentBlock>

      <PageMenu prev="/tutorial/intro/004" next="/" nextText="Finish" />
    </>
  );
}
