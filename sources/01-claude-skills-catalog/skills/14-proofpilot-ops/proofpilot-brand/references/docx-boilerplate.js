// ProofPilot Document Boilerplate
// Copy this entire file as your starting point for any ProofPilot document

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, 
        AlignmentType, PageNumber, LevelFormat, BorderStyle, WidthType, ShadingType, HeadingLevel, PageBreak } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// BRAND COLORS - Use these exact hex codes, no substitutions
// ═══════════════════════════════════════════════════════════════════════════════
const ELECTRIC_BLUE = "0051FF";
const DARK_BLUE = "00184D";
const NEON_GREEN = "C8FF00";
const BLACK = "000000";
const LIGHT_GRAY = "F4F4F4";
const MEDIUM_GRAY = "666666";
const WHITE = "FFFFFF";
const RED = "DC3545";
const GREEN = "28A745";

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE STYLING
// ═══════════════════════════════════════════════════════════════════════════════
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS - Use these exactly as written
// ═══════════════════════════════════════════════════════════════════════════════

// Creates a styled table header row
// headers: array of header text strings
// colWidths: array of column widths in DXA units
// bgColor: DARK_BLUE or ELECTRIC_BLUE (alternate between sections)
function createHeaderRow(headers, colWidths, bgColor) {
  return new TableRow({
    children: headers.map((h, i) => new TableCell({ 
      borders: cellBorders, 
      shading: { fill: bgColor, type: ShadingType.CLEAR }, 
      width: { size: colWidths[i], type: WidthType.DXA }, 
      children: [new Paragraph({ 
        spacing: { before: 80, after: 80 }, 
        children: [new TextRun({ text: h, bold: true, color: WHITE })] 
      })] 
    }))
  });
}

// Creates a data row with optional styling
function createDataRow(cells, colWidths, options = {}) {
  const { bgColor = WHITE, textColor = BLACK } = options;
  return new TableRow({
    children: cells.map((cell, i) => new TableCell({
      borders: cellBorders,
      shading: { fill: bgColor, type: ShadingType.CLEAR },
      width: { size: colWidths[i], type: WidthType.DXA },
      children: [new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: cell, color: textColor })]
      })]
    }))
  });
}

// Creates a score row with Neon Green score text
function createScoreRow(label, scoreText, colWidths, bgColor) {
  return new TableRow({
    children: [
      new TableCell({
        borders: cellBorders,
        shading: { fill: bgColor, type: ShadingType.CLEAR },
        width: { size: colWidths[0], type: WidthType.DXA },
        children: [new Paragraph({
          spacing: { before: 80, after: 80 },
          children: [new TextRun({ text: label, bold: true, color: WHITE, font: "Bebas Neue", size: 26 })]
        })]
      }),
      // Empty middle cells if needed
      ...colWidths.slice(1, -1).map((w, i) => new TableCell({
        borders: cellBorders,
        shading: { fill: bgColor, type: ShadingType.CLEAR },
        width: { size: w, type: WidthType.DXA },
        children: [new Paragraph({ spacing: { before: 80, after: 80 }, children: [] })]
      })),
      new TableCell({
        borders: cellBorders,
        shading: { fill: bgColor, type: ShadingType.CLEAR },
        width: { size: colWidths[colWidths.length - 1], type: WidthType.DXA },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 80 },
          children: [new TextRun({ text: scoreText, bold: true, color: NEON_GREEN })]
        })]
      })
    ]
  });
}

// Creates a CTA box with Dark Blue background and Neon Green headline
function createCTABox(headline, bodyLines) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [9400],
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: cellBorders,
          shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
          width: { size: 9400, type: WidthType.DXA },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 150 },
              children: [new TextRun({ text: headline, bold: true, color: NEON_GREEN, font: "Bebas Neue", size: 36 })]
            }),
            ...bodyLines.map(line => new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 80 },
              children: [new TextRun({ text: line, color: WHITE })]
            }))
          ]
        })]
      })
    ]
  });
}

// Creates a placeholder box for screenshots
function createPlaceholderBox(text = "[INSERT SCREENSHOT HERE]") {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [9400],
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: cellBorders,
          shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
          width: { size: 9400, type: WidthType.DXA },
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 2000, after: 2000 },
            children: [new TextRun({ text: text, color: MEDIUM_GRAY, size: 24 })]
          })]
        })]
      })
    ]
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN WIDTH PATTERNS (DXA units, 1440 = 1 inch)
// ═══════════════════════════════════════════════════════════════════════════════
const COL_WIDTHS = {
  fourColumnRating: [2600, 3200, 1000, 2600],    // Audit scoring tables
  threeColumnChecklist: [5000, 1200, 3200],      // Y/N checklists with notes
  twoColumnScore: [6000, 3400],                   // Final scorecard
  fourColumnEqual: [2340, 2340, 2340, 2340],     // Pillar overview boxes
  fiveColumnKeyword: [2200, 1400, 1400, 1800, 2600], // Keyword analysis
  fullWidth: [9400]                               // CTA boxes, placeholders
};

