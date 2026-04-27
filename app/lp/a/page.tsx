import TrackPageView from "../../../components/TrackPageView";
import WaitlistForm from "../../../components/WaitlistForm";

export default function LandingPageA() {
  return (
    <main className="stack">
      <TrackPageView variant="lp_a" />
      <h1>Plan less. Finish more. ADHD-safe execution, one next step at a time.</h1>
      <p>
        Get a daily plan that adapts to low-energy moments and helps you complete one meaningful task at
        a time.
      </p>
      <section className="card">
        <WaitlistForm variant="lp_a" ctaLabel="Join the waitlist" />
      </section>
    </main>
  );
}
