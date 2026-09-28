import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// When someone visits mancamp.elmwoodbaptist.org, show them the Man Camp
// page while keeping the short address in their browser bar.
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("mancamp.")) {
    const url = request.nextUrl.clone();
    url.pathname = "/man-camp";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Only the front door of the address is affected; every other page,
// image, and file on the church site works exactly as before.
export const config = {
  matcher: ["/"],
};
