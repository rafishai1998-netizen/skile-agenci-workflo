# Spreadsheet Structure Reference

Complete specifications for building content strategy spreadsheets.

## Sheet 1: Strategy Overview

### Column Widths
| Column | Width |
|--------|-------|
| A | 25 |
| B | 26.43 |
| C | 55 |
| D | 28 |

### Row Structure

```
Row 1: [A1:F1 merged] Brand Name (blue bold 13pt, color: 151F6D)
Row 2: [A2:F2 merged] Subtitle (orange bold 13pt, color: EF6430)
Row 3: Empty
Row 4: [A4:F4 merged] "THE OPPORTUNITY" (blue bold, fill: E8EAF6)
Row 5: [A5:F5 merged] Description paragraph (gray text 4A4A4A)
Row 6: Empty
Row 7: Empty
Row 8: [A8:F8 merged] "FUNNEL STRUCTURE" (blue bold, fill: E8EAF6)
Row 9: Headers: Stage | Goal | Content Focus | CTA (white text on 151F6D)
Row 10: TOP OF FUNNEL (fill: E8F5E9)
Row 11: MIDDLE OF FUNNEL (fill: FFF8E1)
Row 12: BOTTOM OF FUNNEL (fill: FBE9E7)
Row 13: Empty
Row 14: [A14:F14 merged] "TARGET AUDIENCES" (blue bold, fill: E8EAF6)
Row 15: Headers: Segment | % | Description | Content Needs
Row 16-20: Audience segments (alternating F1F0F0/FFFFFF)
Row 21: Empty
Row 22: [A22:F22 merged] "CONTENT PILLARS" (blue bold, fill: E8EAF6)
Row 23: Headers: Pillar | Topics | Course Alignment | Conversion Path
Row 24-32: Pillar rows (alternating F1F0F0/FFFFFF)
```

### Funnel Stage Data Structure

```python
funnel_stages = [
    {
        'stage': 'TOP OF FUNNEL',
        'fill': 'E8F5E9',
        'goal': 'Attract quality prospects',
        'content_focus': 'Financial literacy, market basics, foundational concepts',
        'cta': 'Register for Free Class',
        'cta_color': 'EF6430'
    },
    {
        'stage': 'MIDDLE OF FUNNEL', 
        'fill': 'FFF8E1',
        'goal': 'Build trust and demonstrate expertise',
        'content_focus': 'Risk management, asset-specific strategies, comparison content',
        'cta': 'Attend 3-Day Orientation',
        'cta_color': 'EF6430'
    },
    {
        'stage': 'BOTTOM OF FUNNEL',
        'fill': 'FBE9E7',
        'goal': 'Convert to paid students',
        'content_focus': 'Trading education value, success stories, program details',
        'cta': 'Enroll in Academy',
        'cta_color': 'EF6430'
    }
]
```

## Sheet 2: Customer Profiles

### Column Widths
| Column | Width |
|--------|-------|
| A | 20 |
| B | 10 |
| C | 12 |
| D | 50 |

### Profile Block Structure (repeat for each segment)

```
Row N: [A:F merged] Profile Name with % (bold, fill: F1F0F0 or FFFFFF alternating)
Row N+1: Empty
Row N+2: "Description" label | [B:F merged] Description text
Row N+3: Empty
Row N+4: "Demographics" label bold | [B:F merged] Demographics text
Row N+5: Empty
Row N+6: "Pain Points" label bold | [B:F merged] 
Row N+7: ► | Point 1
Row N+8: ► | Point 2
Row N+9: ► | Point 3
...
Row N+X: "Motivations" label bold | [B:F merged]
Row N+X+1: ► | Motivation 1
...
Row N+Y: "Objections" label bold | [B:F merged]
Row N+Y+1: ► | Objection 1
...
Row N+Z: [A:F merged] "PSYCHOGRAPHIC PROFILE" (white text, fill: EF6430)
Row N+Z+1: Factor | Score | Low | Mid | High | Notes
Row N+Z+2-9: 8 factor rows with conditional score coloring

Factor | Score Cell Coloring:
- Score 1-2: fill FFCDD2 (red)
- Score 3: fill FFF9C4 (yellow)  
- Score 4-5: fill C8E6C9 (green)

Row N+Z+10: Empty
Row N+Z+11: "Content Focus" label | [B:F merged] Content focus text
Row N+Z+12: Empty
Row N+Z+13: "Authority Hook" label | [B:F merged] Authority hook text (orange text EF6430, fill: FDE8DC)
Row N+Z+14: Empty
Row N+Z+15: "Search Terms" label | [B:F merged] Comma-separated terms
Row N+Z+16: Empty
Row N+Z+17: "Course Path" label | [B:F merged] Course progression
```

### 8-Factor Psychographic Matrix

Standard factors to score 1-5:

1. Risk Tolerance
2. Educational Investment
3. Available Resources
4. Self-Direction Preference
5. Time Availability
6. Patience Level
7. Technical Comfort
8. Decision Speed

