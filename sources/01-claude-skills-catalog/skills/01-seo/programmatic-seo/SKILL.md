---
name: programmatic-seo
description: >
  Strategy and execution for building SEO-optimized pages at scale. Template
  design, data sources, content patterns, and quality controls for creating
  dozens or hundreds of pages from structured data. Triggers on: "programmatic SEO",
  "scale content", "template pages", "location pages", "comparison pages",
  "best X for Y pages", "tool directory", "glossary at scale", "content at volume",
  "alternatives pages", "build 100 pages".
---

# Programmatic SEO

Strategy and execution for building SEO-optimized pages at scale. One person with AI and a good template can build 200 optimized pages that would require a content team and months of manual work. This skill covers template design, data sourcing, quality controls, and launch strategy.

## When to Use This Skill

- Building comparison pages across a product category
- Creating location-specific pages (service + city combinations)
- Developing "best X for Y" recommendation pages at volume
- Building tool directories or resource databases
- Creating glossary pages for industry terms
- Generating "alternatives to" competitor pages
- Scaling any content type that follows a repeatable pattern

## Page Type Selection

Choose the right type for your market position and data availability:

| Page Type | Example | Best For | Data Required |
|-----------|---------|----------|---------------|
| Comparison | "Notion vs Asana vs Monday" | Markets with clear feature differentiation | Feature/pricing data for each product |
| Location | "HVAC Repair in [City, State]" | Local service businesses | Local data (population, climate, cost) |
| Best X for Y | "Best CRM for Real Estate Agents" | Recommendation authority | Use case analysis + product data |
| Alternatives | "Alternatives to Salesforce" | Capturing competitor brand searches | Competitor feature analysis |
| Tool/Resource Directory | "Free SEO Tools" | Aggregation plays | Product database with categories |
| Glossary | "What is [Industry Term]" | B2B/technical markets | Term definitions + use cases |
| Integration | "[Tool A] + [Tool B] Integration" | SaaS markets | Integration capability data |
| Pricing | "[Product] Pricing in [Year]" | High commercial intent | Current pricing data |

## Template Design Framework

### The Three-Layer Template

Every programmatic page needs three layers:

**Layer 1: Fixed structure** — Elements identical across all pages
- Header, navigation, footer
- Page layout and section order
- Schema markup structure
- Internal linking patterns

**Layer 2: Variable data** — Swapped from your database per page
- Product names, features, pricing
- Location data (city, state, population, competitors)
- Category-specific statistics

**Layer 3: Unique value** — What makes each page genuinely different
- Original analysis or comparison
- Specific recommendations for this combination
- Data that doesn't appear on competitor pages
- Opinionated recommendations (not just neutral data)

**The test:** Remove all variable data. Does the remaining content still provide value? If the template only works when data is filled in and every page is a mechanical fill-in-the-blank, Google will eventually discount the entire page set.

### Template Sections by Page Type

**Comparison Page Template**
```
[Product A] vs [Product B] vs [Product C]: [Year] Comparison

[Summary table with key differentiating metrics]

Quick verdict: [Opinionated recommendation — who should use each]

[Detailed section per product — strengths, weaknesses, best use case]

[Feature-by-feature comparison table]

[Pricing comparison]

[Verdict: our recommendation by user type]

[FAQ addressing "which is better for X" questions]
```

**Location Page Template**
```
[Service] in [City, State]

[Local-specific hook — mention something specific to this market]

[Service description relevant to local context]

[Why this market is different from generic — local data]

[What to look for when choosing a provider in this area]

[Pricing ranges in this market]

[FAQ with local-specific questions]

[LocalBusiness schema + local signals]
```

**Best X for Y Template**
```
Best [Product Category] for [Use Case]: [Year]

[Direct recommendation — lead with the answer]

[Why we chose these / methodology]

[#1 pick with detailed justification]
[#2 pick with detailed justification]
[#3 pick with detailed justification]

[Comparison table of all picks]

[What to look for when choosing]

[FAQ]
```

## Data Sources

### Free/Public Data

