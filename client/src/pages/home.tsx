import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Check, LayoutGrid, Layers, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background"></div>
        <div className="container px-4 md:px-6 text-center max-w-4xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
          <div className="inline-block mb-6 px-3 py-1 border border-foreground/10 text-xs font-medium tracking-widest uppercase rounded-full">
            Intelligent Business Design
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-tight mb-8 font-serif">
            From chaos to clarity <br/>
            <span className="italic font-light text-foreground/80">built systems that scale.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            I help founders move from overwhelm to calm authority by implementing the structures, systems, and intelligent design your business needs to grow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-none px-8 py-6 text-base w-full sm:w-auto">
                Book a Call
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-none px-8 py-6 text-base w-full sm:w-auto bg-transparent border-foreground/20 hover:bg-foreground/5">
                View Services
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
            <h3 className="text-2xl font-serif">Clarity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Eliminate decision fatigue. Know exactly what needs to happen, when, and by whom.
            </p>
          </div>
          <div className="space-y-4 p-6 border-t md:border-t-0 md:border-l border-border/10">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border">
              <Settings2 className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif">Consistency</h3>
            <p className="text-muted-foreground leading-relaxed">
              Deliver excellence every single time. Turn "random acts of marketing" into reliable revenue engines.
            </p>
          </div>
          <div className="space-y-4 p-6 border-t md:border-t-0 md:border-l border-border/10">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-background border border-border">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif">Capacity</h3>
            <p className="text-muted-foreground leading-relaxed">
              Create space for deep work and strategic thinking. Stop working <i>in</i> the business so you can work <i>on</i> it.
            </p>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Designed for depth, <br/>not just speed.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We don't apply band-aids. We rebuild the foundation. My process is a meticulous four-stage evolution that transforms how your business operates.
            </p>
            <ul className="space-y-6">
              {[
                { step: "01", title: "Diagnose", desc: "We map your current chaos and identify the bottlenecks." },
                { step: "02", title: "Design", desc: "We architect the custom systems your specific model needs." },
                { step: "03", title: "Implement", desc: "I build the tools, templates, and tech stack for you." },
                { step: "04", title: "Optimize", desc: "We refine based on real-world feedback and performance." },
              ].map((item) => (
                <li key={item.step} className="flex gap-6 group">
                  <span className="font-serif text-3xl text-border/20 group-hover:text-accent transition-colors">{item.step}</span>
                  <div>
                    <h4 className="text-lg font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] bg-secondary/30 hidden lg:block overflow-hidden">
             {/* Abstract visual representation of structure */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 border border-foreground/10 relative">
                  <div className="absolute top-4 left-4 w-full h-full border border-foreground/10"></div>
                  <div className="absolute -top-4 -left-4 w-full h-full border border-foreground/10"></div>
                </div>
             </div>
          </div>
        </div>
      </Section>

      {/* Featured Offers */}
      <Section className="bg-foreground text-background">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif mb-4 text-background">Signature Services</h2>
          <p className="text-background/60">Choose the level of support that fits your current stage of growth.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Systems Audit",
              price: "2 Weeks",
              desc: "A deep-dive analysis of your current operations to find the hidden leaks.",
              features: ["Workflow Mapping", "Tech Stack Review", "Action Plan"]
            },
            {
              title: "Systems Build",
              price: "4-8 Weeks",
              desc: "Complete operational overhaul. We build the machine while you drive.",
              features: ["Custom Notion/ClickUp", "SOP Creation", "Team Training"],
              highlight: true
            },
            {
              title: "Operations Retainer",
              price: "Monthly",
              desc: "Your fractional COO. Ongoing management and optimization.",
              features: ["Weekly Strategy", "Project Management", "Hiring Support"]
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

      {/* Founder / Values */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <span className="block font-serif italic text-2xl text-accent mb-6">"Structure is not the enemy of creativity. It is the vessel."</span>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-10">
            I believe that true freedom in business comes from discipline. My approach is grounded in pattern recognition and a builder's mindset. I don't just organize files; I design the architecture that allows your best work to surface.
          </p>
          <div className="flex justify-center gap-8 text-sm uppercase tracking-widest font-medium">
            <span>Sustainable Growth</span>
            <span className="text-border/20">•</span>
            <span>Depth Over Hype</span>
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
