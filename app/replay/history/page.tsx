"use client";

import { useEffect, useState } from "react";

import { FormButton } from "@/components/form/FormButton";
import { Heading } from "@/components/layout/Heading";
import { LinkInline } from "@/components/navigation/LinkInline";
import { Paragraph } from "@/components/layout/Paragraph";
import type { PutBlobResult } from "@vercel/blob";
import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { decodeNumber } from "@/game/replay/decodeNumber";
import { decodeReplayKey } from "@/game/replay/decodeReplayKey";
import { encodeReplayKey } from "@/game/replay/encodeReplayKey";

export default function ReplayHistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [replayDataKeys, setReplayDataKeys] = useState<string[]>([]);

  useEffect(() => {
    const listKey = `replayDataKeys`;
    const savedReplayDataKeys = window.localStorage.getItem(listKey);

    setIsLoading(false);

    if (!savedReplayDataKeys) {
      setReplayDataKeys([]);
      return;
    }

    let parsedKeys: string[];

    try {
      parsedKeys = JSON.parse(savedReplayDataKeys);
    } catch (err) {
      setReplayDataKeys([]);
      return;
    }

    setReplayDataKeys(parsedKeys.reverse());
  }, []);

  const handleDelete = (key: string) => {
    const encodedKey = encodeReplayKey(key);
    const remainingKeys = replayDataKeys.filter((key) => key !== encodedKey);
    window.localStorage.removeItem(encodedKey);
    window.localStorage.setItem(
      "replayDataKeys",
      JSON.stringify(remainingKeys)
    );
    setReplayDataKeys(remainingKeys);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Heading>Game history</Heading>

      {!replayDataKeys.length && <Paragraph>No game history found.</Paragraph>}

      <table className="w-full">
        <tbody>
          {replayDataKeys.map((encodedKey) => {
            if (typeof window === "undefined") {
              return;
            }

            const replayData = window.localStorage.getItem(encodedKey);

            if (!replayData) {
              return;
            }

            const [version, isoDateString, gameModeKey, data] =
              replayData.split(";");

            if (version !== "V1") {
              return;
            }

            const key = decodeReplayKey(encodedKey);

            const date = new Date(isoDateString);

            const timeRegex = new RegExp(
              `${ReplayDataMode.Time}[0-9a-z]+`,
              "g"
            );

            const timeMatches = data.match(timeRegex);

            const duration =
              decodeNumber(timeMatches?.at(-1)?.slice(1) ?? "0") / 1000;

            const numInteractionsRegex = new RegExp(
              `${ReplayDataMode.Interaction}`,
              "g"
            );

            const numInteractions =
              data.match(numInteractionsRegex)?.length ?? 0;

            const outcome = data.endsWith("W")
              ? "Won"
              : data.endsWith("L")
              ? "Lost"
              : "Unfinished";

            const handleShare = async () => {
              const response = await fetch(`/api/replay/upload`, {
                method: "POST",
                body: replayData,
              });

              const newBlob = (await response.json()) as PutBlobResult;

              const indexKey = "uploadedReplayData";
              let existingObject = {};

              try {
                existingObject = JSON.parse(
                  window.localStorage.getItem(indexKey) ?? ""
                );
              } catch (err) {
                // do nothing
              }

              const hash = newBlob.pathname;

              window.localStorage.setItem(
                indexKey,
                JSON.stringify({
                  ...existingObject,
                  [encodedKey]: hash,
                })
              );

              window.location.href = `/replay/share/${hash}`;
            };

            return (
              <tr key={key}>
                <td>
                  <LinkInline href={`/replay/${key}`}>
                    {outcome} in {numInteractions} move
                    {numInteractions !== 1 ? "s" : ""} ({gameModeKey})
                  </LinkInline>
                  <br />
                  <div className="text-sm text-fg-50 font-bold">
                    {duration}
                    {duration !== 1 ? "s" : ""} - {date.toLocaleString()}
                  </div>
                </td>
                <td className="p-4">
                  <FormButton onClick={handleShare}>Share</FormButton>
                </td>
                <td className="py-4">
                  <TrashIcon
                    className="size-8 fill-fg-100 cursor-pointer"
                    onClick={() => handleDelete(key)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