## Sheet 3: Content Hub

### Column Widths
| Column | Width | Content |
|--------|-------|---------|
| A | 10.57 | Checkbox |
| B | 26.29 | Type |
| C | 69.29 | Title |
| D | 64.71 | URL |
| E | 28 | Primary Keyword |
| F | 45 | Secondary Keywords |
| G | 10.14 | Est. Vol |
| H | 15.14 | Topical Vol |
| I | 12 | Stage |
| J | 13 | Profile |

### Section Structure

```
Row N: [A:J merged] "SECTION NAME  |  Topical Search Volume: XXX+/mo" (bold, fill: E8EAF6)
Row N+1: [A:J merged] Section description (gray text)
Row N+2: Empty
Row N+3: Headers: ☐ | Type | Title | URL | Primary Keyword | Secondary Keywords | Est. Vol | Topical Vol | Stage | Profile (bold, fill: 151F6D, white text)
Row N+4+: Content rows (alternating F1F0F0/FFFFFF)
```

### Type Badge Colors

```python
type_colors = {
    'Pillar': 'BBDEFB',      # Light blue
    'Research': 'C8E6C9',    # Light green
    'Supporting': 'E0E0E0',  # Light gray
    'Tool': 'FFE0B2',        # Light orange
    'E-book': 'E1BEE7'       # Light purple
}
```

### Stage Colors

```python
stage_colors = {
    'Awareness': 'E8F5E9',
    'Consideration': 'FFF8E1',
    'Decision': 'FBE9E7'
}
```

### Volume Badge Colors

```python
def get_volume_color(volume):
    if volume >= 1000:
        return 'C8E6C9'  # Green - high
    elif volume >= 100:
        return 'FFF9C4'  # Yellow - medium
    else:
        return 'FFCDD2'  # Red - low
```

### Content Row Styling

- Title: Bold, color 151F6D
- URL: Color 666666
- Type cell: Centered, appropriate type color fill
- Stage cell: Appropriate stage color fill
- Volume cell: Appropriate volume color fill

## Sheet 4: Interactive Tools

### Column Widths
| Column | Width | Content |
|--------|-------|---------|
| A | 15.57 | Type |
| B | 41.86 | Tool Name |
| C | 49.57 | Description |
| D | 32.29 | Lead Magnet Strategy |
| E | 8 | Est. Vol |
| F | 13 | Stage |
| G | 15 | Target Profile |
| H | 45 | Course Alignment |

### Row Structure

```
Row 1: Headers (bold, fill: 151F6D, white text)
Row 2+: Tool rows (alternating F1F0F0/FFFFFF)
```

### Tool Types

- Assessment
- Calculator
- Comparison
- Selector
- Checklist
- Quiz

## Sheet 5: E-books & Guides

### Column Widths
| Column | Width | Content |
|--------|-------|---------|
| A | 13.86 | Type |
| B | 72.43 | Title |
| C | 55.57 | Description |
| D | 38 | Lead Magnet Strategy |
| E | 28 | Target Audience |
| F | 8 | Est. Vol |
| G | 14 | Stage |
| H | 25 | Course Alignment |

### Row Structure

```
Row 1: Headers (bold, fill: 151F6D, white text)
Row 2+: Content rows (alternating F1F0F0/FFFFFF)
```

### E-book Types

- E-book
- Guide
- Checklist
- Template
- Workbook

## Sheet 6: Roadmap

### Column Widths
| Column | Width | Content |
|--------|-------|---------|
| A | 10 | # |
| B | 45 | Deliverable |
| C | 14 | Type |
| D | 50 | Description |
| E | 22 | Dependencies |
| F | 18 | Priority |
| G | 12 | Status |

### Phase Structure

```
Row 1: [A:G merged] Title "CONTENT IMPLEMENTATION ROADMAP" (bold, fill: 151F6D, white text)
Row 2: [A:G merged] Subtitle (gray text)
Row 3: Empty
Row 4: [A:G merged] "PHASE 1: FOUNDATION" (bold, fill: E8EAF6)
Row 5: [C:G merged] Phase description
Row 6: Headers: # | Deliverable | Type | Description | Dependencies | Priority | Status (bold)
Row 7+: Deliverable rows
...
Row N: [A:G merged] "PHASE 2: CORE CONTENT" (bold, fill: E8EAF6)
...
Row X: [A:G merged] "PHASE 3: SUPPORTING CONTENT" (bold, fill: E8EAF6)
...
Row Y: [A:G merged] "PHASE 4: OPTIMIZATION & EXPANSION" (bold, fill: E8EAF6)
...
Row Z: Empty
Row Z+1: [A:G merged] "PRIORITY LEGEND" (bold)
Row Z+2: P1 = Must Have | P2 = Should Have | P3 = Nice to Have | P4 = Future
```

### Priority Badge Colors

