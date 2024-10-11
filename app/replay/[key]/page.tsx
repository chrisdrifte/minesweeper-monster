"use client";

import { useEffect, useState } from "react";

import { Center } from "@/components/layout/Center";
import { ContentBlock } from "@/components/layout/ContentBlock";
import { GameVideo } from "@/components/game/GamePlayFromReplayData";
import { Heading } from "@/components/layout/Heading";
import { LinkInline } from "@/components/navigation/LinkInline";
import { Paragraph } from "@/components/layout/Paragraph";
import { encodeReplayKey } from "@/game/replay/encodeReplayKey";

export type ReplayPageProps = {
  params: { key: string };
};

export default function ReplayPage({ params }: ReplayPageProps) {
  const { key } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [replayData, setReplayData] = useState<string>();

  useEffect(() => {
    const encodedKey = encodeReplayKey(key);
    const savedReplayData = window.localStorage.getItem(encodedKey);

    setIsLoading(false);

    if (!savedReplayData) {
      return;
    }

    setReplayData(savedReplayData);
  }, [key]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!replayData) {
    return (
      <ContentBlock>
        <Center>
          <Heading>Failed to load game data</Heading>
        </Center>
        <Paragraph>
          This page can only access games that have been played on this device.
        </Paragraph>
        <Paragraph>
          Try using the share button on the{" "}
          <LinkInline href="/replay/history">Game History</LinkInline> page
          instead.
        </Paragraph>
      </ContentBlock>
    );
  }

  return <GameVideo replayData={replayData} />;
}
