import { Section } from "@/components/ui/section";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Resources() {
  const resources = [
    {
      title: "Website Leak Checklist",
      type: "Free PDF",
      description: "10 things to check on your website right now that might be costing you calls. No tech knowledge needed — just go through the list.",
      dark: true,
      available: true,
    },
    {
      title: "Google Listing Quick-Fix Guide",
      type: "Free PDF",
      description: "Your Google listing is often the first thing a customer sees. This guide shows you exactly what to fill in, what to fix, and what to never leave blank.",
      dark: false,
      available: true,
    },
    {
      title: "What to Ask Before Hiring a Web Designer",
      type: "Free Guide",
      description: "Most business owners get burned because they didn't know the right questions to ask. This guide gives you the 8 questions that separate good developers from expensive headaches.",
      dark: true,
      available: false,
    },
  ];

  return (
    <>
      <Section className="pt-32 pb-16">
        <div className="max-w-3xl">
          <span className="text-accent uppercase tracking-widest text-xs font-sans font-semibold mb-4 block">Free Resources</span>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Useful stuff. No fluff.</h1>
          <p className="text-xl text-muted-foreground font-sans leading-relaxed">
            Free guides and checklists for local business owners who want to stop guessing and start fixing.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <div
              key={i}
              className={cn(
                "p-8 border flex flex-col transition-all duration-300 hover:-translate-y-1",
                resource.dark
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background border-border/10"
              )}
            >
              <div className={cn("w-10 h-10 flex items-center justify-center border mb-6", resource.dark ? "border-background/20 text-background/60" : "border-border/10 text-muted-foreground")}>
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <div className={cn("text-xs uppercase tracking-widest mb-2 font-sans", resource.dark ? "text-background/50" : "text-muted-foreground")}>
                {resource.type}
              </div>
              <h3 className={cn("text-xl font-serif mb-3", resource.dark ? "text-background" : "text-foreground")}>
                {resource.title}
              </h3>
              <p className={cn("mb-8 flex-grow text-sm leading-relaxed font-sans", resource.dark ? "text-background/70" : "text-muted-foreground")}>
                {resource.description}
              </p>
              {resource.available ? (
                <Button
                  variant={resource.dark ? "secondary" : "outline"}
                  size="sm"
                  className={cn("w-full rounded-none", !resource.dark && "border-border/20")}
                >
                  <Download size={14} className="mr-2" /> Download Free
                </Button>
              ) : (
                <p className={cn("text-xs font-sans", resource.dark ? "text-background/40" : "text-muted-foreground/50")}>
                  Coming soon
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 p-10 bg-foreground text-background text-center">
          <h2 className="text-3xl font-serif mb-4 text-background">Want a free look at your site?</h2>
          <p className="text-background/70 font-sans mb-8 max-w-xl mx-auto">
            Run a free competitive analysis and see how your website stacks up against local competitors — site speed, lead capture, and more.
          </p>
          <Link href="/audit">
            <Button variant="secondary" className="rounded-none px-8">
              Run the Free Analysis
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
