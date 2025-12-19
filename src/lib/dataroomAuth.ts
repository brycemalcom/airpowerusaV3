import crypto from "crypto";

export interface DataRoomTokenPayload {
  email: string;
  nda: boolean;
  exp: number; // epoch seconds
}

const base64url = (input: Buffer | string) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const fromBase64url = (input: string) =>
  Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(
    "utf8",
  );

export function getAllowlist(): string[] {
  const list = process.env.DATAROOM_ALLOWLIST || "";
  return list
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isEmailAllowed(email: string): boolean {
  const allowed = getAllowlist();
  if (allowed.length === 0) return true; // if not set, allow any for internal testing
  return allowed.includes(email.trim().toLowerCase());
}

function getSecret(): string {
  const secret = process.env.DATAROOM_JWT_SECRET;
  if (!secret) {
    throw new Error("Missing DATAROOM_JWT_SECRET");
  }
  return secret;
}

export function signToken(payload: DataRoomTokenPayload): string {
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = base64url(JSON.stringify(header));
  const payloadB64 = base64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(data);
  const sig = base64url(hmac.digest());
  return `${data}.${sig}`;
}

export function verifyToken(token: string): DataRoomTokenPayload | null {
  try {
    const [headerB64, payloadB64, sig] = token.split(".");
    if (!headerB64 || !payloadB64 || !sig) return null;
    const data = `${headerB64}.${payloadB64}`;
    const hmac = crypto.createHmac("sha256", getSecret());
    hmac.update(data);
    const expected = base64url(hmac.digest());
    if (expected !== sig) return null;
    const json = JSON.parse(fromBase64url(payloadB64)) as DataRoomTokenPayload;
    if (json.exp && Date.now() / 1000 > json.exp) return null;
    if (!json.nda) return null;
    return json;
  } catch {
    return null;
  }
}


