---
name: amped-onboard
description: Use for ANY Amped lead generation task — onboarding new electricians, creating program overview documents, setting up Stripe invoices, managing buyer accounts, or anything AMPED-related. Triggers on "new Amped client", "amped onboard", "onboard electrician", "amped invoice", "amped document", "lead gen program", "new buyer", "new electrician for amped", or any request involving Amped Lead Generation setup. Always load proofpilot-brand skill alongside this one.
---

# Amped Client Onboarding

Automates full client setup for Amped Lead Generation: Stripe billing, branded program overview document, folder structure, email draft, and Slack notification.

## Required Skills

Always load these skills when doing AMPED work:
- **proofpilot-brand** — Brand colors, typography, document styling
- **amped-onboard** — This skill (onboarding workflow)

## Brand System

Uses the **proofpilot-brand** skill for all document styling.

Key brand elements applied to the generated document:
- **Dark Blue (#00184D)**: H1 headings, primary table headers, CTA box background
- **Electric Blue (#0051FF)**: H2 headings, alternating table headers, title prefix
- **Neon Green (#C8FF00)**: CTA headline, "WHAT YOU GET" header
- **Bebas Neue**: All headings (H1 46hp, H2 38hp, H3 32hp, title 78hp, prefix 50hp)
- **Calibri**: Body text (28hp), taglines (30hp italic, Medium Gray), table cells (24hp)
- Header: "AMPED | Lead Gen Program Overview" right-aligned
- Footer: "Page X of Y" centered, Medium Gray

## Inputs

Collect all at once from the user:

| Field | Required | Example |
|-------|----------|---------|
| Company name | Yes | Jake Electric |
| Owner name | Yes | Jake Fornoff |
| Location (city, state) | Yes | Thousand Oaks, CA |
| Service area description | Yes | 13-mile radius around Thousand Oaks |
| Coverage notes | No | Excludes Malibu and surrounding coastal areas |
| Email | Yes | jakeelectric805@gmail.com |
| Phone | Yes | (805) 432-5749 |
| Lead types | Yes | EV Charger, Panel Upgrade |
| Monthly fee ($) | Yes | 650 |

## Workflow

### Step 1: Stripe Invoice

Using Stripe MCP tools OR Stripe CLI (`stripe` command with `--live` flag):

**Important:** The Stripe account is under ProofPilot, but AMPED clients won't know what ProofPilot is. The invoice line item description MUST clearly identify the Amped program and lead type.

1. **Create customer** with owner name and email
2. **Create draft invoice** for customer with `collection_method: send_invoice`, `days_until_due: 3`
3. **Add invoice item** with:
   - Product: `prod_U2Ccqso3HkBnJk` (Amped Lead Generation)
   - Amount: monthly fee in cents (e.g., $650 = 65000)
   - **Description format:** `"Amped [Lead Type] Leads — [Month Year] Budget"`
   - Examples:
     - `"Amped EV Charger Leads — March 2026 Budget"`
     - `"Amped Panel Upgrade Leads — March 2026 Budget"`
     - `"Amped EV Charger + Panel Upgrade Leads — April 2026 Budget"`

**Stripe CLI method (if MCP unavailable):**
```bash
# Create customer
stripe customers create --name="Owner Name" --email="email@example.com" --live

# Create invoice
stripe invoices create --customer="cus_..." --collection-method="send_invoice" --days-until-due=3 --live

# Add line item (amount in cents)
stripe invoiceitems create \
  --customer="cus_..." \
  --invoice="in_..." \
  -d "price_data[unit_amount]=65000" \
  -d "price_data[currency]=usd" \
  -d "price_data[product]=prod_U2Ccqso3HkBnJk" \
  --description="Amped EV Charger Leads — March 2026 Budget" \
  --live
```

**Note:** The restricted live key (`rk_live_...`) may not have customer/invoice permissions. If it fails, create the invoice in the Stripe dashboard or update the key permissions (Developers > API Keys > edit restricted key > enable Write for Customers, Invoices, Invoice Items, Prices).

### Step 2: Generate Program Overview Document

Run the generator script with client config as JSON:

```bash
node ~/.claude/skills/amped-onboard/references/generate-overview.js \
  '{"company":"Jake Electric","owner":"Jake Fornoff","location":"Thousand Oaks, CA","serviceArea":"13-mile radius around Thousand Oaks","coverageNotes":"Excludes Malibu","email":"jakeelectric805@gmail.com","monthlyFee":650}' \
  '/tmp/amped-overview-output.docx'
```

Prerequisite: `npm install docx` in the home directory if not already installed.

### Step 3: File and Folder Setup

1. Copy the generated docx to local:
   ```
   ~/ProofPilot/clients/Amped/{Company Name} - Lead Gen Program Overview.docx
   ```

2. Create Google Drive client folder and Invoices subfolder:
   ```
   ~/Library/CloudStorage/GoogleDrive-matthew@getproofpilot.com/My Drive/Amped Lead Gen/Clients/{Company Name}/
   ~/Library/CloudStorage/GoogleDrive-matthew@getproofpilot.com/My Drive/Amped Lead Gen/Clients/{Company Name}/Invoices/
   ```

3. Copy the generated docx to Google Drive:
   ```
   ~/Library/CloudStorage/GoogleDrive-matthew@getproofpilot.com/My Drive/Amped Lead Gen/Clients/{Company Name}/{Company Name} - Lead Gen Program Overview.docx
   ```

### Step 4: Email Draft

Open a pre-filled compose window with `open "mailto:..."` containing:
- **To:** client email
- **From:** matthew@getproofpilot.com
- **Subject:** `{Company Name} - Lead Gen Program Overview + Next Steps`
- **Body:** Recap of setup (lead type, territory, budget, discount offer), link to Google Doc version of overview, mention invoice is coming via Stripe, portal access info, next steps

### Step 5: Slack Notification

Post to #amped-buyer-leads (C0AGVHV1AA1) with new buyer details. If channel is restricted (Slack Connect), post to #amped-lead-gen (C0ACGKRB272). If both fail, provide copy-paste message for Matthew to post manually.

Message format:
```
*New Buyer: {Company Name}*

- *Owner:* {Name}
- *Territory:* {Location} ({Service Area})
- *Lead Type:* {Lead Types} ($65/lead)
- *Budget:* ${Amount}
- *Email:* {email}
- *Phone:* {phone}

*Status:* Program overview and invoice sent. Last steps: send portal access and get added to LeadByte.
```

### Step 6: Update Memory

Add the new buyer to `~/memory/projects/amped.md` under the Current Buyers table and add a detailed subsection with all their info.

### Step 7: Report

Output a final summary:

| Item | Status |
|------|--------|
| Stripe Customer | cus_... (or manual) |
| Draft Invoice | $X — "Amped [Type] Leads — [Month] Budget" |
| Program Overview | Google Drive path |
| Email Draft | Opened / sent |
| Slack Notification | Posted / copy-paste provided |
| Memory Updated | Yes |
| Remaining | Portal access, LeadByte setup, campaign launch |

## Post-Onboard Checklist

After the skill completes, these items still need manual action:

- [ ] Finalize and send Stripe invoice (if saved as draft)
- [ ] Set up client in Amped portal (Supabase)
- [ ] Add client to LeadByte for lead routing
- [ ] Launch Meta campaign targeting their service area (coordinate with Tones)
- [ ] Verify SMS notifications (check carrier compatibility — T-Mobile doesn't work)
- [ ] Send portal access credentials to client

## Content Rules

- **NEVER use the word "qualified"** when referring to leads. They are "leads", not "qualified leads".
- **Disputes are ONLY valid for:** fake info or duplicate lead. No other reasons.
- **CPL is hardcoded at $65** for both EV charger and panel upgrade leads.
- **Brand:** Uses proofpilot-brand skill. Header says "AMPED", not "PROOFPILOT".
- **Contact email in documents:** matthew@getproofpilot.com
- **Discount offer (mentioned on call, not in doc):** $250 off EV charger, $1,000 off panel upgrade. Electricians can add this to their price or honor it as a true discount.

## Document Structure (matches Pelican Coast template)

1. **Cover**: Title prefix (PREMIUM), main title (LEAD GENERATION PROGRAM), tagline, info table, value prop box
2. **Section 1: Program Overview**: How It Works, Lead Quality Metrics table, pricing table
3. **Section 2: Your Kickoff Plan**: Account Details, Budget Breakdown, ROI Projection, Portal Access
4. **Section 3: Available Lead Types**: EV Charger (starting), Panel Upgrade (available now), Coming Soon items
5. **Section 4: Terms & Conditions**: Lead Delivery & Billing, Territory & Exclusivity, Disputes & Refunds, Commitment & Cancellation
6. **Section 5: Getting Started**: Action steps, CTA box, footer tagline

## Key References

- **Amped platform codebase:** `~/Documents/amped-electric/` (Lovable + React + Supabase)
- **Memory file:** `~/memory/projects/amped.md`
- **Stripe product ID:** `prod_U2Ccqso3HkBnJk`
- **Google Drive:** `Amped Lead Gen/Clients/`
- **Local files:** `~/ProofPilot/clients/Amped/`
- **Slack channels:** #amped-lead-gen (C0ACGKRB272), #amped-buyer-leads (C0AGVHV1AA1), #amped-new-leads (C0AFC562UHM)