```python
priority_colors = {
    'P1': 'FFCDD2',  # Red - must have
    'P2': 'FFF9C4',  # Yellow - should have
    'P3': 'C8E6C9',  # Green - nice to have
    'P4': 'BBDEFB'   # Blue - future
}
```

### Status Options

- Not Started
- In Progress
- Complete
- Blocked

## Python Styling Code Reference

### Import Block

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
```

### Color Constants

```python
# Primary colors
PRIMARY_BLUE = '151F6D'
ACCENT_ORANGE = 'EF6430'
LIGHT_GRAY = 'F1F0F0'
SECTION_HEADER = 'E8EAF6'
WHITE = 'FFFFFF'
BODY_TEXT = '4A4A4A'
URL_COLOR = '666666'

# Stage colors
STAGE_AWARENESS = 'E8F5E9'
STAGE_CONSIDERATION = 'FFF8E1'
STAGE_DECISION = 'FBE9E7'

# Score colors
SCORE_HIGH = 'C8E6C9'
SCORE_MED = 'FFF9C4'
SCORE_LOW = 'FFCDD2'

# Type badge colors
TYPE_PILLAR = 'BBDEFB'
TYPE_RESEARCH = 'C8E6C9'
TYPE_SUPPORTING = 'E0E0E0'
TYPE_TOOL = 'FFE0B2'
TYPE_EBOOK = 'E1BEE7'

# Priority colors
PRIORITY_P1 = 'FFCDD2'
PRIORITY_P2 = 'FFF9C4'
PRIORITY_P3 = 'C8E6C9'
PRIORITY_P4 = 'BBDEFB'

# Authority hook background
AUTHORITY_BG = 'FDE8DC'
```

### Style Helpers

```python
def header_style():
    return {
        'font': Font(bold=True, color=WHITE, name='Calibri', size=12),
        'fill': PatternFill('solid', fgColor=PRIMARY_BLUE),
        'alignment': Alignment(horizontal='left', vertical='center')
    }

def section_header_style():
    return {
        'font': Font(bold=True, color=PRIMARY_BLUE, name='Calibri', size=12),
        'fill': PatternFill('solid', fgColor=SECTION_HEADER),
        'alignment': Alignment(horizontal='left', vertical='center')
    }

def title_style():
    return {
        'font': Font(bold=True, color=PRIMARY_BLUE, name='Calibri', size=12),
        'alignment': Alignment(horizontal='left', vertical='center')
    }

def cta_style():
    return {
        'font': Font(bold=True, color=ACCENT_ORANGE, name='Calibri', size=12)
    }

def body_style():
    return {
        'font': Font(color=BODY_TEXT, name='Calibri', size=12)
    }

def url_style():
    return {
        'font': Font(color=URL_COLOR, name='Calibri', size=12)
    }

def get_score_fill(score):
    if score >= 4:
        return PatternFill('solid', fgColor=SCORE_HIGH)
    elif score == 3:
        return PatternFill('solid', fgColor=SCORE_MED)
    else:
        return PatternFill('solid', fgColor=SCORE_LOW)

def get_type_fill(content_type):
    colors = {
        'Pillar': TYPE_PILLAR,
        'Research': TYPE_RESEARCH,
        'Supporting': TYPE_SUPPORTING,
        'Tool': TYPE_TOOL,
        'E-book': TYPE_EBOOK
    }
    return PatternFill('solid', fgColor=colors.get(content_type, TYPE_SUPPORTING))

def get_stage_fill(stage):
    colors = {
        'Awareness': STAGE_AWARENESS,
        'Consideration': STAGE_CONSIDERATION,
        'Decision': STAGE_DECISION
    }
    return PatternFill('solid', fgColor=colors.get(stage, WHITE))

def get_priority_fill(priority):
    colors = {
        'P1': PRIORITY_P1,
        'P2': PRIORITY_P2,
        'P3': PRIORITY_P3,
        'P4': PRIORITY_P4
    }
    return PatternFill('solid', fgColor=colors.get(priority, WHITE))

def get_volume_fill(volume):
    if volume >= 1000:
        return PatternFill('solid', fgColor=SCORE_HIGH)
    elif volume >= 100:
        return PatternFill('solid', fgColor=SCORE_MED)
    else:
        return PatternFill('solid', fgColor=SCORE_LOW)

def alt_row_fill(row_num):
    if row_num % 2 == 0:
        return PatternFill('solid', fgColor=WHITE)
    else:
        return PatternFill('solid', fgColor=LIGHT_GRAY)
```

### Applying Styles

```python
def apply_style(cell, style_dict):
    if 'font' in style_dict:
        cell.font = style_dict['font']
    if 'fill' in style_dict:
        cell.fill = style_dict['fill']
    if 'alignment' in style_dict:
        cell.alignment = style_dict['alignment']

# Example usage
cell = ws['A1']
apply_style(cell, header_style())
```
