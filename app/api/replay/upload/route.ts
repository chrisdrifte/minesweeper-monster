import { ListBlobResultBlob, PutBlobResult, list, put } from "@vercel/blob";

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { decodeReplayData } from "@/game/replay/decodeReplayData";

const MAX_UPLOAD_SIZE_BYTES = 10_000;

export async function POST(request: Request): Promise<NextResponse> {
  if (!request.body) {
    throw new Error("Missing data");
  }

  const replayData = await new Response(request.body).text();

  if (!decodeReplayData(replayData)) {
    throw new Error("Invalid data");
  }

  if (replayData.length > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("Data too large to upload");
  }

  const hash = crypto.createHash("sha256").update(replayData).digest("hex");

  let blob: PutBlobResult | ListBlobResultBlob | undefined;

  const { blobs } = await list({
    prefix: hash,
    token: process.env.REPLAY_DATA_READ_WRITE_TOKEN,
  });

  if (blobs.length) {
    blob = blobs[0];
  }

  if (!blob) {
    blob = await put(hash, replayData, {
      access: "public",
      token: process.env.REPLAY_DATA_READ_WRITE_TOKEN,
      contentType: "text/plain",
    });
  }

  const ref = encodeURIComponent(Buffer.from(blob.url).toString("base64"));

  return NextResponse.json({
    ref,
  });
}
