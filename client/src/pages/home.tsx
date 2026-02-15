import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Check, Search, Wrench, Shield, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background"></div>
        <div className="container px-4 md:px-6 text-center max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
          <div className="inline-block mb-6 px-3 py-1 border border-foreground/10 text-xs font-medium tracking-widest uppercase rounded-full" data-testid="text-hero-tag">
            Growth systems for local businesses
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-tight mb-8 font-serif" data-testid="text-hero-heading">
            Is your website an asset <br/>
            <span className="italic font-light text-foreground/80">— or a liability?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed" data-testid="text-hero-sub">
            Most service businesses are spending real money on marketing — but their website is quietly losing leads to the competition. Find out where you stand in under 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/audit">
              <Button size="lg" className="rounded-none px-8 py-6 text-base w-full sm:w-auto" data-testid="button-hero-cta">
                See How You Stack Up
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-none px-8 py-6 text-base w-full sm:w-auto bg-transparent border-foreground/20 hover:bg-foreground/5" data-testid="button-hero-services">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <Section className="bg-secondary/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8" data-testid="text-problem-heading">The real problem isn't traffic.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Most service businesses are spending real money on marketing — ads, SEO, websites — but the bucket they're pouring it into has a leak.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Money goes in. Calls don't come out.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Usually it's a website that was built once, years ago. Nobody knows where the code lives. Nobody can change the important things. Google changed. Mobile behavior changed. How customers search changed. Your website hasn't.
          </p>
        </div>
      </Section>

      {/* How It Works - Four Phases */}
      <Section>
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4" data-testid="text-phases-heading">Fix the foundation first.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">So the money you're already spending turns into booked jobs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              number: "01",
              label: "PREPARE",
              title: "Find the Leaks",
              desc: "We look under the hood to find where calls are going, what's broken, and what's quietly costing you leads.",
              price: "Starting at $499",
              icon: Search,
            },
            {
              number: "02",
              label: "RESCUE",
              title: "Fix the Foundation",
              desc: "We replace fragile, outdated setups with a fast, reliable site you actually control.",
              price: "Starting at $2,500",
              icon: Wrench,
              highlight: true,
            },
            {
              number: "03",
              label: "GUARD",
              title: "Build the System",
              desc: "We wire your site into booking, CRM, and lead tracking so it actually supports your business.",
              price: "Starting at $5,000",
              icon: Shield,
            },
            {
              number: "04",
              label: "PROTECT",
              title: "Stay Ahead",
              desc: "Ongoing monitoring, updates, and optimization so competitors don't quietly pass you.",
              price: "Starting at $199/mo",
              icon: Eye,
            }
          ].map((phase, i) => (
            <div 
              key={i} 
              className={cn(
                "p-8 border flex flex-col transition-all duration-300 hover:-translate-y-1",
                phase.highlight ? "bg-foreground text-background border-foreground" : "bg-background border-border/10"
              )}
              data-testid={`card-phase-${i}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center",
                  phase.highlight ? "text-background" : "text-accent"
                )}>
                  <phase.icon size={20} />
                </div>
                <span className={cn(
                  "text-xs font-semibold tracking-[0.2em] uppercase",
                  phase.highlight ? "text-background/60" : "text-muted-foreground"
                )}>{phase.label}</span>
              </div>
              <h3 className="text-2xl font-serif mb-3">{phase.title}</h3>
              <p className={cn("mb-6 flex-grow leading-relaxed", phase.highlight ? "text-background/70" : "text-muted-foreground")}>
                {phase.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className={cn("text-sm font-medium", phase.highlight ? "text-background/80" : "text-foreground")}>{phase.price}</span>
                <Link href="/services">
                  <span className={cn(
                    "text-sm flex items-center gap-1 hover:gap-2 transition-all",
                    phase.highlight ? "text-background/80 hover:text-background" : "text-accent"
                  )}>
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Who This Is For */}
      <Section className="bg-secondary/20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4" data-testid="text-who-heading">Built for those who build.</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
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
            <div key={i} className="p-6 bg-background border border-border/10 text-center" data-testid={`card-industry-${i}`}>
              <h4 className="font-serif text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bottom Line */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <span className="block font-serif italic text-2xl text-accent mb-6" data-testid="text-quote">"You can keep spending money on marketing and hope it works. Or you can fix the foundation and know it does."</span>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-10">
            Elevation Axis is for owners who want fewer leaks, fewer guesses, and more calls from the same spend. No hype. No babysitting vendors. Just systems that hold.
          </p>
          <div className="flex justify-center gap-8 text-sm uppercase tracking-widest font-medium">
            <span>Fewer Leaks</span>
            <span className="text-border/20">·</span>
            <span>More Calls</span>
            <span className="text-border/20">·</span>
            <span>Systems That Hold</span>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24 border-t border-border/10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-8" data-testid="text-cta-heading">Ready to fix the foundation?</h2>
          <p className="max-w-xl text-muted-foreground mb-10 text-lg">
            See how your website stacks up against the competition — and find out what it'll take to get ahead.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/audit">
              <Button size="lg" className="rounded-none px-12 py-8 text-lg" data-testid="button-cta-audit">
                See How You Compare
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="rounded-none px-12 py-8 text-lg bg-transparent border-foreground/20 hover:bg-foreground/5" data-testid="button-cta-book">
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
