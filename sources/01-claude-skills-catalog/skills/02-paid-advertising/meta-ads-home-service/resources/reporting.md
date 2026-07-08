# Reporting Framework for Home Service Meta Ads

Report using the ProofPilot marketing tracking sheet format. Focus on the metrics
that matter (cost per appointment, CAC, ROAS), not vanity metrics (CPL alone).

---

## Monthly Tracking Sheet Columns

Use the same format as ProofPilot's existing marketing tracking sheets:

| Column | Source | Notes |
|--------|--------|-------|
| **Month** | Manual | Reporting period |
| **Channel** | Meta Ads Manager | "Meta Ads" or specific campaign name |
| **Ad Spend** | Ads Manager | Total spend for the period |
| **Leads** | Ads Manager or CRM | Total form/quiz submissions |
| **CPL** | Calculated | Spend / Leads |
| **Appointments Booked** | CRM | Leads that booked a quote/consult |
| **Lead-to-Appointment Rate** | Calculated | Appointments / Leads |
| **Cost Per Appointment** | Calculated | Spend / Appointments |
| **Jobs Closed** | CRM | Appointments that converted to paying customers |
| **Close Rate** | Calculated | Jobs Closed / Appointments |
| **Revenue** | CRM / Invoice | Total revenue from closed jobs |
| **CAC** | Calculated | Spend / Jobs Closed |
| **ROAS** | Calculated | Revenue / Spend |
| **Notes** | Manual | Creative changes, scaling events, issues |

---

## Weekly Check-In Metrics

Quick weekly pulse check (takes 5 minutes in Ads Manager):

| Metric | Where to Find | Action Threshold |
|--------|--------------|-----------------|
| **Spend vs. budget** | Campaign overview | Over/under 10% = investigate |
| **CPL trend** | Campaign > Results column | Rising 20%+ week-over-week = creative fatigue |
| **Top creative** | Ad level > sort by results | Shift budget if top creative changed |
| **Frequency** | Ad set level > Frequency column | Above 3.0 for prospecting = refresh creative |
| **Leads this week** | Campaign > Results | Zero leads for 3+ days = something is broken |

---

## Monthly Client Report Structure

When generating a monthly report for a client:

### Section 1: Performance Summary
```
[CLIENT NAME] — Meta Ads Performance | [MONTH YEAR]

Total Spend:           $X,XXX
Total Leads:           XX
Cost Per Lead:         $XX
Appointments Booked:   XX
Cost Per Appointment:  $XXX
Jobs Closed:           X
Revenue Generated:     $X,XXX
ROAS:                  X.Xx
```

### Section 2: Campaign Breakdown
Table showing each campaign/ad set with individual metrics.

### Section 3: Top Performing Creatives
Which 2-3 creatives got the most spend and lowest CPL. Include screenshots if possible.

### Section 4: What We Did This Month
- Creatives launched
- Creatives paused
- Budget changes
- Targeting changes

### Section 5: Recommendations for Next Month
- Creative refresh needs
- Budget scaling opportunity (or not)
- New angles to test
- Funnel improvements

---

## ROAS Calculation Framework

### The Full Math (Present This to Clients)

```
Monthly Ad Spend:         $1,500
Leads Generated:          60
Cost Per Lead:            $25
Appointments Booked:      12 (20% lead-to-book rate)
Cost Per Appointment:     $125
Jobs Closed:              3 (25% close rate)
Average Ticket:           $3,000
Total Revenue:            $9,000
Customer Acquisition Cost: $500
ROAS:                     6.0x

For every $1 you gave Meta, you got $6 back.
```

### ROAS Benchmarks

| ROAS | Assessment | Action |
|------|-----------|--------|
| < 1x | Losing money | Investigate: creative, targeting, or back-end issue |
| 1-2x | Breaking even | Optimize creative, check automation |
| 2-3x | Decent | Continue, test new creatives |
| 3-5x | Strong | Scale budget by $50/day increments |
| 5-8x | Excellent | Aggressive scaling, add new campaigns |
| 8x+ | Exceptional | Expand to new service areas, add services |

### Important: Account for Sales Cycle Length

For long-close industries (remodeling, roofing, permanent lighting):
- Month 1 ROAS will look terrible — pipeline is filling
- Month 2-3 ROAS will improve dramatically as deals close
- Always report on a rolling 60-90 day basis for long-close industries
- Frame expectations during onboarding: "We invest month 1, harvest months 2-3"

---

## Recurring Revenue Adjustment

For subscription services (pest control, pool service, lawn care):

```
Monthly subscription:     $70/month
Average retention:        18 months
Customer LTV:             $1,260

CAC from Meta:            $200
LTV:CAC ratio:            6.3x

Even though month-1 ROAS looks like 0.35x ($70 / $200),
the true return is 6.3x over the customer lifetime.
```

Always present LTV:CAC for recurring revenue businesses, not just month-1 ROAS.

---

## Dashboard Setup

Use Agency Analytics or the client's existing dashboard platform to show:

1. **Meta Ads** — spend, leads, CPL, impressions, reach
2. **Google Ads** (if running) — spend, leads, CPL, calls
3. **SEO / Organic** — traffic, leads, rankings (if ProofPilot manages SEO too)
4. **All channels combined** — total leads, total spend, blended CPL

This gives the client a single view of all marketing performance, not just Meta in isolation.
