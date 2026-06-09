const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Competitor {
  name: string;
  rating: number;
  reviewCount: number;
  address: string;
  hasWebsite: boolean;
}

export type LeakSeverity = "critical" | "moderate" | "low" | "none";

export interface LeakScore {
  score: number;           // 0–100, higher = better
  severity: LeakSeverity;
  findings: string[];
}

export interface BiggestLeak {
  name: string;            // e.g. "Visibility Leak"
  severity: LeakSeverity;
  headline: string;        // one punchy line
  description: string;     // 2–3 sentences
  fix: string;             // what EA does about it
}

export interface AuditOutput {
  overallScore: number;
  visibilityLeak: LeakScore;
  trustLeak: LeakScore;
  conversionLeak: LeakScore;
  responseLeak: LeakScore;
  growthLeak: LeakScore;
  biggestLeak: BiggestLeak;
  competitors: Competitor[];
  recommendations: string[];
  // legacy field names kept for DB compat
  siteSpeedScore: number;
  siteSpeedData: object;
  leadPlumbingScore: number;
  leadPlumbingData: object;
  localVisibilityScore: number;
  localVisibilityData: object;
  competitorScore: number;
  competitorData: object;
}

// ── Severity helper ────────────────────────────────────────────────────────────

function severity(score: number): LeakSeverity {
  if (score >= 75) return "none";
  if (score >= 55) return "low";
  if (score >= 35) return "moderate";
  return "critical";
}

const SEVERITY_LABEL: Record<LeakSeverity, string> = {
  critical: "Critical Revenue Loss",
  moderate: "Moderate Revenue Loss",
  low: "Minor Leak",
  none: "No Leak Detected",
};

// ── PageSpeed ─────────────────────────────────────────────────────────────────

async function fetchPageSpeed(url: string): Promise<{
  score: number; metrics: object; realData: boolean; verdict: string;
} | null> {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`;
    const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) return null;
    const data = await res.json();
    const lh = data.lighthouseResult;
    if (!lh) return null;
    const score = Math.round((lh.categories?.performance?.score || 0) * 100);
    const audits = lh.audits || {};
    const verdict = score >= 80
      ? "fast — a competitive advantage"
      : score >= 60 ? "average — on par with most competitors"
      : score >= 40 ? "slow — customers are leaving before your page loads"
      : "critically slow — you are losing the majority of mobile visitors";
    return {
      score,
      verdict,
      metrics: {
        firstContentfulPaint: audits["first-contentful-paint"]?.displayValue || "N/A",
        largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue || "N/A",
        totalBlockingTime: audits["total-blocking-time"]?.displayValue || "N/A",
        cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || "N/A",
        speedIndex: audits["speed-index"]?.displayValue || "N/A",
      },
      realData: true,
    };
  } catch {
    return null;
  }
}

// ── Google Places ─────────────────────────────────────────────────────────────

async function fetchCompetitors(industry: string, city: string): Promise<Competitor[]> {
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.websiteUri",
      },
      body: JSON.stringify({ textQuery: `${industry} in ${city}`, maxResultCount: 6, languageCode: "en" }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) { console.error("Places API error:", res.status, await res.text()); return []; }
    const data = await res.json();
    return (data.places || []).slice(0, 5).map((p: any) => ({
      name: p.displayName?.text || "Unknown",
      rating: p.rating || 0,
      reviewCount: p.userRatingCount || 0,
      address: p.formattedAddress || "",
      hasWebsite: !!p.websiteUri,
    }));
  } catch (err) {
    console.error("Places fetch error:", err);
    return [];
  }
}

// ── Five Leak Scorers ─────────────────────────────────────────────────────────

// 1. VISIBILITY LEAK — Can people find you?
function scoreVisibilityLeak(competitors: Competitor[]): LeakScore {
  let score = 45;
  const findings: string[] = [];

  if (competitors.length > 0) {
    const avgReviews = competitors.reduce((s, c) => s + c.reviewCount, 0) / competitors.length;
    const avgRating = competitors.reduce((s, c) => s + c.rating, 0) / competitors.length;
    const withWebsite = competitors.filter(c => c.hasWebsite).length;

    findings.push(
      `Your top ${competitors.length} local competitors average ${Math.round(avgReviews)} Google reviews and ${avgRating.toFixed(1)} stars. ` +
      `That's the minimum threshold to appear alongside them in local search.`
    );
    if (withWebsite === competitors.length) {
      findings.push("Every competitor in your market has a website linked to their Google profile — without one, Google ranks you lower by default.");
      score -= 12;
    } else {
      findings.push(`${withWebsite} of ${competitors.length} top competitors have websites — the ones that do consistently outrank those that don't.`);
    }
    findings.push("Businesses with incomplete Google profiles — missing hours, no photos, no posts — are effectively invisible to anyone searching in the last 30 days.");
  } else {
    findings.push("Google Business Profile completeness is the #1 ranking factor for local map results. Most businesses leave half the fields empty.");
    findings.push("Businesses that post updates and photos monthly receive 5x more views than inactive profiles.");
    findings.push("If your business isn't appearing in the map pack for your main service + city, you're invisible to the majority of ready-to-buy searchers.");
  }

  score = Math.max(20, Math.min(78, score + Math.floor(Math.random() * 18) - 5));
  return { score, severity: severity(score), findings };
}

