import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Check, LayoutGrid, Layers, Settings2, Brain, Zap, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background"></div>
        <div className="container px-4 md:px-6 text-center max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
          <div className="inline-block mb-6 px-3 py-1 border border-foreground/10 text-xs font-medium tracking-widest uppercase rounded-full">
            Systems that work with your nervous system
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-tight mb-8 font-serif">
            From chaos to clarity <br/>
            <span className="italic font-light text-foreground/80">through intelligent design.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            I help service business owners move from overwhelm to calm execution using modern AI, automation, and structure. Not theory. Not hype. Just systems that work.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-none px-8 py-6 text-base w-full sm:w-auto">
                Book a Call
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-none px-8 py-6 text-base w-full sm:w-auto bg-transparent border-foreground/20 hover:bg-foreground/5">
                Meet Brittany
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <Section className="bg-secondary/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 p-6">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif">Structure</h3>
            <p className="text-muted-foreground leading-relaxed">
              Remove friction instead of adding complexity. Build a business that doesn't depend on your constant attention.
            </p>
          </div>
          <div className="space-y-4 p-6 border-t md:border-t-0 md:border-l border-border/10">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif">Automation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Capture leads, follow up automatically, and simplify workflows so you stop repeating yourself.
            </p>
          </div>
          <div className="space-y-4 p-6 border-t md:border-t-0 md:border-l border-border/10">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif">Clarity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Reduce mental load and decision fatigue. Know exactly what needs to happen, when, and by whom.
            </p>
          </div>
        </div>
      </Section>

      {/* Who This Is For */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Who this is for</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Elevation Systems is designed for business owners who sell services or expertise and are tired of manual follow-up. You want fewer tools, not more.
            </p>
            <ul className="space-y-4">
              {[
                { label: "Local Service Businesses", desc: "Plumbers, landscapers, boutique agencies." },
                { label: "Consultants & Operators", desc: "Experts selling knowledge, not hours." },
                { label: "Small Teams", desc: "Ready to systemize and escape the chaos." },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <Check className="text-accent mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-lg font-medium">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative p-8 bg-secondary/10 border border-border/10">
            <h3 className="text-2xl font-serif mb-6">What I build</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="w-10 h-10 flex items-center justify-center bg-background border border-border/20">
                   <LayoutGrid size={20} />
                 </div>
                 <div>
                   <h4 className="font-medium">High-Converting Websites</h4>
                   <p className="text-sm text-muted-foreground">Simple, elegant, and built to sell.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 flex items-center justify-center bg-background border border-border/20">
                   <MessageSquare size={20} />
                 </div>
                 <div>
                   <h4 className="font-medium">AI Chat & Voice Systems</h4>
                   <p className="text-sm text-muted-foreground">Never miss a call or lead again.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-10 h-10 flex items-center justify-center bg-background border border-border/20">
                   <Settings2 size={20} />
                 </div>
                 <div>
                   <h4 className="font-medium">Automated Workflows</h4>
                   <p className="text-sm text-muted-foreground">Connect your tools to stop manual data entry.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Offers */}
      <Section className="bg-foreground text-background">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif mb-4 text-background">Signature Services</h2>
          <p className="text-background/60">Hands-on builds. No outsourcing. No overcomplication.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Systems Audit",
              price: "2 Weeks",
              desc: "A deep-dive analysis to find where you're leaking time and money.",
              features: ["Workflow Mapping", "Tech Stack Review", "Bottleneck Report"]
            },
            {
              title: "The Build",
              price: "4-8 Weeks",
              desc: "Complete operational overhaul. I build the machine while you drive.",
              features: ["Custom Web Apps", "AI Integration", "Team Training"],
              highlight: true
            },
            {
              title: "Operations Retainer",
              price: "Monthly",
              desc: "Your fractional COO and technical partner.",
              features: ["Weekly Strategy", "System Optimization", "Tech Support"]
            }
          ].map((offer, i) => (
            <div 
              key={i} 
              className={cn(
                "p-8 border flex flex-col h-full transition-transform duration-300 hover:-translate-y-1", 
                offer.highlight ? "bg-background text-foreground border-background" : "bg-transparent border-background/20 text-background"
              )}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-serif mb-2">{offer.title}</h3>
                <span className="text-sm uppercase tracking-widest opacity-70">{offer.price}</span>
              </div>
              <p className={cn("mb-8 flex-grow", offer.highlight ? "text-muted-foreground" : "text-background/70")}>
                {offer.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {offer.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check size={16} className={offer.highlight ? "text-accent" : "text-background/50"} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <Button 
                  variant={offer.highlight ? "default" : "outline"} 
                  className={cn("w-full rounded-none", !offer.highlight && "border-background/30 hover:bg-background/10 text-background hover:text-background")}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Founder Quote */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <span className="block font-serif italic text-2xl text-accent mb-6">"Structure is freedom. Without boundaries, creativity dissipates."</span>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-10">
            I don't just organize files; I design the architecture that allows your best work to surface. My goal is to build a business that works with your nervous system, not against it.
          </p>
          <div className="flex justify-center gap-8 text-sm uppercase tracking-widest font-medium">
            <span>Sustainable Growth</span>
            <span className="text-border/20">•</span>
            <span>Intelligent Design</span>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24 border-t border-border/10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-8">Ready to build?</h2>
          <p className="max-w-xl text-muted-foreground mb-10 text-lg">
            Let's turn your vision into a sustainable reality. Schedule a consultation to see if we're a match.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-none px-12 py-8 text-lg">
              Book a Consultation
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
