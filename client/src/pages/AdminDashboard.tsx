import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, ExternalLink, TrendingDown, TrendingUp, Minus, RefreshCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

type Submission = {
  id: number;
  businessName: string;
  email: string;
  websiteUrl: string;
  city: string;
  industry: string;
  status: string;
  overallScore: number | null;
  biggestLeak: { name: string; severity: string; headline: string } | null;
  visibilityLeak: { score: number; severity: string } | null;
  trustLeak: { score: number; severity: string } | null;
  conversionLeak: { score: number; severity: string } | null;
  responseLeak: { score: number; severity: string } | null;
  growthLeak: { score: number; severity: string } | null;
  competitors: { name: string; reviewCount: number; rating: number }[] | null;
  createdAt: string;
};

type AdminData = {
  submissions: Submission[];
  total: number;
  thisWeek: number;
  avgScore: number;
};

// ── Design helpers ─────────────────────────────────────────────────────────────

const SEV_COLOR: Record<string, string> = {
  critical: "#ef4444",
  moderate: "#f59e0b",
  low: "#3b82f6",
  none: "#16a34a",
};

const SEV_BG: Record<string, string> = {
  critical: "rgba(239,68,68,0.10)",
  moderate: "rgba(245,158,11,0.10)",
  low: "rgba(59,130,246,0.10)",
  none: "rgba(22,163,74,0.10)",
};

function scoreColor(s: number) {
  if (s >= 75) return "#16a34a";
  if (s >= 55) return "#3b82f6";
  if (s >= 35) return "#f59e0b";
  return "#ef4444";
}

function SevDot({ sev }: { sev: string }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ backgroundColor: SEV_COLOR[sev] || "#999" }}
    />
  );
}

function ScoreBubble({ score }: { score: number }) {
  return (
    <span
      className="inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold font-serif"
      style={{ color: scoreColor(score), backgroundColor: `${scoreColor(score)}18` }}
    >
      {score}
    </span>
  );
}

function LeakPill({ name, sev }: { name: string; sev: string }) {
  const short = name.replace(" Leak", "");
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-sm"
      style={{ color: SEV_COLOR[sev], backgroundColor: SEV_BG[sev] }}
    >
      <SevDot sev={sev} />
      {short}
    </span>
  );
}

// ── CSV Export ────────────────────────────────────────────────────────────────

