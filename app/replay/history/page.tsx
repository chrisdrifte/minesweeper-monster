"use client";

import { useEffect, useState } from "react";

import { Caption } from "@/components/layout/Caption";
import { FormButton } from "@/components/form/FormButton";
import { Heading } from "@/components/layout/Heading";
import { LinkInline } from "@/components/navigation/LinkInline";
import { Paragraph } from "@/components/layout/Paragraph";
import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
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

            const numInteractions = data
              .split("")
              .reduce(
                (total, char) =>
                  char === ReplayDataMode.Interaction ? total + 1 : total,
                0
              );

            const outcome = data.endsWith("W")
              ? "Won"
              : data.endsWith("L")
              ? "Lost"
              : "Unfinished";

            return (
              <tr key={key}>
                <td>
                  <LinkInline href={`/replay/${key}`}>
                    {outcome} in {numInteractions} move
                    {numInteractions !== 1 ? "s" : ""} ({gameModeKey})
                  </LinkInline>
                  <br />
                  <div className="text-sm text-fg-50 font-bold">
                    {date.toLocaleString()}
                  </div>
                </td>
                <td>
                  <FormButton onClick={() => handleDelete(key)}>
                    Delete
                  </FormButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
