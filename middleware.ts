import { NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export const config = {
  matcher: ["/api/replay/upload", "/replay/share/:hash*", "/play/:difficulty*"],
};

const ratelimits: Record<string, Ratelimit> = {
  "^/api/replay/upload$": new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
  }),
  "^/replay/share/(.*)$": new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, "20 s"),
  }),
  "^/play/(.*)$": new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
  }),
};

export default async function middleware(request: NextRequest) {
  const matcher = Object.keys(ratelimits).find((matcher) => {
    return new RegExp(matcher).test(request.nextUrl.pathname);
  });

  if (!matcher) {
    return NextResponse.json(
      { message: "Could not determine matcher" },
      { status: 500 }
    );
  }

  const rateLimit = ratelimits[matcher];

  if (!rateLimit) {
    return NextResponse.json(
      { message: "Could not determine rate limit" },
      { status: 500 }
    );
  }

  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimits[matcher].limit(ip);

  if (success) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.json({ message: "Too Many Requests" }, { status: 429 });
  }

  return NextResponse.rewrite(new URL("/rateLimit", request.nextUrl));
}
