---
name: website-seo-audit
description: Comprehensive website and SEO audit system for home service businesses. Use when asked to audit a website, analyze SEO performance, evaluate local search visibility, assess AI search optimization, or create audit reports for clients. Triggers include "audit this website", "SEO analysis", "website review", "local SEO audit", "what's wrong with this site", or any request to evaluate a home service business website for traffic, trust, conversion, or search performance issues.
---

# ProofPilot Website & SEO Audit System

This skill conducts comprehensive 40-point website audits for home service businesses (electricians, plumbers, roofers, contractors, etc.) and generates actionable reports that identify problems and opportunities.

## Audit Philosophy

A website has one job: turn strangers into customers. If it's not doing that, it's failing.

Every website that generates consistent leads has four things working together. If any one of these is broken, money is being left on the table:
1. **Traffic** — If people can't find you, nothing else matters
2. **Trust** — People buy from businesses they trust
3. **Conversion** — Traffic without conversion is wasted money
4. **SEO & Content** — Google rewards websites built right

## Scoring System

Each category is scored 1-10. The overall grade is the average of all category scores.

**Scoring Guide:**
- 1-3 = Critical problems (costing money every day)
- 4-5 = Significant issues (room for major improvement)
- 6-7 = Good foundation (minor optimizations needed)
- 8-9 = Strong performance (fine-tuning only)
- 10 = Crushing it (maintain and expand)

**Interpretation:**
- Below 5/10 overall = Website is actively losing leads
- 5-6/10 overall = Functional but underperforming
- 7-8/10 overall = Good foundation, ready for growth
- 9-10/10 overall = Market leader position

## Required Tools

Before starting an audit, verify access to:
1. **BrightLocal** — Local SEO Audit + GBP Audit (on-page SEO, links, citations, GBP health)
2. **Local Falcon** — Geo-grid heatmaps showing local pack rankings across service area
3. **Ahrefs or SEMrush** — Keyword rankings, traffic estimates, competitor analysis
4. **PageSpeed Insights** — Core Web Vitals and mobile performance
5. **Manual website review** — Trust elements, conversion paths, content quality

## Audit Sections Overview

| Section | What It Measures | Scoring |
|---------|------------------|---------|
| 1. Traffic | Visibility, rankings, GBP, local pack | /10 |
| 2. Trust | Guarantees, reviews, badges, personality, story | /10 |
| 3. Conversion | CTAs, urgency, mobile, speed, forms | /10 |
| 4. SEO & Content | Pages, URLs, content quality, technical | /10 |
| 5. Keywords | Money keywords, local keywords, gaps | Analysis only |
| 6. Heatmaps | Local pack visibility across service area | Visual |
| 7. AI Search | ChatGPT/Perplexity visibility, mentions | Bonus |

**Overall Grade = Average of Sections 1-4**

## Detailed Scoring

See `references/scoring-guide.md` for complete scoring criteria with examples for each subsection.

## Tool Instructions

See `references/tool-instructions.md` for step-by-step guides on running BrightLocal audits, Local Falcon scans, and interpreting results.

## AI Search Visibility

See `references/ai-search-audit.md` for the complete methodology on auditing AI search visibility (ChatGPT, Perplexity, Reddit mentions, "Best Of" listicles, unstructured citations).

---

## Section 1: TRAFFIC (Score /10)

If people can't find you, nothing else matters.

**1A: Organic Traffic & Rankings**
- Source: Ahrefs/SEMrush
- What: Monthly organic traffic volume and trend
- Key insight: Quality > quantity. Local traffic > national blog readers.

**1B: On-Page SEO Score**
- Source: BrightLocal Local SEO Audit > On-Page section
- What: Title tags, meta descriptions, H1s, schema markup

**1C: Link Profile**
- Source: BrightLocal Local SEO Audit > Links section
- What: Referring domains, link quality

**1D: Citations (NAP Consistency)**
- Source: BrightLocal Local SEO Audit > Citations section
- What: Name, Address, Phone consistency across directories

**1E: Google Business Profile**
- Source: BrightLocal GBP Audit
- What: Profile completeness, posts, Q&A, categories
- Note: List what's missing. Name competitors who outrank them.

**1F: Local Pack Visibility**
- Source: Local Falcon geo-grid
- What: Map pack rankings across service area
- Note: Screenshot the heatmap. Green = getting calls. Red = competitors get them.

---

## Section 2: TRUST (Score /10)

People buy from businesses they trust. Manual website review.

**2A: Risk Reversal / Guarantee**
- What: Does the business reduce perceived risk?
- Look for: Satisfaction guarantee, free estimates, warranty, "no surprises" pricing

**2B: Reviews & Social Proof**
- What: Star ratings, testimonials, review counts displayed
- Look for: Google review widget, testimonials with real names, video testimonials

**2C: Trust Badges & Reputation**
- What: License, insurance, certifications, awards, BBB
- Look for: License number visible, "Licensed & Insured", industry certifications

