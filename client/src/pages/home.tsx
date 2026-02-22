import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Search, Wrench, Shield, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section — untouched */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background"></div>
        <div className="container px-4 md:px-6 text-center max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
          <div className="inline-block mb-6 px-3 py-1 border border-foreground/10 text-xs font-sans font-medium tracking-widest uppercase rounded-full" data-testid="text-hero-tag">
            Growth systems for local businesses
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-tight mb-8 font-serif" data-testid="text-hero-heading">
            Is your website an asset <br/>
            <span className="italic font-light text-foreground/80">— or a liability?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans" data-testid="text-hero-sub">
Just starting out or already running? Either way, your website should be bringing in calls. Find out where you stand — or where to start — in under 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/audit">
              <Button size="lg" className="rounded-none px-6 py-3 text-sm w-full sm:w-auto" data-testid="button-hero-cta">
                Get a Free Website Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-none px-6 py-3 text-sm w-full sm:w-auto bg-transparent border-foreground/20 hover:bg-foreground/5" data-testid="button-hero-services">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem — black card */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-background" data-testid="text-problem-heading">
            The real problem isn't traffic.
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-background/70 font-sans">
Most service businesses are spending real money on marketing — ads, Google, websites — but the bucket they're pouring it into has a leak.
          </p>
          <p className="text-xl font-serif italic text-background/90 mb-6">
            Money goes in. Calls don't come out.
          </p>
          <p className="text-background/60 leading-relaxed font-sans">
Sometimes it's a website that was built once, years ago, and nobody's touched it since. Sometimes it's a brand new business that never got set up right in the first place. Either way, the result is the same — money spent, calls missed.
          </p>
        </div>
      </section>

      {/* How It Works — alternating black/ivory cards */}
      <Section>
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-widest text-xs font-sans font-semibold mb-4 block">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4" data-testid="text-phases-heading">Fix the foundation first.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">New business or established — every strong website starts with the same foundation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              label: "PREPARE",
              title: "Find the Leaks",
              desc: "We look under the hood to find where calls are going, what's broken, and what's quietly costing you leads.",
              price: "Starting at $499",
              icon: Search,
              dark: false,
            },
            {
              label: "RESCUE",
              title: "Fix the Foundation",
              desc: "Starting fresh or replacing something broken — we build a fast, reliable site you actually own and control.",
              price: "Starting at $2,500",
              icon: Wrench,
              dark: true,
            },
            {
              label: "GUARD",
              title: "Build the System",
              desc: "We connect your site to your booking tools, contact forms, and follow-up process so it works like a real part of your business.",
              price: "Starting at $5,000",
              icon: Shield,
              dark: true,
            },
            {
              label: "PROTECT",
              title: "Stay Ahead",
              desc: "Ongoing monitoring, updates, and optimization so competitors don't quietly pass you.",
              price: "Starting at $199/mo",
              icon: Eye,
              dark: false,
            },
          ].map((phase, i) => (
            <div
              key={i}
              className={cn(
                "p-8 border flex flex-col transition-all duration-300 hover:-translate-y-1",
                phase.dark
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background border-border/10"
              )}
              data-testid={`card-phase-${i}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("w-8 h-8 flex items-center justify-center", phase.dark ? "text-background/60" : "text-accent")}>
                  <phase.icon size={20} />
                </div>
                <span className={cn("text-xs font-sans font-semibold tracking-[0.2em] uppercase", phase.dark ? "text-background/50" : "text-muted-foreground")}>
                  {phase.label}
                </span>
              </div>
              <h3 className={cn("text-2xl font-serif mb-3", phase.dark ? "text-background" : "text-foreground")}>
                {phase.title}
              </h3>
              <p className={cn("mb-6 flex-grow leading-relaxed font-sans text-sm", phase.dark ? "text-background/70" : "text-muted-foreground")}>
                {phase.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className={cn("text-sm font-sans font-medium", phase.dark ? "text-background/80" : "text-foreground")}>
                  {phase.price}
                </span>
                <Link href="/services">
                  <span className={cn(
                    "text-sm font-sans flex items-center gap-1 hover:gap-2 transition-all",
                    phase.dark ? "text-background/70 hover:text-background" : "text-accent"
                  )}>
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Who This Is For — black cards on ivory background */}
      <Section className="bg-secondary/20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4" data-testid="text-who-heading">Built for those who build.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-sans">
            You're an expert in your trade. You shouldn't have to become a web expert too.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Home Services", desc: "Plumbers, HVAC, electricians, landscapers" },
            { title: "Professional Services", desc: "Consultants, accountants, attorneys" },
            { title: "Healthcare", desc: "Dentists, therapists, private practices" },
            { title: "Contractors", desc: "Roofers, builders, remodelers" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-foreground text-background border border-foreground text-center hover:-translate-y-1 transition-all duration-300"
              data-testid={`card-industry-${i}`}
            >
              <h4 className="font-serif text-lg mb-2 text-background">{item.title}</h4>
              <p className="text-sm font-sans text-background/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quote — full-width black band */}
      <section className="bg-foreground text-background py-20 md:py-28">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto text-center">
          <span className="block font-serif italic text-2xl md:text-3xl text-background/90 mb-8" data-testid="text-quote">
            "You can keep spending money on marketing and hope it works. Or you can fix the foundation and know it does."
          </span>
          <p className="text-lg leading-relaxed text-background/60 font-sans mb-10">
            Elevation Axis is for owners who want fewer leaks, fewer guesses, and more calls from the same spend. No hype. No babysitting vendors. Just systems that hold.
          </p>
          <div className="flex justify-center gap-8 text-xs font-sans uppercase tracking-widest font-medium text-background/50">
            <span>Fewer Leaks</span>
            <span>·</span>
            <span>More Calls</span>
            <span>·</span>
            <span>Systems That Hold</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section className="py-24 border-t border-border/10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-8" data-testid="text-cta-heading">Ready to build it right?</h2>
          <p className="max-w-xl text-muted-foreground mb-10 text-lg font-sans">
            Starting from scratch or fixing what's already there — let's find out exactly where you stand and what it'll take to start getting calls.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/audit">
              <Button size="lg" className="rounded-none px-6 py-3 text-sm" data-testid="button-cta-audit">
                See How You Compare
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-none px-6 py-3 text-sm bg-transparent border-foreground/20 hover:bg-foreground/5" data-testid="button-cta-book">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
