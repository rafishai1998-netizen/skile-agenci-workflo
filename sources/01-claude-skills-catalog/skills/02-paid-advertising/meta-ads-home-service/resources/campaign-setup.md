# Campaign Setup Checklist for Home Service Meta Ads

Step-by-step Ads Manager setup. Follow every setting exactly.

---

## Campaign Level

| Setting | Value | Why |
|---------|-------|-----|
| Campaign objective | **Leads** | Optimizes for form submissions, not clicks |
| Budget type | **Campaign Budget Optimization (CBO)** | Algorithm distributes to winning ads |
| Starting budget | **$40-50/day minimum** | Below this, algorithm can't optimize |
| Special ad category | **None** (unless housing/credit/employment) | Home services are NOT a special category |

---

## Ad Set Level

| Setting | Value | Why |
|---------|-------|-----|
| Conversion event | **Lead form submissions** | NOT messaging, NOT calls, NOT website |
| Location | **Specific city/neighborhood** | Start narrow, expand as you scale |
| Location type | **People living in this location** | NOT "recently in" — that includes tourists |
| Radius | **Shrink from default 25mi** | Match client's actual service area |
| "Reach more people" | **UNCHECK** | Prevents leads from outside service area |
| Detailed targeting | **Leave blank (broad)** | Creative finds the audience, not interests |
| Age | **25-65** (adjust to client) | Optional minimum if service never serves young |
| Language | **Leave default** | Creative language self-selects audience |
| Placements | **Advantage+ (automatic)** | Let Meta optimize placement for first campaigns |
| Multi-advertiser ads | **Turn OFF** | Don't show your ad next to competitors |
| Campaign score | **Ignore completely** | Meaningless metric |

### When to Use Interest Targeting

Interest targeting is generally unnecessary, but can help in specific cases:

**Use broad targeting for:** Panel upgrades, general electrical, plumbing, HVAC, roofing
**Consider interest targeting for:** EV charger installs (target Tesla/EV owners), solar, smart home

If using interests, keep the stack simple:
- Behaviors > Purchase behavior > Engaged Shoppers
- Relevant vehicle/home interests (see client-specific targeting)
- Do NOT layer more than 3-4 interests

---

## Ad Level

| Setting | Value | Why |
|---------|-------|-----|
| Ad format | **Single video or single image** | Not carousel, not collection |
| CTA button | **"Get Quote"** | Outperforms Book Now, Learn More, Get in Touch |
| Enhancements | **Turn ALL OFF** | Every enhancement checkbox — OFF |
| Primary text | See [ad-copy-templates.md](ad-copy-templates.md) | Include offer if not in video |
| Headline | Bold service description | e.g., "Licensed Electricians Serving [City]" |
| Description | Optional trust line | e.g., "500+ 5-Star Reviews" |

---

## Lead Form Setup

### Form Type
**More Volume** (standard). Use "Higher Intent" only if CPL is very low but lead quality is trash.

### Intro Section
- **Headline:** "[SERVICE] for [CITY] Homeowners"
- **Image:** Best completed job photo
- **Body (bullet points):**
  - What's included in the offer
  - 1-2 trust points (licensed, X reviews)
  - Urgency line (limited spots, this month only)

### Required Fields
| Field | Required? | Notes |
|-------|-----------|-------|
| Email | Yes | Auto-filled on mobile |
| First Name | Yes | Auto-filled |
| Last Name | Yes | Auto-filled |
| Phone Number | Yes | Critical for follow-up |
| City | Yes | Confirms service area |
| Street Address | **NO** | Dramatically increases CPL |

### Friction Question (High-Ticket Only, $1,000+)

Add ONE qualifying question for high-ticket services:

```
Question: "Are you aware that our minimum pricing for [SERVICE]
starts at $[AMOUNT], but varies on a case-by-case basis?"

Options:
- "Yes, I understand"
- "No"
```

This increases CPL but dramatically improves lead quality. The pixel learns
to find higher-quality prospects.

### Thank You Screen

| Element | Value |
|---------|-------|
| Headline | "Thanks, you're all set!" |
| Description | "We'll reach out within [timeframe] to schedule your [service]" |
| Bonus CTA | "Call now for an additional $[X] off — mention this ad" |
| Button | Click-to-call with business phone number |
| Website link | Optional — link to reviews page or portfolio |

---

## Pixel & Tracking Setup

### Required Events
| Event | Fires On | Purpose |
|-------|----------|---------|
| PageView | All pages | Base tracking |
| Lead | Form submission | Primary conversion event |

### For Quiz Funnels (External Landing Pages)
| Event | Fires On | Purpose |
|-------|----------|---------|
| PageView | Quiz landing page | Base tracking |
| InitiateCheckout | Quiz start (first question) | Engagement signal |
| Lead | Form submission (contact info) | Primary conversion |
| CompleteRegistration | Offer reveal page | Full funnel completion |

### UTM Parameters
```
utm_source=facebook
utm_medium=paid
utm_campaign=[campaign-name]
utm_content=[ad-name]
utm_term=[ad-id]  (for ad-level tracking)
```

### Pixel Troubleshooting
- Test with Facebook Pixel Helper Chrome extension
- Verify events in Events Manager > Test Events
- Check for duplicate events (common with tag managers)
- Apple autofill on mobile can cause form issues — test on iPhone
- Allow 24-48 hours for pixel data to populate in Ads Manager

---

## Pre-Launch Checklist

Before turning on the campaign:

- [ ] CBO enabled at campaign level
- [ ] Location set to "people living in" (not "recently in")
- [ ] "Reach more people" unchecked
- [ ] Multi-advertiser ads OFF
- [ ] All enhancements OFF at ad level
- [ ] CTA set to "Get Quote"
- [ ] Lead form tested on mobile (submit a test lead)
- [ ] Automation connected (auto-text fires on submission)
- [ ] Pixel firing correctly (check Events Manager)
- [ ] Privacy policy URL on lead form
- [ ] At least 4 creatives loaded (mix of video + static)
- [ ] Ad copy reviewed for typos and offer accuracy
- [ ] Client notified that ads are going live
- [ ] Client's phone is on and someone is answering

---

## Scaling Checklist (After Launch)

| Timeframe | Action |
|-----------|--------|
| Day 1-3 | Monitor. Do NOT touch anything. Let algorithm learn. |
| Day 3-7 | Check CPL by creative. Note which are getting spend. |
| Week 2 | If profitable, consider bumping budget by $25-50/day |
| Week 3-4 | Review full metrics: CPL, cost per appointment, ROAS |
| Month 2 | Scale by $50/day increments if profitable for 2+ weeks |
| Month 2+ | Add new creatives to combat fatigue at higher spend |
| $300+/day | Need to refresh creatives regularly (every 2-3 weeks) |

### Scaling Rules
1. **Never more than double budget at once** — algorithm resets learning
2. **Scale in $50/day increments** every 2 weeks
3. **Creative fatigue is the constraint** at high spend, not budget
4. **Add creatives before scaling** — more fuel for the algorithm
5. **If ROAS drops after scaling**, add new creatives before cutting budget
