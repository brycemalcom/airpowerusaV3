import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/dataroomAuth";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/data-room?error=missing_token", req.url));
  }
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/data-room?error=invalid_token", req.url));
  }

  const res = NextResponse.redirect(new URL("/data-room", req.url));
  res.cookies.set("dr_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}


