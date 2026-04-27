import { NextResponse } from "next/server";

type WaitlistPayload = {
  email: string;
  variant: string;
  campaign: string;
  attribution: {
    firstTouch: Record<string, string | undefined>;
    currentTouch: Record<string, string | undefined>;
  };
  submittedAt: string;
};

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

  const firstTouch = payload.attribution?.firstTouch || {};
  const currentTouch = payload.attribution?.currentTouch || {};

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
