import { GameVideo } from "@/components/game/GamePlayFromReplayData";
import { notFound } from "next/navigation";

export type ReplayPageProps = {
  params: { ref: string };
};

export default async function ReplayPage({ params }: ReplayPageProps) {
  const { ref } = params;

  if (!ref) {
    notFound();
  }

  let blobUrl: string | undefined;

  try {
    blobUrl = Buffer.from(decodeURIComponent(ref), "base64").toString();
    new URL(blobUrl);
  } catch (err) {
    notFound();
  }

  if (!blobUrl) {
    notFound();
  }

  const response = await fetch(blobUrl, { cache: "force-cache" });

  if (!response.ok) {
    notFound();
  }

  const replayData = await response.text();

  if (!replayData) {
    return <div>Failed to load!</div>;
  }

  return <GameVideo replayData={replayData} />;
}
