---
name: proofpilot-pnl
description: Generate monthly P&L statements for ProofPilot, a digital marketing agency. Use when asked to create P&L, profit and loss, financial statements, monthly financials, or revenue/expense analysis for ProofPilot. Handles bank transaction reconciliation, Upwork freelancer cost breakdown, Stripe income, white label revenue, and tax reserve calculations.
---

# ProofPilot Monthly P&L Generator

Generate bank-reconciled P&L statements for ProofPilot LLC, a digital marketing agency specializing in SEO and lead generation for home service businesses.

## Company Context

- **Business**: SEO, Meta ads, funnels, and lead generation for home service businesses (primarily electrical contractors)
- **Model**: Owner + overseas contractors (Philippines-based)
- **Started**: August 2025
- **Owner**: Matthew Anderson
- **Location**: Phoenix, Arizona (2.5% state tax)

## Data Sources Required

1. **Bank Transactions CSV** (Mercury) - All monthly transactions
2. **Upwork Payment Report CSV** - Freelancer payment breakdown
3. **Stripe Deposits** - Client payments (extract from bank CSV)
4. **White Label Info** - Gross amount, agency cut (20%), Jo Paula cost

## Revenue Structure

| Category | Description |
|----------|-------------|
| SEO Retainers | Monthly recurring SEO services |
| Ads Management | Meta/Google ads management fees |
| Funnels | Funnel building services |
| Consulting | Strategy sessions (rare) |
| White Label Net | Gross - 20% agency cut - Jo Paula |

### White Label Clients
- Integrated Sports & Spine
- Trading Academy
- Agency takes 20% cut
- Jo Paula paid directly by agency (deduct from gross for net)

## Team & Payment Methods

See `references/team.md` for current team roster and payment identification patterns.

## Software & Expense Categories

See `references/expenses.md` for vendor categorization and exclusion rules.

## Tax Calculation

Calculate 29.8% of EBITDA:
- Self-Employment Tax: 15.3%
- Federal Income Tax: 12%
- Arizona State Tax: 2.5%

## Workflow

1. Load bank transactions CSV, filter for target month, Status = "Sent" only
2. Extract Stripe income (search "STRIPE" in Description)
3. Get white label info: gross, Jo Paula amount, calculate net (Gross - 20% - Jo Paula)
4. Calculate COGS from Upwork PDFs/CSV + PayPal + Legiit + Jo Paula
5. Categorize software expenses by vendor
6. Identify other OpEx (PR, marketing, cashback)
7. Calculate owner pay (SoFi transfers, confirm timing)
8. Generate spreadsheet using `scripts/generate_pnl.py`

## P&L Structure

See `references/template.md` for full P&L line item structure.

## Output

Save to `/mnt/user-data/outputs/proofpilot_pnl_[month]_[year].xlsx`

Include columns: Category, Current Month, Prior Month, Change, % of Revenue, Notes
