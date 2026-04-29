"use client";

import { FormEvent, useEffect, useState } from "react";
import { readInitialAttribution, type AttributionPayload } from "../lib/attribution";
import { trackEvent } from "../lib/analytics";

type WaitlistFormDarkProps = {
  variant: "lp_a" | "lp_b" | "compare";
  ctaLabel: string;
};

const EMPTY_ATTRIBUTION: AttributionPayload = {
  firstTouch: {},
  currentTouch: {}
};

export default function WaitlistFormDark({ variant, ctaLabel }: WaitlistFormDarkProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [attribution, setAttribution] = useState<AttributionPayload>(EMPTY_ATTRIBUTION);

  useEffect(() => {
    setAttribution(readInitialAttribution(window.location.search));
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setResult("");

    const submitAttribution = readInitialAttribution(window.location.search);

    const payload = {
      email,
      variant,
      campaign: "adh15_planner_validation",
      attribution: submitAttribution,
      utm_source: submitAttribution.currentTouch.utm_source || submitAttribution.firstTouch.utm_source || "",
      utm_medium: submitAttribution.currentTouch.utm_medium || submitAttribution.firstTouch.utm_medium || "",
      utm_campaign:
        submitAttribution.currentTouch.utm_campaign || submitAttribution.firstTouch.utm_campaign || "",
      utm_content: submitAttribution.currentTouch.utm_content || submitAttribution.firstTouch.utm_content || "",
      utm_source_first: submitAttribution.firstTouch.utm_source || "",
      utm_medium_first: submitAttribution.firstTouch.utm_medium || "",
      utm_campaign_first: submitAttribution.firstTouch.utm_campaign || "",
      utm_content_first: submitAttribution.firstTouch.utm_content || "",
      utm_source_current: submitAttribution.currentTouch.utm_source || "",
      utm_medium_current: submitAttribution.currentTouch.utm_medium || "",
      utm_campaign_current: submitAttribution.currentTouch.utm_campaign || "",
      utm_content_current: submitAttribution.currentTouch.utm_content || "",
      submittedAt: new Date().toISOString()
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`waitlist_submit_failed_${response.status}`);
      }

      trackEvent("waitlist_signup", submitAttribution, {
        variant,
        campaign: payload.campaign,
        email_domain: email.split("@")[1] || "unknown"
      });

      setResult("You are on the waitlist!");
      setEmail("");
    } catch (error) {
      console.error(error);
      setResult("Submission failed. Please retry.");
    } finally {
      setIsLoading(false);
    }
  }

  if (result === "You are on the waitlist!") {
    return (
      <div style={{ color: "#fff", textAlign: "center", padding: "12px 0" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🎉</div>
        <strong>You&apos;re on the list!</strong>
        <p style={{ opacity: 0.75, margin: "4px 0 0", fontSize: "0.9rem" }}>
          We&apos;ll email you when early access opens.
        </p>
      </div>
    );
  }

  return (
    <form className="cta-form" onSubmit={onSubmit}>
      <label htmlFor={`email-dark-${variant}`}>Your email</label>
      <input
        id={`email-dark-${variant}`}
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button className="button-white" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : ctaLabel}
      </button>
      {result ? <small style={{ color: "rgba(255,255,255,0.75)" }}>{result}</small> : null}
    </form>
  );
}
