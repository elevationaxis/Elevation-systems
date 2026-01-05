import { Section } from "@/components/ui/section";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Resources() {
  const resources = [
    {
      title: "The Chaos Audit Checklist",
      type: "PDF Guide",
      description: "A 10-point checklist to identify where your business is leaking time and money."
    },
    {
      title: "SOP Template Library",
      type: "Notion Template",
      description: "My core set of Standard Operating Procedures for creative agencies."
    },
    {
      title: "Strategic Planning Workbook",
      type: "PDF Guide",
      description: "A quarterly planning framework to align your team and goals."
    }
  ];

  return (
    <>
      <Section className="pt-32 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-serif mb-6">Resources</h1>
          <p className="text-xl text-muted-foreground">
            Tools, templates, and guides to help you start building better systems today.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, i) => (
            <div key={i} className="group p-8 border border-border/10 hover:border-accent/30 transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center mb-6 text-foreground group-hover:text-accent transition-colors">
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{resource.type}</div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-accent transition-colors">{resource.title}</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {resource.description}
              </p>
              <Button variant="outline" size="sm" className="w-full rounded-none border-border/20 group-hover:border-accent group-hover:text-accent">
                <Download size={14} className="mr-2" /> Download
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm">More resources coming soon.</p>
        </div>
      </Section>
    </>
  );
}
