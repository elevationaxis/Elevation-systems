import { Section } from "@/components/ui/section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import brittanyImage from "@assets/377CCC78-5D99-415B-B193-700674A15CF4_1767738108450.PNG";

export default function About() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <div className="max-w-4xl">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block" data-testid="text-about-label">About Elevation Axis</span>
          <h1 className="text-3xl md:text-4xl font-serif mb-8 leading-snug max-w-3xl" data-testid="text-about-heading">
            If we sat down and talked about your business — where it is, where you want it to go — I could show you exactly what's standing in the way.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl" data-testid="text-about-intro">
            That's what I do. I look at where your business lives online, find what's costing you calls, and map your digital presence to where it needs to be. Not a template. Not a guess. A real plan built around your business.
          </p>
        </div>
      </Section>

      <div className="w-full h-[60vh] bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          <img 
            src={brittanyImage} 
            alt="Brittany - Founder of Elevation Axis" 
            className="w-full h-full object-cover opacity-90"
            data-testid="img-brittany"
          />
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif mb-8" data-testid="text-brittany-heading">Hi, I'm Brittany.</h2>
          <div className="prose prose-lg prose-neutral mb-16 text-muted-foreground">
            <p>
              I build growth systems for service businesses — the infrastructure behind the scenes that turns marketing spend into booked jobs instead of wasted budget.
            </p>
            <p>
              Before Elevation Axis, I watched too many good businesses pour money into marketing with nothing to show for it. Not because the ads were bad, but because the foundation underneath was broken:
            </p>
            <ul className="list-none space-y-2 pl-0 my-6">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Websites built once and never updated
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Forms that don't notify anyone
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                Google listings that are half-broken
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                No way to track where leads actually come from
              </li>
            </ul>
            <p>
              The fix isn't more traffic. It's <strong>sealing the leaks</strong>.
            </p>
            <p>
              That's what Elevation Axis does — quietly and systematically. We find where leads are falling through the cracks and build the infrastructure to catch them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-xl font-serif mb-4">What I Actually Do</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                I find where your leads are leaking and seal the foundation — so the money you're already spending on marketing turns into booked jobs.
              </p>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> High-converting websites that load fast</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> CRM and booking integrations</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> Lead tracking and follow-up systems</li>
                <li className="flex items-center gap-2"><Check size={14} className="text-accent"/> Google listing setup and local search visibility</li>
              </ul>
            </div>
            
            <div className="bg-foreground text-background p-6 border border-foreground">
              <h3 className="text-xl font-serif mb-4 text-background">What I Don't Do</h3>
              <ul className="space-y-3 text-sm text-background/70">
                <li className="flex items-center gap-2"><X size={14} className="text-background/50"/> Pretty websites that don't bring in calls</li>
                <li className="flex items-center gap-2"><X size={14} className="text-background/50"/> Cookie-cutter templates that look like everyone else</li>
                <li className="flex items-center gap-2"><X size={14} className="text-background/50"/> Quick fixes that break next month</li>
                <li className="flex items-center gap-2"><X size={14} className="text-background/50"/> Handing you something you can't manage</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-serif mb-8" data-testid="text-how-heading">How It Gets Built</h2>
          <div className="mb-16 text-muted-foreground leading-relaxed">
            <p className="mb-4">
              Everything at Elevation Axis is built hands-on — not outsourced, not templated, and not overcomplicated. I use modern tools and technology to design and build custom websites, simple web apps, and connected business systems.
            </p>
            <p>
              This approach lets me move faster, customize deeply, and avoid bloated platforms. You don't need a developer on retainer. You need something that works — and keeps working.
            </p>
          </div>

          <div className="border-t border-border/10 pt-16">
            <h2 className="text-3xl font-serif mb-6" data-testid="text-standard-heading">The Elevation Axis Standard</h2>
            <div className="text-muted-foreground leading-relaxed">
              <p className="text-lg font-medium text-foreground mb-4">
                We don't just build websites. We build growth systems for local businesses.
              </p>
              <p>
                Every project follows the same disciplined process: diagnose before you build, build what actually matters, and protect it so it keeps performing. No shortcuts. No mystery vendors. Just infrastructure that holds.
              </p>
            </div>
          </div>

          <div className="mt-20 border-t border-border/10 pt-16">
            <blockquote className="border-l-2 border-accent pl-6 mb-10">
              <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed" data-testid="text-about-cta-quote">
                &ldquo;You can keep spending money on marketing and hope it works. Or you can fix the bucket first.&rdquo;
              </p>
              <cite className="block mt-4 text-xs uppercase tracking-widest text-muted-foreground not-italic">Brittany Moulder &mdash; Elevation Axis</cite>
            </blockquote>
            <Link href="/contact">
              <Button variant="outline" size="sm" className="rounded-none" data-testid="button-about-cta">Book a Call</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
