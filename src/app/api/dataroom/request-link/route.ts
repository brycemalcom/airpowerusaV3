import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed, signToken } from "@/lib/dataroomAuth";

const ONE_DAY = 60 * 60 * 24;
const SEVEN_DAYS = ONE_DAY * 7;

export async function POST(req: NextRequest) {
  try {
    const { email, ndaAccepted } = await req.json();
    if (!email || !ndaAccepted) {
      return NextResponse.json(
        { error: "Email and NDA acceptance are required" },
        { status: 400 },
      );
    }
    if (!isEmailAllowed(email)) {
      return NextResponse.json(
        { error: "Email not authorized for access" },
        { status: 403 },
      );
    }

    const exp = Math.floor(Date.now() / 1000) + SEVEN_DAYS;
    const token = signToken({ email, nda: true, exp });
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
    const link = `${baseUrl}/api/dataroom/verify?token=${encodeURIComponent(token)}`;

    // MVP: if RESEND is configured, send email; otherwise return link
    // (Email integration optional to keep MVP fast)
    const willEmail = !!process.env.RESEND_API_KEY && !!process.env.DATAROOM_SENDER_EMAIL;
    if (willEmail) {
      // Lazy import to avoid bundling if unused
      const { Resend } = await import("resend").catch(() => ({ Resend: null as any }));
      if (Resend) {
        const resend = new Resend(process.env.RESEND_API_KEY as string);
        await resend.emails.send({
          from: process.env.DATAROOM_SENDER_EMAIL as string,
          to: email,
          subject: "Your AirPower USA Data Room Access Link",
          text: `Click to access the data room: ${link}\n\nThis link expires in 7 days.`,
        });
      }
    }

    console.log("[DataRoom][RequestLink]", {
      email,
      ip: req.headers.get("x-forwarded-for") || req.ip,
      ua: req.headers.get("user-agent"),
      emailed: willEmail,
      time: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      mode: willEmail ? "email" : "inline",
      link: willEmail ? undefined : link,
    });
  } catch (e) {
    console.error("[DataRoom][RequestLink][Error]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


