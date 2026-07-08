---
name: seo-strategy-spreadsheet
description: Create comprehensive SEO strategy spreadsheets for local service businesses. Use when creating client SEO strategies, keyword roadmaps, content plans, competitor audits, GBP strategies, or backlink plans. Triggers on requests for SEO strategy documents, keyword databases, page roadmaps, blog calendars, competitor analysis, Google Business Profile strategies, link building plans, or authority asset planning. Creates professionally styled .xlsx files with 14 tabs covering all aspects of local SEO strategy.
---

# SEO Strategy Spreadsheet

Creates comprehensive, multi-tab SEO strategy spreadsheets for local service businesses.

## Required Client Information

Before creating, gather:
1. Client name and business type (e.g., "All Thingz Electric", electrician)
2. Primary service area (city/region, e.g., "Orange County, CA")
3. Main services offered (3-10 services)
4. Website URL (if existing)
5. Top 3-5 competitors (names and URLs)

## Spreadsheet Structure

Create 14 sheets in this exact order:

| # | Sheet | Purpose |
|---|-------|---------|
| 1 | Client Info | Business details, accounts, logins |
| 2 | Goals & Benchmarks | Baseline metrics, targets, KPIs |
| 3 | Buyer Personas | 3-5 customer profiles |
| 4 | Keyword Database | Keywords with Vol, KD, Intent |
| 5 | Page Roadmap | Service/location pages to build |
| 6 | Blog Roadmap | Blog topics and calendar |
| 7 | Competitor Audit | Competitor analysis |
| 8 | GBP Strategy | Google Business Profile plan |
| 9 | Backlinks & Authority | Link building strategy |
| 10 | Authority Assets | Tools, calculators, downloads |
| 11 | AI Search Strategy | AI/LLM optimization |
| 12 | Quarterly Review | Progress tracking template |
| 13 | 6-Month Audit | Audit checklist |
| 14 | Page Audit Checklist | Individual page audits |

## Color Scheme

```python
COLORS = {
    'navy': '00184D',      # Primary headers, title bars, pillar headers, main service rows
    'blue': '0051FF',      # Secondary headers, column headers, TOF funnel
    'amber': 'FFC107',     # MOF funnel (consideration stage)
    'lime': 'C8FF00',      # Accent, MEDIUM priority, PLANNED/WRITING status
    'green': '28A745',     # HIGH priority, LIVE status
    'red': 'DC3545',       # NEEDED status, BOF funnel, warnings
    'gray': 'F4F4F4',      # Alternating row backgrounds
    'white': 'FFFFFF',     # Default background
    'dark_gray': '666666', # Subtitles, helper text, LOW priority
}
```

## Funnel Stage Colors

```python
FUNNEL_COLORS = {
    'TOF': {'fill': '0051FF', 'font': 'FFFFFF'},   # Blue - Awareness
    'MOF': {'fill': 'FFC107', 'font': '000000'},   # Amber - Consideration
    'BOF': {'fill': 'DC3545', 'font': 'FFFFFF'},   # Red - Decision/Ready to Buy
}
```

## Sheet Layout Pattern