function exportCSV(submissions: Submission[]) {
  const headers = [
    "Date", "Business", "Email", "City", "Industry", "Website",
    "Status", "Score", "Biggest Leak", "Severity",
    "Visibility", "Trust", "Conversion", "Response", "Growth",
    "Top Competitor", "Top Competitor Reviews",
  ];

  const rows = submissions.map(s => [
    new Date(s.createdAt).toLocaleDateString(),
    s.businessName,
    s.email,
    s.city,
    s.industry,
    s.websiteUrl,
    s.status,
    s.overallScore ?? "",
    s.biggestLeak?.name ?? "",
    s.biggestLeak?.severity ?? "",
    s.visibilityLeak?.score ?? "",
    s.trustLeak?.score ?? "",
    s.conversionLeak?.score ?? "",
    s.responseLeak?.score ?? "",
    s.growthLeak?.score ?? "",
    s.competitors?.[0]?.name ?? "",
    s.competitors?.[0]?.reviewCount ?? "",
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `EA_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Follow-up message builder ─────────────────────────────────────────────────

function buildFollowUp(s: Submission): string {
  const leak = s.biggestLeak;
  const topComp = s.competitors?.[0];

  if (!leak) {
    return `Hey [Name] — I just pulled a quick analysis on ${s.businessName} and found a few things worth a 5-minute conversation. Want me to send it over?`;
  }

  if (leak.name === "Trust Leak" && topComp) {
    return `Hey [Name] — I ran a quick analysis on ${s.businessName} and the biggest thing I noticed is a Trust Leak. ${topComp.name} has ${topComp.reviewCount} reviews — that gap is winning them calls that should be yours. Mind if I send over the full report?`;
  }

  if (leak.name === "Visibility Leak") {
    return `Hey [Name] — I ran a quick analysis on ${s.businessName} and the main issue is a Visibility Leak. You're not showing up where customers in ${s.city} are actively searching. I have the full breakdown — want me to send it?`;
  }

  if (leak.name === "Conversion Leak") {
    return `Hey [Name] — I ran a quick analysis on ${s.businessName} and found a Conversion Leak — traffic is coming in but something's stopping it from turning into calls. I have the details if you want to take a look.`;
  }

  if (leak.name === "Response Leak") {
    return `Hey [Name] — I pulled a quick analysis on ${s.businessName}. The biggest issue is a Response Leak — leads are probably coming in but not being captured consistently. Want me to send over the full breakdown?`;
  }

  return `Hey [Name] — I ran a quick analysis on ${s.businessName} and identified a ${leak.name}. ${leak.headline} Want me to send over the full report?`;
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="border border-border/10 p-5 bg-secondary/5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <div className="text-3xl font-serif font-bold">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

// ── Submission row ────────────────────────────────────────────────────────────

function SubmissionRow({ s, onCopyFollowUp }: { s: Submission; onCopyFollowUp: (msg: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const followUp = buildFollowUp(s);

  return (
    <>
      <tr
        className="border-b border-border/5 hover:bg-secondary/10 cursor-pointer transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
          {new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </td>
        <td className="px-4 py-3">
          <div className="font-medium text-sm">{s.businessName}</div>
          <div className="text-xs text-muted-foreground">{s.city} · {s.industry}</div>
        </td>
        <td className="px-4 py-3">
          <a
            href={`mailto:${s.email}`}
            className="text-xs text-accent hover:underline"
            onClick={e => e.stopPropagation()}
          >
            {s.email}
          </a>
        </td>
        <td className="px-4 py-3 text-center">
          {s.overallScore !== null
            ? <ScoreBubble score={s.overallScore} />
            : <span className="text-xs text-muted-foreground">{s.status}</span>
          }
        </td>
        <td className="px-4 py-3">
          {s.biggestLeak
            ? <LeakPill name={s.biggestLeak.name} sev={s.biggestLeak.severity} />
            : <span className="text-xs text-muted-foreground">—</span>
          }
        </td>
        <td className="px-4 py-3 text-right">
          <button
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            onClick={e => { e.stopPropagation(); setExpanded(x => !x); }}
          >
            {expanded ? "▲" : "▼"}
          </button>
        </td>
      </tr>

      {expanded && (
        <tr className="border-b border-border/5 bg-secondary/5">
          <td colSpan={6} className="px-4 py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Leak scores */}
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Leak Breakdown</div>
                <div className="space-y-2">
                  {[
                    { name: "Visibility", data: s.visibilityLeak },
                    { name: "Trust", data: s.trustLeak },
                    { name: "Conversion", data: s.conversionLeak },
                    { name: "Response", data: s.responseLeak },
                    { name: "Growth", data: s.growthLeak },
                  ].map(({ name, data }) => data && (
                    <div key={name} className="flex items-center gap-2">
                      <SevDot sev={data.severity} />
                      <span className="text-xs w-20">{name}</span>
                      <div className="flex-1 h-1.5 bg-secondary/30 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${data.score}%`,
                            backgroundColor: scoreColor(data.score),
                            transition: "width 0.8s ease",
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6 text-right">{data.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitors */}
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Top Competitors</div>
                {s.competitors && s.competitors.length > 0 ? (
                  <div className="space-y-2">
                    {s.competitors.slice(0, 4).map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs truncate max-w-[130px]">{c.name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span style={{ color: scoreColor(c.rating >= 4.5 ? 80 : c.rating >= 4 ? 55 : 30) }}>
                            {c.rating.toFixed(1)}★
                          </span>
                          <span>{c.reviewCount} reviews</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">No competitor data</span>
                )}
              </div>

              {/* Follow-up message */}
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Follow-Up Message</div>
                <div className="bg-background border border-border/10 p-3 rounded-sm text-xs text-muted-foreground leading-relaxed mb-3">
                  {followUp}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs rounded-none h-7 px-3"
                    onClick={() => {
                      navigator.clipboard.writeText(followUp);
                      onCopyFollowUp(followUp);
                    }}
                  >
                    Copy Message
                  </Button>
                  <a
                    href={`mailto:${s.email}?subject=Your%20${encodeURIComponent(s.biggestLeak?.name || "Revenue Leak")}%20Report&body=${encodeURIComponent(followUp)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" className="text-xs rounded-none h-7 px-3">
                      Open in Email
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Website link */}
            <div className="mt-4 pt-4 border-t border-border/5 flex items-center gap-4">
              <a
                href={s.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
              >
                <ExternalLink size={11} /> {s.websiteUrl}
              </a>
              {s.biggestLeak && (
                <span className="text-xs text-muted-foreground italic">
                  "{s.biggestLeak.headline}"
                </span>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Login wall ────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "elevationaxis2026";

function LoginWall({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("ea_admin", "1");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="border border-border/10 p-10 w-full max-w-sm bg-secondary/5">
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-foreground/5 border border-border/10">
            <Lock size={18} className="text-muted-foreground" />
          </div>
        </div>
        <h2 className="font-serif text-2xl text-center mb-2">Admin Access</h2>
        <p className="text-xs text-muted-foreground text-center mb-6">Elevation Axis — Lead Dashboard</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className={cn("rounded-none bg-background border-border/20", error && "border-red-500")}
            autoFocus
          />
          {error && <p className="text-xs text-red-500 text-center">Incorrect password</p>}
          <Button type="submit" className="w-full rounded-none">Enter</Button>
        </form>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("ea_admin") === "1");
  const [copied, setCopied] = useState(false);
  const [filter, setFilter] = useState("");
  const [leakFilter, setLeakFilter] = useState("all");

  const { data, isLoading, refetch } = useQuery<AdminData>({
    queryKey: ["/api/admin/submissions"],
    queryFn: async () => {
      const res = await fetch("/api/admin/submissions", {
        headers: { "x-admin-key": ADMIN_PASSWORD },
      });
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    },
    enabled: authed,
    refetchInterval: 60000,
  });

  if (!authed) return <LoginWall onLogin={() => setAuthed(true)} />;

  const submissions = data?.submissions || [];

  const filtered = submissions.filter(s => {
    const matchText = filter === "" ||
      s.businessName.toLowerCase().includes(filter.toLowerCase()) ||
      s.email.toLowerCase().includes(filter.toLowerCase()) ||
      s.city.toLowerCase().includes(filter.toLowerCase()) ||
      s.industry.toLowerCase().includes(filter.toLowerCase());
    const matchLeak = leakFilter === "all" || s.biggestLeak?.name === leakFilter;
    return matchText && matchLeak;
  });

  const leakTypes = ["all", "Visibility Leak", "Trust Leak", "Conversion Leak", "Response Leak", "Growth Leak"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/10 bg-secondary/5">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">Elevation Axis</div>
            <h1 className="font-serif text-xl">Lead Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-none text-xs"
              onClick={() => refetch()}
            >
              <RefreshCw size={12} className="mr-1.5" /> Refresh
            </Button>
            <Button
              size="sm"
              className="rounded-none text-xs"
              onClick={() => exportCSV(filtered)}
              disabled={filtered.length === 0}
            >
              <Download size={12} className="mr-1.5" /> Export CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Leads" value={data?.total ?? "—"} sub="all time" />
          <StatCard label="This Week" value={data?.thisWeek ?? "—"} sub="new submissions" />
          <StatCard label="Avg Score" value={data?.avgScore ? `${data.avgScore}/100` : "—"} sub="across all audits" />
          <StatCard
            label="Top Leak"
            value={submissions.length > 0
              ? (() => {
                const counts: Record<string, number> = {};
                submissions.forEach(s => {
                  if (s.biggestLeak?.name) counts[s.biggestLeak.name] = (counts[s.biggestLeak.name] || 0) + 1;
                });
                return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]?.replace(" Leak", "") || "—";
              })()
              : "—"
            }
            sub="most common diagnosis"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <Input
            placeholder="Search by name, email, city, industry..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="rounded-none bg-background border-border/20 text-sm max-w-sm"
          />
          <div className="flex gap-2 flex-wrap">
            {leakTypes.map(lt => (
              <button
                key={lt}
                onClick={() => setLeakFilter(lt)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium border transition-colors rounded-sm",
                  leakFilter === lt
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background border-border/20 text-muted-foreground hover:border-foreground/40"
                )}
              >
                {lt === "all" ? "All Leaks" : lt.replace(" Leak", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Copied toast */}
        {copied && (
          <div className="fixed bottom-6 right-6 bg-foreground text-background text-xs px-4 py-2.5 rounded-sm shadow-lg">
            Message copied to clipboard
          </div>
        )}

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground text-sm">Loading submissions...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-border/10 bg-secondary/5">
            <p className="text-muted-foreground text-sm">
              {submissions.length === 0 ? "No submissions yet. Share your audit link to start collecting leads." : "No results match your filter."}
            </p>
          </div>
        ) : (
          <div className="border border-border/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/10 bg-secondary/10">
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted-foreground font-medium w-20">Date</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted-foreground font-medium">Business</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted-foreground font-medium">Email</th>
                  <th className="px-4 py-3 text-center text-xs uppercase tracking-widest text-muted-foreground font-medium w-16">Score</th>
                  <th className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted-foreground font-medium">Biggest Leak</th>
                  <th className="px-4 py-3 w-8" />
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <SubmissionRow
                    key={s.id}
                    s={s}
                    onCopyFollowUp={() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }}
                  />
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-border/5 bg-secondary/5 text-xs text-muted-foreground">
              Showing {filtered.length} of {submissions.length} submissions
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
