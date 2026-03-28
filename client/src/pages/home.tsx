import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Search, Wrench, Shield, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight" data-testid="text-hero-heading">
            Your business deserves a digital presence that works as hard as you do.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10" data-testid="text-hero-sub">
            Built around your business. Not a template. Not a guess.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/services">
              <Button size="lg" className="rounded-none px-8" data-testid="button-hero-cta">
                See How It Works
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-none px-8" data-testid="button-hero-services">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* The Problem */}
      <Section className="bg-foreground text-background py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-background" data-testid="text-problem-heading">
            The real problem isn't more traffic. It's the leaks.
          </h2>
          <p className="text-lg leading-relaxed text-background/70 mb-8">
            Most service businesses pour money into marketing, but the bucket they're filling has holes. Websites that don't convert, broken forms, no way to track what's working. The result is the same: money spent, calls missed.
          </p>
          <p className="text-xl font-serif italic text-background/90">
            I find the leaks and seal the foundation. Permanently.
          </p>
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">The Process</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4" data-testid="text-phases-heading">A Disciplined Approach</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Every project follows the same path from chaos to clarity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
          {[
            { title: "Diagnose", desc: "We audit your entire digital presence to find every revenue leak." },
            { title: "Stabilize", desc: "We build a rock-solid foundation you own and control." },
            { title: "Guard", desc: "We protect your presence so you never lose ground." },
            { title: "Dominate", desc: "We build the systems that create a compounding advantage." },
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
      <Section className="bg-secondary/20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4" data-testid="text-who-heading">Built for businesses that build.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            You're an expert in your trade. You shouldn't have to become a digital marketing expert, too.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Home Services", desc: "Plumbers, HVAC, Electricians" },
            { title: "Professional Services", desc: "Consultants, Accountants, Attorneys" },
            { title: "Healthcare", desc: "Dentists, Therapists, Private Practices" },
            { title: "Contractors", desc: "Roofers, Builders, Remodelers" },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-background border border-border/10 text-center">
              <h4 className="font-serif text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quote */}
      <Section className="py-20">
        <div className="max-w-3xl mx-auto">
            <blockquote className="border-l-2 border-accent pl-6">
              <p className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed" data-testid="text-about-cta-quote">
                &ldquo;You can keep spending money on marketing and hope it works. Or you can fix the foundation and know it does.&rdquo;
              </p>
              <cite className="block mt-6 text-xs uppercase tracking-widest text-muted-foreground not-italic">Brittany Moulder &mdash; Elevation Axis</cite>
            </blockquote>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24 bg-foreground text-background">
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif mb-6 text-background" data-testid="text-cta-heading">Ready to build it right?</h2>
          <p className="text-muted-foreground mb-10 text-lg text-background/70">
            Let's find out exactly where you stand and what it'll take to build a digital presence that actually brings in calls. No pressure, no pitch.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="rounded-none px-8" data-testid="button-cta-book">
                Book a Discovery Call
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-none px-8 border-background/20 text-background/80 hover:bg-background/10 hover:text-background" data-testid="button-cta-services">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
