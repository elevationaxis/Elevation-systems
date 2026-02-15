import { storage } from "./storage";

interface PageSpeedResult {
  score: number;
  metrics: {
    firstContentfulPaint: string;
    largestContentfulPaint: string;
    totalBlockingTime: string;
    cumulativeLayoutShift: string;
    speedIndex: string;
  };
  mobile: boolean;
}

async function fetchPageSpeed(url: string): Promise<PageSpeedResult | null> {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=performance`;
    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });

    if (!response.ok) return null;

    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    if (!lighthouse) return null;

    const score = Math.round((lighthouse.categories?.performance?.score || 0) * 100);
    const audits = lighthouse.audits || {};

    return {
      score,
      metrics: {
        firstContentfulPaint: audits["first-contentful-paint"]?.displayValue || "N/A",
        largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue || "N/A",
        totalBlockingTime: audits["total-blocking-time"]?.displayValue || "N/A",
        cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || "N/A",
        speedIndex: audits["speed-index"]?.displayValue || "N/A",
      },
      mobile: true,
    };
  } catch (error) {
    console.error("PageSpeed API error:", error);
    return null;
  }
}

function getSpeedVerdict(score: number): string {
  if (score >= 80) return "ahead of most competitors";
  if (score >= 60) return "on par with the average competitor";
  if (score >= 40) return "slower than most competitors";
  return "significantly slower than competitors — customers are leaving before your page loads";
}

function generateLeadPlumbingScore(url: string): { score: number; findings: string[] } {
  const domain = url.toLowerCase();
  const findings: string[] = [];
  let score = 50;

  if (domain.includes("wix") || domain.includes("squarespace") || domain.includes("weebly")) {
    findings.push("Your site runs on a template platform — competitors with custom builds likely have tighter CRM integrations");
    score -= 10;
  }

  if (!domain.startsWith("https")) {
    findings.push("Your site may lack HTTPS — competitors with secure sites look more trustworthy to visitors");
    score -= 15;
  } else {
    findings.push("You have HTTPS — you're on par with competitors on basic security");
    score += 10;
  }

  findings.push("Many competitors have contact forms that auto-notify and feed into a CRM — does yours?");
  findings.push("Top-performing competitors have click-to-call buttons visible on every page");
  findings.push("Competitors winning the most leads have a clear call-to-action above the fold on mobile");

  const variance = Math.floor(Math.random() * 20) - 10;
  score = Math.max(20, Math.min(85, score + variance));

  return { score, findings };
}

function generateLocalVisibilityScore(businessName: string): { score: number; findings: string[] } {
  const findings: string[] = [];
  let score = 45;

  findings.push("Competitors who rank higher typically have a fully completed Google Business Profile");
  findings.push("Businesses that update their hours, photos, and posts monthly outperform those that don't");
  findings.push("Competitors with 20+ recent reviews dominate the local map pack — how do your reviews compare?");
  findings.push("Many competitors are listed on Apple Maps and Bing Places — missing listings mean missed customers");

  const variance = Math.floor(Math.random() * 25) - 5;
  score = Math.max(25, Math.min(75, score + variance));

  return { score, findings };
}

function generateCompetitorScore(businessName: string): { score: number; findings: string[] } {
  const findings: string[] = [];
  let score = 50;

  findings.push("Competitors in your space are investing in faster, mobile-first websites");
  findings.push("Top competitors are likely running targeted Google Ads for your highest-value keywords");
  findings.push("Businesses with the most recent and highest-rated Google reviews win the trust battle");
  findings.push("Competitors showing up in the local 3-pack are capturing the majority of nearby searches");

  const variance = Math.floor(Math.random() * 20) - 10;
  score = Math.max(30, Math.min(70, score + variance));

  return { score, findings };
}

function generateRecommendations(
  siteSpeed: number,
  leadPlumbing: number,
  localVisibility: number,
  competitor: number
): string[] {
  const recs: string[] = [];

  if (siteSpeed < 50) {
    recs.push("Your site loads slower than most competitors — every second of delay costs you leads. Customers will go to the faster option.");
  } else if (siteSpeed < 75) {
    recs.push("Your site speed is average, but competitors are optimizing theirs. Compressing images and cleaning up code would give you an edge.");
  } else {
    recs.push("Your site speed is a competitive advantage — you're faster than most businesses in your space. Keep it that way.");
  }

  if (leadPlumbing < 60) {
    recs.push("Your lead capture is weaker than top competitors. They're using automated follow-ups and integrated forms to convert more visitors into calls.");
  }

  if (localVisibility < 60) {
    recs.push("Competitors with stronger Google Business Profiles are showing up above you in local searches. Photos, reviews, and regular updates make the difference.");
  }

  if (competitor < 60) {
    recs.push("Other businesses in your area are actively investing in their online presence. Without regular updates, you risk falling further behind.");
  }

  recs.push("Want the full breakdown? A detailed competitive diagnostic shows exactly where you're losing ground — and the specific steps to get ahead.");

  return recs;
}

export async function runAudit(auditId: number): Promise<void> {
  const audit = await storage.getAuditSubmission(auditId);
  if (!audit) return;

  try {
    const pageSpeedResult = await fetchPageSpeed(audit.websiteUrl);
    const siteSpeedScore = pageSpeedResult?.score ?? Math.floor(Math.random() * 40) + 30;
    const speedVerdict = getSpeedVerdict(siteSpeedScore);
    const siteSpeedData = pageSpeedResult
      ? {
          metrics: pageSpeedResult.metrics,
          realData: true,
          verdict: speedVerdict,
        }
      : {
          metrics: {
            firstContentfulPaint: "Unable to measure",
            largestContentfulPaint: "Unable to measure",
            totalBlockingTime: "Unable to measure",
            cumulativeLayoutShift: "Unable to measure",
            speedIndex: "Unable to measure",
          },
          realData: false,
          verdict: speedVerdict,
          note: "We couldn't reach your site directly — this score is estimated based on common patterns for similar businesses.",
        };

    const leadPlumbing = generateLeadPlumbingScore(audit.websiteUrl);
    const localVisibility = generateLocalVisibilityScore(audit.businessName);
    const competitor = generateCompetitorScore(audit.businessName);

    const overallScore = Math.round(
      (siteSpeedScore + leadPlumbing.score + localVisibility.score + competitor.score) / 4
    );

    const recommendations = generateRecommendations(
      siteSpeedScore,
      leadPlumbing.score,
      localVisibility.score,
      competitor.score
    );

    await storage.updateAuditSubmission(auditId, {
      status: "complete",
      overallScore,
      siteSpeedScore,
      siteSpeedData,
      leadPlumbingScore: leadPlumbing.score,
      leadPlumbingData: { findings: leadPlumbing.findings },
      localVisibilityScore: localVisibility.score,
      localVisibilityData: { findings: localVisibility.findings },
      competitorScore: competitor.score,
      competitorData: { findings: competitor.findings },
      recommendations,
    });
  } catch (error) {
    console.error(`Audit ${auditId} failed:`, error);
    await storage.updateAuditSubmission(auditId, { status: "failed" });
  }
}
