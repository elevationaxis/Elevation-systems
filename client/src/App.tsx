import { FormEvent, useState } from "react";

type AuditResponse = {
  status: string;
  lightReport: {
    headline: string;
    headlineStat: { label: string; value: string; detail: string };
    quickWins: string[];
  };
  nextStep: string;
};

const caseStudies = [
  {
    name: "Devine Quality HVAC",
    problem: "A growing HVAC business needed a digital presence that matched the quality of its work.",
    built: "A clear website structure, service messaging, and a stronger path from search to contact.",
    mattered: "Customers can understand the work, build confidence, and reach out without digging.",
  },
  {
    name: "One Point Construction",
    problem: "The business needed its real-world craft and credibility to come through online.",
    built: "A focused service presence built around trust signals, project clarity, and simple next steps.",
    mattered: "The online experience now supports the reputation already being built in the field.",
  },
  {
    name: "RG Industrial Services",
    problem: "Complex industrial work needed a more direct way to explain capability and fit.",
    built: "A structured digital foundation that makes key services easier to understand and evaluate.",
    mattered: "The business can be found, understood, and contacted with less friction.",
  },
  {
    name: "Tough Grit",
    problem: "A distinctive service brand needed consistency across its customer-facing presence.",
    built: "A cleaner system for positioning, presentation, and the customer journey.",
    mattered: "Each touchpoint reinforces the same standard instead of sending mixed signals.",
  },
];

function Mark() {
  return <span className="axis-mark" aria-hidden="true"><i /><b /><em /></span>;
}

function Logo() {
  return <a className="logo" href="#top" aria-label="Elevation Axis home"><Mark /><span><strong>Elevation Axis</strong><small>Strategy · Systems · Scale</small></span></a>;
}

function Arrow() {
  return <span className="arrow" aria-hidden="true">→</span>;
}

function SectionLabel({ children }: { children: string }) {
  return <div className="section-label"><span />{children}<span /></div>;
}