Each sheet follows this structure:
1. **Title row** (Row 1): Navy background, white bold 20pt text, merge across columns
2. **Subtitle row** (Row 2): Italic gray 10pt text describing section
3. **Blank separator** (Row 3)
4. **Section header** (Row 4+): Navy background, white bold text, merge across columns
5. **Helper text** (optional): Italic gray describing the section
6. **Column headers**: Blue background (#0051FF), white bold 10pt, center aligned
7. **Data rows**: Alternating white/gray (#F4F4F4) backgrounds

## Priority/Status Cell Styling

| Value | Background | Text Color |
|-------|------------|------------|
| HIGH | #28A745 (green) | White, bold |
| MEDIUM | #C8FF00 (lime) | Black, bold |
| LOW | #666666 (gray) | White, bold |
| LIVE | #28A745 (green) | White, bold |
| NEEDED | #DC3545 (red) | White, bold |
| PLANNED/WRITING/AUDIT | #C8FF00 (lime) | Black, bold |

## Page Roadmap Special Formatting

### KEY Row (Row 2)
After the title, add a KEY row showing funnel legend and page counts:
- Merged cells for legend labels
- Color-coded funnel badges: TOF (Blue), MOF (Amber), BOF (Red)
- Status badges: LIVE (Green), NEEDED (Red)
- Right side: LIVE count, NEEDED count, TOTAL count with colored backgrounds

### Hierarchical Structure
- **Main Service rows**: Navy background, white bold, ALL CAPS
- **Sub-Service rows**: White/gray alternating, prefix with "→ " arrow
- **Section headers**: Navy background, white bold, merged across all columns
  - Examples: "SERVICE PAGES - MAIN SERVICES & SUB SERVICES"
  - "COMMERCIAL ELECTRICAL SERVICES"
  - "EMERGENCY ELECTRICAL SERVICES"
  - "LOCATION PAGES - [X] Cities - [Y] Mile Radius"
  - "NEIGHBORHOOD SUBPAGES - Top [X] Cities"

### Location Pages Pattern
List all cities in service area, then group neighborhood subpages by city.

## Blog Roadmap Special Formatting

### KEY Row (Row 2)
Same structure as Page Roadmap with funnel legend and post counts.

### Pillar-Based Organization
- **PILLAR rows**: Navy background, white bold, "PILLAR: [TOPIC]" format, merged across columns
- **Supporting posts**: White/gray alternating rows beneath each pillar
- Group related content under topical pillars (e.g., PILLAR: ELECTRICAL PANELS, PILLAR: EV CHARGERS)

### Content Pillars for Service Businesses
Create 6-10 pillars based on main services:
1. Each main service = 1 pillar
2. Add pillars for: Safety/Code, Local Content, Seasonal topics
3. 5-15 supporting posts per pillar

## Implementation Code

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Color fills
navy_fill = PatternFill('solid', fgColor='00184D')
blue_fill = PatternFill('solid', fgColor='0051FF')
amber_fill = PatternFill('solid', fgColor='FFC107')
gray_fill = PatternFill('solid', fgColor='F4F4F4')
green_fill = PatternFill('solid', fgColor='28A745')
lime_fill = PatternFill('solid', fgColor='C8FF00')
red_fill = PatternFill('solid', fgColor='DC3545')

# Fonts
title_font = Font(bold=True, color='FFFFFF', size=20)
header_font = Font(bold=True, color='FFFFFF', size=10)
subtitle_font = Font(italic=True, color='666666', size=10)
body_font = Font(color='000000', size=10)
bold_white = Font(bold=True, color='FFFFFF', size=10)
bold_black = Font(bold=True, color='000000', size=10)

# Alignments
center = Alignment(horizontal='center', vertical='center', wrap_text=True)
left = Alignment(horizontal='left', vertical='center', wrap_text=True)
white_fill = PatternFill('solid', fgColor='FFFFFF')
low_fill = PatternFill('solid', fgColor='666666')

# Border
thin_border = Border(
    bottom=Side(style='thin', color='CCCCCC'),
    right=Side(style='thin', color='CCCCCC')
)

# Helper functions
def style_status_cell(cell, value):
    """Apply color styling based on status/priority value."""
    status_styles = {
        'HIGH': (green_fill, bold_white),
        'MEDIUM': (lime_fill, bold_black),
        'LOW': (PatternFill('solid', fgColor='666666'), bold_white),
        'LIVE': (green_fill, bold_white),
        'NEEDED': (red_fill, bold_white),
        'PLANNED': (lime_fill, bold_black),
        'WRITING': (lime_fill, bold_black),
        'AUDIT': (lime_fill, bold_black),
    }
    if value.upper() in status_styles:
        cell.fill, cell.font = status_styles[value.upper()]
        cell.alignment = center

def style_funnel_cell(cell, value):
    """Apply color styling based on funnel stage."""
    funnel_styles = {
        'TOF': (blue_fill, bold_white),
        'MOF': (amber_fill, bold_black),
        'BOF': (red_fill, bold_white),
    }
    if value.upper() in funnel_styles:
        cell.fill, cell.font = funnel_styles[value.upper()]
        cell.alignment = center

def create_pillar_row(ws, row, text, max_col):
    """Create a PILLAR header row with navy background."""
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=max_col)
    cell = ws.cell(row=row, column=1)
    cell.value = f"PILLAR: {text.upper()}"
    cell.fill = navy_fill
    cell.font = bold_white
    cell.alignment = left

def create_main_service_row(ws, row, text, max_col):
    """Create a main service header row with navy background."""
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=max_col)
    cell = ws.cell(row=row, column=1)
    cell.value = text.upper()
    cell.fill = navy_fill
    cell.font = bold_white
    cell.alignment = left

def create_section_header(ws, row, text, max_col):
    """Create a section header row with navy background."""
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=max_col)
    cell = ws.cell(row=row, column=1)
    cell.value = text
    cell.fill = navy_fill
    cell.font = bold_white
    cell.alignment = left

def create_key_row(ws, row, max_col, live_count, needed_count):
    """Create the KEY row with funnel legend and counts."""
    # KEY label
    ws.cell(row=row, column=1, value="KEY:").fill = navy_fill
    ws.cell(row=row, column=1).font = bold_white

    # Funnel legend
    col = 2
    for label, fill, font in [
        ("TOF (Awareness)", blue_fill, bold_white),
        ("MOF (Consideration)", amber_fill, bold_black),
        ("BOF (Decision)", red_fill, bold_white),
    ]:
        cell = ws.cell(row=row, column=col, value=label)
        cell.fill = fill
        cell.font = font
        cell.alignment = center
        col += 1

    # Status legend
    for label, fill, font in [
        ("LIVE", green_fill, bold_white),
        ("NEEDED", red_fill, bold_white),
    ]:
        cell = ws.cell(row=row, column=col, value=label)
        cell.fill = fill
        cell.font = font
        cell.alignment = center
        col += 1

    # Counts on right side
    total = live_count + needed_count
    ws.cell(row=row, column=max_col-2, value=f"LIVE: {live_count}").fill = green_fill
    ws.cell(row=row, column=max_col-2).font = bold_white
    ws.cell(row=row, column=max_col-1, value=f"NEEDED: {needed_count}").fill = red_fill
    ws.cell(row=row, column=max_col-1).font = bold_white
    ws.cell(row=row, column=max_col, value=f"TOTAL: {total}").fill = navy_fill
    ws.cell(row=row, column=max_col).font = bold_white
```

## Sheet Details

See `references/sheet-structures.md` for detailed column layouts and sample data for each of the 14 sheets.

## Workflow

1. Gather client info using AskUserQuestion
2. Create workbook with 14 sheets
3. Apply styling per sheet structure
4. Add placeholder data with [brackets] for items needing client input
5. Set appropriate column widths
6. Freeze header rows on data-heavy sheets (Keyword Database, Page Roadmap, Blog Roadmap)
7. Run recalc script from xlsx skill
8. Save as `{Client Name} {Year} SEO Strategy.xlsx`

## Output Location

Save to: `/sessions/lucid-tender-albattani/mnt/outputs/`

Filename format: `{Client Name} {Year} SEO Strategy.xlsx`
