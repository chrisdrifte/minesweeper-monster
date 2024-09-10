"use client";

import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { LearnIcon } from "@/components/icons/LearnIcon";
import { MenuButton } from "@/components/navigation/MenuButton";
import { MenuWrapper } from "@/components/navigation/MenuWrapper";
import { Paragraph } from "@/components/layout/Paragraph";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  return (
    <>
      <Center>
        <GameStatic
          levelData={`
            111
            1M1
            111
          `}
        />
      </Center>

      <ContentBlock>
        <Paragraph>
          Play the classic minesweeper game in your browser, totally free and
          without ads.
        </Paragraph>

        <MenuWrapper>
          <MenuButton text="Easy" onClick={() => router.push("/game/easy")} />
          <MenuButton text="Hard" onClick={() => router.push("/game/easy")} />
          <MenuButton
            text="Expert"
            onClick={() => router.push("/game/expert")}
          />
        </MenuWrapper>
      </ContentBlock>

      <ContentBlock>
        <Center>
          <LearnIcon fill="white" className="size-8" />
        </Center>

        <Paragraph>Or learn how to play via interactive tutorials.</Paragraph>

        <MenuWrapper>
          <MenuButton
            text="Minesweeper Rules"
            onClick={() => router.push("/tutorial/intro/001")}
          />
        </MenuWrapper>
      </ContentBlock>
    </>
  );
}