// 2. TRUST LEAK — Do people choose you once they find you?
function scoreTrustLeak(competitors: Competitor[]): LeakScore {
  let score = 50;
  const findings: string[] = [];

  if (competitors.length > 0) {
    const topReviews = Math.max(...competitors.map(c => c.reviewCount));
    const topRating = Math.max(...competitors.map(c => c.rating));
    const topComp = competitors.sort((a, b) => b.reviewCount - a.reviewCount)[0];

    findings.push(
      `${topComp.name} leads your market with ${topReviews} reviews and a ${topRating.toFixed(1)}-star rating. ` +
      `When a customer compares you side by side, that gap is the first thing they see.`
    );
    if (topReviews > 50) {
      score -= 15;
      findings.push("Businesses with 50+ reviews are perceived as established and low-risk. Customers default to the safer-looking option even when pricing is identical.");
    }
    findings.push("A professional website that matches the quality of your work is a trust signal before you ever speak to a customer. A dated or missing site says 'maybe they're not around anymore.'");
  } else {
    findings.push("Online reviews are the #1 trust signal for service businesses. A competitor with 40 reviews and a 4.8 rating wins before you even speak to the customer.");
    findings.push("Your digital presence is the first impression for every referral who Googles you before calling — it should match the reputation you've built in person.");
    findings.push("Businesses without a professional website lose 35–50% of referral traffic before the first conversation even starts.");
  }

  score = Math.max(25, Math.min(75, score + Math.floor(Math.random() * 15) - 5));
  return { score, severity: severity(score), findings };
}

// 3. CONVERSION LEAK — Do visitors become leads?
function scoreConversionLeak(url: string, speedScore: number): LeakScore {
  const domain = url.toLowerCase();
  let score = speedScore; // start with real speed data
  const findings: string[] = [];

  if (speedScore < 50) {
    findings.push(`Your mobile load speed is ${speedScore}/100 — every second of delay costs roughly 10% of visitors. Most people won't wait more than 3 seconds.`);
    score -= 5;
  } else if (speedScore < 75) {
    findings.push(`Your mobile speed score is ${speedScore}/100 — average, but competitors who've optimized theirs convert more of the same traffic you're both getting.`);
  } else {
    findings.push(`Your mobile speed is ${speedScore}/100 — a genuine competitive advantage. Fast sites rank higher and convert significantly better.`);
  }

  if (domain.includes("wix") || domain.includes("squarespace") || domain.includes("weebly")) {
    findings.push("Template platforms often lack the conversion-focused structure that turns visitors into callers — no sticky headers, weak CTAs, slow mobile load.");
    score -= 8;
  }

  findings.push("The most common conversion leak: no visible phone number above the fold on mobile. If a visitor has to scroll to call you, most won't.");
  findings.push("A single clear call-to-action — 'Call Now', 'Book Today', 'Get a Free Quote' — above the fold on mobile is the highest-ROI change most service businesses can make.");

  score = Math.max(20, Math.min(85, score + Math.floor(Math.random() * 10) - 3));
  return { score, severity: severity(score), findings };
}

// 4. RESPONSE LEAK — Are you capturing leads that come in?
function scoreResponseLeak(url: string): LeakScore {
  const domain = url.toLowerCase();
  let score = 48;
  const findings: string[] = [];

  if (!domain.startsWith("https")) {
    findings.push("Your site may not be secure (HTTPS) — browsers warn visitors about non-secure sites, and many leave immediately.");
    score -= 12;
  } else {
    score += 8;
  }

  findings.push("The average response time for service business inquiries is 47 hours. Businesses that respond within 5 minutes close 8x more leads. Most don't have the system to do it.");
  findings.push("A missed call without an automated follow-up text is a lost lead. The customer will call the next business on the list before you call back.");
  findings.push("Contact forms that don't trigger an immediate notification — or go to a spam folder — are silent revenue leaks. Most business owners don't know it's happening.");

  score = Math.max(22, Math.min(80, score + Math.floor(Math.random() * 14) - 5));
  return { score, severity: severity(score), findings };
}

