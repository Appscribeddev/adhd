import TrackPageView from "../../components/TrackPageView";
import WaitlistForm from "../../components/WaitlistForm";

export default function ComparePage() {
  return (
    <main className="stack">
      <TrackPageView variant="compare" />
      <h1>Planner Copilot vs paper plans and generic to-do apps</h1>
      <p>
        Paper and standard apps assume perfect follow-through. This copilot adapts tasks in real time for
        ADHD context switching.
      </p>
      <section className="card stack">
        <p>
          Built for activation tests: captures first-touch and current-touch UTMs for attribution on every
          waitlist signup.
        </p>
        <WaitlistForm variant="compare" ctaLabel="Join the waitlist" />
      </section>
    </main>
  );
}
