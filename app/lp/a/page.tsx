import TrackPageView from "../../../components/TrackPageView";
import WaitlistForm from "../../../components/WaitlistForm";
import WaitlistFormDark from "../../../components/WaitlistFormDark";

export default function LandingPageA() {
  return (
    <>
      <TrackPageView variant="lp_a" />

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
          <span className="hero-eyebrow">Built for ADHD brains</span>
          <h1>
            Stop losing your day to<br />
            <em>task-switching and brain fog.</em>
          </h1>
          <p className="hero-sub">
            ImmutIQ gives you one clear next step at a time — no overwhelming lists,
            no guilt. Designed around how ADHD minds actually work.
          </p>
          <div className="waitlist-card">
            <WaitlistForm variant="lp_a" ctaLabel="Get free early access →" />
            <small style={{ display: "block", marginTop: "8px", textAlign: "center" }}>
              Free during early access &nbsp;·&nbsp; No spam, ever
            </small>
          </div>
        </section>

        {/* ── Social proof bar ────────────────────────────── */}
        <div className="proof-bar">
          <div className="proof-item"><strong>1,200+</strong> people on the waitlist</div>
          <div className="proof-dot" />
          <div className="proof-item"><strong>Worldwide</strong> — US, UK, Canada &amp; beyond</div>
          <div className="proof-dot" />
          <div className="proof-item"><strong>AI-powered</strong> daily focus engine</div>
        </div>

        {/* ── Problem ─────────────────────────────────────── */}
        <section className="problem-section">
          <p className="section-label">Sound familiar?</p>
          <h2 className="section-title">The ADHD planning trap</h2>
          <p className="section-body">
            You start the day with good intentions. By 11 AM you have 12 browser tabs open,
            three half-done tasks, and a growing sense of dread.
          </p>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">😵‍💫</div>
              <strong>Decision paralysis</strong>
              <p>Can&apos;t decide which task to start — so you don&apos;t start any of them.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">⏰</div>
              <strong>Time blindness</strong>
              <p>2 hours disappear and you have nothing to show for it.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">📋</div>
              <strong>List overload</strong>
              <p>Todoist, Notion, sticky notes — and still nothing gets done.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🔋</div>
              <strong>Energy crashes</strong>
              <p>Your brain&apos;s available energy doesn&apos;t match your task list.</p>
            </div>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────── */}
        <section className="features-section">
          <p className="section-label">How ImmutIQ helps</p>
          <h2 className="section-title">One next step. Always clear.</h2>
          <p className="section-body">
            ImmutIQ doesn&apos;t give you a to-do list. It gives you a single, doable action
            that fits your current energy level — then gets out of your way.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>AI that reads your energy</h3>
              <p>
                Tell it how you&apos;re feeling — low, medium, or charged — and it adjusts
                your tasks automatically. No guilt, just fit.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>15-minute micro-sprints</h3>
              <p>
                Short, timed bursts that match ADHD attention spans. Built-in breaks
                prevent burnout and keep momentum going.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>One task at a time</h3>
              <p>
                The app hides everything else until you&apos;re done. No distracting backlog,
                no decision overload.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress you can see</h3>
              <p>
                Daily and weekly win summaries show you exactly what you accomplished —
                building momentum instead of shame.
              </p>
            </div>
          </div>
        </section>

        {/* ── Quote ───────────────────────────────────────── */}
        <blockquote className="quote-section">
          <p className="quote-text">
            &ldquo;I&apos;ve tried every productivity app out there. ImmutIQ is the first one
            that doesn&apos;t make me feel stupid for how my brain works. The one-task-at-a-time
            view is genuinely life-changing.&rdquo;
          </p>
          <cite className="quote-source">— Composite beta feedback, San Francisco</cite>
        </blockquote>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <div className="cta-section">
          <div>
            <h2>Ready to actually finish what you start?</h2>
            <p>Free early access. Be among the first to try ImmutIQ.</p>
          </div>
          <WaitlistFormDark variant="lp_a" ctaLabel="Get free early access →" />
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
