"use client";

import { useEffect, useState } from "react";

import { FormButton } from "@/components/form/FormButton";
import { Heading } from "@/components/layout/Heading";
import { LinkInline } from "@/components/navigation/LinkInline";
import { Paragraph } from "@/components/layout/Paragraph";
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
      <Heading>Your Game history</Heading>

      {!replayDataKeys.length && <Paragraph>No game history found.</Paragraph>}

      <table className="w-full">
        {replayDataKeys.map((encodedKey) => {
          if (typeof window === "undefined") {
            return;
          }

          const replayData = window.localStorage.getItem(encodedKey);

          if (!replayData) {
            return;
          }

          const [version, isoDateString, data] = replayData.split(";");

          if (version !== "V1") {
            return;
          }

          const key = decodeReplayKey(encodedKey);

          const date = new Date(isoDateString);

          const outcome = data.endsWith("W")
            ? "Winning Game"
            : data.endsWith("L")
            ? "Losing Game"
            : "Unfinished Game";

          return (
            <tr key={key}>
              <td>
                <LinkInline href={`/replay/${key}`}>{outcome}</LinkInline>
              </td>
              <td>{date.toDateString()}</td>
              <td>
                <FormButton onClick={() => handleDelete(key)}>
                  Delete
                </FormButton>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
