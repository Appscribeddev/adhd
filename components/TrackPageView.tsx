"use client";

import { useEffect } from "react";
import { readInitialAttribution } from "../lib/attribution";
import { trackEvent } from "../lib/analytics";

type TrackPageViewProps = {
  variant: "lp_a" | "lp_b" | "compare";
};

export default function TrackPageView({ variant }: TrackPageViewProps) {
  useEffect(() => {
    const attribution = readInitialAttribution(window.location.search);
    trackEvent("page_view", attribution, {
      variant,
      path: window.location.pathname,
      campaign: "adh15_planner_validation"
    });
  }, [variant]);

  return null;
}
