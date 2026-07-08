---
name: proofpilot-sow
description: Use when creating a Statement of Work or service agreement for a ProofPilot client after a deal is closed. Covers website builds, SEO retainers, ads management, lead funnels, and combined packages.
---

# ProofPilot SOW Generator

## Overview

Creates signed-ready SOW documents using docx-js with exact ProofPilot brand styling. The Cedar Gold Group SOW contract is the canonical format — contractual, tight, no marketing fluff.

## Before You Start

Load in order:
1. Read `proofpilot-brand` skill — exact hex codes and Bebas Neue typography
2. Read `references/sow-js-template.js` in this skill — working code base to adapt

## What You Need From the User

**Required:**
- Client name and primary contact
- Industry
- Service(s) purchased and package tier
- Payment option (pay in full / 12-month / 50/50)
- Effective date (default: today)

**Nice to have:** Client email/phone, notes from the proposal/discovery call

Ask for required fields before generating. Fill reasonable defaults for optional fields.

## SOW Types

### Type 1: Website SOW
Starter Site, Growth Site, Territory Site, or Market Leader.
Scope sections: Custom Website Design, Website Pages, Functional Features, SEO Foundation, Blog Setup (if included), Launch & Handoff.
Timeline: 4-6 weeks (standard), 6-8 weeks (large builds), 10-12 weeks (Market Leader).

### Type 2: SEO / Content Retainer SOW
Ongoing monthly retainer with 3-month minimum commitment.
Scope sections vary by tier. Use phased structure (Foundation months → Full Execution).
See Cedar Gold Group Content SOW for the retainer pattern.

### Type 3: Ads + Funnel SOW
Paid advertising management with or without funnel build.
Scope sections: Ads Management, Funnel Design & Build, Ad Spend Tiers, Launch & Optimization.

### Type 4: Combined SOW
Website + SEO, Website + Ads, or full-stack.
Combine relevant scope sections. Single investment table showing all line items.

---

## Pricing Reference

### Website (One-Time)

| Package | List Price | Pay in Full (10% off) | Pages |
|---------|-----------|----------------------|-------|
| Starter Site | $5,000 | $4,500 | 5-7 |
| Growth Site | $8,000 | $7,200 | 10-15 |
| Territory Site | $12,000 | $10,800 | 20-30 |
| Market Leader | $20,000 | $18,000 | 40+ |

### SEO (Monthly Retainer)

| Tier | Monthly |
|------|---------|
| Local Visibility | $1,000/mo |
| Market Growth | $2,000/mo |
| Territory Domination | $3,000/mo |
| Market Leader | $4,000/mo |

### Paid Advertising

| Service | Fee |
|---------|-----|
| Meta Ads (Facebook/Instagram) | $1,500/mo management |
| Google Ads | 15% of ad spend, min $750/mo |
| LSA (Local Service Ads) | $300/mo + ad spend |
| Bundle discount | 10% off management when combining 2+ ad platforms |

### Lead Funnels

| Type | Price |
|------|-------|
| Standard funnel (quiz, qualification, booking) | $3,000+ one-time |
| Complex funnel (custom logic, routing, portals) | $5,000-$10,000 |

### Payment Options

| Option | Upfront | Monthly | Total | Discount |
|--------|---------|---------|-------|---------|
| 12-Month Plan | $0 | Full price / 12 | Full price | None |
| Pay in Full | 100% | None | 10% off | Yes |
| 50/50 Split | 50% | Remainder / 6 | Full price | None |

---

## Document Structure

Every SOW follows this exact structure. Do not add sections or reorder.

### Cover Page
- Title prefix (Electric Blue Bebas Neue 44): service type (e.g. "WEBSITE DESIGN")
- Main title (Dark Blue Bebas Neue 64): "STATEMENT OF WORK & SERVICE AGREEMENT"
- Package name in Medium Gray italic below title
- Two-column CLIENT | PROVIDER block (Dark Blue | Electric Blue headers)
- 4-column key details row: Effective Date | Package | Timeline | Investment
- "WHAT YOU GET" checklist box: Dark Blue bg, Neon Green Bebas Neue title, white checkmarks in a 3-column inner table

### Section 1: Scope of Work
Numbered subsections (1.1, 1.2...). Bullet points only — no explanatory paragraphs.
Each bullet is a deliverable, not a description of ProofPilot's process.

### Section 2: Investment and Payment Terms
Investment table (2 columns: Description | Amount):
- List price row
- Discount row (if applicable)
- TOTAL row: Dark Blue bg, Neon Green Bebas Neue for the amount

