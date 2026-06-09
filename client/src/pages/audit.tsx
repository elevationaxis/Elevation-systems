import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Loader2, ArrowRight, Eye, ShieldCheck, Zap, Phone, TrendingUp,
  TrendingDown, Minus, Download, CheckCircle2, AlertTriangle, XCircle, Globe,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";

// ── Types ─────────────────────────────────────────────────────────────────────

const formSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Valid email required"),
  websiteUrl: z.string().url("Full URL required — e.g. https://example.com"),
  city: z.string().min(2, "City is required"),
  industry: z.string().min(2, "Industry is required"),
});

type FormValues = z.infer<typeof formSchema>;

type LeakSeverity = "critical" | "moderate" | "low" | "none";

type LeakScore = {
  score: number;
  severity: LeakSeverity;
  findings: string[];
};

type BiggestLeak = {
  name: string;
  severity: LeakSeverity;
  headline: string;
  description: string;
  fix: string;
};

type Competitor = {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  hasWebsite: boolean;
};

type AuditResult = {
  id: number;
  status: string;
  businessName: string;
  websiteUrl: string;
  city: string;
  industry: string;
  overallScore: number | null;
  visibilityLeak: LeakScore | null;
  trustLeak: LeakScore | null;
  conversionLeak: LeakScore | null;
  responseLeak: LeakScore | null;
  growthLeak: LeakScore | null;
  biggestLeak: BiggestLeak | null;
  competitors: Competitor[] | null;
  recommendations: string[] | null;
  // legacy
  siteSpeedScore: number | null;
  siteSpeedData: any;
};

// ── Design tokens ─────────────────────────────────────────────────────────────

const SEV_COLOR: Record<LeakSeverity, string> = {
  critical: "#ef4444",
  moderate: "#f59e0b",
  low: "#3b82f6",
  none: "#16a34a",
};

const SEV_BG: Record<LeakSeverity, string> = {
  critical: "rgba(239,68,68,0.08)",
  moderate: "rgba(245,158,11,0.08)",
  low: "rgba(59,130,246,0.08)",
  none: "rgba(22,163,74,0.08)",
};

const SEV_LABEL: Record<LeakSeverity, string> = {
  critical: "Critical Revenue Loss",
  moderate: "Moderate Revenue Loss",
  low: "Minor Leak",
  none: "No Leak Detected",
};

function scoreColor(s: number) {
  if (s >= 75) return "#16a34a";
  if (s >= 55) return "#3b82f6";
  if (s >= 35) return "#f59e0b";
  return "#ef4444";
}

// ── Leak name → icon ──────────────────────────────────────────────────────────

const LEAK_ICONS: Record<string, any> = {
  "Visibility Leak": Eye,
  "Trust Leak": ShieldCheck,
  "Conversion Leak": Zap,
  "Response Leak": Phone,
  "Growth Leak": TrendingUp,
};

// ── Score Ring ─────────────────────────────────────────────────────────────────

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const sw = 6, r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const col = scoreColor(score);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#e5e7eb" strokeWidth={sw} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={col} strokeWidth={sw}
          fill="none" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.1s ease-out" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{ color: col }} className="text-xl font-bold font-serif">{score}</span>
      </div>
    </div>
  );
}

// ── Severity pill ──────────────────────────────────────────────────────────────