// ═══════════════════════════════════════════════════════════════════════════════
// DOCUMENT TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════════
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 72, bold: true, color: DARK_BLUE, font: "Bebas Neue" },
        paragraph: { spacing: { before: 0, after: 100 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 40, bold: true, color: DARK_BLUE, font: "Bebas Neue" },
        paragraph: { spacing: { before: 350, after: 150 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: ELECTRIC_BLUE, font: "Bebas Neue" },
        paragraph: { spacing: { before: 250, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: BLACK, font: "Bebas Neue" },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list", levels: [{ 
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, 
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } 
      }] },
      { reference: "num-list-1", levels: [{ 
        level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, 
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } 
      }] },
    ]
  },
  sections: [{
    properties: { 
      page: { 
        size: { width: 12240, height: 15840 }, // US Letter
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } 
      } 
    },
    headers: {
      default: new Header({
        children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT, 
          children: [
            new TextRun({ text: "PROOFPILOT", bold: true, color: DARK_BLUE }),
            new TextRun({ text: " | Document Title", color: MEDIUM_GRAY })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({ 
          alignment: AlignmentType.CENTER, 
          children: [
            new TextRun({ text: "Page ", size: 18, color: MEDIUM_GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: MEDIUM_GRAY }),
            new TextRun({ text: " of ", size: 18, color: MEDIUM_GRAY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: MEDIUM_GRAY })
          ]
        })]
      })
    },
    children: [
      // ═══════════════════════════════════════════════════════════════════════
      // COVER SECTION
      // ═══════════════════════════════════════════════════════════════════════
      
      // Title Prefix (Electric Blue)
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 0 },
        children: [new TextRun({ text: "THE 40-POINT", bold: true, color: ELECTRIC_BLUE, font: "Bebas Neue", size: 44 })]
      }),
      
      // Main Title (Dark Blue)
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 100 },
        children: [new TextRun({ text: "WEBSITE & SEO AUDIT", bold: true, color: DARK_BLUE, font: "Bebas Neue", size: 72 })]
      }),
      
      // Tagline (Medium Gray, Italic)
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 300 },
        children: [new TextRun({ text: "Your Complete Website Performance Analysis", italics: true, color: MEDIUM_GRAY, size: 24 })]
      }),
      
      // ═══════════════════════════════════════════════════════════════════════
      // CONTENT SECTIONS - Add your content here
      // ═══════════════════════════════════════════════════════════════════════
      
      // Section 1 Example (Odd section = Dark Blue headers)
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "SECTION 1: TRAFFIC ANALYSIS", bold: true, color: DARK_BLUE, font: "Bebas Neue", size: 40 })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 200 },
        children: [new TextRun({ text: "Understanding where your visitors come from", italics: true, color: MEDIUM_GRAY, size: 24 })]
      }),
      
      // Section 1 Table
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: COL_WIDTHS.fourColumnRating,
        rows: [
          createHeaderRow(["Element", "Details", "Score", "Notes"], COL_WIDTHS.fourColumnRating, DARK_BLUE),
          createDataRow(["Organic Traffic", "Monthly visitors from search", "8", "Strong performance"], COL_WIDTHS.fourColumnRating),
          createScoreRow("SECTION SCORE", "/10", COL_WIDTHS.fourColumnRating, DARK_BLUE)
        ]
      }),
      
      // Section 2 Example (Even section = Electric Blue headers)
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "SECTION 2: TRUST SIGNALS", bold: true, color: DARK_BLUE, font: "Bebas Neue", size: 40 })]
      }),
      
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        columnWidths: COL_WIDTHS.fourColumnRating,
        rows: [
          createHeaderRow(["Element", "Details", "Score", "Notes"], COL_WIDTHS.fourColumnRating, ELECTRIC_BLUE),
          createDataRow(["Reviews Display", "Google reviews visible", "7", "Add more reviews"], COL_WIDTHS.fourColumnRating),
          createScoreRow("SECTION SCORE", "/10", COL_WIDTHS.fourColumnRating, ELECTRIC_BLUE)
        ]
      }),
      
      // ═══════════════════════════════════════════════════════════════════════
      // CTA SECTION
      // ═══════════════════════════════════════════════════════════════════════
      new Paragraph({ children: [new PageBreak()] }),
      createCTABox("READY TO FIX YOUR WEBSITE?", [
        "Schedule your free strategy call today.",
        "ProofPilot | Phoenix, Arizona",
        "www.proofpilot.com"
      ])
    ]
  }]
});

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT DOCUMENT
// ═══════════════════════════════════════════════════════════════════════════════
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/claude/output.docx", buffer);
  console.log("Document created!");
});