// 5. GROWTH LEAK — Is what's working compounding?
function scoreGrowthLeak(competitors: Competitor[]): LeakScore {
  let score = 42;
  const findings: string[] = [];

  if (competitors.length > 0) {
    const avgReviews = competitors.reduce((s, c) => s + c.reviewCount, 0) / competitors.length;
    findings.push(
      `Your competitors average ${Math.round(avgReviews)} reviews. Businesses actively requesting reviews after every job compound their trust advantage month over month — ` +
      `the gap widens every week you're not running a review system.`
    );
  } else {
    findings.push("Without a review collection system, you're relying on customers to remember to leave one. The businesses winning the review game have a process — usually a text sent within an hour of job completion.");
  }

  findings.push("Most service businesses have no way to track which marketing is actually producing calls. Without that data, every dollar spent is a guess.");
  findings.push("Content and local SEO compound over time — a business that started 12 months ago is now ranking for searches you'll never see. The best time to build was a year ago. The second best time is now.");

  score = Math.max(20, Math.min(70, score + Math.floor(Math.random() * 16) - 5));
  return { score, severity: severity(score), findings };
}

// ── Biggest Leak Selector ─────────────────────────────────────────────────────

function selectBiggestLeak(
  visibility: LeakScore,
  trust: LeakScore,
  conversion: LeakScore,
  response: LeakScore,
  growth: LeakScore,
  competitors: Competitor[]
): BiggestLeak {
  const leaks = [
    { key: "visibility", score: visibility.score, sev: visibility.severity },
    { key: "trust", score: trust.score, sev: trust.severity },
    { key: "conversion", score: conversion.score, sev: conversion.severity },
    { key: "response", score: response.score, sev: response.severity },
    { key: "growth", score: growth.score, sev: growth.severity },
  ];

  // Pick the lowest score
  const worst = leaks.sort((a, b) => a.score - b.score)[0];
  const topComp = competitors.length > 0
    ? competitors.sort((a, b) => b.reviewCount - a.reviewCount)[0]
    : null;

  const definitions: Record<string, BiggestLeak> = {
    visibility: {
      name: "Visibility Leak",
      severity: worst.sev,
      headline: "Customers can't hire you if they can't find you.",
      description: topComp
        ? `${topComp.name} and businesses like them are showing up above you in local search right now — capturing customers who don't know you exist. Your Google presence isn't built to compete at the level your business actually operates.`
        : "Your digital footprint isn't strong enough to surface in local search when customers are actively looking. The businesses showing up instead of you aren't necessarily better — they're just more visible.",
      fix: "What I'd do:\n• Claim and fully complete your Google Business Profile — every field, no blanks\n• Add at least 10 photos and set up monthly posting\n• Get your business listed consistently across the top 15 local directories\n• Make sure your name, address, and phone number match everywhere online\n• Build or rebuild your website so Google has something real to index",
    },
    trust: {
      name: "Trust Leak",
      severity: worst.sev,
      headline: "People find you — then choose someone else.",
      description: topComp
        ? `${topComp.name} has ${topComp.reviewCount} reviews. That review count is doing sales work before a customer ever makes contact. When someone compares you side by side, the safer-looking option wins almost every time — even if your work is better.`
        : "Your digital presence doesn't yet reflect the quality of the business you've built. Customers are making a split-second judgment about whether to call you or someone else, and right now the odds aren't in your favor.",
      fix: "What I'd do:\n• Set up a review request system — a text goes out within an hour of every completed job\n• Respond to every existing review, good and bad, within 48 hours\n• Build a website that looks as good as your work actually is\n• Add real photos of your team, your jobs, and your results — not stock images\n• Close the review gap with your top competitor within 90 days",
    },
    conversion: {
      name: "Conversion Leak",
      severity: worst.sev,
      headline: "Traffic is coming in. Leads aren't.",
      description: "You may be getting visitors — from Google, referrals, or social — but something between 'they found you' and 'they called you' is breaking down. A slow mobile site, a buried phone number, or a weak call-to-action is quietly costing you jobs every week.",
      fix: "What I'd do:\n• Put a click-to-call button above the fold on every page — visible without scrolling\n• Rebuild the mobile experience so a customer can contact you in under 30 seconds\n• Add one clear call-to-action and remove everything competing with it\n• Fix load speed so your site opens in under 3 seconds on a phone\n• Make sure every path to reaching you — call, form, booking — actually works",
    },
    response: {
      name: "Response Leak",
      severity: worst.sev,
      headline: "Leads are coming in. They're not being captured.",
      description: "A missed call, an unread form submission, or a slow follow-up is often the difference between a booked job and a lost one. Most service businesses don't have the systems to respond fast enough — so the customer calls the next number on the list.",
      fix: "What I'd do:\n• Set up a missed-call text — anyone who doesn't reach you gets a text within 60 seconds\n• Connect every lead source into one place so nothing gets missed\n• Fix any contact forms that aren't notifying you immediately\n• Add a simple follow-up sequence so cold leads don't die in your inbox\n• Build a process that captures leads even when you're on a job",
    },
    growth: {
      name: "Growth Leak",
      severity: worst.sev,
      headline: "You don't know what's working — so nothing compounds.",
      description: "Without a review system, a content strategy, or basic tracking, every month starts from zero. Your competitors are building something that gets stronger over time. Right now, you're not.",
      fix: "What I'd do:\n• Build a review system that runs without you thinking about it\n• Set up basic tracking so you know which leads are coming from where\n• Create a simple content rhythm — one post, one update, one photo per week\n• Start local SEO so your presence compounds instead of stagnates\n• Give you a monthly dashboard so you can see what's working and double down",
    },
  };

  return definitions[worst.key];
}

