import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, ArrowRight } from "lucide-react";

const GOLD = "#C9A84C";

const journeySteps = [
  { week: "Days 1–10", label: "Build", desc: "Site live, GBP fixed, domain secured" },
  { week: "Month 1–3", label: "Activate", desc: "Reviews, content, ranking" },
  { week: "Month 3+", label: "Grow", desc: "Custom systems & automation" },
  { week: "90-Day Review", label: "Reassess", desc: "You decide what's next" },
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

      {/* Two Paths */}
      <Section className="py-20">
        <div className="mb-10">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">How We Work</span>
          <h2 className="text-4xl font-serif mb-3">Two Paths Forward</h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed text-sm">
            Every engagement starts with the same foundation. Where you go from there is up to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Option A */}
          <div className="bg-background border border-border/20 p-8 flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-2 block">Option A</span>
              <h3 className="text-2xl font-serif mb-1">The Upgrade</h3>
              <p className="text-3xl font-serif mb-1" style={{ color: GOLD }}>$750</p>
              <p className="text-xs text-muted-foreground mb-3">One-time — you own everything.</p>
              <p className="text-sm text-muted-foreground italic border-l-2 pl-3 border-border/30 mb-4">&ldquo;A complete, professional presence — built right and handed to you.&rdquo;</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You keep running your business the way you always have. What changes is everything around it — a professional website that makes you look exactly as good as you are, with your Google presence fixed and optimized.
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Professional website — built and launched",
                "Google Business Profile setup & optimization",
                "Mobile-optimized design",
                "Contact & lead capture form",
                "Domain name secured",
                "You own 100% — no lock-in, ever",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Check size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-border/20 pt-5">
              <p className="text-xs text-muted-foreground mb-4">This is a complete, valuable build on its own. Your business goes from invisible to credible — fast.</p>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="rounded-none" data-testid="button-option-a">
                  Get Started <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Option B */}
          <div className="bg-foreground text-background border border-foreground p-8 flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: GOLD }}>Option B</span>
                <span className="text-xs font-semibold px-2 py-0.5 border" style={{ borderColor: GOLD, color: GOLD }}>RECOMMENDED</span>
              </div>
              <h3 className="text-2xl font-serif mb-1 text-background">The Transformation</h3>
              <p className="text-3xl font-serif mb-1 text-background">$750 <span className="text-lg font-sans font-normal text-background/60">+ $300/mo</span></p>
              <p className="text-xs text-background/50 mb-3">90-day partnership — then we reassess together.</p>
              <p className="text-sm text-background/70 italic border-l-2 pl-3 border-background/20 mb-4">&ldquo;Everything in Option A — plus the $300/month funds active build-out of the systems that replace your current limitations.&rdquo;</p>
              <p className="text-sm text-background/60 leading-relaxed">
                The $300/month isn't a maintenance fee. It's active development time. Each month we build out the next piece of your system — review automation, booking improvements, lead nurturing — until your business runs the way it should.
              </p>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Everything in Option A — fully built & live",
                "Website hosting & maintenance handled for you",
                "Google listing kept active, fresh, and ranking",
                "Review growth strategy — more 5-star reviews, faster",
                "Monthly content updates",
                "Monthly strategy check-in",
                "Active system build-out each month",
                "No long-term contract — cancel after 90 days",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-background/70">
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: GOLD }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="border-t border-background/20 pt-5">
              <Link href="/contact">
                <Button variant="secondary" size="sm" className="rounded-none" data-testid="button-option-b">
                  Get Started <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* 90-Day Promise */}
      <Section className="bg-secondary/20 py-16">
        <div className="max-w-3xl">
          <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3 block">The 90-Day Promise</span>
          <h2 className="text-3xl font-serif mb-5">A partnership, not a subscription trap.</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At the end of 90 days, we sit down together and look at the numbers. We evaluate whether our work together is still needed — or decide what we want to do next. Either way, you keep everything: the website, the domain, the Google listing. All of it.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Option B runs for a minimum of 90 days. After that, cancel anytime with 30 days notice — no penalty, no questions.
          </p>
        </div>
      </Section>

      {/* Founder Rate */}
      <Section className="bg-foreground text-background py-16">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block" style={{ color: GOLD }}>Founder Rate</span>
          <h2 className="text-3xl font-serif mb-5 text-background">Why $750?</h2>
          <p className="text-background/70 leading-relaxed mb-4">
            The standard market rate for everything included in this build is $3,650–$6,700+. You're getting it for $750 because we're in a growth phase and we're selective about who we work with. We take on clients we believe in, at a rate that makes it easy to say yes.
          </p>
          <p className="text-background/70 leading-relaxed mb-8">
            This rate won't last. As our client roster fills, pricing moves to market rate. If you're seeing this, it's available now.
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="sm" className="rounded-none" data-testid="button-founder-cta">
              Claim Your Spot <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </Section>

      {/* Terms */}
      <Section className="py-16 bg-secondary/10">
        <div className="max-w-2xl">
          <h2 className="text-xl font-serif mb-6">Terms &amp; Notes</h2>
          <ul className="space-y-3">
            {[
              "$750 setup fee is due before work begins. A 50% deposit ($375) is accepted to start.",
              "Option B monthly retainer begins the month the site goes live.",
              "Option B runs for a minimum of 90 days. After that, cancel anytime with 30 days notice — no penalty, no questions.",
              "All work, accounts, and assets belong to you from day one. If you ever move on, you take everything with you.",
              "Domain and hosting costs (~$12–$15/yr) are billed separately at cost — no markup.",
              "Timeline: Website live within 7–10 business days of setup payment received.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-accent mt-0.5 flex-shrink-0 font-medium">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
