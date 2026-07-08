---
name: proofpilot-brand
description: ProofPilot brand styling for documents and spreadsheets. Applies exact brand colors, typography, and formatting to Word documents (.docx) and Excel spreadsheets (.xlsx). Use when creating ProofPilot client deliverables including SEO audits, website blueprints, proposals, reports, strategy documents, scorecards, or any professional document for ProofPilot clients. Triggers on keywords like "ProofPilot document", "client report", "audit", "blueprint", "proposal", "branded document", or any request to create professional deliverables.
---

# ProofPilot Brand Styling

Apply ProofPilot's exact brand identity to all documents and spreadsheets.

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Electric Blue | #0051FF | Heading 2, alternating table headers, secondary elements |
| Dark Blue | #00184D | Heading 1, primary table headers, CTA boxes, score rows |
| Neon Green | #C8FF00 | Score highlights, CTA headlines, value prop text |
| Black | #000000 | Heading 3, body text |
| Light Gray | #F4F4F4 | Placeholder backgrounds, form label cells |
| Medium Gray | #666666 | Secondary text, descriptions, taglines |
| White | #FFFFFF | Text on colored backgrounds |
| Red | #DC3545 | Warning headers, critical issues |
| Green | #28A745 | Success headers, positive findings |

## Typography

| Element | Font | Size (half-pts) | Weight | Color |
|---------|------|-----------------|--------|-------|
| Document Title | Bebas Neue | 72 | Bold | Dark Blue |
| Title Prefix | Bebas Neue | 44 | Bold | Electric Blue |
| Heading 1 | Bebas Neue | 40 | Bold | Dark Blue |
| Heading 2 | Bebas Neue | 32 | Bold | Electric Blue |
| Heading 3 | Bebas Neue | 26 | Bold | Black |
| Body Text | Calibri | 22 | Regular | Black |
| Table Cell | Calibri | 20 | Regular | Medium Gray |
| Taglines | Calibri | 24 | Italic | Medium Gray |
| Small Text | Calibri | 18 | Regular | Medium Gray |

## Document Creation Workflow

### Step 1: Read the Boilerplate
Load `references/docx-boilerplate.js` to get the complete document setup with all styles pre-configured.

### Step 2: Apply Document Structure
1. Cover section with title prefix (Electric Blue) and main title (Dark Blue)
2. Value prop box (Dark Blue background, Neon Green headline)
3. Section overview with alternating colored boxes
4. Content sections with page breaks
5. Final scorecard and CTA

### Step 3: Follow Table Patterns
- Alternate header colors between sections: Odd = Dark Blue, Even = Electric Blue
- Score text ("/10", "/40") is always Neon Green, bold
- Cell padding: 80 before/after
- Use `createHeaderRow()` helper for all table headers

### Step 4: Header/Footer
- Header: "PROOFPILOT | [Document Title]" right-aligned
- Footer: "Page X of Y" centered, Medium Gray

## Spreadsheet Creation

### Color Application
```python
from openpyxl.styles import Font, PatternFill, Alignment

# Brand colors (no # prefix for openpyxl)
ELECTRIC_BLUE = "0051FF"
DARK_BLUE = "00184D"
NEON_GREEN = "C8FF00"
MEDIUM_GRAY = "666666"

# Header row styling
header_fill = PatternFill("solid", fgColor=DARK_BLUE)
header_font = Font(bold=True, color="FFFFFF", name="Calibri", size=11)

# Score cell styling
score_font = Font(bold=True, color=NEON_GREEN, name="Calibri", size=12)
```

### Spreadsheet Structure
- Row 1: Title row with Dark Blue background, white text
- Row 2: Column headers with Electric Blue background
- Alternating row colors for data sections
- Score columns use Neon Green text on Dark Blue background

## Key Findings Colors

| Section | Header Color |
|---------|--------------|
| What's Working Well | Green (#28A745) |
| Critical Issues | Red (#DC3545) |
| Quick Wins | Electric Blue (#0051FF) |
| Pages You Need | Dark Blue (#00184D) |

## Pre-Output Checklist

Before presenting any ProofPilot document:
- Colors use exact hex codes from Brand Colors table
- Headings use Bebas Neue font
- Body text uses Calibri font
- Table headers alternate Dark Blue/Electric Blue by section
- Score text is Neon Green and bold
- CTA boxes have Dark Blue background, Neon Green headline
- Header shows "PROOFPILOT | [Document Title]"
- Footer shows "Page X of Y" centered

## Brand Voice

- Direct, confident language
- Active voice
- Short, impactful sentences
- Address reader as "you" and "your"
- No em dashes or semicolons
- Data-driven claims when possible

## File Naming

`[Document-Type]-[Topic].docx`

Examples:
- `40-Point-Website-SEO-Audit.docx`
- `Ultimate-Home-Service-Website-Blueprint.docx`
- `Local-SEO-Strategy-Proposal.docx`