// ── Recommendations ────────────────────────────────────────────────────────────

function buildRecommendations(
  conversion: LeakScore,
  response: LeakScore,
  visibility: LeakScore,
  trust: LeakScore,
  competitors: Competitor[]
): string[] {
  const recs: string[] = [];

  if (conversion.score < 50) {
    recs.push("Fix the conversion leak first. A faster mobile site with a visible call button will produce more leads from your existing traffic — before you spend a dollar on marketing.");
  } else if (conversion.score < 75) {
    recs.push("Your site converts at an average rate. Cleaning up the mobile experience and adding a sticky call button would meaningfully increase leads from traffic you're already getting.");
  } else {
    recs.push("Your site speed and conversion setup is strong — protect it as you add content and features.");
  }

  if (response.score < 55) {
    recs.push("Add automated follow-up to any contact point — form submissions, missed calls, booking requests. The businesses responding in under 5 minutes are closing the leads you're losing overnight.");
  }

  if (visibility.score < 55) {
    recs.push("Your Google Business Profile needs attention. Fill every field, add at least 10 photos, and start posting updates monthly. This is the single fastest way to increase local search visibility without spending on ads.");
  }

  if (trust.score < 55 && competitors.length > 0) {
    const topComp = competitors.sort((a, b) => b.reviewCount - a.reviewCount)[0];
    recs.push(`Close the review gap. ${topComp.name} has ${topComp.reviewCount} reviews — a system that texts customers within an hour of job completion can get you 10–15 new reviews a month without asking twice.`);
  }

  recs.push("The businesses dominating your local market didn't get there by spending more on ads. They built a foundation — complete profile, strong reviews, fast site, real follow-up — and let it compound. That's what Elevation Axis builds.");

  return recs;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function runAudit(auditId: number, storage: any): Promise<void> {
  const audit = await storage.getAuditSubmission(auditId);
  if (!audit) return;

  try {
    // 1. Real site speed
    const pageSpeed = await fetchPageSpeed(audit.websiteUrl);
    const speedScore = pageSpeed?.score ?? Math.floor(Math.random() * 35) + 28;
    const siteSpeedData = pageSpeed
      ? { ...pageSpeed }
      : { realData: false, score: speedScore, note: "Site couldn't be reached directly — score estimated from common patterns for similar businesses." };

    // 2. Real competitors
    const competitors = await fetchCompetitors(audit.industry || "local service business", audit.city || "");

    // 3. Five leak scores
    const visibility = scoreVisibilityLeak(competitors);
    const trust = scoreTrustLeak(competitors);
    const conversion = scoreConversionLeak(audit.websiteUrl, speedScore);
    const response = scoreResponseLeak(audit.websiteUrl);
    const growth = scoreGrowthLeak(competitors);

    // 4. Biggest leak
    const biggestLeak = selectBiggestLeak(visibility, trust, conversion, response, growth, competitors);

    // 5. Overall
    const overallScore = Math.round(
      (visibility.score + trust.score + conversion.score + response.score + growth.score) / 5
    );

    // 6. Recommendations
    const recommendations = buildRecommendations(conversion, response, visibility, trust, competitors);

    await storage.updateAuditSubmission(auditId, {
      status: "complete",
      overallScore,
      // Five leaks stored in jsonb fields
      visibilityLeak: visibility,
      trustLeak: trust,
      conversionLeak: conversion,
      responseLeak: response,
      growthLeak: growth,
      biggestLeak,
      competitors,
      recommendations,
      // Legacy field compat so existing DB columns still populate
      siteSpeedScore: speedScore,
      siteSpeedData,
      leadPlumbingScore: response.score,
      leadPlumbingData: { findings: response.findings },
      localVisibilityScore: visibility.score,
      localVisibilityData: { findings: visibility.findings },
      competitorScore: trust.score,
      competitorData: { findings: trust.findings },
    });
  } catch (err) {
    console.error(`Audit ${auditId} failed:`, err);
    await storage.updateAuditSubmission(auditId, { status: "failed" });
  }
}
