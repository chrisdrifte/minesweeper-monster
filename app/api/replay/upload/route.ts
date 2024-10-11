import { list, put } from "@vercel/blob";

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

  const { blobs } = await list({
    prefix: hash,
    token: process.env.REPLAY_DATA_READ_WRITE_TOKEN,
  });

  if (blobs.length) {
    return NextResponse.json(blobs[0]);
  }

  const blob = await put(hash, replayData, {
    access: "public",
    token: process.env.REPLAY_DATA_READ_WRITE_TOKEN,
  });

  return NextResponse.json(blob);
}
