import TrackPageView from "../../../components/TrackPageView";
import WaitlistForm from "../../../components/WaitlistForm";

export default function LandingPageB() {
  return (
    <main className="stack">
      <TrackPageView variant="lp_b" />
      <h1>From cleaning paralysis to 15-minute wins.</h1>
      <p>
        Use guided micro-sprints to break room resets into ADHD-friendly actions you can actually start.
      </p>
      <section className="card">
        <WaitlistForm variant="lp_b" ctaLabel="Get early access" />
      </section>
    </main>
  );
}