Payment schedule table (4 columns: # | Milestone | Due | Amount).
One-line payment note below (accepted methods, when work starts).

### Section 3: Project Timeline
Table: Phase | Timing | Activities. Keep to 4 rows. Activities column is one run-on sentence.

### Section 4: Terms and Conditions
Subsections 4.1-4.10. Use standard language from the Terms section below.

### Section 5: Agreement and Signatures
Two-column sig block: CLIENT (Dark Blue) | PROVIDER (Electric Blue).
Rows: Signature, Printed Name, Title, Date.
Final CTA bar: Dark Blue bg, Neon Green Bebas Neue — "PAYMENT DUE UPON SIGNING  |  $X,XXX.00"
Sub-line in white: "Sign and return to get started. Invoice and kickoff questionnaire follow within one business day."

---

## Standard Terms Language

Use these verbatim. Replace bracketed values.

**4.1 Client Responsibilities** — Client agrees to: provide feedback within 3 business days of receiving deliverables; provide all required content, images, logos, and brand assets within 5 business days of signing; designate a single point of contact; provide access to hosting, domain, and relevant accounts; [for therapists/regulated industries: review all published content for compliance with applicable professional and ethical standards].

**4.2 Provider Responsibilities** — Provider agrees to: deliver all services outlined in the Scope of Work; maintain regular communication and provide progress updates; meet agreed-upon deadlines, barring delays caused by Client.

**4.3 Acceptance Criteria** — Client has 7 business days to review and approve each deliverable. If no response is received within 7 business days, the deliverable will be considered approved. Revision requests must be submitted in writing within this period.

**4.4 Revisions and Changes** — This agreement includes one round of revisions per major project phase. Additional revisions or scope changes require a written change order and will be quoted separately before work begins.

**4.5 Content Delays** — If missing client materials cause the project to stall for more than 30 consecutive days, the project will be placed on hold. Restarting a paused project may incur a $500 restart fee and a revised timeline.

**4.6 Intellectual Property** — Upon final payment, Client owns all custom code, designs, and content created for this project. Provider retains ownership of its proprietary tools, frameworks, and methodologies. Provider retains the right to reference this work in its portfolio unless Client requests otherwise in writing.

**4.7 Confidentiality** — Both parties agree to keep confidential any proprietary information shared during the project, including business strategies, client data, and technical implementations.

**4.8 Limitation of Liability** — Provider's total liability under this agreement shall not exceed the total amount paid by Client. Provider is not liable for any indirect, incidental, or consequential damages. [For website SOWs add: Provider does not guarantee specific search rankings, traffic volumes, or client acquisition outcomes.]

**4.9 Termination** — Either party may terminate this agreement with 14 days written notice. Upon termination: Client pays for all work completed to date; Provider delivers all completed work and assets to Client.

**4.10 Dispute Resolution** — Any disputes will first be addressed through good-faith negotiation. If unresolved, disputes will be settled through binding arbitration.

---

## Generation Workflow

1. Collect required info — ask if anything missing
2. Load `proofpilot-brand` skill for exact colors
3. Copy `references/sow-js-template.js` as starting point
4. Adapt for client-specific scope, pricing, and timeline
5. Save script to `~/sow-temp.js` and run from home directory:
   ```bash
   node ~/sow-temp.js && rm ~/sow-temp.js
   ```
6. Open file to verify:
   ```bash
   open ~/Downloads/[Client-Name]-[Service]-SOW.docx
   ```
7. Copy to Google Drive:
   ```bash
   cp ~/Downloads/[Client-Name]-[Service]-SOW.docx \
     "/Users/matthewanderson/Google Drive/My Drive/Website Clients/[Client (ABV)]/SOW & Contracts/"
   ```
8. Add client to `client_master_list.csv` if not already listed

## File Naming

`[Client-Name]-[Service-Type]-SOW.docx`

Examples:
- `The-Wild-Within-Website-SOW.docx`
- `Cedar-Gold-Group-Content-SOW.docx`
- `All-Thingz-Electric-Meta-Ads-SOW.docx`

## Google Drive Client Folder Structure

```
Website Clients/
  [Client Name (ABV)]/
    SOW & Contracts/
    [service-specific subfolders as needed]
```

Abbreviation convention: `The Wild Within (TWW)`, `Cedar Gold Group (CGG)`, `All Thingz Electric (ATE)`

---

## Pre-Delivery Checklist

- [ ] Pricing matches the reference table above
- [ ] Payment option applied correctly (10% off for pay-in-full)
- [ ] Neon Green on total amount and CTA bar
- [ ] Bebas Neue on all headings, table headers, and CTA
- [ ] "What You Get" box has correct deliverables for this package
- [ ] Timeline matches service type
- [ ] Terms 4.1-4.10 present with standard language
- [ ] File named correctly
- [ ] Copied to correct Google Drive client folder
- [ ] `client_master_list.csv` updated
