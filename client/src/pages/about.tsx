import { Section } from "@/components/ui/section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
             <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[0.9]">
              The Architect <br />
              <span className="text-muted-foreground italic text-4xl md:text-6xl">Behind the Systems</span>
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xl text-muted-foreground leading-relaxed">
              I am a builder at heart. While others see chaos, I see patterns waiting to be resolved. My work is dedicated to bringing calm authority to visionary businesses.
            </p>
          </div>
        </div>
      </Section>

      <div className="w-full h-[60vh] bg-secondary/30 relative overflow-hidden">
        {/* Abstract Placeholder for Portrait/Lifestyle Image */}
        <div className="absolute inset-0 flex items-center justify-center text-foreground/10 font-serif text-9xl italic select-none">
          ES
        </div>
      </div>

      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif mb-8">My Story</h2>
          <div className="prose prose-lg prose-neutral mb-16 text-muted-foreground">
            <p>
              I spent years working inside high-growth startups and established agencies. I noticed a recurring theme: brilliant visionaries burning out because their backend operations couldn't keep up with their front-end success.
            </p>
            <p>
              They were hiring more people to solve problems, but adding more people to a broken system just creates more chaos.
            </p>
            <p>
              I founded Elevation Systems to solve this specific problem. I combine high-level strategic thinking with the nitty-gritty implementation skills needed to actually build the solution. I don't just hand you a PDF strategy; I build the engine that runs your business.
            </p>
          </div>

          <h2 className="text-3xl font-serif mb-8">What I Believe</h2>
          <ul className="space-y-6 mb-16">
            {[
              "Structure is freedom. Without boundaries, creativity dissipates.",
              "Simplicity is the ultimate sophistication. If it's complex, it's not finished.",
              "Long-term sustainability beats short-term spikes every time.",
              "Data should drive decisions, not emotions.",
              "Your business should serve your life, not consume it."
            ].map((belief, i) => (
              <li key={i} className="flex gap-4 items-baseline">
                <span className="text-accent font-serif italic text-xl">0{i + 1}</span>
                <span className="text-lg">{belief}</span>
              </li>
            ))}
          </ul>

          <div className="p-8 bg-secondary/20 border border-border/10 text-center">
            <h3 className="text-2xl font-serif mb-4">Ready to stabilize your growth?</h3>
            <Link href="/contact">
              <Button className="rounded-none px-8">Work With Me</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
