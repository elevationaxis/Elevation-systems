import type { Config, Context } from "@netlify/functions";

type AuditRequest = {
  businessName?: string;
  websiteUrl?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  goal?: string;
};

type PageSpeedResult = {
  score: number;
  lcp?: string;
};

function response(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateWebsite(value: string): string | null {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    if (!parsed.hostname || parsed.hostname === "localhost") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

async function getPageSpeed(websiteUrl: string): Promise<PageSpeedResult | null> {
  try {
    const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    endpoint.searchParams.set("url", websiteUrl);
    endpoint.searchParams.set("strategy", "mobile");
    endpoint.searchParams.set("category", "performance");

    const apiKey = Netlify.env.get("GOOGLE_API_KEY");
    if (apiKey) endpoint.searchParams.set("key", apiKey);

    const result = await fetch(endpoint, { signal: AbortSignal.timeout(25000) });
    if (!result.ok) return null;

    const payload = await result.json() as {
      lighthouseResult?: {
        categories?: { performance?: { score?: number } };
        audits?: { [key: string]: { displayValue?: string } };
      };
    };
    const raw = payload.lighthouseResult?.categories?.performance?.score;
    if (typeof raw !== "number") return null;

    return {
      score: Math.round(raw * 100),
      lcp: payload.lighthouseResult?.audits?.["largest-contentful-paint"]?.displayValue,
    };
  } catch {
    return null;
  }
}

function buildLightReport(businessName: string, speed: PageSpeedResult | null) {
  if (!speed) {
    return {
      headline: `A first look at ${businessName}`,
      headlineStat: {
        label: "Website check",
        value: "Initial review ready",
        detail: "Your site deserves a closer look alongside the rest of the customer journey.",
      },
      quickWins: [
        "Make the next step obvious on every important page—call, form, or another clear way to reach out.",
        "Keep your business information consistent wherever customers look for you online.",
      ],
    };
  }

  const performanceDetail = speed.score >= 90
    ? "Mobile performance looks healthy. Keep it protected as the site grows."
    : speed.score >= 70
      ? "The foundation is workable, with room to make the mobile experience more efficient."
      : speed.score >= 50
        ? "Mobile performance deserves attention before more traffic is sent to the site."
        : "Mobile performance is the clearest place to start improving the experience.";

  const speedQuickWin = speed.score < 70
    ? "Prioritize mobile load time so visitors can reach the information they need without waiting."
    : "Keep pages lean on mobile and check performance after every significant site update.";

  return {
    headline: `A first look at ${businessName}`,
    headlineStat: {
      label: "Mobile performance",
      value: `${speed.score}/100`,
      detail: speed.lcp ? `${performanceDetail} Largest contentful paint: ${speed.lcp}.` : performanceDetail,
    },
    quickWins: [
      speedQuickWin,
      "Make the next step obvious on every important page—call, form, or another clear way to reach out.",
    ],
  };
}

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return response({ message: "Method not allowed" }, 405);
  }

  let body: AuditRequest;
  try {
    body = await req.json() as AuditRequest;
  } catch {
    return response({ message: "Please submit valid form data." }, 400);
  }

  const businessName = getString(body.businessName);
  const websiteUrl = validateWebsite(getString(body.websiteUrl));
  const email = getString(body.email);

  if (businessName.length < 2 || !websiteUrl || !email.includes("@")) {
    return response({ message: "Please enter a business name, a valid website, and a valid email." }, 400);
  }

  const speed = await getPageSpeed(websiteUrl);
  const lightReport = buildLightReport(businessName, speed);

  return response({
    status: "complete",
    reportContext: "on_site",
    lightReport,
    nextStep: "A full EA review connects what is working, what deserves attention, what should happen first, and what can wait.",
  });
};

export const config: Config = {
  path: "/api/audit",
};
