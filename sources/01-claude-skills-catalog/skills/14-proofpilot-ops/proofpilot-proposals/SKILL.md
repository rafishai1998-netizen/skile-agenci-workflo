---
name: proofpilot-proposals
description: Generate branded ProofPilot marketing proposals for home service and local businesses. Covers website, SEO, ads, and funnel proposals with full pricing and ROI projections.
---

# ProofPilot Proposal Generator

Generate branded marketing proposals for ProofPilot's home service and local business clients. These proposals are strategy pitches used in the second sales meeting (after Discovery and Audit). They are NOT scope-of-work documents.

## Before You Start

Load these references in order:

1. Read `references/pricing.md` from THIS skill for the complete pricing database
2. Read `references/proposal-structures.md` from THIS skill for section-by-section templates
3. Read the `proofpilot-brand` skill's SKILL.md for brand colors and typography
4. Read the `proofpilot-brand` skill's `references/docx-boilerplate.js` for the document generation template
5. Read the `docx` skill's SKILL.md for docx-js creation instructions

## What You Need From the User

### Required
- Business name and industry (e.g., "Steadfast Plumbing", "PowerRoute Electric")
- Services they want (website, SEO, ads, funnels, or combination)
- Service area / location

### Strongly Recommended
- Discovery call notes or audit findings
- Competitor names or data
- Current marketing situation (existing site, ad spend, lead sources)
- Specific services the business offers (used for funnel/page recommendations)

### Optional (Will Enhance the Proposal)
- Monthly revenue or average job value
- Close rate on leads
- Growth goals (revenue target, lead volume target)
- Pain points mentioned in discovery
- Budget range discussed

If the user provides incomplete info, ask for the required fields. Fill reasonable defaults for optional fields based on industry norms. Note any assumptions in the proposal.

## Proposal Types

### Type 1: Website + SEO Proposal
Best for: Businesses that need a new site or site rebuild plus organic search visibility.

Key sections: Problem framing with audit scores, keyword gap analysis showing what competitors rank for, competitor cost comparison (show the value vs. alternatives like TopLine Pro, Scorpion, iLocal), tiered website recommendation (primary + alternative tier), SEO add-on option, ROI projection tables, investment summary with payment options.

Pattern: Lead with audit pain points. Show them exactly which keywords competitors own that they don't. Compare your pricing to expensive alternatives. Recommend a primary website tier with an alternative. Add SEO as a "Phase 2" or bundled option. Close with ROI math.

### Type 2: Meta Ads + Funnel Proposal
Best for: Businesses ready to generate leads fast through paid social advertising.

Key sections: Opportunity framing (why Meta works for their industry), Meta Ads management details ($1,500/mo), funnel recommendation with service-specific funnels, ad spend tiers (Good/Better/Best), CPL estimates by service type, ROAS projections, how the quiz/qualification funnel works, live examples if available.

Pattern: Open with the opportunity (leads sitting on Instagram/Facebook). Explain why Meta works for home services. Present the ads management fee. Recommend specific funnels for their top services. Show three ad spend tiers with projected leads and revenue. Include visual explanation of funnel flow. Close with investment summary.

### Type 3: Comprehensive Marketing Strategy
Best for: Businesses that need the full system (website + SEO + ads).

Key sections: Current situation assessment, competitor benchmark (pick their strongest local competitor), marketing system overview (all components), phased roadmap (3 phases over 6-12 months), website architecture (service pages, location pages, combo pages), Good/Better/Best investment options, detailed pricing breakdown, ROI projections, 180-day guarantee, next steps.

Pattern: Start with where they are now. Benchmark against a specific competitor. Lay out the full marketing system they need. Phase the implementation so it's digestible. Present three investment tiers. Include detailed pricing for full transparency. Close with guarantee and next steps.

### Type 4: Standalone Lead Funnel Proposal
Best for: Businesses that already have a site/ads and need a lead capture system, or non-home-service businesses (counseling, med spa, etc.).

Key sections: Current practice/business assessment, what the funnel does and how it works (step-by-step), funnel math with 3 scenarios (conservative/moderate/optimistic), compounding client model (for recurring revenue businesses), investment breakdown (setup + monthly management + ad spend), what's included in management, next steps.

Pattern: Start with their current situation. Explain the funnel concept in simple terms with a numbered flow. Show the math at three confidence levels. For recurring-revenue businesses, show the compounding model. Break down the investment clearly. Close with next steps.

### Type 5: Hybrid / Custom Combination
For proposals that combine elements. Common combos:
- Meta Ads + Funnel + Website (funnel feeds into new site)
- Website + Google Ads (site rebuild with paid search)
- SEO + Google Ads + LSA (full search domination)

Pull the relevant sections from the types above and combine them logically. Always maintain a single investment summary at the end that shows everything together.

## Writing Style

