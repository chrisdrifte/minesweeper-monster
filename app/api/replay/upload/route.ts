import { ListBlobResultBlob, PutBlobResult, list, put } from "@vercel/blob";

import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { decodeReplayData } from "@/game/replay/decodeReplayData";

const MAX_UPLOAD_SIZE_BYTES = 10_000;

export async function POST(request: Request): Promise<NextResponse> {
  if (!request.body) {
    return NextResponse.json({ message: "No request body" }, { status: 400 });
  }

  const replayData = await new Response(request.body).text();

  if (replayData.length > MAX_UPLOAD_SIZE_BYTES) {
    return NextResponse.json(
      { message: "This game is too large to upload." },
      { status: 413 }
    );
  }

  try {
    decodeReplayData(replayData);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  const hash = crypto.createHash("sha256").update(replayData).digest("hex");

  let blob: PutBlobResult | ListBlobResultBlob | undefined;

  // check whether replay data already exists
  try {
    const { blobs } = await list({
      prefix: hash,
      token: process.env.REPLAY_DATA_READ_WRITE_TOKEN,
    });

    if (blobs.length) {
      blob = blobs[0];
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong during the upload, please try again." },
      { status: 500 }
    );
  }

  // create new replay data
  if (!blob) {
    try {
      blob = await put(hash, replayData, {
        access: "public",
        token: process.env.REPLAY_DATA_READ_WRITE_TOKEN,
        contentType: "text/plain; charset=UTF-8",
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        {
          message: "Something went wrong during the upload, please try again.",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    ref: encodeURIComponent(Buffer.from(blob.url).toString("base64")),
  });
}
