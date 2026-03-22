import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // If accessing invest.airpowerusa.net at the root, redirect to the landing page
  if (
    hostname.includes("invest.airpowerusa.net") &&
    pathname === "/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/lp/ai-clean-energy";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on specific paths (skip static files, api routes, etc.)
  matcher: ["/"],
};