function AuditForm() {
  const [form, setForm] = useState({ businessName: "", websiteUrl: "", fullName: "", email: "", phone: "", goal: "" });
  const [state, setState] = useState<"idle" | "loading" | "error" | "complete">("idle");
  const [report, setReport] = useState<AuditResponse | null>(null);
  const [error, setError] = useState("");

  const update = (field: keyof typeof form, value: string) => setForm((previous) => ({ ...previous, [field]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setError("");
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json() as AuditResponse & { message?: string };
      if (!response.ok) throw new Error(data.message || "We could not complete that review.");
      setReport(data);
      setState("complete");
    } catch (caught) {
      setState("error");
      setError(caught instanceof Error ? caught.message : "We could not complete that review.");
    }
  }

  if (state === "complete" && report) {
    return <div className="light-report" aria-live="polite">
      <div className="report-eyebrow">Elevation Axis · Initial Review</div>
      <h3>{report.lightReport.headline}</h3>
      <div className="report-stat"><span>{report.lightReport.headlineStat.label}</span><strong>{report.lightReport.headlineStat.value}</strong></div>
      <p className="report-detail">{report.lightReport.headlineStat.detail}</p>
      <div className="report-wins">
        <span>Start here</span>
        <ul>{report.lightReport.quickWins.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <p className="report-next">{report.nextStep}</p>
      <a className="text-link" href={`mailto:hello@elevationaxis.com?subject=${encodeURIComponent(`EA review: ${form.businessName}`)}`}>Continue the conversation <Arrow /></a>
    </div>;
  }

  return <form className="standing-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Business Name<input required value={form.businessName} onChange={(event) => update("businessName", event.target.value)} placeholder="Your business" /></label>
      <label>Website<input required type="url" value={form.websiteUrl} onChange={(event) => update("websiteUrl", event.target.value)} placeholder="https://yourwebsite.com" /></label>
      <label>Your Name<input required value={form.fullName} onChange={(event) => update("fullName", event.target.value)} placeholder="Your name" /></label>
      <label>Email<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@email.com" /></label>
      <label>Phone <span className="optional">optional</span><input type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(555) 555-5555" /></label>
      <label>What are you trying to improve right now?<textarea value={form.goal} onChange={(event) => update("goal", event.target.value)} placeholder="A clearer website, Google visibility, lead follow-up…" /></label>
    </div>
    {state === "error" && <p className="form-error">{error}</p>}
    <button className="button button-gold" disabled={state === "loading"} type="submit">{state === "loading" ? "Reviewing your site…" : "See Where I Stand"} <Arrow /></button>
    <p className="form-note">This is an initial public-site review, not a full diagnostic. It is designed to give you a useful first look—not a generic sales pitch.</p>
  </form>;
}

function App() {
  return <main id="top" className="site-shell">
    <header className="site-header">
      <Logo />
      <nav aria-label="Primary navigation">
        <a href="#what-we-do">What We Do</a>
        <a href="#our-work">Our Work</a>
        <a href="#about">About</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <a className="header-cta" href="#stand">See Where You Stand <Arrow /></a>
    </header>

    <section className="hero dark-stage">
      <div className="architectural-lines" aria-hidden="true" />
      <div className="hero-copy">
        <div className="eyebrow">Strategy · Systems · Scale</div>
        <h1>We turn local businesses into <em>local brands.</em></h1>
        <p>We build the strategy, digital foundation, and systems that make it happen.</p>
        <div className="hero-actions"><a className="button button-gold" href="#stand">See Where You Stand <Arrow /></a><a className="button button-outline" href="#our-work">View Our Work <Arrow /></a></div>
      </div>
      <aside className="hero-side-statement"><span />Strategy<span />Systems<span />Scale</aside>
    </section>

    <section className="journey-section section-pad">
      <div className="content-wide journey-grid">
        <div><SectionLabel>How customers decide</SectionLabel><h2>Your reputation already exists. Your online presence should live up to it.</h2></div>
        <div className="journey-copy"><p>Someone hears your name. They look you up. They check Google, read reviews, visit your website, compare, and decide whether to reach out.</p><p>Those pieces should reinforce each other. <strong>We make sure they do.</strong></p></div>
      </div>
      <div className="journey-steps content-wide"><span>Referral</span><i>→</i><span>Search</span><i>→</i><span>Reviews</span><i>→</i><span>Website</span><i>→</i><span>Decision</span></div>
    </section>

    <section id="what-we-do" className="pillars-section dark-stage section-pad">
      <div className="architectural-lines soft" aria-hidden="true" />
      <div className="content-wide"><SectionLabel>Strategy first. Technology second.</SectionLabel><div className="section-heading"><h2>We look at the <em>whole system.</em></h2><p>Websites, Google visibility, reputation systems, CRM, automation, lead capture, and AI only matter when they actually improve the business.</p></div>
        <div className="pillars">
          <article><span className="pillar-index">01</span><h3>Visibility</h3><p>Be easier to find.</p></article>
          <article><span className="pillar-index">02</span><h3>Credibility</h3><p>Give people a reason to choose you.</p></article>
          <article><span className="pillar-index">03</span><h3>Conversion</h3><p>Make the next step obvious.</p></article>
          <article><span className="pillar-index">04</span><h3>Systems</h3><p>Don’t lose the opportunity after they reach out.</p></article>
        </div>
      </div>
    </section>

    <section className="patterns-section section-pad">
      <div className="content-wide pattern-grid"><div><SectionLabel>Not theory. Pattern recognition.</SectionLabel><h2>Small disconnects create <em>big friction.</em></h2></div><div className="pattern-list"><span>Google says one thing. The website says another.</span><span>The strongest service is buried.</span><span>A form is not checked.</span><span>Reviews exist but do not support the journey.</span><span>Follow-up is inconsistent.</span></div></div>
      <p className="content-wide statement">You don’t solve that by buying random marketing services. You find the disconnects, fix the foundation, and build from there.</p>
    </section>

    <section className="method-section section-pad">
      <div className="content-wide"><SectionLabel>The Elevation Axis Method</SectionLabel><h2>The work is structured so the next move is <em>clear.</em></h2><div className="method-row"><span>Understand</span><i>01</i><span>Diagnose</span><i>02</i><span>Prioritize</span><i>03</i><span>Build</span><i>04</i><span>Improve</span><i>05</i><span>Scale</span><i>06</i></div><p className="method-close">The goal isn’t more technology. It’s a business that’s easier to find, easier to choose, and easier to run.</p></div>
    </section>

    <section className="search-section dark-stage section-pad"><div className="content-wide search-grid"><div><SectionLabel>Search is changing</SectionLabel><h2>Build for the way people actually <em>look.</em></h2></div><div><p>Customers search across Google, maps, reviews, websites, social platforms, and increasingly AI-powered search experiences.</p><p>We don’t chase one algorithm. We build a strong digital foundation that can support the business as search keeps changing.</p></div></div></section>

    <section id="our-work" className="work-section section-pad"><div className="content-wide"><SectionLabel>Our work</SectionLabel><div className="work-intro"><h2>Built around the business—not a template.</h2><p>Every project begins with what is real: the work, the customer journey, the reputation, and the constraint in the way.</p></div><div className="case-grid">{caseStudies.map((study, index) => <article key={study.name} className="case-card"><div className="case-number">0{index + 1}</div><h3>{study.name}</h3><dl><div><dt>Problem</dt><dd>{study.problem}</dd></div><div><dt>What we built</dt><dd>{study.built}</dd></div><div><dt>Why it mattered</dt><dd>{study.mattered}</dd></div></dl></article>)}</div></div></section>

    <section id="about" className="about-section dark-stage section-pad"><div className="architectural-lines soft" aria-hidden="true" /><div className="content-wide about-grid"><div><SectionLabel>Built for businesses that built something real</SectionLabel><h2>You run the business. We help make sure everything around it <em>works.</em></h2></div><div><p>Good businesses often grow through referrals, repeat customers, reputation, and hard work while the digital side quietly falls behind.</p><p>The website may be outdated. The Google profile may be incomplete. The strongest service may be buried. The contact path may be clunky.</p><p className="about-strong">Most businesses do not need “more marketing.” They need someone to look at the whole system.</p><div className="team-line"><span>Brittany Moulder<br /><b>Founder · Strategy &amp; Systems</b></span><span>Tyler Williams<br /><b>Partner · Sales &amp; Growth</b></span></div></div></div></section>

    <section id="pricing" className="pricing-section section-pad"><div className="content-wide"><SectionLabel>Pricing</SectionLabel><div className="pricing-head"><h2>Choose the level of foundation you <em>need.</em></h2><p>Start with the right build. Add support only if it makes sense.</p></div><a className="visibility-strip" href="#stand"><span>Already have a website?</span><strong>Google Visibility Setup — <em>$349 one-time</em></strong><small>For businesses that need their Google foundation cleaned up.</small><Arrow /></a><div className="pricing-group-label"><strong>Build</strong><span>One-time projects</span></div><div className="build-cards"><article><h3>Website</h3><b>$749</b><p>A clean, professional website built around trust and conversion.</p></article><article className="featured"><span>Most Popular</span><h3>Digital Foundation</h3><b>$999</b><p>Website + Google Business Profile setup/optimization + core business information alignment.</p></article><article><h3>Full Brand Foundation</h3><b>$1,599</b><p>Everything in Digital Foundation + brand cleanup and social/profile consistency.</p></article></div><div className="pricing-group-label manage"><strong>Manage</strong><span>Optional monthly support</span></div><div className="manage-cards"><article><h3>Care</h3><b>$99<span>/mo</span></b><ul><li>Hosting &amp; maintenance</li><li>Backups &amp; form checks</li><li>Minor updates</li></ul></article><article><h3>Growth</h3><b>$299<span>/mo</span></b><ul><li>Everything in Care</li><li>CRM &amp; lead capture</li><li>Review requests &amp; follow-up</li><li>Ongoing optimization</li></ul></article></div><p className="pricing-footer">Need more? Custom monthly support available. <strong>Clients own what we build. No required monthly plan.</strong></p></div></section>

    <section id="stand" className="stand-section section-pad"><div className="content-wide stand-layout"><div><SectionLabel>See where you stand</SectionLabel><h2>Before we recommend anything, we <em>look.</em></h2><p>Elevation Axis reviews the business before recommending services. We look at what is working, what deserves attention, what we’d do first, and what can wait.</p><ul className="review-list"><li>Website &amp; customer journey</li><li>Google presence &amp; business information</li><li>Search visibility &amp; reviews</li><li>Contact paths &amp; follow-up</li></ul></div><AuditForm /></div></section>

    <footer><Logo /><p>Strategy first. Technology second.</p><span>© {new Date().getFullYear()} Elevation Axis</span></footer>
  </main>;
}

export default App;
