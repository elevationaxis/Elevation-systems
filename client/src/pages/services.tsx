import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";

const journeySteps = [
  { week: "Week 1–2", label: "Diagnose", desc: "Full audit & roadmap" },
  { week: "Week 3–6", label: "Build", desc: "Foundation implementation" },
  { week: "Week 7–8", label: "Integrate", desc: "Systems & automation" },
  { week: "Month 3+", label: "Scale & Protect", desc: "Guard or Dominate tier" },
];

export default function Services() {
  return (
    <>
      {/* Hero — Black */}
      <Section className="bg-foreground text-background pt-32 pb-16">
        <div className="max-w-4xl">
          {/* Gold label on black */}
          <span className="text-[#C9A84C] uppercase tracking-widest text-xs font-semibold mb-6 block">
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
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#C9A84C]" />
              <p className="text-xs text-muted-foreground mb-1">{step.week}</p>
              <p className="text-base font-serif font-medium mb-0.5">{step.label}</p>
              <p className="text-xs text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Phase 1 — Diagnose */}
      <Section className="py-20">
        <div className="mb-2">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2 block">Phase 1</span>
          <h2 className="text-4xl font-serif mb-1">Diagnose</h2>
          <p className="text-muted-foreground text-sm mb-8">Digital Footprint &amp; Revenue Leak Audit</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Before we touch anything, we scan your full online presence. We find exactly where leads are slipping through the cracks — and hand you a clear roadmap to fix them.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted-foreground">We Identify</h3>
                <ul className="space-y-3">
                  {[
                    "Visibility gaps across search, maps & AI",
                    "Reputation & review weaknesses",
                    "Mismatched business info across directories",
                    "Website performance & conversion issues",
                    "Competitive blind spots",
                    "Pages search engines can't read",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted-foreground">You Receive</h3>
                <ul className="space-y-3">
                  {[
                    "Comprehensive diagnostic report",
                    "Competitive comparison",
                    "Priority action roadmap",
                    "30-minute strategy breakdown call",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/20 p-6 bg-secondary/20">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Investment</p>
              <p className="text-3xl font-serif mb-1">$997</p>
              <p className="text-xs text-muted-foreground mb-6">Credited toward any build package.</p>
              <Link href="/audit">
                <Button variant="outline" size="sm" className="rounded-none" data-testid="button-run-audit">
                  Run Your Audit <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 2 — Build & Stabilize */}
      <Section className="bg-secondary/20 py-20">
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2 block">Phase 2</span>
          <h2 className="text-4xl font-serif mb-3">Build &amp; Stabilize</h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed text-sm">
            Once we know the leaks, we fix them properly. No patchwork. No guesswork. Two packages depending on where your business is today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Rescue Package */}
          <div className="bg-background border border-border/20 p-8 flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Rescue Package</span>
              <h3 className="text-2xl font-serif mb-2">Fix What's Broken</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Best for businesses with an outdated or underperforming site that needs a proper rebuild.</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "High-performance website rebuild",
                "Mobile-first conversion design",
                "Security hardening & SSL",
                "Structured data & search baseline",
                "Google Business Profile optimization",
                "Core local presence alignment",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-border/20 pt-5">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Investment</p>
              <p className="text-2xl font-serif mb-1">$3,500 – $4,500</p>
              <p className="text-xs text-muted-foreground mb-5">Fast, secure, conversion-ready foundation.</p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="rounded-none" data-testid="button-rescue">
                  Get Started <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Guard System Package — Black card */}
          <div className="bg-foreground text-background border border-foreground p-8 flex flex-col">
            <div className="mb-6">
              {/* Gold label on black */}
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-2 block">Guard System</span>
              <h3 className="text-2xl font-serif mb-2 text-background">Build the Platform</h3>
              <p className="text-sm text-background/60 leading-relaxed">Best for growing businesses ready to connect their website to how they actually operate.</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Everything in the Rescue Package",
                "CRM & booking system integration",
                "Operations automation setup",
                "Advanced search readiness",
                "Client-facing performance dashboard",
                "Payment & lead capture flow",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-background/70">
                  {/* Gold check on black */}
                  <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-background/20 pt-5">
              <p className="text-xs text-background/50 uppercase tracking-widest mb-2">Investment</p>
              <p className="text-2xl font-serif mb-1 text-background">$6,500 – $8,500</p>
              <p className="text-xs text-background/50 mb-5">A real business platform — not a brochure site.</p>
              <Link href="/contact">
                <Button variant="secondary" size="sm" className="rounded-none" data-testid="button-guard-system">
                  Get Started <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 3 — Guard */}
      <Section className="py-20">
        <div className="mb-2">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2 block">Phase 3</span>
          <h2 className="text-4xl font-serif mb-1">Guard</h2>
          <p className="text-muted-foreground text-sm mb-8">Active Guardian — Ongoing Protection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Visibility isn't permanent. Algorithms shift. Competitors optimize. Reviews go stale. Without active maintenance, the foundation you built starts to erode — quietly, and fast.
            </p>
            <div className="p-5 bg-foreground text-background">
              <p className="text-sm text-background/90 leading-relaxed">
                Your presence stays strong, visible, and resilient — so you keep the ground you've gained while competitors drift.
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Hosting, SSL & security monitoring",
                "Monthly performance checks",
                "Review growth workflows via SMS & email",
                "Seasonal content optimization",
                "Local ranking protection",
                "Monthly performance reporting",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-border/20 p-6 bg-secondary/20">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Investment</p>
              <p className="text-3xl font-serif mb-1">$499<span className="text-base font-sans font-normal text-muted-foreground"> / mo</span></p>
              <p className="text-xs text-muted-foreground mb-4">Standard tier</p>
              <p className="text-xl font-serif mb-1">$1,200+<span className="text-base font-sans font-normal text-muted-foreground"> / mo</span></p>
              <p className="text-xs text-muted-foreground mb-6">Enterprise tier</p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="rounded-none" data-testid="button-sustain">
                  Start Protection <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 4 — Dominate — Black */}
      <Section className="bg-foreground text-background py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            {/* Gold label on black */}
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A84C] mb-3 block">Phase 4</span>
            <h2 className="text-4xl font-serif mb-1 text-background">Dominate</h2>
            <p className="text-background/60 text-sm mb-8">Growth &amp; Authority Architecture</p>
            <div className="border border-background/20 p-6 mb-0">
              <p className="text-xs text-background/50 uppercase tracking-widest mb-3">Investment</p>
              <p className="text-3xl font-serif mb-1 text-background">Custom</p>
              <p className="text-xs text-background/50 mb-6">Scoped to your growth goals.</p>
              <Link href="/contact">
                <Button variant="secondary" size="sm" className="rounded-none" data-testid="button-dominate">
                  Let's Talk <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="text-xl text-background/80 leading-relaxed">
              For businesses that don't just want stability — they want to own their category.
            </p>
            <p className="text-background/60 leading-relaxed">
              This tier is built around systems that generate leads automatically, amplify your reputation, and create a compounding competitive advantage that's hard to replicate.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                "Advanced review amplification systems",
                "Retargeting & paid traffic integration",
                "AI-powered visibility reinforcement",
                "Content & voice-search strategy",
                "Automated lead machine development",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-background/70">
                  {/* Gold check on black */}
                  <Check size={14} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section className="py-16 bg-secondary/20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-5" data-testid="text-cta-heading">
            Not sure where to start?
          </h2>
          <p className="text-muted-foreground mb-3 leading-relaxed">
            Most clients begin with the audit. It's low-risk, and the $997 investment is credited toward any build. You'll walk away knowing exactly what's costing you leads — and what to do about it.
          </p>
          <p className="text-muted-foreground/60 text-sm mb-8">
            No pressure. No long contracts. Just a clear, honest conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/audit">
              <Button size="lg" className="rounded-none px-8" data-testid="button-run-audit-cta">
                Run Your Audit
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-none px-8" data-testid="button-book-call">
                Book a Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
