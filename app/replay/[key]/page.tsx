"use client";

import { useEffect, useState } from "react";

import { GameVideo } from "@/components/game/GamePlayFromReplayData";
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

    if (!savedReplayData) {
      return;
    }

    setIsLoading(false);
    setReplayData(savedReplayData);
  }, [key]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!replayData) {
    return <div>Failed to load!</div>;
  }

  return <GameVideo replayData={replayData} />;
}
