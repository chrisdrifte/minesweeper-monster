"use client";

import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameStatic } from "@/components/game/GameStatic";
import { Header } from "@/components/navigation/Header";
import { LearnIcon } from "@/components/icons/LearnIcon";
import { MenuButton } from "@/components/navigation/MenuButton";
import { MenuWrapper } from "@/components/navigation/MenuWrapper";
import { Paragraph } from "@/components/layout/Paragraph";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  return (
    <>
      <Header />

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
          Play minesweeper in your browser or on your mobile, totally free and
          without ads.
        </Paragraph>

        <MenuWrapper>
          <MenuButton text="Easy" onClick={() => router.push("/play/easy")} />
          <MenuButton text="Hard" onClick={() => router.push("/play/hard")} />
          <MenuButton
            text="Expert"
            onClick={() => router.push("/play/expert")}
          />
        </MenuWrapper>
      </ContentBlock>
      <ContentBlock>
        <Center>
          <LearnIcon fill="white" className="size-8" />
        </Center>

        <Paragraph>
          Learn how to play minesweeper via interactive tutorials.
        </Paragraph>

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
