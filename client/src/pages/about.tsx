import { Section } from "@/components/ui/section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import brittanyImage from "@assets/377CCC78-5D99-415B-B193-700674A15CF4_1767738108450.PNG";

export default function About() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">Built for Business Owners</span>
             <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[0.9]">
              Tired of <br />
              <span className="text-muted-foreground italic text-4xl md:text-6xl">Chaos?</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Most small business owners don't need more tools. They need clarity, structure, and systems that actually work. Elevation Systems exists to turn operational overwhelm into calm, repeatable execution.
            </p>
          </div>
        </div>
      </Section>

      <div className="w-full h-[60vh] bg-secondary/30 relative overflow-hidden">
        {/* Abstract Placeholder for Portrait/Lifestyle Image */}
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <img 
            src={brittanyImage} 
            alt="Brittany - Founder of Elevation Systems" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif mb-8">Hi, I'm Brittany.</h2>
          <div className="prose prose-lg prose-neutral mb-16 text-muted-foreground">
            <p>
              I build backend systems for business owners who are doing too much — and paying for it with their time, energy, and peace of mind.
            </p>
            <p>
              Before Elevation Systems, I was what many owners are today:
            </p>
            <ul className="list-none space-y-2 pl-0 my-6">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Wearing every hat
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Constantly reacting
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Repeating myself
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Holding everything in my head
              </li>
            </ul>
            <p>
              What changed wasn’t motivation. It was <strong>structure</strong>.
            </p>
            <p>
              I started designing systems that removed friction instead of adding complexity — systems that work with the human nervous system, not against it. That’s the foundation of everything I build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-xl font-serif mb-4">What I Actually Do</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                I design and implement AI-powered business systems that help owners capture leads, stop missing calls, simplify workflows, and reduce decision fatigue.
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> High-converting websites</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> AI chat and voice systems</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> Automated workflows</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> Lightweight custom tools</li>
              </ul>
            </div>
            
            <div className="bg-secondary/10 p-6 border border-border/10">
              <h3 className="text-xl font-serif mb-4">What I Don't Do</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><X size={14} className="text-muted-foreground/60"/> Web design for its own sake</li>
                <li className="flex items-center gap-2"><X size={14} className="text-muted-foreground/60"/> App development for vanity projects</li>
                <li className="flex items-center gap-2"><X size={14} className="text-muted-foreground/60"/> "AI hacks" or passive income schemes</li>
                <li className="flex items-center gap-2"><X size={14} className="text-muted-foreground/60"/> One-size-fits-all automation</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-serif mb-8">How My Systems Are Built</h2>
          <div className="mb-16 text-muted-foreground leading-relaxed">
            <p className="mb-4">
              Elevation Systems are built hands-on — not outsourced, not templated, and not overcomplicated. I use modern AI-assisted development to design and build custom websites, simple web apps, and automated workflows.
            </p>
            <p>
              This approach allows me to move faster, customize deeply, and avoid bloated tools. You don’t need a developer on retainer. You need something that works — and keeps working.
            </p>
          </div>

          <div className="border-t border-border/10 pt-16">
            <h2 className="text-3xl font-serif mb-6">The Bigger Vision</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="flex-1 text-muted-foreground leading-relaxed">
                 <p className="mb-4">
                   Elevation Systems is the cash-flow and execution engine behind a larger mission: building businesses — and eventually physical spaces — that support regulation, creativity, and sustainable growth.
                 </p>
                 <p>
                   Every system I build today is designed to support that future — calmly, ethically, and intentionally.
                 </p>
               </div>
               <div className="md:w-1/3 p-6 bg-secondary/20">
                 <h4 className="font-serif italic mb-4">Long-term Vision</h4>
                 <ul className="space-y-2 text-sm">
                   <li>• Digital education resources</li>
                   <li>• Community-centered programs</li>
                   <li>• A physical sanctuary for reset</li>
                 </ul>
               </div>
            </div>
          </div>

          <div className="mt-20 p-8 text-center bg-foreground text-background">
            <p className="text-lg md:text-xl font-serif italic mb-6">
              "You don't need to work harder. You need a business that works with you."
            </p>
            <Link href="/contact">
              <Button variant="secondary" className="rounded-none px-8">Start Building</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
