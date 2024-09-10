"use client";

import { Center } from "@/components/Center";
import { ContentBlock } from "@/components/ContentBlock";
import { GameStatic } from "@/components/GameStatic";
import { Learn } from "@/components/Learn";
import { MenuButton } from "@/components/MenuButton";
import { MenuWrapper } from "@/components/MenuWrapper";
import { Paragraph } from "@/components/Paragraph";
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
          <Learn fill="white" className="size-8" />
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
