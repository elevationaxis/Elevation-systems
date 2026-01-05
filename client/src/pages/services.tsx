import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Clock, Calendar } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Systems Audit",
      timeline: "2 Weeks",
      price: "Investment: Starting at $1,500",
      description: "A comprehensive diagnostic of your business operations. We lift the hood to see what's working, what's broken, and where you're losing money and time.",
      whoFor: "For founders who feel overwhelmed but don't know exactly why, or established businesses preparing for a growth sprint.",
      deliverables: [
        "Current State Operational Map",
        "Tech Stack Efficiency Review",
        "Bottleneck Identification Report",
        "90-Day Prioritized Action Plan"
      ]
    },
    {
      title: "Systems Build",
      timeline: "4–8 Weeks",
      price: "Investment: Starting at $5,000",
      description: "We don't just plan it; we build it. This is a complete operational overhaul where I design and implement the custom infrastructure your business needs to scale.",
      whoFor: "For businesses that have outgrown 'winging it' and need robust infrastructure to handle increased volume without breaking.",
      deliverables: [
        "Custom Project Management Hub (ClickUp/Notion)",
        "Automated Client Onboarding Flows",
        "SOP Library & Documentation",
        "Team Training & Handover",
        "30 Days of Support"
      ]
    },
    {
      title: "Operations Retainer",
      timeline: "Monthly",
      price: "Investment: Starting at $2,500/mo",
      description: "Your fractional COO and integration partner. I step into your business to manage the day-to-day operations, lead the team, and ensure strategic execution.",
      whoFor: "For visionaries who need a deeply integrated partner to handle the 'how' so they can focus on the 'what' and 'why'.",
      deliverables: [
        "Weekly Strategy & Sprint Planning",
        "Team Management & accountability",
        "Hiring & Onboarding Support",
        "Metric Tracking & KPI Reporting",
        "Ongoing Systems Optimization"
      ]
    }
  ];

  return (
    <>
      <Section className="bg-secondary/20 pt-32 pb-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Scalable infrastructure for clarity-seeking founders. I offer three distinct ways to engage, depending on the maturity of your business.
          </p>
        </div>
      </Section>

      <Section>
        <div className="space-y-24">
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-border/10 pb-24 last:border-0 last:pb-0">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-serif mb-4">{service.title}</h2>
                <div className="flex flex-col gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {service.timeline}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {service.price}
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-none w-full md:w-auto">
                    Inquire Now
                  </Button>
                </Link>
              </div>
              
              <div className="lg:col-span-8 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">What it is</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Who it's for</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.whoFor}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Deliverables</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Check size={16} className="text-accent mt-0.5" />
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
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-background">Not sure what you need?</h2>
          <p className="text-background/70 mb-8">
            Let's have a conversation. I can help diagnose where you're stuck and recommend the right path forward.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="rounded-none px-8">
              Book a Discovery Call
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