**2D: Personality & Face**
- What: Real people visible, not stock photos
- Look for: Owner photo, team photos, branded trucks, behind-the-scenes

**2E: "Like, Know & Trust" Factor**
- What: Is the business approachable and relatable?
- Look for: Friendly tone, community involvement, family business feel

**2F: Emotional Backstory / Mission**
- What: Why did they start? What do they care about?
- Look for: About page with story, mission statement, values, community ties

---

## Section 3: CONVERSION (Score /10)

Traffic without conversion is wasted money. Manual review.

**3A: Calls to Action**
- What: How easy is it to contact them?
- Look for: Phone in header, "Get Quote" buttons, click-to-call on mobile

**3B: Incentive to Act Now**
- What: Urgency or reason to call today
- Look for: Limited offers, seasonal specials, "Call today" messaging

**3C: Mobile Responsiveness**
- What: Does it work perfectly on mobile?
- Test: View on phone, check tap targets, test forms

**3D: Page Speed & Functionality**
- What: Fast loading, no broken elements
- Source: PageSpeed Insights, manual testing

**3E: Form Friction**
- What: How easy is the form?
- Best: Name + Phone only. Worst: 10+ required fields.

---

## Section 4: SEO & CONTENT (Score /10)

Google rewards websites built right.

**4A: Page Inventory**
- What: Dedicated pages for each service and location?
- Check: Count pages, compare to GBP categories

**4B: URL Structure**
- What: Clean, descriptive URLs
- Good: /services/panel-upgrade/ Bad: /page?id=123

**4C: Service Page Quality**
- What: Substantial or thin content?
- Look for: 500+ words, unique content, proper headings, images

**4D: Location Pages**
- What: Pages for each city served?
- Look for: City pages, service+city combo pages

**4E: Content Quality (Blog)**
- What: Helpful and authoritative or generic AI filler?
- Red flag: Blog posts about unrelated topics (sign of spam)

**4F: FAQ Quality**
- What: FAQs match People Also Ask?
- Check: Compare to Google's PAA for their keywords

**4G: Technical SEO Basics**
- What: Meta titles, descriptions, schema, sitemap
- Check: View source, SEO browser extension

---

## Section 5: KEYWORD ANALYSIS

Not scored. Informs strategy.

**5A: Money Keywords** — High commercial intent (ready to hire)
**5B: Local Keywords** — City + service combinations
**5C: Keyword Gaps** — What competitors rank for that this site doesn't

---

## Section 6: LOCAL RANKING HEATMAPS

Include Local Falcon screenshots for:
1. Primary keyword (e.g., "electrician [city]")
2. Secondary keyword (e.g., "[service] [city]")

**Colors:** Green (#1-3) = In pack. Yellow (#4-7) = Close. Red (#8+) = Losing. Gray (20+) = Invisible.

---

## Section 7: AI SEARCH VISIBILITY (BONUS)

See `references/ai-search-audit.md` for full methodology.

**7A: AI Recognition** — Does ChatGPT/Perplexity recommend them?
**7B: Multi-Platform Reviews** — Google, Yelp, Facebook, BBB, industry sites
**7C: "Best Of" Listicles** — Are they on local best-of lists?
**7D: Reddit/Forum Mentions** — Community discussions
**7E: PR/News Citations** — Local media, press releases

---

## Output Format

### Final Scorecard

| Category | Score |
|----------|-------|
| Traffic Score | X/10 |
| Trust Score | X/10 |
| Conversion Score | X/10 |
| SEO & Content Score | X/10 |
| **OVERALL GRADE** | **X/10** |

### Key Findings

**What's Working Well**
1. [Strength with evidence]
2. [Strength with evidence]
3. [Strength with evidence]

**Critical Issues to Fix**
1. [Urgent problem + impact]
2. [Second priority + impact]
3. [Third priority + impact]

**Quick Wins (Easy Fixes, Big Impact)**
1. [Low effort, high impact]
2. [Low effort, high impact]
3. [Low effort, high impact]

**Pages Needed But Missing**
1. [Missing page + keyword opportunity]
2. [Missing page + keyword opportunity]
3. [Missing page + keyword opportunity]

---

## Workflow

1. **Gather info:** Company name, website URL, GBP link, primary service, service area
2. **Run tool audits:** BrightLocal, Local Falcon, Ahrefs/SEMrush
3. **Manual review:** Trust, conversion, content quality
4. **Score sections:** Use scoring guide, document evidence
5. **Compile findings:** Working, critical issues, quick wins, missing pages
6. **Generate report:** Use templates, include screenshots and specifics

**Time:** 45-60 minutes for thorough audit

---

## Critical Reminders

- Traffic quality > traffic volume. 100 local searches beat 10,000 national blog readers.
- Track attribution: "Did a lead come from that page?"
- AI content about unrelated topics is spam. Flag it immediately.
- Use specific examples and competitor names. Generic findings are useless.
- The audit should feel like a diagnostic from a growth strategist, not a checklist.
