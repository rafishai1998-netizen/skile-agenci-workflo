# ProofPilot Spreadsheet Styling Reference

## Brand Colors for openpyxl

```python
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

# Brand Colors (no # prefix)
ELECTRIC_BLUE = "0051FF"
DARK_BLUE = "00184D"
NEON_GREEN = "C8FF00"
BLACK = "000000"
LIGHT_GRAY = "F4F4F4"
MEDIUM_GRAY = "666666"
WHITE = "FFFFFF"
RED = "DC3545"
GREEN = "28A745"
```

## Style Definitions

```python
# Fills
dark_blue_fill = PatternFill("solid", fgColor=DARK_BLUE)
electric_blue_fill = PatternFill("solid", fgColor=ELECTRIC_BLUE)
light_gray_fill = PatternFill("solid", fgColor=LIGHT_GRAY)
green_fill = PatternFill("solid", fgColor=GREEN)
red_fill = PatternFill("solid", fgColor=RED)

# Fonts
title_font = Font(bold=True, color=DARK_BLUE, name="Calibri", size=16)
header_font = Font(bold=True, color=WHITE, name="Calibri", size=11)
body_font = Font(color=BLACK, name="Calibri", size=10)
score_font = Font(bold=True, color=NEON_GREEN, name="Calibri", size=12)
secondary_font = Font(color=MEDIUM_GRAY, name="Calibri", size=10)

# Alignment
center_align = Alignment(horizontal="center", vertical="center")
left_align = Alignment(horizontal="left", vertical="center")

# Borders
thin_border = Border(
    left=Side(style="thin", color="CCCCCC"),
    right=Side(style="thin", color="CCCCCC"),
    top=Side(style="thin", color="CCCCCC"),
    bottom=Side(style="thin", color="CCCCCC")
)
```

## Common Patterns

### Title Row
```python
# Row 1: Document title
sheet.merge_cells('A1:F1')
sheet['A1'] = "PROOFPILOT SEO AUDIT SCORECARD"
sheet['A1'].font = title_font
sheet['A1'].alignment = center_align
sheet.row_dimensions[1].height = 30
```

### Header Row
```python
# Row 2: Column headers with alternating colors
headers = ["Category", "Element", "Status", "Score", "Notes", "Priority"]
for col, header in enumerate(headers, 1):
    cell = sheet.cell(row=2, column=col, value=header)
    cell.fill = dark_blue_fill  # Odd sections
    # cell.fill = electric_blue_fill  # Even sections
    cell.font = header_font
    cell.alignment = center_align
    cell.border = thin_border
```

### Data Rows
```python
# Apply to each data cell
cell.font = body_font
cell.alignment = left_align
cell.border = thin_border
```

### Score Cells
```python
# For score columns (Dark Blue bg, Neon Green text)
cell.fill = dark_blue_fill
cell.font = score_font
cell.alignment = center_align
```

### Status Indicators
```python
# Working well (green)
if status == "Good":
    cell.fill = green_fill
    cell.font = Font(bold=True, color=WHITE)

# Needs attention (red)
if status == "Critical":
    cell.fill = red_fill
    cell.font = Font(bold=True, color=WHITE)
```

## Column Widths

```python
# Standard column widths for audit spreadsheets
sheet.column_dimensions['A'].width = 20  # Category
sheet.column_dimensions['B'].width = 35  # Element/Description
sheet.column_dimensions['C'].width = 12  # Status
sheet.column_dimensions['D'].width = 10  # Score
sheet.column_dimensions['E'].width = 40  # Notes
sheet.column_dimensions['F'].width = 12  # Priority
```

## Complete Example

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

# Create workbook
wb = Workbook()
sheet = wb.active
sheet.title = "SEO Audit"

# Brand colors
DARK_BLUE = "00184D"
ELECTRIC_BLUE = "0051FF"
NEON_GREEN = "C8FF00"
WHITE = "FFFFFF"
BLACK = "000000"

# Styles
dark_blue_fill = PatternFill("solid", fgColor=DARK_BLUE)
header_font = Font(bold=True, color=WHITE, name="Calibri", size=11)
score_font = Font(bold=True, color=NEON_GREEN, name="Calibri", size=12)
thin_border = Border(
    left=Side(style="thin", color="CCCCCC"),
    right=Side(style="thin", color="CCCCCC"),
    top=Side(style="thin", color="CCCCCC"),
    bottom=Side(style="thin", color="CCCCCC")
)

# Title row
sheet.merge_cells('A1:D1')
sheet['A1'] = "PROOFPILOT AUDIT SCORECARD"
sheet['A1'].font = Font(bold=True, color=DARK_BLUE, size=16)
sheet['A1'].alignment = Alignment(horizontal="center")
sheet.row_dimensions[1].height = 35

# Header row
headers = ["Category", "Element", "Score", "Notes"]
for col, header in enumerate(headers, 1):
    cell = sheet.cell(row=2, column=col, value=header)
    cell.fill = dark_blue_fill
    cell.font = header_font
    cell.alignment = Alignment(horizontal="center", vertical="center")
    cell.border = thin_border

# Data row example
data = ["Traffic", "Organic Visitors", "8/10", "Strong performance"]
for col, value in enumerate(data, 1):
    cell = sheet.cell(row=3, column=col, value=value)
    cell.border = thin_border
    if col == 3:  # Score column
        cell.font = score_font
        cell.fill = dark_blue_fill

# Column widths
sheet.column_dimensions['A'].width = 15
sheet.column_dimensions['B'].width = 25
sheet.column_dimensions['C'].width = 10
sheet.column_dimensions['D'].width = 40

wb.save("audit-scorecard.xlsx")
```

## Section Color Alternation

| Section | Header Fill | Score Cell Fill |
|---------|-------------|-----------------|
| Section 1 (Traffic) | Dark Blue | Dark Blue |
| Section 2 (Trust) | Electric Blue | Electric Blue |
| Section 3 (Conversion) | Dark Blue | Dark Blue |
| Section 4 (Content) | Electric Blue | Electric Blue |
| Section 5 (Keywords) | Dark Blue | Dark Blue |
| Section 6 (Technical) | Electric Blue | Electric Blue |

## Final Scorecard Row

```python
# Total score row at bottom
total_row = sheet.max_row + 2
sheet.merge_cells(f'A{total_row}:B{total_row}')
sheet[f'A{total_row}'] = "TOTAL SCORE"
sheet[f'A{total_row}'].fill = dark_blue_fill
sheet[f'A{total_row}'].font = Font(bold=True, color=WHITE, size=14)

sheet[f'C{total_row}'] = "32/40"
sheet[f'C{total_row}'].fill = dark_blue_fill
sheet[f'C{total_row}'].font = Font(bold=True, color=NEON_GREEN, size=14)
```
