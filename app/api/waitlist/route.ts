import { NextResponse } from "next/server";

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
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function parseCookieUTM(value: string | undefined): UTMRecord {
  if (!value) {
    return {};
  }

  try {
    return JSON.parse(value) as UTMRecord;
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  let payload: WaitlistPayload;
  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!payload || !payload.email || !payload.variant) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
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

  console.log("waitlist_record", reportingRecord);

  return NextResponse.json({ ok: true, record: reportingRecord }, { status: 201 });
}
