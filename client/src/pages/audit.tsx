import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, ArrowRight, Activity, Phone, MapPin, Users, TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Please enter a valid email"),
  websiteUrl: z.string().url("Please enter a full URL (e.g. https://example.com)"),
});

type AuditResult = {
  id: number;
  status: string;
  overallScore: number | null;
  siteSpeedScore: number | null;
  siteSpeedData: any;
  leadPlumbingScore: number | null;
  leadPlumbingData: any;
  localVisibilityScore: number | null;
  localVisibilityData: any;
  competitorScore: number | null;
  competitorData: any;
  recommendations: string[] | null;
  businessName: string;
  websiteUrl: string;
};

function ScoreRing({ score, size = 100, label }: { score: number; size?: number; label: string }) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 70) return "text-green-600";
    if (s >= 45) return "text-amber-500";
    return "text-red-500";
  };

  const getStroke = (s: number) => {
    if (s >= 70) return "#16a34a";
    if (s >= 45) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-border/10"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getStroke(score)}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("text-2xl font-serif font-bold", getColor(score))}>{score}</span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-widest text-muted-foreground text-center">{label}</span>
    </div>
  );
}

function CompetitiveLabel({ score }: { score: number }) {
  if (score >= 70) return <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium"><TrendingUp size={14} /> Ahead</span>;
  if (score >= 45) return <span className="inline-flex items-center gap-1 text-amber-500 text-sm font-medium"><Minus size={14} /> Even</span>;
  return <span className="inline-flex items-center gap-1 text-red-500 text-sm font-medium"><TrendingDown size={14} /> Behind</span>;
}

function ModuleCard({ title, icon: Icon, score, findings }: { title: string; icon: any; score: number; findings: string[] }) {
  return (
    <div className="border border-border/10 p-6 md:p-8 bg-secondary/10">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center border border-border/10">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-serif text-lg">{title}</h3>
            <CompetitiveLabel score={score} />
          </div>
        </div>
        <ScoreRing score={score} size={64} label="" />
      </div>
      <ul className="space-y-3">
        {findings.map((finding, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-foreground/30 mt-2 shrink-0" />
            {finding}
          </li>
        ))}
      </ul>
    </div>
  );
}

function generatePDF(audit: AuditResult) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("ELEVATION AXIS", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text("Competitive Analysis Report", margin, y);
  y += 16;

  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 12;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(audit.businessName, margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(audit.websiteUrl, margin, y);
  y += 14;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text(`Overall Competitive Score: ${audit.overallScore}/100`, margin, y);
  y += 6;
  const overallLabel = (audit.overallScore || 0) >= 70 ? "Ahead of most competitors" : (audit.overallScore || 0) >= 45 ? "On par with competitors" : "Falling behind competitors";
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(overallLabel, margin, y);
  y += 16;

  const modules = [
    { title: "Site Speed & Mobile", score: audit.siteSpeedScore || 0, data: audit.siteSpeedData },
    { title: "Lead Capture", score: audit.leadPlumbingScore || 0, data: audit.leadPlumbingData },
    { title: "Local Visibility", score: audit.localVisibilityScore || 0, data: audit.localVisibilityData },
    { title: "Competitor Edge", score: audit.competitorScore || 0, data: audit.competitorData },
  ];

  for (const mod of modules) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    const label = mod.score >= 70 ? "Ahead" : mod.score >= 45 ? "Even" : "Behind";
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text(`${mod.title}: ${mod.score}/100 (${label})`, margin, y);
    y += 8;

    const findings: string[] = [];
    if (mod.title === "Site Speed & Mobile" && mod.data) {
      if (mod.data.verdict) findings.push(mod.data.verdict);
      if (mod.data.realData && mod.data.metrics) {
        findings.push(`First Contentful Paint: ${mod.data.metrics.firstContentfulPaint}`);
        findings.push(`Largest Contentful Paint: ${mod.data.metrics.largestContentfulPaint}`);
      } else if (mod.data.note) {
        findings.push(mod.data.note);
      }
    } else if (mod.data?.findings) {
      findings.push(...mod.data.findings);
    }

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    for (const finding of findings) {
      const lines = doc.splitTextToSize(`• ${finding}`, contentWidth - 5);
      for (const line of lines) {
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, margin + 5, y);
        y += 5;
      }
    }
    y += 8;
  }

  if (audit.recommendations && (audit.recommendations as string[]).length > 0) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("How to Get Ahead", margin, y);
    y += 10;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    for (const rec of audit.recommendations as string[]) {
      const lines = doc.splitTextToSize(`→ ${rec}`, contentWidth - 5);
      for (const line of lines) {
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, margin + 5, y);
        y += 5;
      }
      y += 3;
    }
  }

  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  y += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text("Ready to get ahead of the competition?", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text("Book a free call at elevationaxis.com/contact", margin, y);
  y += 5;
  doc.text("hello@elevationaxis.com", margin, y);

  doc.save(`${audit.businessName.replace(/[^a-zA-Z0-9]/g, "_")}_Competitive_Analysis.pdf`);
}

