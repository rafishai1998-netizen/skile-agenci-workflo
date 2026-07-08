# Quiz Funnel Specification for Home Service Ads

Quiz funnels dramatically outperform Meta lead forms for high-ticket services.
ProofPilot data: $3-6 CPL on quiz funnels vs $42+ on standard lead forms.

Use quiz funnels when average ticket is $1,000+.
Use Meta lead forms when average ticket is under $500.

---

## When to Use a Quiz Funnel

| Scenario | Use Quiz Funnel | Use Meta Lead Form |
|----------|----------------|-------------------|
| EV charger install ($1,500-$5,000) | Yes | No |
| Panel upgrade ($2,000-$8,000) | Yes | No |
| Bathroom remodel ($10,000-$50,000) | Yes | No |
| Roofing ($5,000-$25,000) | Yes | No |
| Window cleaning ($100-$500) | No | Yes |
| Pest control ($50-$200/mo) | No | Yes |
| Junk removal ($200-$800) | No | Yes |
| General electrical service ($200-$1,000) | Maybe | Maybe |

---

## Quiz Funnel Architecture

### Flow
```
[Meta Ad] → Click CTA
    ↓
[Quiz Landing Page] — 60-second completion
    ↓
[9-10 qualifying questions]
    ↓
[Tiered Offer Reveal based on answers]
    ↓
[Contact Info Form]
    ↓
[Thank You / Offer Page]
    ↓
[Instant automation fires]
```

### Question Design (EV Charger Example)

| # | Question | Purpose |
|---|----------|---------|
| 1 | What type of EV do you have? (Tesla, Ford, Rivian, BMW, Chevy, Other) | Engagement, shows specialization |
| 2 | Where will the charger be installed? (Garage, Driveway, Carport) | Qualification, affects price |
| 3 | What type of home? (Single family, Condo, Apartment, Townhome) | Qualification |
| 4 | How far is your electrical panel from the install location? (Same wall, 10ft, 25ft, 50ft+) | Price factor |
| 5 | What size is your current electrical panel? (100 amp, 150 amp, 200+, Not sure) | Key qualifier — panel upgrade needed? |
| 6 | How old is your home? (0-10, 11-20, 21-30, 30+) | Panel age indicator |
| 7 | Any electrical issues? (None, Flickering, Tripping, Buzzing, Burning smell) | Upsell indicator |
| 8 | When do you want installation? (ASAP, 1-2 weeks, 1 month, Just researching) | Intent signal |
| 9 | What's your ZIP code? | Service area filter |
| 10 | Contact info (Name, Phone, Email, Preferred contact method) | Lead capture |

### Tiered Offer Logic

Based on quiz answers, reveal a different offer:

**Offer A: $1,000 Off** (triggers if ANY of these are true)
- Panel is 100 amp or less
- Home is 20+ years old
- Reports electrical issues (flickering, tripping, buzzing, burning smell)
- Reason: These customers need a panel upgrade + EV charger = higher ticket

**Offer B: $250 Off** (triggers if ALL of these are true)
- In service area
- Single family home
- Modern panel (150+ amps)
- No electrical issues
- Home under 20 years old
- Reason: Simple EV charger install, lower ticket

**Offer C: Waitlist** (triggers if)
- ZIP code outside service area
- Reason: Don't waste sales team time, collect info for future expansion

---

## Landing Page Trust Elements

Every quiz funnel landing page needs:

1. **Stats bar at top:** "100% Licensed & Insured" | "500+ Installed" | "5-Star Rating" | "5yr Warranty"
2. **Auto-scrolling logo carousel:** EV brand logos (Tesla, Ford, Rivian, BMW, etc.)
3. **Customer testimonials:** Pull from Google reviews
4. **Installation photo gallery:** Real completed jobs
5. **Social proof notifications:** Pop-up every 35-55 seconds (max 8 per session)
   - "John from [City] just requested a quote 3 minutes ago"
6. **Progress bar:** Shows quiz completion percentage

---

## Pixel Events for Quiz Funnels

| Event | Fires On | Purpose |
|-------|----------|---------|
| PageView | Quiz landing page load | Base tracking |
| InitiateCheckout | First question answered | Engagement signal |
| Lead | Contact info submitted | Primary conversion |
| CompleteRegistration | Offer reveal page | Full funnel completion |

### UTM Parameters
```
utm_source=facebook (or instagram)
utm_medium=paid
utm_campaign=[campaign-name]
utm_content=[ad-name]
utm_term=[ad-id]
```

---

## Automation on Submit

When a quiz lead submits:

1. **Instant auto-text** (within 60 seconds)
   - "Hi [Name], thanks for requesting your EV charger quote from [Company]! We'll call you within [timeframe] to schedule your free consultation."

2. **Email notification** to sales team with full quiz answers

3. **CRM entry** with:
   - Lead source: Facebook/Instagram
   - Quiz answers (panel size, home age, etc.)
   - Offer tier revealed (A, B, or C)
   - UTM data for ad-level attribution

4. **5-text follow-up sequence** if no response within 2 hours

5. **Data logged** to tracking sheet via Zapier/webhook

---

## Quiz Funnel Build Tools

| Tool | Use | Cost |
|------|-----|------|
| GoHighLevel | Full funnel builder + CRM + automation | Client's existing subscription |
| Typeform | Quiz builder (alternative) | $25-50/mo |
| Involve.me | Quiz builder with branching logic | $29-79/mo |
| Custom build | Full control, hosted on client subdomain | Dev time |

ProofPilot's preferred approach: Build in GoHighLevel or on a custom subdomain
(e.g., offers.clientdomain.com) for full control and branding.
