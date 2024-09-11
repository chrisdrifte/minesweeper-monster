"use client";

import { ContentBlock } from "@/components/layout/ContentBlock";
import { GamePlay } from "@/components/game/GamePlay";
import { Heading } from "@/components/layout/Heading";
import { PageMenu } from "@/components/navigation/PageMenu";
import { Paragraph } from "@/components/layout/Paragraph";
import { RestartIcon } from "@/components/icons/RestartIcon";
import { useState } from "react";

export default function TutorialStrategies001() {
  const [key, setKey] = useState(0);
  const restart = () => setKey((prevKey) => prevKey + 1);

  return (
    <>
      <ContentBlock>
        <Heading>Practice!</Heading>
        <Paragraph>
          Test out your new strategies with a quick game of minesweeper:
        </Paragraph>

        <GamePlay key={key} settings={{ width: 8, height: 8, numMines: 8 }} />

        <div className="flex flex-col items-center m-8">
          <button onClick={restart} title="Restart">
            <RestartIcon fill="white" className="size-8" />
          </button>
        </div>
      </ContentBlock>

      <PageMenu prev="/tutorial/strategies/001" next="/" nextText="Finish" />
    </>
  );
}
