import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Search, Wrench, Shield, Eye, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Services() {
  const phases = [
    {
      number: "01",
      label: "PREPARE",
      title: "Find the Leaks",
      timeline: "1–2 Weeks",
      price: "Starting at $499",
      priceSub: "Credited toward any build.",
      description: "Already have a website but not getting calls? Before we touch anything, we look under the hood. We check where leads are going (or not going), whether forms actually notify anyone, if your Google listing is working or half-broken, and how fast the site loads on phones. New business? Skip ahead to Phase 02.",
      outcome: "After this phase, you'll know exactly what's broken, what's outdated, and what's quietly costing you leads.",
      deliverables: [
        "Where leads are going (or getting lost)",
        "Whether forms and phones actually work",
        "Google listing health check",
        "Site speed and mobile performance review",
        "A clear battle plan — no guesswork"
      ],
      icon: Search,
    },
    {
      number: "02",
      label: "RESCUE",
      title: "Fix the Foundation",
      timeline: "2–4 Weeks",
      price: "Starting at $2,500",
      priceSub: "For new businesses and established ones that need a fresh start.",
      description: "This is where we build or rebuild your foundation. Just starting out with no website yet? This is your starting point — we'll build it right from day one. Already have a site that's slow, outdated, or just not working? We'll replace it with something fast, mobile-friendly, and that you actually own and control. No confusing platforms. No mystery vendors.",
      outcome: "A fast, reliable site that can handle real demand — and that you actually own.",
      deliverables: [
        "Brand new site builds for startups & new businesses",
        "Fast, mobile-first website rebuild",
        "Secure hosting you control",
        "No bloated platforms or mystery code",
        "Clean, professional design that converts",
        "Full ownership and access"
      ],
      icon: Wrench,
      highlight: true,
    },
    {
      number: "03",
      label: "GUARD",
      title: "Turn the Site Into a System",
      timeline: "2–4 Weeks",
      price: "Starting at $5,000",
      priceSub: "For businesses ready to connect their website to how they actually operate.",
      description: "Once the site is solid, we connect it to the tools you use every day — your booking software, your contact forms, your follow-up process. We set up call tracking so you know where leads come from, and make it easy for you to update your own content without needing a developer every time.",
      outcome: "Your website stops being a brochure and starts working like a real part of your business.",
      deliverables: [
        "CRM and booking integration",
        "Call and lead tracking setup",
        "Content management you can handle",
        "Google listing setup and optimization",
        "Everything connected and working together"
      ],
      icon: Shield,
    },
    {
      number: "04",
      label: "PROTECT",
      title: "Stay Ahead While Others Drift",
      timeline: "Monthly",
      price: "Starting at $199/mo",
      priceSub: "Your Brand Guardian — so nothing slips through the cracks.",
      description: "Most businesses fail here because they stop paying attention. We don't. We set up tracking that actually works, review systems that don't rely on reminders, and keep your visibility current as rules change.",
      outcome: "A lead system that doesn't decay. So competitors don't quietly pass you.",
      deliverables: [
        "Monthly performance monitoring",
        "Review management and responses",
        "Seasonal content and offer updates",
        "Technical health and security checks",
        "Competitor visibility tracking"
      ],
      icon: Eye,
    }
  ];

  return (
    <>
      <Section className="bg-secondary/20 pt-32 pb-20">
        <div className="max-w-4xl">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block" data-testid="text-services-label">How It Works</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6" data-testid="text-services-heading">Built right from the start. Fixed when it's not.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed" data-testid="text-services-intro">
            Whether you're just opening your doors or you've been running for years — if your website isn't bringing in calls, we can fix that. And if you don't have one yet, we'll build it right the first time.
          </p>
        </div>
      </Section>

      <Section>
        <div className="space-y-24">
          {phases.map((phase, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border/10 pb-24 last:border-0 last:pb-0" data-testid={`card-service-${index}`}>
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "w-10 h-10 flex items-center justify-center border",
                    phase.highlight ? "bg-foreground text-background border-foreground" : "bg-background border-border/20"
                  )}>
                    <phase.icon size={18} />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">{phase.label}</span>
                </div>
                <h2 className="text-3xl font-serif mb-2">{phase.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{phase.timeline}</p>
                <div className="mb-2">
                  <span className="text-lg font-medium">{phase.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-6">{phase.priceSub}</p>
                <Link href="/contact">
                  <Button variant={phase.highlight ? "default" : "outline"} className="rounded-none w-full md:w-auto" data-testid={`button-inquire-${index}`}>
                    Get Started
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">What happens</h3>
                  <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
                </div>
                
                <div className="p-4 bg-foreground text-background border border-foreground">
                  <p className="text-sm font-medium text-background">{phase.outcome}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">What you get</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-foreground text-background py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-background" data-testid="text-cta-heading">Not sure where to start?</h2>
          <p className="text-background/70 mb-4">
            Most clients begin with the diagnostic. It's low-risk, and the investment is credited toward any build.
          </p>
          <p className="text-background/50 text-sm mb-8">
            No pressure. No long contracts. Just a conversation about what's leaking and how to fix it.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="rounded-none px-8" data-testid="button-book-call">
              Book a Discovery Call
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
