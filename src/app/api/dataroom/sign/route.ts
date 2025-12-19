import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { verifyToken } from "@/lib/dataroomAuth";

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION;
const bucket = process.env.DATAROOM_S3_BUCKET || process.env.S3_BUCKET || process.env.AWS_S3_BUCKET;

const s3 = new S3Client({ region });

export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");
    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }
    if (key.startsWith("link:")) {
      // passthrough for internal links (no signing)
      const href = key.replace(/^link:/, "");
      return NextResponse.json({ url: href });
    }
    const token = req.cookies.get("dr_session")?.value;
    const payload = token ? verifyToken(token) : null;
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!bucket || !region) {
      return NextResponse.json({ error: "S3 not configured" }, { status: 500 });
    }

    const cmd = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    const url = await getSignedUrl(s3, cmd, { expiresIn: 60 * 5 }); // 5 minutes

    console.log("[DataRoom][SignURL]", {
      email: payload.email,
      key,
      ip: req.headers.get("x-forwarded-for") || req.ip,
      time: new Date().toISOString(),
    });

    return NextResponse.json({ url });
  } catch (e) {
    console.error("[DataRoom][SignURL][Error]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


