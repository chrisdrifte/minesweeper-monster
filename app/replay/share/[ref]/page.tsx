import { GameVideo } from "@/components/game/GameVideo";
import { decodeReplayData } from "@/game/replay/decodeReplayData";
import { notFound } from "next/navigation";

const hostnameWhitelist = [".vercel-storage.com"];

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
    new URL(blobUrl); // ensure valid url
  } catch (err) {
    notFound();
  }

  if (!blobUrl) {
    notFound();
  }

  if (
    !hostnameWhitelist.some((safeHostname) =>
      new URL(blobUrl).hostname.endsWith(safeHostname)
    )
  ) {
    notFound();
  }

  const response = await fetch(blobUrl, { cache: "force-cache" });

  if (!response.ok) {
    notFound();
  }

  const replayData = await response.text();

  try {
    decodeReplayData(replayData);
  } catch (err) {
    notFound();
  }

  if (!replayData) {
    return <div>Failed to load!</div>;
  }

  return <GameVideo replayData={replayData} />;
}
