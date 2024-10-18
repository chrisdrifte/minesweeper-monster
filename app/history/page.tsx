"use client";

import { useEffect, useState } from "react";

import { FormButton } from "@/components/form/FormButton";
import { Heading } from "@/components/layout/Heading";
import { LinkInline } from "@/components/navigation/LinkInline";
import { Pagination } from "@/components/navigation/Pagination";
import { Paragraph } from "@/components/layout/Paragraph";
import { ReplayDataMode } from "@/types/enums/ReplayDataMode";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { decodeNumber } from "@/game/replay/decodeNumber";
import { decodeReplayKey } from "@/game/replay/decodeReplayKey";
import { encodeReplayKey } from "@/game/replay/encodeReplayKey";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;
const SHARE_TIMEOUT_MS = 15 * 1000;

export default function ReplayHistoryPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [sharingKey, setSharingKey] = useState<string>();
  const [sharingError, setSharingError] = useState<string>();
  const [replayDataKeys, setReplayDataKeys] = useState<string[]>([]);

  const numItems = replayDataKeys.length;
  const numPages = Math.ceil(numItems / ITEMS_PER_PAGE);
  const firstPage = 0;
  const lastPage = numPages - 1;

  const [currentPage, setCurrentPage] = useState(firstPage);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedReplayDataKeys = replayDataKeys.slice(startIndex, endIndex);

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

      {sharingError && (
        <Paragraph>
          <span className="text-fg-alt">{sharingError}</span>
        </Paragraph>
      )}

      {!replayDataKeys.length && <Paragraph>No game history found.</Paragraph>}

      <table className="w-full">
        <tbody>
          {paginatedReplayDataKeys.map((encodedKey) => {
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
              `${ReplayDataMode.Click}`,
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
              if (sharingKey) {
                return;
              }

              setSharingKey(encodedKey);
              setSharingError(undefined);

              const controller = new AbortController();

              const abortTimeoutId = setTimeout(() => {
                controller.abort("timeout");

                setSharingError("Took too long, please try again.");
                setSharingKey(undefined);
              }, SHARE_TIMEOUT_MS);

              const response = await fetch(`/api/replay/upload`, {
                method: "POST",
                body: replayData,
                signal: controller.signal,
              });

              clearTimeout(abortTimeoutId);

              const responseJson = await response.json();

              if (!response.ok) {
                setSharingError(responseJson.message ?? "Something went wrong");
                setSharingKey(undefined);
                console.error(response.status, responseJson);
                return;
              }

              if (
                !("ref" in responseJson || typeof responseJson.ref !== "string")
              ) {
                setSharingError("Got an unexpected response");
                setSharingKey(undefined);
                return;
              }

              const indexKey = "uploadedReplayData";
              let existingObject = {};

              try {
                existingObject = JSON.parse(
                  window.localStorage.getItem(indexKey) ?? ""
                );
              } catch (err) {
                // do nothing
              }

              window.localStorage.setItem(
                indexKey,
                JSON.stringify({
                  ...existingObject,
                  [encodedKey]: responseJson.ref,
                })
              );

              router.push(`/replay/share/${responseJson.ref}`);
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
                  <FormButton onClick={handleShare}>
                    {sharingKey !== encodedKey ? "Share" : "..."}
                  </FormButton>
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

      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        onPrev={() => setCurrentPage((page) => Math.max(firstPage, page - 1))}
        onNext={() => setCurrentPage((page) => Math.min(page + 1, lastPage))}
        onSelect={setCurrentPage}
      />
    </>
  );
}
