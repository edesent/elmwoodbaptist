import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Some ministries have their own short addresses. When someone visits one,
// show them that ministry's page while keeping the short address in their
// browser bar:
//   mancamp.elmwoodbaptist.org -> /man-camp
//   bus.elmwoodbaptist.org     -> /bus-ministry
const SUBDOMAIN_PAGES = new Map([
  ["mancamp", "/man-camp"],
  ["bus", "/bus-ministry"],
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const subdomain = host.split(".")[0].toLowerCase();
  const page = host.includes(".") ? SUBDOMAIN_PAGES.get(subdomain) : undefined;

  if (page) {
    const url = request.nextUrl.clone();
    url.pathname = page;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Only the front door of the address is affected; every other page,
// image, and file on the church site works exactly as before.
export const config = {
  matcher: ["/"],
};
