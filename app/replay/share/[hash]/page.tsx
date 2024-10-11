import { GameVideo } from "@/components/game/GamePlayFromReplayData";
import { list } from "@vercel/blob";
import { notFound } from "next/navigation";

export type ReplayPageProps = {
  params: { hash: string };
};

const hashRegExp = /^[0-9a-zA-Z]{64}$/;

export default async function ReplayPage({ params }: ReplayPageProps) {
  const { hash } = params;

  if (!hash) {
    notFound();
  }

  if (hash.length !== 64) {
    notFound();
  }

  if (!hashRegExp.test(hash)) {
    notFound();
  }

  const { blobs } = await list({
    prefix: hash,
    token: process.env.REPLAY_DATA_READ_WRITE_TOKEN,
  });

  const url = blobs[0]?.url;

  if (!url) {
    notFound();
  }

  const response = await fetch(url, { cache: "force-cache" });
  const replayData = await response.text();

  if (!replayData) {
    return <div>Failed to load!</div>;
  }

  return <GameVideo replayData={replayData} />;
}
