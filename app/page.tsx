export default function HomePage() {
  return (
    <div className="home-shell">
      <div className="home-glow home-glow-a" aria-hidden />
      <div className="home-glow home-glow-b" aria-hidden />

      <main className="home-wrap">
        <nav className="home-nav">
          <a href="/" className="logo">
            <span className="logo-dot" />
            ImmutIQ
          </a>
          <a href="/lp/a" className="home-nav-link">
            Get early access
          </a>
        </nav>

        <section className="home-hero">
          <p className="home-kicker">ADHD-first productivity</p>
          <h1>Turn scattered days into consistent progress.</h1>
          <p>
            ImmutIQ helps ADHD minds start faster, switch less, and finish more with one clear
            next action at a time.
          </p>
          <div className="home-actions">
            <a href="/lp/a" className="button">
              Start free early access
            </a>
            <a href="/compare" className="button outline">
              See how it works
            </a>
          </div>
        </section>

        <section className="home-metrics" aria-label="Product outcomes">
          <article className="home-metric-card">
            <strong>One task at a time</strong>
            <span>Reduce overwhelm and decision fatigue</span>
          </article>
          <article className="home-metric-card">
            <strong>15-minute focus sprints</strong>
            <span>Build momentum with fast, doable wins</span>
          </article>
          <article className="home-metric-card">
            <strong>Energy-aware planning</strong>
            <span>Match the plan to your current capacity</span>
          </article>
        </section>
      </main>
    </div>
  );
}
