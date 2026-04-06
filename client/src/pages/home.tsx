import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-28 pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif mb-10 leading-[1.05] tracking-tight" data-testid="text-hero-heading">
            Is your website an asset<br />
            <span className="italic">&mdash; or a liability?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3" data-testid="text-hero-sub">
            Most service businesses don&rsquo;t have a traffic problem.
            They have leaks&mdash;missed calls, broken systems, and websites that don&rsquo;t convert.
          </p>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-12">
            I find the leaks and fix the foundation&mdash;so your marketing actually works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-none px-8" data-testid="button-hero-cta">
                Find My Leaks
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-none px-8" data-testid="button-hero-secondary">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Problem Section */}
      <Section className="bg-foreground text-background py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-background" data-testid="text-problem-heading">
            The real problem isn&rsquo;t more traffic. It&rsquo;s the leaks.
          </h2>
          <p className="text-lg leading-relaxed text-background/70 mb-8">
            You can keep pouring money into ads, SEO, and marketing&mdash;but if the foundation is broken, it doesn&rsquo;t matter.
          </p>
          <ul className="text-left inline-block space-y-3 mb-10 text-background/80">
            {[
              "Websites that look good but don't convert",
              "Forms that don't notify anyone",
              "No system to track where leads come from",
              "Missed calls and lost opportunities",
              "Vanity metrics that don't lead to revenue",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 inline-block" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-background/60 text-base mb-6">The result is always the same: money spent, calls missed.</p>
          <p className="text-xl font-serif italic text-background/90">
            I find the leaks and seal the foundation. Permanently.
          </p>
        </div>
      </Section>

      {/* What I Actually Do */}
      <Section className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">What I Do</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-6" data-testid="text-whatido-heading">
            I fix what&rsquo;s costing you calls.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            I rebuild your digital presence so the money you&rsquo;re already spending on marketing actually turns into booked jobs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {[
              "High-converting websites that load fast",
              "CRM + booking integrations",
              "Lead tracking + follow-up systems",
              "Google listing optimization + local visibility",
              "Call routing + missed call capture",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-border/10 bg-secondary/10">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 inline-block" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* What I Don't Do */}
      <Section className="bg-secondary/20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-10" data-testid="text-dontdo-heading">
            What I Don&rsquo;t Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {[
              "Pretty websites that don't bring in calls",
              "Cookie-cutter templates that look like everyone else",
              "Quick fixes that break next month",
              "Systems you can't understand or control",
              "Vanity metrics that don't lead to revenue",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-background border border-border/10">
                <span className="mt-1 text-muted-foreground text-lg leading-none">&times;</span>
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="py-20">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">The Process</span>
          <h2 className="text-3xl md:text-4xl font-serif mb-4" data-testid="text-phases-heading">How It Gets Fixed</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Four phases. No shortcuts.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
          {[
            { title: "Diagnose", desc: "I audit your entire online presence and find every revenue leak." },
            { title: "Stabilize", desc: "We rebuild the foundation so everything works — fast, clean, and reliable." },
            { title: "Guard", desc: "Your systems are protected so leads don't fall through the cracks." },
            { title: "Grow", desc: "Now your marketing compounds instead of leaking." },
          ].map((phase, i) => (
            <div key={i}>
              <div className="flex items-center justify-center w-12 h-12 bg-secondary/30 text-accent rounded-full mx-auto mb-4 font-serif text-lg">{i + 1}</div>
              <h3 className="font-serif text-xl mb-2">{phase.title}</h3>
              <p className="text-sm text-muted-foreground">{phase.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who This Is For */}
      <Section className="bg-foreground text-background py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-background" data-testid="text-who-heading">
            Built for businesses that rely on calls.
          </h2>
          <p className="text-background/70 max-w-xl mx-auto">
            If your business depends on leads, appointments, or booked jobs&mdash;this matters.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {[
            { title: "Home Services", desc: "HVAC, Plumbing, Electrical" },
            { title: "Contractors", desc: "Roofing, Remodeling, Builders" },
            { title: "Professional Services", desc: "Consultants, Attorneys, Accountants" },
            { title: "Local Businesses", desc: "Any service-based operation" },
          ].map((item, i) => (
            <div key={i} className="p-6 border border-background/10 text-center">
              <h4 className="font-serif text-lg mb-2 text-background">{item.title}</h4>
              <p className="text-sm text-background/60">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-background/60 text-base italic max-w-xl mx-auto">
          You don&rsquo;t need more traffic. You need what you already have to work.
        </p>
      </Section>

      {/* Philosophy Quote */}
      <Section className="py-20">
        <div className="max-w-3xl mx-auto">
          <blockquote className="border-l-2 border-accent pl-6">
            <p className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed" data-testid="text-quote">
              &ldquo;You can keep spending money on marketing and hope it works. Or you can fix the foundation and know it does.&rdquo;
            </p>
            <cite className="block mt-6 text-xs uppercase tracking-widest text-muted-foreground not-italic">
              Brittany Moulder &mdash; Elevation Axis
            </cite>
          </blockquote>
        </div>
      </Section>

      {/* Authority Bridge */}
      <Section className="bg-secondary/20 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6" data-testid="text-authority-heading">
            This isn&rsquo;t theory. It&rsquo;s pattern recognition.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Before Elevation Axis, I watched too many good businesses waste money on marketing that never paid off.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Not because the ads were bad&mdash;but because the foundation underneath was broken.
          </p>
          <Link href="/about">
            <Button variant="outline" size="lg" className="rounded-none px-8">
              Learn How I Work
            </Button>
          </Link>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="py-24 bg-foreground text-background">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif mb-6 text-background" data-testid="text-cta-heading">
            Ready to fix it for real?
          </h2>
          <p className="text-background/70 mb-10 text-lg max-w-xl mx-auto">
            Let&rsquo;s find exactly where your leads are leaking&mdash;and what it takes to fix it.
            No pressure. No pitch. Just clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="rounded-none px-8" data-testid="button-cta-book">
                Book a Discovery Call
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-none px-8 border-background/20 text-background/80 hover:bg-background/10 hover:text-background" data-testid="button-cta-analysis">
                Get a Free Analysis
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
