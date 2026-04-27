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
  const payload = (await request.json()) as WaitlistPayload;

  if (!payload.email || !payload.variant) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const reportingRecord = {
    event_name: "waitlist_signup",
    email: payload.email,
    variant: payload.variant,
    campaign: payload.campaign,
    utm_source_first: payload.attribution.firstTouch.utm_source || "",
    utm_medium_first: payload.attribution.firstTouch.utm_medium || "",
    utm_campaign_first: payload.attribution.firstTouch.utm_campaign || "",
    utm_content_first: payload.attribution.firstTouch.utm_content || "",
    utm_source_current: payload.attribution.currentTouch.utm_source || "",
    utm_medium_current: payload.attribution.currentTouch.utm_medium || "",
    utm_campaign_current: payload.attribution.currentTouch.utm_campaign || "",
    utm_content_current: payload.attribution.currentTouch.utm_content || "",
    submitted_at: payload.submittedAt
  };

  console.log("waitlist_record", reportingRecord);

  return NextResponse.json({ ok: true, record: reportingRecord }, { status: 201 });
}
