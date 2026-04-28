import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import { dirname, join } from "path";

type WaitlistPayload = {
  email: string;
  variant: string;
  campaign: string;
  attribution?: {
    firstTouch?: Record<string, string | undefined>;
    currentTouch?: Record<string, string | undefined>;
    first?: Record<string, string | undefined>;
    current?: Record<string, string | undefined>;
    first_touch?: Record<string, string | undefined>;
    current_touch?: Record<string, string | undefined>;
    first_touch_utm?: Record<string, string | undefined>;
    current_touch_utm?: Record<string, string | undefined>;
  };
  firstTouch?: Record<string, string | undefined>;
  currentTouch?: Record<string, string | undefined>;
  first?: Record<string, string | undefined>;
  current?: Record<string, string | undefined>;
  first_touch?: Record<string, string | undefined>;
  current_touch?: Record<string, string | undefined>;
  first_touch_utm?: Record<string, string | undefined>;
  current_touch_utm?: Record<string, string | undefined>;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_source_first?: string;
  utm_medium_first?: string;
  utm_campaign_first?: string;
  utm_content_first?: string;
  utm_source_current?: string;
  utm_medium_current?: string;
  utm_campaign_current?: string;
  utm_content_current?: string;
  submittedAt: string;
};

type UTMRecord = Record<string, string | undefined>;
const FIRST_TOUCH_KEY = "first_touch_utm";
const CURRENT_TOUCH_KEY = "current_touch_utm";
const WAITLIST_STORE_PATH =
  process.env.WAITLIST_STORE_PATH || join(process.cwd(), "data", "waitlist-signups.jsonl");
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientId(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim().toLowerCase();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim().toLowerCase();
  }

  const userAgent = request.headers.get("user-agent") || "unknown";
  return `unknown:${userAgent.slice(0, 120)}`;
}

function enforceRateLimit(clientId: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  for (const [key, value] of rateLimitStore) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(clientId);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfterSeconds: 0 };
  }

  current.count += 1;
  if (current.count > RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    };
  }

  return { limited: false, retryAfterSeconds: 0 };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function persistWaitlistRecord(record: Record<string, string>) {
  await mkdir(dirname(WAITLIST_STORE_PATH), { recursive: true });
  await appendFile(WAITLIST_STORE_PATH, `${JSON.stringify(record)}\n`, "utf8");
}

function pickUTM(
  source: UTMRecord | undefined,
  fallback: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
  } = {}
): UTMRecord {
  return {
    utm_source: source?.utm_source || fallback.utm_source || "",
    utm_medium: source?.utm_medium || fallback.utm_medium || "",
    utm_campaign: source?.utm_campaign || fallback.utm_campaign || "",
    utm_content: source?.utm_content || fallback.utm_content || ""
  };
}

function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const separator = part.indexOf("=");
      if (separator <= 0) {
        return acc;
      }
      const key = part.slice(0, separator);
      const value = part.slice(separator + 1);
      try {
        acc[key] = decodeURIComponent(value);
      } catch {
        acc[key] = value;
      }
      return acc;
    }, {});
}

function parseCookieUTM(value: string | undefined): UTMRecord {
  if (!value) {
    return {};
  }

  const candidates = [value];
  try {
    candidates.push(decodeURIComponent(value));
  } catch {}
  try {
    candidates.push(decodeURIComponent(candidates[candidates.length - 1]));
  } catch {}

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as UTMRecord;
    } catch {}
  }

  return {};
}

export async function POST(request: Request) {
  const clientId = getClientId(request);
  const rateLimitResult = enforceRateLimit(clientId);
  if (rateLimitResult.limited) {
    return NextResponse.json(
      { ok: false, error: "rate_limited", retryAfterSeconds: rateLimitResult.retryAfterSeconds },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimitResult.retryAfterSeconds) }
      }
    );
  }

  let payload: WaitlistPayload;
  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!payload || !payload.email || !payload.variant) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }
  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const cookies = parseCookieHeader(request.headers.get("cookie"));
  const cookieFirstTouch = parseCookieUTM(cookies[FIRST_TOUCH_KEY]);
  const cookieCurrentTouch = parseCookieUTM(cookies[CURRENT_TOUCH_KEY]);

  const firstTouch = pickUTM(
    payload.attribution?.firstTouch ||
      payload.attribution?.first ||
      payload.attribution?.first_touch ||
      payload.attribution?.first_touch_utm ||
      payload.firstTouch ||
      payload.first ||
      payload.first_touch ||
      payload.first_touch_utm ||
      cookieFirstTouch,
    {
      utm_source: payload.utm_source_first || payload.utm_source || cookieFirstTouch.utm_source,
      utm_medium: payload.utm_medium_first || payload.utm_medium || cookieFirstTouch.utm_medium,
      utm_campaign: payload.utm_campaign_first || payload.utm_campaign || cookieFirstTouch.utm_campaign,
      utm_content: payload.utm_content_first || payload.utm_content || cookieFirstTouch.utm_content
    }
  );

  const currentTouch = pickUTM(
    payload.attribution?.currentTouch ||
      payload.attribution?.current ||
      payload.attribution?.current_touch ||
      payload.attribution?.current_touch_utm ||
      payload.currentTouch ||
      payload.current ||
      payload.current_touch ||
      payload.current_touch_utm ||
      cookieCurrentTouch,
    {
      utm_source: payload.utm_source_current || payload.utm_source || cookieCurrentTouch.utm_source,
      utm_medium: payload.utm_medium_current || payload.utm_medium || cookieCurrentTouch.utm_medium,
      utm_campaign: payload.utm_campaign_current || payload.utm_campaign || cookieCurrentTouch.utm_campaign,
      utm_content: payload.utm_content_current || payload.utm_content || cookieCurrentTouch.utm_content
    }
  );

  const reportingRecord = {
    event_name: "waitlist_signup",
    email: payload.email,
    variant: payload.variant,
    campaign: payload.campaign,
    utm_source_first: firstTouch.utm_source || "",
    utm_medium_first: firstTouch.utm_medium || "",
    utm_campaign_first: firstTouch.utm_campaign || "",
    utm_content_first: firstTouch.utm_content || "",
    utm_source_current: currentTouch.utm_source || "",
    utm_medium_current: currentTouch.utm_medium || "",
    utm_campaign_current: currentTouch.utm_campaign || "",
    utm_content_current: currentTouch.utm_content || "",
    submitted_at: payload.submittedAt
  };

  try {
    await persistWaitlistRecord(reportingRecord);
  } catch (error) {
    console.error("waitlist_persist_failed", error);
    return NextResponse.json({ ok: false, error: "persist_failed" }, { status: 500 });
  }

  console.log("waitlist_record_saved", {
    event_name: reportingRecord.event_name,
    variant: reportingRecord.variant,
    campaign: reportingRecord.campaign,
    submitted_at: reportingRecord.submitted_at
  });

  return NextResponse.json({ ok: true, record: reportingRecord }, { status: 201 });
}