| Source | What It Provides | Good For |
|--------|----------------|----------|
| US Census Bureau | City/county demographics | Location pages |
| Bureau of Labor Statistics | Industry employment, wages | Market-specific pages |
| Google Places API | Business data, reviews | Local pages |
| ProductHunt | Product launches, categories | Tech comparison pages |
| GitHub | Open source project data | Developer tool pages |
| Wikipedia / Wikidata | Structured entity data | Glossary, entity pages |
| G2, Capterra, Trustpilot | Review data, feature lists | Software comparison |
| Company websites | Pricing, features | Comparison pages |

### Building Your Own Data Asset

The highest-value programmatic SEO is built on proprietary data no competitor has:

- **Original survey**: Survey your audience. "We surveyed 500 [role] about [topic]"
- **Aggregated research**: Collect and analyze data from multiple public sources
- **Tool-generated data**: Build a simple calculator or tool that generates data
- **Customer data** (anonymized): Use patterns from your own customers
- **Manual research at scale**: Research 100 products and publish the database

Original data creates pages that can't be copied. It's the difference between a page that gets cited and one that gets ignored.

## Quality Control System

The #1 failure mode in programmatic SEO is publishing thousands of thin pages. Google devalues entire sites for thin content. One quality check matters above all others:

**The Unique Value Test**: What does this specific page provide that couldn't be found by swapping in different variable data on the same template?

### Quality Checklist Per Page

Before publishing any programmatic page:

- [ ] The page directly answers the query it targets in the first 200 words
- [ ] At least one data point or insight is specific to this combination (not generic)
- [ ] The page makes at least one recommendation or takes a position
- [ ] A human would find this page genuinely useful (not just keyword-stuffed)
- [ ] The page is substantively different from 3 similar pages in your set
- [ ] Every section adds information not found in other sections
- [ ] No section is filler (intro padding, generic conclusions, throat-clearing)
- [ ] Internal links connect to related pages in your set
- [ ] Schema markup is implemented and valid
- [ ] Page is over 400 words with meaningful content (not padded word count)

### Quality Tiers

| Tier | Characteristics | Publishing Decision |
|------|----------------|-------------------|
| Publish | Unique data, genuine recommendation, substantively different from siblings | Publish immediately |
| Review | Generic but accurate, could add more specificity | Add unique element before publishing |
| Hold | Template data only, no differentiation | Don't publish until improved |
| Kill | Same as 20 other pages with different keywords | Delete or consolidate |

## Internal Linking Architecture

Programmatic pages need a linking structure or they won't rank:

**Hub and spoke:**
```
Category hub: "Best Project Management Software"
├── Comparison: "Notion vs Asana"
├── Comparison: "Asana vs Monday"
├── Best for: "Best PM Software for Agencies"
├── Best for: "Best PM Software for Remote Teams"
└── Alternatives: "Alternatives to Jira"
```

Each spoke links back to the hub. The hub links to all spokes. Related spokes cross-link where relevant.

**Location page hierarchy:**
```
/locations/                          ← Master locations page
/locations/california/               ← State hub
/locations/california/los-angeles/   ← City page
/locations/california/san-diego/     ← City page
```

**Rules:**
- Every programmatic page links to at least 3 related pages in the set
- The hub page links to all pages in the set (or uses a paginated index)
- Use descriptive anchor text, not "click here" or generic labels
- Don't create more internal links than the content naturally supports

## Staged Launch Strategy

Never publish 500 pages simultaneously. Google's crawl budget and quality assessment both work better with staged launches.

### Launch Phases

**Phase 1 — Pilot (10-20 pages)**
- Best pages in your set (highest confidence, highest search volume)
- Wait 4-6 weeks and monitor in Search Console
- Check: Are pages being indexed? Any quality warnings in GSC?
- Check: Are you getting impressions/clicks on target queries?

**Phase 2 — Expand (50-100 pages)**
- If Phase 1 shows indexing + impressions: proceed
- If pages aren't indexing: fix quality issues before scaling
- Add internal links from Phase 1 pages to Phase 2 pages

