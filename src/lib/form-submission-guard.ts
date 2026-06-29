import { NextRequest, NextResponse } from "next/server";
import {
  FORM_LOADED_AT_FIELD,
  HONEYPOT_FIELD,
  MIN_SUBMIT_ELAPSED_MS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  TURNSTILE_TOKEN_FIELD,
} from "@/lib/form-submission-guard-constants";

export {
  FORM_LOADED_AT_FIELD,
  HONEYPOT_FIELD,
  MIN_SUBMIT_ELAPSED_MS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  TURNSTILE_TOKEN_FIELD,
} from "@/lib/form-submission-guard-constants";

const ANTI_SPAM_KEYS = new Set([
  HONEYPOT_FIELD,
  TURNSTILE_TOKEN_FIELD,
  FORM_LOADED_AT_FIELD,
]);

export type FormBlockReason =
  | "honeypot"
  | "submit_too_fast"
  | "missing_form_loaded_at"
  | "rate_limited"
  | "turnstile_missing"
  | "turnstile_invalid";

export function logFormBlocked(
  reason: FormBlockReason,
  meta: Record<string, string | number | undefined>
): void {
  console.log(
    JSON.stringify({
      event: "form_submission_blocked",
      reason,
      ts: new Date().toISOString(),
      ...meta,
    })
  );
}

export function getClientIp(request: NextRequest): string {
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

type Bucket = number[];
const rateBuckets = new Map<string, Bucket>();

function pruneBucket(times: number[], now: number, windowMs: number): number[] {
  return times.filter((t) => now - t < windowMs);
}

export function checkRateLimit(
  routeKey: string,
  ip: string,
  max: number,
  windowMs: number
): boolean {
  const key = `${routeKey}:${ip}`;
  const now = Date.now();
  let times = rateBuckets.get(key) ?? [];
  times = pruneBucket(times, now, windowMs);
  if (times.length >= max) {
    rateBuckets.set(key, times);
    return false;
  }
  times.push(now);
  rateBuckets.set(key, times);
  return true;
}

export function stripAntiSpamFields<T extends Record<string, unknown>>(
  body: T
): Omit<
  T,
  typeof HONEYPOT_FIELD | typeof TURNSTILE_TOKEN_FIELD | typeof FORM_LOADED_AT_FIELD
> {
  const out = { ...body } as Record<string, unknown>;
  for (const k of ANTI_SPAM_KEYS) {
    delete out[k];
  }
  return out as Omit<
    T,
    typeof HONEYPOT_FIELD | typeof TURNSTILE_TOKEN_FIELD | typeof FORM_LOADED_AT_FIELD
  >;
}

async function verifyTurnstileToken(
  token: string,
  remoteip: string | undefined
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (remoteip && remoteip !== "unknown") {
    params.set("remoteip", remoteip);
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    }
  );

  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export type AntiSpamResult =
  | { ok: true }
  | { ok: false; response: NextResponse; silentSuccess?: boolean };

export async function runAntiSpamChecks(
  request: NextRequest,
  body: Record<string, unknown>,
  routeKey: string
): Promise<AntiSpamResult> {
  const ip = getClientIp(request);

  const honeypot = body[HONEYPOT_FIELD];
  if (honeypot != null && String(honeypot).trim() !== "") {
    logFormBlocked("honeypot", { route: routeKey, ip });
    return {
      ok: false,
      silentSuccess: true,
      response: NextResponse.json({ success: true, message: "Received" }, { status: 200 }),
    };
  }

  const loadedRaw = body[FORM_LOADED_AT_FIELD];
  const loadedAt =
    typeof loadedRaw === "number"
      ? loadedRaw
      : typeof loadedRaw === "string"
        ? Number(loadedRaw)
        : NaN;
  if (!Number.isFinite(loadedAt)) {
    logFormBlocked("missing_form_loaded_at", { route: routeKey, ip });
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Invalid submission",
          detail: "Please refresh the page and try again.",
        },
        { status: 400 }
      ),
    };
  }

  const elapsed = Date.now() - loadedAt;
  if (elapsed < MIN_SUBMIT_ELAPSED_MS) {
    logFormBlocked("submit_too_fast", {
      route: routeKey,
      ip,
      elapsed_ms: elapsed,
    });
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Too fast",
          detail: "Please take a moment to complete the form and try again.",
        },
        { status: 400 }
      ),
    };
  }

  if (!checkRateLimit(routeKey, ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    logFormBlocked("rate_limited", { route: routeKey, ip });
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Too many requests",
          detail: "Too many submissions from this network. Please try again later.",
        },
        { status: 429 }
      ),
    };
  }

  const secretConfigured = Boolean(process.env.TURNSTILE_SECRET_KEY?.trim());
  if (secretConfigured) {
    const token = body[TURNSTILE_TOKEN_FIELD];
    if (typeof token !== "string" || !token.trim()) {
      logFormBlocked("turnstile_missing", { route: routeKey, ip });
      return {
        ok: false,
        response: NextResponse.json(
          {
            error: "Verification required",
            detail: "Please complete the security check and try again.",
          },
          { status: 400 }
        ),
      };
    }
    const valid = await verifyTurnstileToken(
      token.trim(),
      ip === "unknown" ? undefined : ip
    );
    if (!valid) {
      logFormBlocked("turnstile_invalid", { route: routeKey, ip });
      return {
        ok: false,
        response: NextResponse.json(
          {
            error: "Verification failed",
            detail: "Security verification failed. Please refresh and try again.",
          },
          { status: 400 }
        ),
      };
    }
  }

  return { ok: true };
}
