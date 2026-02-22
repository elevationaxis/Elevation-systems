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
      {/* Hero */}
      <Section className="bg-foreground text-background pt-32 pb-20">
        <div className="max-w-4xl">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-6 block">
            Our Process
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-8" data-testid="text-services-heading">
            From Digital Chaos<br />to Market Dominance
          </h1>
          <p className="text-xl text-background/70 max-w-2xl leading-relaxed">
            We don't just "do websites." We diagnose, rebuild, integrate, and protect your entire digital presence — so your business gets found, chosen, and trusted. Consistently.
          </p>
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section className="bg-secondary/30 py-16">
        <div className="mb-10">
          <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">The Journey</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {journeySteps.map((step, i) => (
            <div key={i} className="relative border-l border-border/30 pl-6 pb-8 md:pb-0">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-accent" />
              <p className="text-xs text-muted-foreground mb-1">{step.week}</p>
              <p className="text-lg font-serif font-medium mb-1">{step.label}</p>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground border-t border-border/20 pt-6">
          From a fragmented online presence to a dominant local authority — in a structured, predictable timeline.
        </p>
      </Section>

      {/* Phase 1 — Diagnose */}
      <Section className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">Phase 1</span>
            <h2 className="text-4xl font-serif mb-4">Diagnose</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Digital Footprint &amp; Revenue Leak Audit
            </p>
            <div className="border border-border/20 p-5 mb-6 bg-secondary/20">
              <p className="text-2xl font-serif mb-1">$997</p>
              <p className="text-xs text-muted-foreground">Credited toward any build package.</p>
            </div>
            <Link href="/audit">
              <Button className="rounded-none w-full md:w-auto" data-testid="button-run-audit">
                Run Your Audit
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Before we touch anything, we scan your full online presence. We find exactly where leads are slipping through the cracks — and hand you a clear roadmap to fix them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-muted-foreground">We Identify</h3>
                <ul className="space-y-3">
                  {[
                    "Visibility gaps across search, maps & AI results",
                    "Reputation & review weaknesses",
                    "Mismatched business info across directories",
                    "Website performance & conversion issues",
                    "Competitive blind spots",
                    "Pages search engines can't read",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={15} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-4 text-muted-foreground">You Receive</h3>
                <ul className="space-y-3">
                  {[
                    "Comprehensive diagnostic report",
                    "Competitive comparison",
                    "Priority action roadmap",
                    "30-minute strategy breakdown call",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={15} className="text-accent mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 2 — Build & Stabilize */}
      <Section className="bg-secondary/20 py-24">
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">Phase 2</span>
          <h2 className="text-4xl font-serif mb-4">Build &amp; Stabilize</h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Once we know the leaks, we fix them properly. No patchwork. No guesswork. Two packages depending on where your business is today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <Check size={15} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-border/20 pt-6">
              <div className="mb-1">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">Investment</span>
              </div>
              <p className="text-2xl font-serif mb-1">$3,500 – $4,500</p>
              <p className="text-xs text-muted-foreground mb-5">Fast, secure, conversion-ready foundation.</p>
              <Link href="/contact">
                <Button variant="outline" className="rounded-none w-full" data-testid="button-rescue">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Guard System Package */}
          <div className="bg-foreground text-background border border-foreground p-8 flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2 block">Guard System</span>
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
                  <Check size={15} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-background/20 pt-6">
              <div className="mb-1">
                <span className="text-xs text-background/50 uppercase tracking-widest">Investment</span>
              </div>
              <p className="text-2xl font-serif mb-1 text-background">$6,500 – $8,500</p>
              <p className="text-xs text-background/50 mb-5">A real business platform — not a brochure site.</p>
              <Link href="/contact">
                <Button variant="secondary" className="rounded-none w-full" data-testid="button-guard-system">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Phase 3 — Sustain */}
      <Section className="py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">Phase 3</span>
            <h2 className="text-4xl font-serif mb-4">Guard</h2>
            <p className="text-muted-foreground text-sm mb-2">Active Guardian — Ongoing Protection</p>
            <div className="border border-border/20 p-5 mt-6 mb-6 bg-secondary/20">
              <p className="text-2xl font-serif mb-1">$499 / month</p>
              <p className="text-xs text-muted-foreground mb-3">Standard tier</p>
              <p className="text-2xl font-serif mb-1">$1,200+ / month</p>
              <p className="text-xs text-muted-foreground">Enterprise tier</p>
            </div>
            <Link href="/contact">
              <Button variant="outline" className="rounded-none w-full md:w-auto" data-testid="button-sustain">
                Start Protection
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Visibility isn't permanent. Algorithms shift. Competitors optimize. Reviews go stale. Without active maintenance, the foundation you built starts to erode — quietly, and fast.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We keep your infrastructure strong so you never lose ground.
              </p>
            </div>
            <div className="p-6 bg-foreground text-background">
              <p className="text-sm font-medium text-background/90 leading-relaxed">
                Your digital presence becomes resilient — protected against algorithm updates, reputation decay, and competitive pressure — so you stay visible while others drift.
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
                  <Check size={15} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Phase 4 — Dominate */}
      <Section className="bg-foreground text-background py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">Phase 4</span>
            <h2 className="text-4xl font-serif mb-4 text-background">Dominate</h2>
            <p className="text-background/60 text-sm mb-6">Growth &amp; Authority Architecture</p>
            <div className="border border-background/20 p-5 mb-6">
              <p className="text-2xl font-serif mb-1 text-background">Custom Pricing</p>
              <p className="text-xs text-background/50">Scoped to your growth goals.</p>
            </div>
            <Link href="/contact">
              <Button variant="secondary" className="rounded-none w-full md:w-auto" data-testid="button-dominate">
                Let's Talk
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-background/80 leading-relaxed">
                For businesses that don't just want stability — they want to own their category.
              </p>
              <p className="text-background/60 leading-relaxed">
                This tier is built around systems that generate leads automatically, amplify your reputation, and create a compounding competitive advantage that's hard to replicate.
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Advanced review amplification systems",
                "Retargeting & paid traffic integration",
                "AI-powered visibility reinforcement",
                "Content & voice-search strategy",
                "Automated lead machine development",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-background/70">
                  <Check size={15} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section className="py-20 bg-secondary/20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-6" data-testid="text-cta-heading">
            Not sure where to start?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Most clients begin with the audit. It's low-risk, and the $997 investment is credited toward any build. You'll walk away with a clear picture of exactly what's costing you leads — and what to do about it.
          </p>
          <p className="text-muted-foreground/60 text-sm mb-10">
            No pressure. No long contracts. Just a clear, honest conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