**Phase 3 — Scale (remaining pages)**
- Only after Phase 2 shows clear signals
- Submit sitemap updates after each batch
- Monitor crawl stats in Search Console

**Indexation acceleration:**
- Submit sitemap after each launch batch
- Internal links from high-authority pages to new pages
- Build a few external links to the hub page
- Avoid `noindex` on pages you want discovered

## Common Programmatic SEO Failures

| Failure | Why It Happens | Fix |
|---------|---------------|-----|
| Pages not indexed | Too thin, too similar, or crawl budget consumed by duplicates | Improve quality, reduce page count, fix internal linking |
| Indexed but no rankings | Pages exist but provide no unique value | Add original data or analysis to each page |
| Rankings but no traffic | Targeting zero-volume keywords | Validate search volume before building templates |
| Traffic but no conversions | Content doesn't match commercial intent | Add clear CTAs, match intent more closely |
| Entire site devalued | Too many thin pages dragging down domain | Audit and delete/noindex weak pages |
| Google ignores new pages | Crawl budget wasted on facets/params | Fix technical crawl issues before scaling |

## Red Flags

Signs your programmatic SEO project will fail:

- [ ] Template produces content that reads as obviously auto-generated
- [ ] No differentiation between pages beyond keyword/location insertion
- [ ] Targeting keywords with zero or near-zero search volume
- [ ] No internal linking strategy connecting the page set
- [ ] Publishing hundreds of pages simultaneously (crawl budget issues)
- [ ] Pages that exist for Google but provide no value to humans
- [ ] Thin pages with only variable data swapped and no unique analysis
- [ ] No quality review before publishing — fully automated with no human check
- [ ] Hub page doesn't exist — spoke pages are orphaned
- [ ] Schema markup missing from pages that qualify for rich snippets
- [ ] No tracking to measure if the pages actually drive traffic or conversions

## Output Format

When designing a programmatic SEO strategy:

```
## Programmatic SEO Strategy: [Page Type] for [Site/Niche]

### Opportunity Assessment
- Target query pattern: "[Variable 1] vs [Variable 2]" / "[Service] in [Location]" / etc.
- Estimated pages in set: [Number]
- Estimated total search volume: [Number/month]
- Competitor presence: [Who's doing this and how well]
- Differentiation opportunity: [What you can do that they can't]

### Page Type Selection
- Recommended type: [Comparison/Location/Best-X-for-Y/etc.]
- Rationale: [Why this type fits the opportunity]
- Alternative: [Second-best option if data isn't available]

### Data Requirements
| Data Point | Source | Availability | Notes |
|------------|--------|-------------|-------|
| [Variable 1] | [Source] | [Available/Needs research] | [Note] |
| [Variable 2] | [Source] | [Available/Needs research] | [Note] |
| [Unique data] | [Source] | [Available/Needs research] | [Note] |

### Template Design

**Fixed elements:**
[List elements identical across all pages]

**Variable data:**
[List data points that swap per page]

**Unique value layer:**
[What makes each page genuinely different]

**Template outline:**
[Section-by-section breakdown]

### Quality Controls
- Minimum unique content per page: [Requirement]
- Review process: [Manual review / Automated checks / Sample review]
- Kill threshold: [What triggers deletion instead of publishing]

### Internal Linking Architecture
[Hub and spoke diagram or description]

### Launch Plan
- Phase 1: [X pages, timeline, success metrics]
- Phase 2: [X pages, trigger conditions]
- Phase 3: [X pages, trigger conditions]

### Success Metrics
- Indexation rate target: [%]
- Time to first impressions: [Expected weeks]
- Traffic target at 6 months: [Number]
- Conversion target: [Number or rate]

### Risks and Mitigations
| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| [Risk] | [High/Med/Low] | [How to prevent or respond] |
```

## Chaining to Other Skills

- **On-page optimization for template pages** → Chain to `seo-audit` for element review
- **Schema implementation at scale** → Chain to `seo-technical` for JSON-LD templates
- **AI citability of programmatic pages** → Chain to `geo-optimization` for CITE scoring
- **Competitor's programmatic pages outranking yours** → Chain to `competitor-seo` for gap analysis
