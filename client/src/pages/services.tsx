import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Search, Wrench, Shield, Zap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Services() {
  const phases = [
    {
      number: "01",
      label: "DIAGNOSE",
      title: "Digital Footprint & Visibility Audit",
      timeline: "1-2 Weeks",
      price: "Starts at $499",
      priceSub: "Credited toward any implementation.",
      description: "A comprehensive diagnostic that reveals the gaps in your online presence — where you’re visible, where you’re invisible, and what’s costing you leads right now.",
      outcome: "Gain a clear, actionable score of your online presence, highlighting visibility gaps, reputation leaks, and competitive blind spots.",
      deliverables: [
        "Visibility Gap Analysis",
        "Reputation & Review Audit",
        "Competitive Landscape Report",
        "Lead & Conversion Flow Mapping",
        "An Actionable Roadmap to Fix Leaks"
      ],
      icon: Search,
    },
    {
      number: "02",
      label: "STABILIZE",
      title: "Presence Rescue & Implementation",
      timeline: "2–4 Weeks",
      price: "Starts at $2,500",
      priceSub: "For new businesses and established ones that need a fresh start.",
      description: "Once we know the gaps, we fix the leaks. From core website performance to Google Business optimization, reviews, and structured data — we build the foundation that drives real customer discovery.",
      outcome: "Your business gets found, gets chosen, and gets trusted. We fix the leaks to create a stable foundation for growth.",
      deliverables: [
        "High-Performance Website Build/Rebuild",
        "Google Business Profile Optimization",
        "Review & Reputation System Setup",
        "Schema & Structured Data Implementation",
        "Core Conversion Infrastructure"
      ],
      icon: Wrench,
      highlight: true,
    },
    {
      number: "03",
      label: "GUARD",
      title: "Ongoing Protection & Growth System",
      timeline: "Monthly",
      price: "Starts at $499/mo",
      priceSub: "Protect your investment and ensure it grows.",
      description: "Visibility isn’t static — it degrades without attention. We build operational systems that ensure your presence stays strong, visible, and resilient against algorithm shifts and competitive pressure.",
      outcome: "Your digital infrastructure becomes resilient with algorithm-proof positioning, active reputation monitoring, and accelerated customer reviews.",
      deliverables: [
        "Algorithm-Proof SEO Positioning",
        "Active Reputation Monitoring & Alerts",
        "Review Generation & Response System",
        "Monthly Performance & Security Audits",
        "Proactive Technical Maintenance"
      ],
      icon: Shield,
    },
    {
      number: "04",
      label: "DOMINATE",
      title: "Leadership & Authority Architecture",
      timeline: "Quarterly Projects",
      price: "Custom Pricing",
      priceSub: "For clients who want to lead their market.",
      description: "For clients who want not just stability, but market leadership. We build systems for automated lead flow, reputation amplification, and converting visibility into revenue predictably.",
      outcome: "Generate predictable growth with automated funnels, a stacked audience credibility, and a distinct competitive advantage.",
      deliverables: [
        "Automated Lead Nurturing Funnels",
        "Content Marketing & Authority Systems",
        "Paid Traffic & Conversion Optimization",
        "Advanced Analytics & Performance Tracking",
        "Strategic Market Expansion"
      ],
      icon: Zap,
    }
  ];

  return (
    <>
      <Section className="bg-secondary/20 pt-32 pb-20">
        <div className="max-w-4xl">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block" data-testid="text-services-label">Our Process</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6" data-testid="text-services-heading">From Leaking Leads to Leading the Market</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed" data-testid="text-services-intro">
            We take you through a clear, four-phase journey to transform your online presence from a cost center into a revenue driver. It's a path from diagnosis to dominance.
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
                  <h3 className="text-lg font-medium mb-2">The Goal</h3>
                  <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
                </div>
                
                <div className="p-4 bg-foreground text-background border border-foreground">
                  <p className="text-sm font-medium text-background">{phase.outcome}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Key Deliverables</h3>
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
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-background" data-testid="text-cta-heading">Ready to Start the Journey?</h2>
          <p className="text-background/70 mb-4">
            Most clients begin with the diagnostic. It's a low-risk first step, and the investment is credited toward any future work.
          </p>
          <p className="text-background/50 text-sm mb-8">
            No pressure. No long contracts. Just a clear, honest conversation about what's leaking and how to fix it.
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
