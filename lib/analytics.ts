import type { AttributionPayload } from "./attribution";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

type EventName = "page_view" | "waitlist_signup";

export function trackEvent(
  eventName: EventName,
  attribution: AttributionPayload,
  payload: Record<string, unknown>
): void {
  const eventPayload = {
    event: eventName,
    ...payload,
    first_touch_utm: attribution.firstTouch,
    current_touch_utm: attribution.currentTouch
  };

  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventPayload);
  }

  console.log("analytics_event", eventPayload);
}
