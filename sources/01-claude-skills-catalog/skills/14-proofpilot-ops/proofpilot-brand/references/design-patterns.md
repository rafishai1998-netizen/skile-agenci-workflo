# ProofPilot Design Patterns

## Document Structure

### Standard Document Flow

1. **Cover Section**
   - Title prefix (Electric Blue, Bebas Neue, 22pt)
   - Main title (Dark Blue, Bebas Neue, 36pt)
   - Subtitle/tagline (Medium Gray, Calibri Italic, 12pt)
   - Company info table (optional)

2. **Value Proposition Box**
   - Dark Blue background
   - Neon Green headline
   - White bullet points with checkmarks
   - Full width table layout

3. **Section Overview**
   - 4-column pillar boxes (alternating Dark Blue/Electric Blue)
   - Scoring guide explanation
   - Visual introduction to methodology

4. **Content Sections**
   - Page break before each section
   - Heading 1 for section title
   - Italic tagline describing section purpose
   - Body paragraph explanation
   - Rating/checklist tables

5. **Final Scorecard**
   - Score summary table
   - Key findings with colored headings
   - Numbered blank lines for notes

6. **CTA Section**
   - "What Happens Next" explanation
   - Dark Blue CTA box with Neon Green headline
   - Company footer with contact info

## Table Column Widths (DXA)

Total content width for US Letter with 1" margins: 9400 DXA

| Layout | Widths | Total | Use Case |
|--------|--------|-------|----------|
| 4-col rating | 2600, 3200, 1000, 2600 | 9400 | Audit scoring |
| 3-col checklist | 5000, 1200, 3200 | 9400 | Y/N with notes |
| 2-col score | 6000, 3400 | 9400 | Final scorecard |
| 4-col equal | 2350, 2350, 2350, 2350 | 9400 | Pillar boxes |
| 5-col keyword | 2200, 1400, 1400, 1800, 2600 | 9400 | Keyword analysis |
| Full width | 9400 | 9400 | CTA boxes |

## Section Header Color Alternation

| Odd Sections | Even Sections |
|--------------|---------------|
| Dark Blue (#00184D) | Electric Blue (#0051FF) |
| Sections 1, 3, 5, 7 | Sections 2, 4, 6, 8 |

## Typography Hierarchy

### Display Elements
- Document title: Bebas Neue, 36pt, Bold, Dark Blue, Centered
- Section heading: Bebas Neue, 20pt, Bold, Dark Blue, Left
- Subsection: Bebas Neue, 16pt, Bold, Electric Blue, Left

### Body Elements
- Body text: Calibri, 11pt, Regular, Black
- Table cells: Calibri, 10pt, Regular, Black or Medium Gray
- Taglines: Calibri, 12pt, Italic, Medium Gray
- Small text: Calibri, 9pt, Regular, Medium Gray

### Special Elements
- Score displays: Bold, Neon Green on Dark/Electric Blue bg
- CTA headlines: Bebas Neue, 18pt, Bold, Neon Green on Dark Blue bg

## Spacing Guidelines

### Paragraph Spacing (twentieths of a point)

| Element | Before | After |
|---------|--------|-------|
| Title | 0-400 | 100 |
| Heading 1 | 350 | 150 |
| Heading 2 | 250 | 120 |
| Heading 3 | 180 | 80 |
| Body paragraph | 0 | 100-150 |
| Table cell | 80 | 80 |
| CTA content | 150-200 | 150-200 |

### Page Margins
- All margins: 1 inch (1440 DXA)
- Content width: 6.5 inches (9400 DXA)

## Key Findings Section

### Color Assignments
- "What's Working Well" → Green (#28A745)
- "Critical Issues to Fix" → Red (#DC3545)
- "Quick Wins" → Electric Blue (#0051FF)
- "Pages You Need" → Dark Blue (#00184D)

### Format
```
HEADING (Colored per above)
Body text in black explaining the finding.
```

## Checklist Patterns

### Y/N Format
| Element | Y/N | Notes |
|---------|-----|-------|
| Item description | Y | Explanation |

### Rating Format
| Element | Details | Score | Notes |
|---------|---------|-------|-------|
| Item name | Description | X | Recommendation |

### Scoring Guidelines
- Always display as "X/10" or "X/40"
- Score text: Neon Green (#C8FF00), Bold
- Score cell background: Same as header color
- Total score row: Bebas Neue, larger font

## Placeholder Patterns

### Screenshot Placeholder
- Light Gray (#F4F4F4) background
- "[INSERT SCREENSHOT HERE]" centered
- Medium Gray text, 12pt
- Large vertical padding (2000 DXA)

### Form Field Placeholder
- Light Gray background
- Label in left cell
- Empty value cell for user input

## CTA Box Construction

1. Full-width table (9400 DXA)
2. Dark Blue fill
3. Neon Green headline (Bebas Neue, 18pt, Bold, Centered)
4. White body text (Calibri, 11pt, Centered)
5. Generous padding (200 before/after)

## Common Mistakes to Avoid

1. Using Arial instead of Bebas Neue for headings
2. Using generic blue (#0000FF) instead of Electric Blue (#0051FF)
3. Forgetting to alternate table header colors
4. Making score text white instead of Neon Green
5. Using different spacing values than specified
6. Skipping header/footer setup
7. Using em dashes in body text
8. Inconsistent section numbering