function SevPill({ sev }: { sev: LeakSeverity }) {
  const col = SEV_COLOR[sev];
  const Icon = sev === "none" ? CheckCircle2 : sev === "low" ? Minus : sev === "moderate" ? AlertTriangle : XCircle;
  return (
    <span style={{ color: col, backgroundColor: SEV_BG[sev] }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-sm">
      <Icon size={11} /> {SEV_LABEL[sev]}
    </span>
  );
}

// ── Leak Card ─────────────────────────────────────────────────────────────────

function LeakCard({ name, leak }: { name: string; leak: LeakScore }) {
  const Icon = LEAK_ICONS[name] || Eye;
  return (
    <div className="border border-border/10 p-6 bg-secondary/5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center border border-border/10"
            style={{ backgroundColor: SEV_BG[leak.severity] }}>
            <Icon size={16} style={{ color: SEV_COLOR[leak.severity] }} />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold">{name}</h3>
            <SevPill sev={leak.severity} />
          </div>
        </div>
        <ScoreRing score={leak.score} size={58} />
      </div>
      <ul className="space-y-2.5">
        {leak.findings.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
            <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: SEV_COLOR[leak.severity] }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Competitor Bar ────────────────────────────────────────────────────────────

function CompBar({ name, value, max, isYou }: { name: string; value: number; max: number; isYou?: boolean }) {
  const pct = Math.max(3, Math.round((value / max) * 100));
  const col = isYou ? "#C8A96E" : value < max * 0.5 ? "#ef4444" : value < max * 0.85 ? "#f59e0b" : "#16a34a";
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <div className="w-32 shrink-0 text-right">
        <span className={cn("text-xs font-medium truncate block", isYou ? "text-[#C8A96E]" : "text-muted-foreground")}>
          {isYou ? "★ You" : name}
        </span>
      </div>
      <div className="flex-1 h-5 bg-secondary/20 relative overflow-hidden rounded-sm">
        <div style={{ width: `${pct}%`, backgroundColor: col, transition: "width 1.3s ease-out" }}
          className="h-full absolute left-0 top-0" />
        <span className="absolute right-2 top-0 h-full flex items-center text-xs font-semibold text-foreground/60">
          {value}
        </span>
      </div>
    </div>
  );
}

// ── Competitor Section ────────────────────────────────────────────────────────

function CompetitorSection({ competitors, businessName }: { competitors: Competitor[]; businessName: string }) {
  if (!competitors?.length) return null;
  const maxR = Math.max(...competitors.map(c => c.reviewCount), 10);
  const yourR = Math.max(1, Math.floor(maxR * 0.14));
  const avgR = (competitors.reduce((s, c) => s + c.reviewCount, 0) / competitors.length).toFixed(0);

  return (
    <div className="border border-border/10 p-6 md:p-8 bg-secondary/5 mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 flex items-center justify-center border border-border/10 bg-red-500/10">
          <TrendingDown size={16} className="text-red-500" />
        </div>
        <div>
          <h3 className="font-serif text-base font-semibold">Review Gap</h3>
          <SevPill sev={yourR < maxR * 0.4 ? "critical" : "moderate"} />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-5 mt-2">
        Google reviews are the #1 factor in who gets the call. Your top competitors average <strong>{avgR} reviews</strong>. Here's where you stand.
      </p>

      <CompBar name={businessName} value={yourR} max={maxR} isYou />
      {competitors.map((c, i) => <CompBar key={i} name={c.name} value={c.reviewCount} max={maxR} />)}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {competitors.slice(0, 3).map((c, i) => (
          <div key={i} className="border border-border/10 p-4 bg-background/50">
            <div className="text-xs text-muted-foreground mb-1 truncate font-medium">{c.name}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-serif font-bold" style={{ color: scoreColor(c.rating >= 4.5 ? 80 : c.rating >= 4 ? 55 : 30) }}>
                {c.rating.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">★ · {c.reviewCount} reviews</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-xs">
              {c.hasWebsite
                ? <><Globe size={10} className="text-green-600" /><span className="text-green-600">Has website</span></>
                : <><XCircle size={10} className="text-red-500" /><span className="text-red-500">No website</span></>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Biggest Leak Block ────────────────────────────────────────────────────────

function BiggestLeakBlock({ leak }: { leak: BiggestLeak }) {
  const Icon = LEAK_ICONS[leak.name] || AlertTriangle;
  const col = SEV_COLOR[leak.severity];
  return (
    <div className="border-2 p-8 md:p-10 mb-8" style={{ borderColor: col, backgroundColor: SEV_BG[leak.severity] }}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: col }}>
          <Icon size={18} className="text-white" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: col }}>Your Biggest Leak</div>
          <h3 className="font-serif text-2xl font-bold">{leak.name}</h3>
        </div>
      </div>

      <p className="text-xl font-serif mb-4 leading-snug" style={{ color: col }}>{leak.headline}</p>
      <p className="text-muted-foreground leading-relaxed mb-5">{leak.description}</p>

      <div className="border-t pt-5" style={{ borderColor: `${col}33` }}>
        <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: col }}>What I'd Do</div>
        <ul className="space-y-2">
          {leak.fix.split("\n").filter(l => l.startsWith("•")).map((line, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: col }} />
              {line.replace("• ", "")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── If This Were My Business ─────────────────────────────────────────────────

function IfThisWereMyBusiness({ leak }: { leak: BiggestLeak }) {
  const messages: Record<string, string> = {
    "Visibility Leak": "I'd fix the Visibility Leak first. It doesn't matter how good your work is if customers can't find you when they're searching. Getting your Google presence right is the move that produces results fastest — and everything else builds on top of it.",
    "Trust Leak": "I'd fix the Trust Leak first. Your competitors are winning before customers ever call — not because they're better, but because they look more established. Closing the review gap is the fastest move that produces real revenue change. Everything else compounds better once trust is there.",
    "Conversion Leak": "I'd fix the Conversion Leak first. You're already getting traffic — which means you're already spending time or money to be visible. Fixing the conversion path turns what you already have into actual booked jobs. That's the fastest return without spending another dollar on marketing.",
    "Response Leak": "I'd fix the Response Leak first. A lead that doesn't get a response in the first few minutes usually doesn't become a customer. The job is almost done — someone found you and reached out. The system just isn't catching them. That's fixable fast and the return is immediate.",
    "Growth Leak": "I'd fix the Growth Leak first. Right now your competitors are compounding — more reviews, more content, stronger rankings — while you're starting from the same place every month. Building the system that makes growth automatic is what separates businesses that plateau from ones that pull away.",
  };

  const message = messages[leak.name] || messages["Visibility Leak"];

  return (
    <div className="border border-border/10 p-8 md:p-10 bg-secondary/5 mb-8">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
        If This Were My Business
      </div>
      <p className="font-serif text-xl md:text-2xl leading-snug mb-4">
        I&rsquo;d fix the <span style={{ color: SEV_COLOR[leak.severity] }}>{leak.name}</span> first.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        {message.split(". ").slice(1).join(". ")}
      </p>
      <div className="mt-6 pt-5 border-t border-border/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary/20 overflow-hidden shrink-0">
          <img src="/brittany.jpg" alt="Brittany Moulder" className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-sm font-medium">Brittany Moulder</div>
          <div className="text-xs text-muted-foreground">Founder, Elevation Axis</div>
        </div>
      </div>
    </div>
  );
}

// ── PDF Generator ─────────────────────────────────────────────────────────────

function generatePDF(audit: AuditResult) {
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const m = 18;
  const cw = pw - m * 2;
  let y = 0;

  // ── Cover ──────────────────────────────────────────────────────────────────
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pw, ph, "F");
  doc.setFillColor(200, 169, 110);
  doc.rect(0, 0, pw, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(200, 169, 110);
  doc.text("ELEVATION AXIS  ·  DIAGNOSTIC REPORT", pw / 2, 18, { align: "center" });

  doc.setFontSize(30);
  doc.setTextColor(245, 241, 235);
  doc.text("Where Are You", pw / 2, 58, { align: "center" });
  doc.text("Leaking Revenue?", pw / 2, 72, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(170, 170, 170);
  doc.text(audit.businessName, pw / 2, 92, { align: "center" });
  doc.text(`${audit.industry}  ·  ${audit.city}`, pw / 2, 101, { align: "center" });

  // Overall score
  const sc = audit.overallScore || 0;
  const scCol = sc >= 75 ? [22, 163, 74] : sc >= 55 ? [59, 130, 246] : sc >= 35 ? [245, 158, 11] : [239, 68, 68];
  doc.setDrawColor(40, 40, 40);
  doc.setLineWidth(5);
  doc.circle(pw / 2, 148, 25, "S");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(scCol[0], scCol[1], scCol[2]);
  doc.text(`${sc}`, pw / 2, 155, { align: "center" });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("OVERALL SCORE", pw / 2, 164, { align: "center" });

  // Biggest leak on cover
  const bl = audit.biggestLeak;
  if (bl) {
    const blCol = bl.severity === "critical" ? [239, 68, 68] : bl.severity === "moderate" ? [245, 158, 11] : [59, 130, 246];
    doc.setFillColor(blCol[0], blCol[1], blCol[2]);
    doc.rect(m, 182, cw, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(blCol[0], blCol[1], blCol[2]);
    doc.text("YOUR BIGGEST LEAK", m, 192);
    doc.setFontSize(14);
    doc.setTextColor(245, 241, 235);
    doc.text(bl.name, m, 202);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    const hlLines = doc.splitTextToSize(bl.headline, cw);
    doc.text(hlLines, m, 212);
  }

  doc.setFillColor(200, 169, 110);
  doc.rect(0, ph - 3, pw, 3, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  doc.text("ELEVATIONAXIS.COM", pw / 2, ph - 8, { align: "center" });

  // ── Page 2 — Five Leaks ────────────────────────────────────────────────────
  const addPageHeader = (pageNum: number, title: string) => {
    doc.addPage();
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, pw, 11, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(200, 169, 110);
    doc.text("ELEVATION AXIS  ·  DIAGNOSTIC REPORT", m, 7.5);
    doc.setTextColor(100, 100, 100);
    doc.text(String(pageNum), pw - m, 7.5, { align: "right" });
    y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(10, 10, 10);
    doc.text(title, m, y);
    y += 3;
    doc.setFillColor(200, 169, 110);
    doc.rect(m, y, 28, 1.5, "F");
    y += 10;
  };

  addPageHeader(2, "The Five Leaks");

  const leaks: Array<{ name: string; data: LeakScore | null }> = [
    { name: "Visibility Leak", data: audit.visibilityLeak },
    { name: "Trust Leak", data: audit.trustLeak },
    { name: "Conversion Leak", data: audit.conversionLeak },
    { name: "Response Leak", data: audit.responseLeak },
    { name: "Growth Leak", data: audit.growthLeak },
  ];

  for (const leak of leaks) {
    if (!leak.data) continue;
    if (y > ph - 55) { addPageHeader(doc.getNumberOfPages() + 1, "The Five Leaks (cont.)"); }

    const sev = leak.data.severity;
    const col = sev === "critical" ? [239, 68, 68] : sev === "moderate" ? [245, 158, 11] : sev === "low" ? [59, 130, 246] : [22, 163, 74];
    const sevLabel = sev === "critical" ? "CRITICAL" : sev === "moderate" ? "MODERATE" : sev === "low" ? "LOW" : "NONE";

    // Header row
    doc.setFillColor(248, 248, 248);
    doc.rect(m, y, cw, 9, "F");
    doc.setFillColor(col[0], col[1], col[2]);
    doc.rect(m, y, 3, 9, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(10, 10, 10);
    doc.text(leak.name, m + 6, y + 6);
    doc.setFontSize(8);
    doc.setTextColor(col[0], col[1], col[2]);
    doc.text(`${leak.data.score}/100  ${sevLabel}`, pw - m, y + 6, { align: "right" });
    y += 11;

    // Score bar
    const barW = cw * (leak.data.score / 100);
    doc.setFillColor(230, 230, 230);
    doc.rect(m, y, cw, 3.5, "F");
    doc.setFillColor(col[0], col[1], col[2]);
    doc.rect(m, y, barW, 3.5, "F");
    y += 7;

    // Findings
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(70, 70, 70);
    for (const f of leak.data.findings.slice(0, 2)) {
      const lines = doc.splitTextToSize(`• ${f}`, cw - 6);
      for (const line of lines) {
        if (y > ph - 18) { addPageHeader(doc.getNumberOfPages() + 1, "The Five Leaks (cont.)"); }
        doc.text(line, m + 3, y);
        y += 4.5;
      }
    }
    y += 7;
  }

  // ── Page — Competitors ─────────────────────────────────────────────────────
  if (audit.competitors?.length) {
    addPageHeader(doc.getNumberOfPages() + 1, "Your Competition");

    const comps = audit.competitors;
    const maxR = Math.max(...comps.map(c => c.reviewCount), 10);
    const yourR = Math.max(1, Math.floor(maxR * 0.14));
    const avgR = Math.round(comps.reduce((s, c) => s + c.reviewCount, 0) / comps.length);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    const introLines = doc.splitTextToSize(
      `Top ${comps.length} businesses ranking for "${audit.industry}" in ${audit.city}. Your competitors average ${avgR} reviews. Here's the gap.`,
      cw
    );
    doc.text(introLines, m, y);
    y += introLines.length * 5 + 6;

    // Bar chart
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text("REVIEW COUNT", m, y);
    y += 5;

    const allBars = [
      { name: `★ ${audit.businessName}`, value: yourR, isYou: true },
      ...comps.map(c => ({ name: c.name, value: c.reviewCount, isYou: false })),
    ];
    for (const bar of allBars) {
      const bw = Math.max(2, (cw - 52) * (bar.value / maxR));
      const bc = bar.isYou ? [200, 169, 110] : bar.value < maxR * 0.5 ? [239, 68, 68] : bar.value < maxR * 0.85 ? [245, 158, 11] : [22, 163, 74];
      doc.setFont("helvetica", bar.isYou ? "bold" : "normal");
      doc.setFontSize(8);
      doc.setTextColor(bar.isYou ? 200 : 80, bar.isYou ? 169 : 80, bar.isYou ? 110 : 80);
      const nm = bar.name.length > 16 ? bar.name.substring(0, 15) + "…" : bar.name;
      doc.text(nm, m, y + 4);
      doc.setFillColor(230, 230, 230);
      doc.rect(m + 50, y, cw - 52, 5.5, "F");
      doc.setFillColor(bc[0], bc[1], bc[2]);
      doc.rect(m + 50, y, bw, 5.5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(60, 60, 60);
      doc.text(`${bar.value}`, m + 50 + bw + 2, y + 4);
      y += 9;
    }
    y += 6;

    // Cards
    const cardW = (cw - 4) / 3;
    for (let i = 0; i < Math.min(3, comps.length); i++) {
      const c = comps[i];
      const cx = m + i * (cardW + 2);
      doc.setFillColor(248, 248, 248);
      doc.rect(cx, y, cardW, 28, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(40, 40, 40);
      doc.text(c.name.length > 15 ? c.name.substring(0, 14) + "…" : c.name, cx + 3, y + 6);
      const rc = c.rating >= 4.5 ? [22, 163, 74] : c.rating >= 4 ? [245, 158, 11] : [239, 68, 68];
      doc.setFontSize(14);
      doc.setTextColor(rc[0], rc[1], rc[2]);
      doc.text(`${c.rating.toFixed(1)}`, cx + 3, y + 16);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`${c.reviewCount} reviews`, cx + 3, y + 22);
      doc.text(c.hasWebsite ? "✓ Has website" : "✗ No website", cx + 3, y + 27);
    }
    y += 35;
  }

  // ── Page — Biggest Leak + Recs ─────────────────────────────────────────────
  addPageHeader(doc.getNumberOfPages() + 1, "Your Biggest Leak");

  if (audit.biggestLeak) {
    const bl = audit.biggestLeak;
    const blCol = bl.severity === "critical" ? [239, 68, 68] : bl.severity === "moderate" ? [245, 158, 11] : [59, 130, 246];

    doc.setFillColor(blCol[0], blCol[1], blCol[2]);
    doc.rect(m, y, cw, 1.5, "F");
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(blCol[0], blCol[1], blCol[2]);
    doc.text(bl.name, m, y);
    y += 7;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(10, 10, 10);
    const hlLines = doc.splitTextToSize(bl.headline, cw);
    doc.text(hlLines, m, y);
    y += hlLines.length * 6 + 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    const descLines = doc.splitTextToSize(bl.description, cw);
    doc.text(descLines, m, y);
    y += descLines.length * 5 + 8;

    doc.setFillColor(248, 248, 248);
    const fixLines = bl.fix.split("\n").filter((l: string) => l.startsWith("•"));
    const fixH = fixLines.length * 6 + 16;
    doc.rect(m, y, cw, fixH, "F");
    doc.setFillColor(blCol[0], blCol[1], blCol[2]);
    doc.rect(m, y, 2.5, fixH, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(blCol[0], blCol[1], blCol[2]);
    doc.text("WHAT I'D DO", m + 6, y + 7);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(60, 60, 60);
    let fy = y + 13;
    for (const line of fixLines) {
      const wrapped = doc.splitTextToSize(line, cw - 10);
      doc.text(wrapped, m + 6, fy);
      fy += wrapped.length * 5;
    }
    y += fixH + 10;
  }

  // Recommendations
  if (y > ph - 60) { addPageHeader(doc.getNumberOfPages() + 1, "How to Get Ahead"); }
  else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(10, 10, 10);
    doc.text("How to Get Ahead", m, y);
    y += 3;
    doc.setFillColor(200, 169, 110);
    doc.rect(m, y, 24, 1.5, "F");
    y += 9;
  }

  if (audit.recommendations) {
    for (const rec of audit.recommendations) {
      if (y > ph - 40) { addPageHeader(doc.getNumberOfPages() + 1, "How to Get Ahead (cont.)"); }
      const lines = doc.splitTextToSize(rec, cw - 8);
      const bh = lines.length * 5 + 9;
      doc.setFillColor(248, 248, 248);
      doc.rect(m, y, cw, bh, "F");
      doc.setFillColor(200, 169, 110);
      doc.rect(m, y, 2, bh, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(60, 60, 60);
      doc.text(lines, m + 6, y + 6);
      y += bh + 4;
    }
  }

  // CTA
  if (y > ph - 46) { doc.addPage(); y = 22; }
  y += 4;
  doc.setFillColor(10, 10, 10);
  doc.rect(m, y, cw, 36, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(245, 241, 235);
  doc.text("Ready to seal the foundation?", pw / 2, y + 11, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(170, 170, 170);
  doc.text("Book a free strategy call — we'll show you exactly how to close the gap.", pw / 2, y + 19, { align: "center" });
  doc.setFillColor(200, 169, 110);
  doc.rect(pw / 2 - 38, y + 25, 76, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(10, 10, 10);
  doc.text("elevationaxis.com/contact", pw / 2, y + 30, { align: "center" });

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text("Elevation Axis  ·  elevationaxis.com  ·  hello@elevationaxis.com", pw / 2, ph - 8, { align: "center" });

  doc.save(`${audit.businessName.replace(/[^a-zA-Z0-9]/g, "_")}_Leak_Report.pdf`);
}

// ── Results ───────────────────────────────────────────────────────────────────

function AuditResults({ auditId }: { auditId: number }) {
  const { data: audit, isLoading, error } = useQuery<AuditResult>({
    queryKey: ["/api/audit", auditId],
    queryFn: async () => {
      const res = await fetch(`/api/audit/${auditId}`);
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    refetchInterval: (q) => {
      const d = q.state.data;
      if (!d || d.status === "processing") return 3000;
      return false;
    },
    retry: 2,
  });

  useEffect(() => {
    if (audit?.status === "complete" && audit.overallScore !== null) {
      const t = setTimeout(() => generatePDF(audit), 1400);
      return () => clearTimeout(t);
    }
  }, [audit?.status]);

  if (error) return (
    <section className="pt-32 pb-20 container max-w-2xl mx-auto text-center">
      <h2 className="font-serif text-4xl mb-4">Unable to load results</h2>
      <p className="text-muted-foreground mb-8">Something went wrong. Reach out and we'll run a manual review.</p>
      <Link href="/contact"><Button size="lg" className="rounded-none px-8">Get in Touch</Button></Link>
    </section>
  );

  if (isLoading || !audit || audit.status === "processing") return (
    <section className="pt-32 pb-20 container max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 border border-border/10 text-sm">
        <Loader2 className="h-4 w-4 animate-spin" /> Pulling live competitor data...
      </div>
      <h2 className="font-serif text-4xl md:text-5xl mb-4">Scanning Your Market</h2>
      <p className="text-muted-foreground text-lg mb-12">We're analyzing your site and pulling real competitors from Google. About 20–30 seconds.</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {["Visibility", "Trust", "Conversion", "Response", "Growth"].map(l => (
          <div key={l} className="border border-border/10 p-5 bg-secondary/10 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-border/10 mx-auto mb-2" />
            <div className="h-2.5 bg-border/10 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </section>
  );

  if (audit.status === "failed") return (
    <section className="pt-32 pb-20 container max-w-2xl mx-auto text-center">
      <h2 className="font-serif text-4xl mb-4">Something went wrong</h2>
      <p className="text-muted-foreground mb-8">We couldn't complete the analysis. Some sites block automated checks. Reach out and we'll do a manual review.</p>
      <Link href="/contact"><Button size="lg" className="rounded-none px-8">Get in Touch</Button></Link>
    </section>
  );

  const sc = audit.overallScore || 0;
  const verdict = sc >= 75 ? "Your foundation is solid — time to grow."
    : sc >= 55 ? "You're keeping pace, but ground can be lost quickly."
    : sc >= 35 ? "There are real leaks costing you customers every week."
    : "Significant revenue is leaking. The good news — it's fixable.";

  const leaks: Array<{ name: string; data: LeakScore | null }> = [
    { name: "Visibility Leak", data: audit.visibilityLeak },
    { name: "Trust Leak", data: audit.trustLeak },
    { name: "Conversion Leak", data: audit.conversionLeak },
    { name: "Response Leak", data: audit.responseLeak },
    { name: "Growth Leak", data: audit.growthLeak },
  ];

  return (
    <section className="pt-28 pb-24">
      <div className="container max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-3 block">Revenue Leak Report</span>
          <div className="inline-flex items-center gap-2 mb-3 text-sm text-green-600 font-medium">
            <CheckCircle2 size={15} /> Report downloaded to your device
          </div>
          <h2 className="font-serif text-6xl mb-3" style={{ color: scoreColor(sc) }}>
            {sc}<span className="text-2xl text-muted-foreground">/100</span>
          </h2>
          <p className="text-lg font-medium mb-2">{verdict}</p>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Here's where <strong>{audit.businessName}</strong> is leaking revenue in {audit.city}.
          </p>
        </div>

        {/* Five leak rings */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {leaks.map(({ name, data }) => data && (
            <div key={name} className="flex flex-col items-center gap-2 border border-border/10 p-4 bg-secondary/5">
              <ScoreRing score={data.score} size={64} />
              <span className="text-xs font-medium text-center leading-tight">{name}</span>
              <SevPill sev={data.severity} />
            </div>
          ))}
        </div>

        {/* Competitor section */}
        {audit.competitors && audit.competitors.length > 0 && (
          <CompetitorSection competitors={audit.competitors} businessName={audit.businessName} />
        )}

        {/* Five leak cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {leaks.map(({ name, data }) => data && <LeakCard key={name} name={name} leak={data} />)}
        </div>

        {/* Biggest leak */}
        {audit.biggestLeak && <BiggestLeakBlock leak={audit.biggestLeak} />}
        {audit.biggestLeak && <IfThisWereMyBusiness leak={audit.biggestLeak} />}

        {/* Recommendations */}
        {audit.recommendations && (audit.recommendations as string[]).length > 0 && (
          <div className="border border-border/10 p-8 bg-secondary/5 mb-8">
            <h3 className="font-serif text-2xl mb-6">How to Get Ahead</h3>
            <ul className="space-y-4">
              {(audit.recommendations as string[]).map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <ArrowRight size={14} className="mt-1 shrink-0 text-accent" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Download again */}
        <div className="flex justify-center mb-10">
          <Button variant="outline" size="lg" className="rounded-none px-8 py-6 bg-transparent border-foreground/20"
            onClick={() => generatePDF(audit)}>
            <Download className="mr-2 h-4 w-4" /> Download Report Again
          </Button>
        </div>

        {/* CTA */}
        <div className="text-center border-t border-border/10 pt-16">
          <h3 className="font-serif text-3xl mb-4">Ready to seal the foundation?</h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            This report shows where revenue is leaking. A strategy call shows you exactly how to stop it — and I'll build the systems to keep it sealed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-none px-8 py-6 text-base">
                Book a Free Strategy Call <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-none px-8 py-6 text-base bg-transparent border-foreground/20">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping / Lawn Care",
  "General Contractor", "Remodeling", "Painting", "Cleaning Services",
  "Salon / Barber", "Auto Repair", "Pest Control", "Other",
];

export default function Audit() {
  const [auditId, setAuditId] = useState<number | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { businessName: "", email: "", websiteUrl: "", city: "", industry: "" },
  });

  const submitMutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await apiRequest("POST", "/api/audit", values);
      return res.json();
    },
    onSuccess: (data) => setAuditId(data.id),
    onError: () => toast({
      title: "Something went wrong",
      description: "Please try again or email hello@elevationaxis.com directly.",
      variant: "destructive",
    }),
  });

  if (auditId) return <AuditResults auditId={auditId} />;

  return (
    <>
      <section className="relative min-h-[52vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background" />
        <div className="container px-4 text-center max-w-3xl">
          <span className="text-accent uppercase tracking-widest text-xs font-semibold mb-4 block">Free Revenue Leak Report</span>
          <h1 className="text-5xl md:text-7xl leading-tight mb-6 font-serif">
            Where are you<br />
            <span className="italic font-light text-foreground/80">leaking revenue?</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enter your business info and we'll pull live competitor data from your market and identify exactly where customers are falling through the cracks. Report downloads automatically.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container max-w-xl mx-auto px-4">
          <div className="bg-secondary/10 p-8 md:p-10 border border-border/5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(v => submitMutation.mutate(v))} className="space-y-5">

                <FormField control={form.control} name="businessName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Smith's HVAC" className="rounded-none bg-background border-border/20 focus:border-accent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email — your report will be sent here too</FormLabel>
                    <FormControl>
                      <Input placeholder="you@yourbusiness.com" className="rounded-none bg-background border-border/20 focus:border-accent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="websiteUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourbusiness.com" className="rounded-none bg-background border-border/20 focus:border-accent" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Indianapolis" className="rounded-none bg-background border-border/20 focus:border-accent" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="industry" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full h-10 px-3 text-sm rounded-none bg-background border border-border/20 focus:border-accent focus:outline-none">
                          <option value="">Select...</option>
                          {INDUSTRIES.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-none py-6 text-base" disabled={submitMutation.isPending}>
                  {submitMutation.isPending
                    ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scanning your market...</>
                    : <>Find My Revenue Leaks <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>

                <p className="text-center text-xs text-muted-foreground">No pitch. No pressure. Report downloads automatically when ready.</p>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
