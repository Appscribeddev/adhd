import TrackPageView from "../../../components/TrackPageView";
import WaitlistForm from "../../../components/WaitlistForm";
import WaitlistFormDark from "../../../components/WaitlistFormDark";

export default function LandingPageB() {
  return (
    <>
      <TrackPageView variant="lp_b" />

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="site-nav">
        <a href="/" className="logo">
          <span className="logo-dot" />
          ImmutIQ
        </a>
        <span className="nav-badge">Early Access · Free</span>
      </nav>

      <div className="page-wrap">

        {/* ── Hero ────────────────────────────────────────── */}
        <section className="hero">
          <span className="hero-eyebrow">For ADHD professionals &amp; students</span>
          <h1>
            From a scattered morning<br />
            to <em>something actually done.</em>
          </h1>
          <p className="hero-sub">
            Turn initiation paralysis, deadline dread, and half-finished projects into
            15-minute wins — with an AI that adapts to your ADHD brain, not against it.
          </p>
          <div className="waitlist-card">
            <WaitlistForm variant="lp_b" ctaLabel="Get free early access →" />
            <small style={{ display: "block", marginTop: "8px", textAlign: "center" }}>
              Free during early access &nbsp;·&nbsp; No spam, ever
            </small>
          </div>
        </section>

        {/* ── Social proof bar ────────────────────────────── */}
        <div className="proof-bar">
          <div className="proof-item"><strong>1,200+</strong> on the waitlist</div>
          <div className="proof-dot" />
          <div className="proof-item">Used by <strong>professionals &amp; students</strong> globally</div>
          <div className="proof-dot" />
          <div className="proof-item">Designed to <strong>reduce overwhelm</strong>, one step at a time</div>
        </div>

        {/* ── Problem ─────────────────────────────────────── */}
        <section className="problem-section">
          <p className="section-label">The struggle is real</p>
          <h2 className="section-title">The system wasn&apos;t built for your brain.</h2>
          <p className="section-body">
            ADHD brains don&apos;t struggle with motivation — they struggle with initiation,
            transitions, and sustained effort. Generic productivity apps make this worse, not better.
          </p>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">🌀</div>
              <strong>Initiation paralysis</strong>
              <p>You know what to do but can&apos;t get yourself to start.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🔁</div>
              <strong>Context switching</strong>
              <p>One notification and you&apos;ve lost the thread entirely.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">💭</div>
              <strong>Working memory gaps</strong>
              <p>You had a great idea. It&apos;s gone. Somewhere.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🌙</div>
              <strong>Evening guilt spiral</strong>
              <p>Another day &ldquo;wasted&rdquo; — even though you were busy all day.</p>
            </div>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────── */}
        <section className="features-section">
          <p className="section-label">The ImmutIQ difference</p>
          <h2 className="section-title">Built around micro-wins, not mega-lists.</h2>
          <p className="section-body">
            Instead of overwhelming you, ImmutIQ breaks every goal into the smallest
            possible next action — one you can actually start in the next 2 minutes.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏁</div>
              <h3>Micro-sprint engine</h3>
              <p>
                15-minute focused bursts with gentle alerts. Short enough to start,
                long enough to matter.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧩</div>
              <h3>Task decomposition AI</h3>
              <p>
                Paste any project or goal. ImmutIQ breaks it into ADHD-friendly
                micro-tasks automatically.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Smart re-engagement</h3>
              <p>
                Got distracted? ImmutIQ notices and nudges you back — without
                shaming you for being human.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Weekly win reports</h3>
              <p>
                See every task you completed, not just the ones you missed.
                Build momentum, not shame.
              </p>
            </div>
          </div>
        </section>

        {/* ── Quote ───────────────────────────────────────── */}
        <blockquote className="quote-section">
          <p className="quote-text">
            &ldquo;I&apos;m a software engineer with ADHD and I&apos;ve tried everything — Notion, Todoist,
            paper planners. ImmutIQ is the first tool that actually gets out of my way and
            helps me start. I shipped a side project in 3 weeks using it.&rdquo;
          </p>
          <cite className="quote-source">— Composite beta feedback, New York</cite>
        </blockquote>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <div className="cta-section">
          <div>
            <h2>Your first 15-minute win is waiting.</h2>
            <p>Join 1,200+ ADHD minds already on the waitlist.</p>
          </div>
          <WaitlistFormDark variant="lp_b" ctaLabel="Get free early access →" />
        </div>

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