function AuditResults({ auditId }: { auditId: number }) {
  const { data: audit, isLoading, error } = useQuery<AuditResult>({
    queryKey: ["/api/audit", auditId],
    queryFn: async () => {
      const res = await fetch(`/api/audit/${auditId}`);
      if (!res.ok) throw new Error("Failed to fetch audit");
      return res.json();
    },
    refetchInterval: (query) => {
      if (query.state.error) return false;
      const data = query.state.data;
      if (data && data.status === "complete") return false;
      if (data && data.status === "failed") return false;
      return 3000;
    },
    retry: 2,
  });

  if (error) {
    return (
      <Section className="pt-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-4">Unable to load results</h2>
          <p className="text-muted-foreground mb-8">
            We had trouble retrieving your results. Please try again or reach out directly.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-none px-8" data-testid="button-audit-error-contact">Get in Touch</Button>
          </Link>
        </div>
      </Section>
    );
  }

  if (isLoading || !audit || audit.status === "processing") {
    return (
      <Section className="pt-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-border/10 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Scouting the competition...
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Analyzing Your Market</h2>
          <p className="text-muted-foreground text-lg mb-12">
            We're checking how your website compares to competitors in your area. This usually takes 15–30 seconds.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Site Speed", "Lead Capture", "Visibility", "Competitors"].map((label) => (
              <div key={label} className="border border-border/10 p-6 bg-secondary/10 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-border/10 mx-auto mb-3" />
                <div className="h-3 bg-border/10 w-20 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  if (audit.status === "failed") {
    return (
      <Section className="pt-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't complete the analysis for this website. This sometimes happens with sites that block automated checks. 
            Reach out and we'll run a manual competitive review.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-none px-8" data-testid="button-audit-contact">Get in Touch</Button>
          </Link>
        </div>
      </Section>
    );
  }

  const siteSpeedFindings: string[] = [];
  if (audit.siteSpeedData) {
    const data = audit.siteSpeedData as any;
    if (data.verdict) {
      siteSpeedFindings.push(`Your mobile speed is ${data.verdict}`);
    }
    if (data.realData && data.metrics) {
      siteSpeedFindings.push(`First Contentful Paint: ${data.metrics.firstContentfulPaint}`);
      siteSpeedFindings.push(`Largest Contentful Paint: ${data.metrics.largestContentfulPaint}`);
      siteSpeedFindings.push(`Total Blocking Time: ${data.metrics.totalBlockingTime}`);
    } else if (data.note) {
      siteSpeedFindings.push(data.note);
    }
  }

  const overallVerdict = (audit.overallScore || 0) >= 70
    ? "You're ahead of most competitors in your area."
    : (audit.overallScore || 0) >= 45
    ? "You're keeping up, but competitors are gaining ground."
    : "Competitors are outperforming you in key areas — you're leaving customers on the table.";

  return (
    <Section className="pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">Competitive Analysis</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4" data-testid="text-audit-heading">
            {audit.overallScore}/100
          </h2>
          <p className="text-lg font-medium mb-2">{overallVerdict}</p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Here's how <strong>{audit.businessName}</strong> stacks up against the competition across four areas that determine who gets the call.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <ScoreRing score={audit.siteSpeedScore || 0} label="Site Speed" />
          <ScoreRing score={audit.leadPlumbingScore || 0} label="Lead Capture" />
          <ScoreRing score={audit.localVisibilityScore || 0} label="Visibility" />
          <ScoreRing score={audit.competitorScore || 0} label="Competitor Edge" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <ModuleCard
            title="Site Speed & Mobile"
            icon={Activity}
            score={audit.siteSpeedScore || 0}
            findings={siteSpeedFindings.length > 0 ? siteSpeedFindings : ["Unable to retrieve speed data"]}
          />
          <ModuleCard
            title="Lead Capture"
            icon={Phone}
            score={audit.leadPlumbingScore || 0}
            findings={(audit.leadPlumbingData as any)?.findings?.length > 0 ? (audit.leadPlumbingData as any).findings : ["Analysis data unavailable — contact us for a manual review."]}
          />
          <ModuleCard
            title="Local Visibility"
            icon={MapPin}
            score={audit.localVisibilityScore || 0}
            findings={(audit.localVisibilityData as any)?.findings?.length > 0 ? (audit.localVisibilityData as any).findings : ["Analysis data unavailable — contact us for a manual review."]}
          />
          <ModuleCard
            title="Competitor Edge"
            icon={Users}
            score={audit.competitorScore || 0}
            findings={(audit.competitorData as any)?.findings?.length > 0 ? (audit.competitorData as any).findings : ["Analysis data unavailable — contact us for a manual review."]}
          />
        </div>

        {audit.recommendations && (audit.recommendations as string[]).length > 0 && (
          <div className="border border-border/10 p-8 md:p-10 bg-secondary/10 mb-16">
            <h3 className="font-serif text-2xl mb-6">How to Get Ahead</h3>
            <ul className="space-y-4">
              {(audit.recommendations as string[]).map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <ArrowRight size={16} className="mt-1 shrink-0 text-accent" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center mb-16">
          <Button
            variant="outline"
            size="lg"
            className="rounded-none px-8 py-6 text-base bg-transparent border-foreground/20 hover:bg-foreground/5"
            onClick={() => generatePDF(audit)}
            data-testid="button-audit-download"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report (PDF)
          </Button>
        </div>

        <div className="text-center border-t border-border/10 pt-16">
          <h3 className="font-serif text-3xl mb-4">Ready to get ahead?</h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            This analysis shows where you stand. A full competitive diagnostic shows exactly how to overtake them — 
            and I'll build the systems to keep you there.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-none px-8 py-6 text-base" data-testid="button-audit-book">
                Book a Free Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-none px-8 py-6 text-base bg-transparent border-foreground/20 hover:bg-foreground/5" data-testid="button-audit-services">
                See Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Audit() {
  const [auditId, setAuditId] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      email: "",
      websiteUrl: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await apiRequest("POST", "/api/audit", values);
      return res.json();
    },
    onSuccess: (data) => {
      setAuditId(data.id);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or email hello@elevationaxis.com directly.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitMutation.mutate(values);
  }

  if (auditId) {
    return <AuditResults auditId={auditId} />;
  }

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background"></div>
        <div className="container px-4 md:px-6 text-center max-w-3xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">Free Competitive Analysis</span>
          <h1 className="text-5xl md:text-7xl leading-tight mb-6 font-serif" data-testid="text-audit-title">
            How do you stack up <br/>
            <span className="italic font-light text-foreground/80">against the competition?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed" data-testid="text-audit-sub">
            See how your website compares to competitors in your area — site speed, lead capture, local visibility, and more. Results in under 30 seconds.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-8">
            No credit card. No obligation. Just the competitive intel you need.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-xl mx-auto">
          <div className="bg-secondary/10 p-8 md:p-10 border border-border/5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith's HVAC" className="rounded-none bg-background border-border/20 focus:border-accent" data-testid="input-audit-business" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@yourbusiness.com" className="rounded-none bg-background border-border/20 focus:border-accent" data-testid="input-audit-email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourbusiness.com" className="rounded-none bg-background border-border/20 focus:border-accent" data-testid="input-audit-url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full rounded-none py-6 text-base" disabled={submitMutation.isPending} data-testid="button-audit-submit">
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      See How You Stack Up
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Activity, label: "Site Speed" },
              { icon: Phone, label: "Lead Capture" },
              { icon: MapPin, label: "Visibility" },
              { icon: Users, label: "Competitors" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center border border-border/10">
                  <Icon size={20} className="text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