### Tone
- Direct, confident, consultative. You are the expert showing them the path.
- Address the reader as "you" and "your" throughout.
- Use short, impactful sentences. No fluff.
- Active voice only. No passive constructions.
- No em dashes or semicolons anywhere.
- No words like: delve, embark, unlock, revolutionize, cutting-edge, leverage, utilize.

### Structural Patterns (from real ProofPilot proposals)
- Frame the problem before presenting the solution. Never lead with pricing.
- Use specific data: audit scores, keyword counts, competitor metrics, CPL estimates.
- Show competitors by name when possible. "Smith Plumbing ranks for 847 keywords. You rank for 12."
- Use comparison tables to show value (ProofPilot vs. expensive alternatives).
- ROI projections always show the math: visitors x conversion rate x close rate = jobs x avg job value = revenue.
- Present investment tiers when applicable (Good/Better/Best or Primary/Alternative).
- Always end with clear Next Steps (numbered list of what happens after they sign).
- Include payment options: 12-month plan, pay in full (10% off), 50/50 split.

### Section Formatting
- Each major section gets a page break before it.
- Section headings are Heading 1 (Bebas Neue, Dark Blue).
- Each section opens with an italic tagline in Medium Gray describing what the section covers.
- Body paragraphs explain context before any tables or data.
- Tables use alternating header colors (odd sections = Dark Blue, even sections = Electric Blue).

## Pricing Quick Reference

See `references/pricing.md` for the complete database. Summary:

### Websites (One-Time)
- Starter Site: $5,000 (5-7 pages, basic)
- Growth Site: $8,000 (10-15 pages, SEO-ready)
- Territory Site: $15,000 (20-30 pages, multi-location)
- Market Leader Site: $25,000 (40+ pages, full custom)

### SEO (Monthly)
- Local Visibility: $2,000/mo
- Market Growth: $4,000/mo
- Territory Domination: $8,000/mo
- Market Leader: $12,000/mo

### Paid Advertising (Monthly)
- Google Ads: 15% of ad spend, min $500/mo management
- LSA (Local Service Ads): $500/mo management + ad spend
- Meta Ads (Facebook/Instagram): $1,500/mo management
- Bundle discount: 10% off management fees when combining 2+ ad platforms

### Lead Funnels
- Standard funnel (quiz, qualification, booking): starts at $3,000 one-time
- Complex funnel (custom logic, routing, database, client portals): $6,000 - $10,000
- Funnel management (ongoing optimization, A/B testing): included with ads management or separate retainer

### Add-Ons
- Monthly maintenance: $500/mo
- Payment options: 12-month plan, pay in full (10% off), 50/50 split

## Document Generation

### File Format
Generate as .docx using docx-js (JavaScript). Use the ProofPilot brand boilerplate from the `proofpilot-brand` skill.

### Brand Application
- All headings: Bebas Neue font
- Body text: Calibri, 11pt
- Primary color: Dark Blue (#00184D)
- Secondary color: Electric Blue (#0051FF)
- Accent: Neon Green (#C8FF00) for scores and CTA headlines
- Table headers alternate Dark Blue (odd sections) and Electric Blue (even sections)
- Score text is always Neon Green, bold
- CTA boxes: Dark Blue background, Neon Green headline, White body text

### Required Document Elements
1. Header: "PROOFPILOT | [Proposal Title]" right-aligned
2. Footer: "Page X of Y" centered, Medium Gray
3. Cover section with title prefix (Electric Blue) and main title (Dark Blue)
4. Client info table near the top
5. Value proposition box (Dark Blue bg, Neon Green headline)
6. Content sections with page breaks
7. Investment summary table
8. Payment options section
9. Next Steps (numbered)
10. CTA box at the end

## Guarantee Language

For comprehensive proposals ($8K+ in services), include the 180-day guarantee:

"If after 180 days of following the recommended strategy, you don't see measurable improvement in your online visibility and lead generation, we will continue working at no additional cost until you do."

## File Naming

`[Client-Name]-[Proposal-Type]-Proposal.docx`

Examples:
- `Steadfast-Plumbing-Marketing-Strategy-Proposal.docx`
- `PowerRoute-Meta-Ads-Proposal.docx`
- `Lost-Found-Counseling-Lead-Funnel-Proposal.docx`

## Checklist Before Delivering

Before outputting the final document, verify:
- All pricing matches the pricing database (references/pricing.md)
- Payment options are included (12-month, pay in full 10% off, 50/50)
- Bundle discount applied if 2+ ad platforms
- ROI math is internally consistent (check the multiplication)
- No em dashes or semicolons anywhere in the document
- All brand colors are exact hex codes (not approximations)
- Headings use Bebas Neue, body uses Calibri
- Table headers alternate colors by section
- Score/accent text uses Neon Green
- Next Steps section is present with numbered items
- CTA box at the end with contact info
- File saved with correct naming convention
