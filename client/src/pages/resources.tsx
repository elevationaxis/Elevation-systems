import { useState } from "react";
import { Section } from "@/components/ui/section";
import { FileText, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const GOLD = "#C9A84C";

type GatedResource = {
  key: string;
  title: string;
  type: string;
  description: string;
  dark: boolean;
};

const gatedResources: GatedResource[] = [
  {
    key: "website-leak-checklist",
    title: "Website Leak Checklist",
    type: "Free PDF",
    description:
      "10 things to check on your website right now that might be costing you calls. No tech knowledge needed — just go through the list.",
    dark: true,
  },
  {
    key: "google-listing-guide",
    title: "Google Listing Quick-Fix Guide",
    type: "Free PDF",
    description:
      "Your Google listing is often the first thing a customer sees. This guide shows you exactly what to fill in, what to fix, and what to never leave blank.",
    dark: false,
  },
];

function ResourceCard({ resource }: { resource: GatedResource }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await apiRequest("POST", "/api/resource-unlock", {
        email,
        resourceKey: resource.key,
      });
      const data = await res.json();
      setDownloadUrl(data.downloadUrl);
      setUnlocked(true);
    } catch {
      toast({
        title: "Something went wrong.",
        description: "Please try again or email hello@elevationaxis.com.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const isDark = resource.dark;

  return (
    <div
      className={cn(
        "p-8 border flex flex-col transition-all duration-300 hover:-translate-y-1",
        isDark
          ? "bg-foreground text-background border-foreground"
          : "bg-background border-border/10"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 flex items-center justify-center border mb-6",
          isDark ? "border-background/20 text-background/60" : "border-border/10 text-muted-foreground"
        )}
      >
        <FileText size={20} strokeWidth={1.5} />
      </div>
      <div
        className={cn(
          "text-xs uppercase tracking-widest mb-2 font-sans",
          isDark ? "text-background/50" : "text-muted-foreground"
        )}
      >
        {resource.type}
      </div>
      <h3 className={cn("text-xl font-serif mb-3", isDark ? "text-background" : "text-foreground")}>
        {resource.title}
      </h3>
      <p
        className={cn(
          "mb-8 flex-grow text-sm leading-relaxed font-sans",
          isDark ? "text-background/70" : "text-muted-foreground"
        )}
      >
        {resource.description}
      </p>

      {unlocked && downloadUrl ? (
        <a href={downloadUrl} download>
          <Button
            variant={isDark ? "secondary" : "outline"}
            size="sm"
            className={cn("w-full rounded-none", !isDark && "border-border/20")}
          >
            <Download size={14} className="mr-2" /> Download Now
          </Button>
        </a>
      ) : (
        <form onSubmit={handleUnlock} className="space-y-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "rounded-none text-sm h-9",
              isDark
                ? "bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-background/60"
                : "bg-background border-border/20 focus:border-accent"
            )}
            required
          />
          <Button
            type="submit"
            variant={isDark ? "secondary" : "outline"}
            size="sm"
            disabled={loading}
            className={cn("w-full rounded-none", !isDark && "border-border/20")}
          >
            {loading ? (
              <><Loader2 size={14} className="mr-2 animate-spin" /> Unlocking...</>
            ) : (
              <><Download size={14} className="mr-2" /> Get Free PDF</>
            )}
          </Button>
          <p className={cn("text-xs text-center", isDark ? "text-background/40" : "text-muted-foreground/50")}>
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}

export default function Resources() {
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
          {gatedResources.map((resource) => (
            <ResourceCard key={resource.key} resource={resource} />
          ))}

          {/* Coming soon card */}
          <div className="p-8 border bg-foreground text-background border-foreground flex flex-col transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 flex items-center justify-center border border-background/20 text-background/60 mb-6">
              <FileText size={20} strokeWidth={1.5} />
            </div>
            <div className="text-xs uppercase tracking-widest mb-2 font-sans text-background/50">Free Guide</div>
            <h3 className="text-xl font-serif mb-3 text-background">What to Ask Before Hiring a Web Designer</h3>
            <p className="mb-8 flex-grow text-sm leading-relaxed font-sans text-background/70">
              Most business owners get burned because they didn&rsquo;t know the right questions to ask. This guide gives you the 8 questions that separate good developers from expensive headaches.
            </p>
            <p className="text-xs font-sans text-background/40">Coming soon</p>
          </div>
        </div>

        <div className="mt-24 p-10 bg-foreground text-background text-center">
          <h2 className="text-3xl font-serif mb-4 text-background">Want to know where you&rsquo;re leaking?</h2>
          <p className="text-background/70 font-sans mb-8 max-w-xl mx-auto">
            Get a free audit of your digital presence &mdash; no pitch, no pressure.
          </p>
          <Link href="/audit">
            <Button variant="secondary" className="rounded-none px-8">
              Get My Free Audit
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
