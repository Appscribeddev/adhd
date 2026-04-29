import TrackPageView from "../../components/TrackPageView";
import WaitlistForm from "../../components/WaitlistForm";

export default function ComparePage() {
  return (
    <>
      <TrackPageView variant="compare" />

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="site-nav">
        <a href="/" className="logo">
          <span className="logo-dot" />
          ImmutIQ
        </a>
        <span className="nav-badge">Early Access · Free</span>
      </nav>

      <div className="page-wrap">

        <section className="hero">
          <span className="hero-eyebrow">How ImmutIQ stacks up</span>
          <h1>
            Built for ADHD brains —<br />
            <em>not for neurotypical habits.</em>
          </h1>
          <p className="hero-sub">
            Paper planners and standard to-do apps assume perfect follow-through.
            ImmutIQ adapts in real time to how ADHD brains actually work.
            ImmutIQ is an AI execution coach for ADHD: it turns big goals into one doable next action.
          </p>
        </section>

        {/* ── Comparison table ────────────────────────────── */}
        <section style={{ marginBottom: "56px" }}>
          <div className="features-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="feature-card" style={{ background: "var(--accent-light)", borderColor: "rgba(30,92,63,0.2)" }}>
              <div className="feature-icon">✅</div>
              <h3>ImmutIQ</h3>
              <p>
                Adapts to your energy level. One task at a time. Built-in micro-sprints.
                No shame, just momentum.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Generic to-do apps</h3>
              <p>
                Flat lists that overwhelm. No understanding of ADHD task initiation.
                Makes you feel like you&apos;re failing.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Paper planners</h3>
              <p>
                Assumes consistent follow-through. No context-switching support.
                Works great until life happens.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="card stack" style={{ maxWidth: "480px", marginBottom: "56px" }}>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.3rem" }}>Try the ADHD-first approach</h2>
          <p style={{ margin: "0 0 8px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Free early access. Join 1,200+ people already on the list.
          </p>
          <WaitlistForm variant="compare" ctaLabel="Get free early access →" />
        </section>

        {/* ── Footer ──────────────────────────────────────── */}
        <footer className="site-footer">
          <small>© 2026 ImmutIQ. Built for ADHD minds everywhere.</small>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="mailto:hello@immutiq.com">Contact</a>
          </div>
        </footer>

      </div>
    </>
  );
}
