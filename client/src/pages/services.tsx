import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";

const GOLD = "#C9A84C";

const journeySteps = [
  { week: "Week 1–2", label: "Diagnose", desc: "Full audit & roadmap" },
  { week: "Week 3–6", label: "Build", desc: "Foundation implementation" },
  { week: "Week 7–8", label: "Integrate", desc: "Systems & automation" },
  { week: "Month 3+", label: "Scale & Protect", desc: "Guard or Dominate tier" },
];

// ─── Light Phase Card ──────────────────────────────────────────────────────────
function LightPhase({
  label, title, price, priceSub, summary, outcome,
  deliverables, deliverableLabel, cta, ctaHref, altBg,
}: {
  label: string; title: string; price: string; priceSub: string;
  summary: string; outcome: string; deliverables: string[];
  deliverableLabel: string; cta: string; ctaHref: string; altBg?: boolean;
}) {
  return (
    <Section className={`${altBg ? "bg-secondary/10" : "bg-background"} py-20 border-t border-border/10`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">{label}</span>
          <h2 className="text-3xl font-serif mb-3">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{summary}</p>
          <div className="border border-border/20 bg-secondary/20 p-5 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Investment</p>
            <p className="text-2xl font-serif mb-1">{price}</p>
            <p className="text-xs text-muted-foreground">{priceSub}</p>
          </div>
          <Link href={ctaHref}>
            <Button variant="outline" size="sm" className="rounded-none">
              {cta} <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-foreground p-5">
            <p className="text-sm font-medium text-background leading-relaxed">{outcome}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{deliverableLabel}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Dark Phase Card ───────────────────────────────────────────────────────────
function DarkPhase({
  label, title, price, priceSub, summary, outcome,
  deliverables, deliverableLabel, cta, ctaHref,
}: {
  label: string; title: string; price: string; priceSub: string;
  summary: string; outcome: string; deliverables: string[];
  deliverableLabel: string; cta: string; ctaHref: string;
}) {
  return (
    <Section className="bg-foreground py-20 border-t border-background/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 block" style={{ color: GOLD }}>{label}</span>
          <h2 className="text-3xl font-serif mb-3 text-background">{title}</h2>
          <p className="text-sm text-background/60 leading-relaxed mb-6">{summary}</p>
          <div className="border border-background/20 bg-background/5 p-5 mb-6">
            <p className="text-xs text-background/50 uppercase tracking-widest mb-2">Investment</p>
            <p className="text-2xl font-serif mb-1 text-background">{price}</p>
            <p className="text-xs text-background/50">{priceSub}</p>
          </div>
          <Link href={ctaHref}>
            <Button variant="secondary" size="sm" className="rounded-none">
              {cta} <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-background/10 border border-background/20 p-5">
            <p className="text-sm font-medium text-background/90 leading-relaxed">{outcome}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">{deliverableLabel}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-background/70">
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <>
      {/* Hero */}
      <Section className="bg-foreground text-background pt-32 pb-16">
        <div className="max-w-4xl">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-6 block" style={{ color: GOLD }}>
            Our Process
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6" data-testid="text-services-heading">
            From Digital Chaos<br />to Market Dominance
          </h1>
          <p className="text-lg text-background/65 max-w-2xl leading-relaxed">
            We diagnose, rebuild, integrate, and protect your entire digital presence — so your business gets found, chosen, and trusted. Consistently.
          </p>
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section className="bg-secondary/30 py-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-8">The Journey</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {journeySteps.map((step, i) => (
            <div key={i} className="relative border-l border-border/30 pl-5 pb-6 md:pb-0">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: GOLD }} />
              <p className="text-xs text-muted-foreground mb-1">{step.week}</p>
              <p className="text-base font-serif font-medium mb-0.5">{step.label}</p>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Phase 1 — Diagnose */}
      <LightPhase
        label="Phase 1 — Diagnose"
        title="Digital Footprint & Revenue Leak Audit"
        price="$997"
        priceSub="Credited toward any build package."
        summary="Before we touch anything, we scan your full online presence. We find exactly where leads are slipping through the cracks — and hand you a clear roadmap to fix them."
        outcome="You'll know exactly what's broken, what's costing you leads, and what to fix first."
        deliverableLabel="What's Covered"
        deliverables={[
          "Visibility gaps across search, maps & AI",
          "Reputation & review weaknesses",
          "Mismatched business info across directories",
          "Website performance & conversion issues",
          "Competitive blind spots",
          "Pages search engines can't read",
          "Comprehensive diagnostic report",
          "Priority action roadmap & strategy call",
        ]}
        cta="Run Your Audit"
        ctaHref="/audit"
      />

      {/* Phase 2a — Rescue */}
      <LightPhase
        label="Phase 2 — Stabilize: Rescue Package"
        title="Fix What's Broken"
        price="$3,500 – $4,500"
        priceSub="For outdated or underperforming sites."
        summary="We rebuild your site properly — fast, mobile-first, and built to convert. No patchwork. No mystery code. A foundation you actually own."
        outcome="A fast, secure, conversion-ready site that works as hard as you do."
        deliverableLabel="What's Included"
        deliverables={[
          "High-performance website rebuild",
          "Mobile-first conversion design",
          "Security hardening & SSL",
          "Structured data & search baseline",
          "Google Business Profile optimization",
          "Core local presence alignment",
        ]}
        cta="Get Started"
        ctaHref="/contact"
        altBg
      />

      {/* Phase 2b — Guard System */}
      <DarkPhase
        label="Phase 2 — Stabilize: Guard System"
        title="Build the Platform"
        price="$6,500 – $8,500"
        priceSub="For businesses ready to connect their site to how they operate."
        summary="Everything in the Rescue Package, plus the integrations that turn your website into a real business tool — bookings, CRM, lead tracking, and automation."
        outcome="A real business platform — not a brochure site."
        deliverableLabel="What's Included"
        deliverables={[
          "Everything in the Rescue Package",
          "CRM & booking system integration",
          "Operations automation setup",
          "Advanced search readiness",
          "Client-facing performance dashboard",
          "Payment & lead capture flow",
        ]}
        cta="Get Started"
        ctaHref="/contact"
      />

      {/* Phase 3 — Guard */}
      <LightPhase
        label="Phase 3 — Guard"
        title="Ongoing Protection & Growth"
        price="$499 / mo"
        priceSub="Enterprise tier from $1,200 / mo."
        summary="Visibility isn't permanent. Algorithms shift. Competitors optimize. We keep your infrastructure strong so you never lose ground."
        outcome="Your presence stays visible and resilient while competitors drift."
        deliverableLabel="What's Covered"
        deliverables={[
          "Hosting, SSL & security monitoring",
          "Monthly performance checks",
          "Review growth workflows via SMS & email",
          "Seasonal content optimization",
          "Local ranking protection",
          "Monthly performance reporting",
        ]}
        cta="Start Protection"
        ctaHref="/contact"
        altBg
      />

      {/* Phase 4 — Dominate */}
      <DarkPhase
        label="Phase 4 — Dominate"
        title="Growth & Authority Architecture"
        price="Custom"
        priceSub="Scoped to your growth goals."
        summary="For businesses that don't just want stability — they want to own their category. Systems that generate leads automatically and create a compounding competitive advantage."
        outcome="Predictable lead flow, amplified reputation, and a competitive advantage that's hard to replicate."
        deliverableLabel="What We Build"
        deliverables={[
          "Advanced review amplification systems",
          "Retargeting & paid traffic integration",
          "AI-powered visibility reinforcement",
          "Content & voice-search strategy",
          "Automated lead machine development",
        ]}
        cta="Let's Talk"
        ctaHref="/contact"
      />
    </>
  );
}
