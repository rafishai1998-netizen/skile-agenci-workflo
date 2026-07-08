# Document Carousel Skill

Generate professional multi-page PDF documents for educational content, guides, and informational carousels — perfect for LinkedIn, lead magnets, and educational posts.

## Workflow Overview

This skill follows a **5-phase workflow**:

1. **Gather** — Collect content, structure, and brand details
2. **Outline** — Create the document structure and page breakdown
3. **Write & Design** — Generate HTML with styling for each page
4. **Generate PDF** — Convert HTML to a polished PDF document
5. **Review & Evolve** — Present results and iterate

---

## Phase 1: Gather

Collect the following from the user:

### Required Information
- **Document title**: The main title/headline
- **Topic/Subject**: What the document is about
- **Purpose**: Educational, promotional, lead magnet, guide, how-to
- **Target audience**: Who will read this?
- **Number of pages**: How many pages? (typically 5-15)
- **Key content points**: What should be covered?

### Brand Information
- **Logo**: Check `images/logos/` for brand logos. Get the file path.
- **Brand name**: Company or personal brand name
- **Brand colors**: Primary, secondary, accent colors (hex codes)
- **Website/social links**: For the CTA page

### Style Preferences
- **Design style**: Professional, modern, playful, minimal, corporate
- **Color scheme**: Dark mode, light mode, brand-specific
- **Layout preference**: Clean with lots of whitespace, dense with info, visual-heavy
- **Typography**: Modern sans-serif, classic serif, bold display

### Content Details
- **Call to action**: What should readers do after reading?
- **CTA link**: URL to include on the last page
- **Include images?**: Should AI-generated images be included on pages?
- **Special elements**: Diagrams, checklists, comparison tables, step numbers

---

## Phase 2: Outline

Create a detailed page-by-page outline.

### Document Structure Best Practices

- **Page 1 (Cover)**: Title, subtitle, brand logo, visually striking
- **Pages 2-N (Content)**: Core educational/informational content
- **Final Page (CTA)**: Call to action, social links, website, next steps

### Page Content Guidelines

Each content page should have:
- A clear page heading/number
- 1-2 key points per page (don't overcrowd)
- Supporting bullet points or short paragraphs
- Visual elements (icons, dividers, accent colors)
- Consistent header/footer with brand logo

### Outline Template

```
Document: [Title]
Pages: [N]

Page 1 — Cover
  - Title: [document title]
  - Subtitle: [subtitle/tagline]
  - Logo: [brand logo path]
  - Visual: [cover visual description]

Page 2 — [Section Title]
  - Heading: [heading]
  - Content: [key points]
  - Visual: [any supporting visual]

...

Page N — Call to Action
  - Heading: [CTA heading]
  - Content: [what to do next]
  - Link: [URL]
  - Social handles: [handles]
```

Present the outline to the user for approval before writing.

---

## Phase 3: Write & Design

Generate the HTML document with embedded CSS styling.

### HTML Document Structure

Create a single HTML file with:
- Embedded CSS (no external stylesheets)
- Page breaks for PDF conversion (`page-break-after: always`)
- Responsive typography
- Brand colors applied throughout
- Logo placement in headers

### CSS Design System

```css
/* Base document styles */
@page {
  size: A4 portrait;
  margin: 0;
}

body {
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
}

.page {
  width: 210mm;
  min-height: 297mm;
  padding: 30mm 25mm;
  box-sizing: border-box;
  page-break-after: always;
  position: relative;
}

/* Brand color system - customize per project */
:root {
  --primary: #FF6600;      /* Replace with brand primary */
  --secondary: #1a1a2e;    /* Replace with brand secondary */
  --accent: #FFB347;       /* Replace with brand accent */
  --text: #333333;
  --text-light: #666666;
  --bg: #FFFFFF;
  --bg-alt: #F8F9FA;
}
```

### Page Design Patterns

**Cover Page**:
- Full-color background using brand primary color
- Large, bold title with high contrast text
- Subtitle in lighter weight
- Brand logo prominently displayed
- Clean, impactful design

**Content Pages**:
- White or light background
- Brand-colored header bar with logo and page number
- Clear heading hierarchy (H2 for page title, H3 for sub-sections)
- Bullet points with brand-colored markers
- Accent color for highlights and important callouts
- Ample whitespace for readability

**CTA Page**:
- Brand-colored background
- Clear call to action text
- Link/button styling
- Social media handles
- Brand logo

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    /* Full CSS here - customized with brand colors */
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="page cover">
    <img src="[logo_path]" class="logo" alt="Brand Logo">
    <h1>[Document Title]</h1>
    <p class="subtitle">[Subtitle]</p>
  </div>

  <!-- Content Pages -->
  <div class="page content">
    <div class="page-header">
      <img src="[logo_path]" class="header-logo" alt="Logo">
      <span class="page-number">02</span>
    </div>
    <h2>[Page Heading]</h2>
    <p>[Content]</p>
    <ul>
      <li>[Point 1]</li>
      <li>[Point 2]</li>
    </ul>
  </div>

  <!-- CTA Page -->
  <div class="page cta">
    <h2>[CTA Heading]</h2>
    <p>[CTA Text]</p>
    <a href="[link]" class="cta-button">[Button Text]</a>
  </div>
</body>
</html>
```

### Writing Guidelines
- Write concise, scannable content
- Use short paragraphs (2-3 sentences max)
- Include bullet points for lists
- Bold key terms and important phrases
- Use numbers for step-by-step processes
- Keep language accessible and clear

Save the HTML file to `outputs/documents/<project-name>/document.html`.

---

## Phase 4: Generate PDF

Convert the HTML document to a polished PDF.

### PDF Generation Process

1. **Generate PDF using WeasyPrint**:
   ```bash
   python3 scripts/generate_pdf.py \
     --input "outputs/documents/<project-name>/document.html" \
     --output "outputs/documents/<project-name>/document.pdf"
   ```

2. **Verify the PDF**:
   - Check page count matches the outline
   - Verify logo renders correctly
   - Confirm page breaks are in the right places
   - Ensure text is readable and well-formatted

### Output Organization

```
outputs/documents/<project-name>/
├── document.html        ← Source HTML
├── document.pdf         ← Final PDF output
└── prompts.md           ← Document outline and content plan
```

### Logo Handling

When referencing logos in the HTML:
- Use the local file path from `images/logos/`
- WeasyPrint can handle local file paths directly
- Use absolute paths for reliability:
  ```html
  <img src="file:///absolute/path/to/images/logos/logo.png" alt="Logo">
  ```

---

## Phase 5: Review & Evolve

Present the generated PDF to the user.

### Review Process

1. **Share the PDF path**: Tell the user where the file is saved
2. **Highlight key details**:
   - Number of pages
   - Content structure
   - Design choices made
3. **Ask for feedback**:
   - Content accuracy and completeness
   - Design and layout satisfaction
   - Color and branding alignment
   - Any pages to add, remove, or modify

### Iteration Process

For requested changes:
- **Content changes**: Edit the HTML source, regenerate PDF
- **Design changes**: Update CSS in the HTML, regenerate PDF
- **Layout changes**: Restructure HTML elements, regenerate PDF
- **Add/remove pages**: Edit HTML page sections, regenerate PDF

Save previous versions:
```
document_v1.pdf
document_v2.pdf
document.pdf  ← Always keep the latest as the clean name
```

Update `prompts.md` with revision notes.

---

## Advanced Features

### Including AI-Generated Images

If the user wants AI-generated images on document pages:
1. Generate images using `scripts/generate_image.py` with appropriate prompts
2. Save images to the project output folder
3. Reference them in the HTML with local file paths
4. Regenerate the PDF

### Custom Fonts

To use custom fonts, add them as base64-encoded fonts in the CSS:
```css
@font-face {
  font-family: 'CustomFont';
  src: url(data:font/woff2;base64,...) format('woff2');
}
```

### Dark Mode Documents

For dark-themed documents, adjust the CSS variables:
```css
:root {
  --text: #FFFFFF;
  --bg: #1a1a2e;
  --bg-alt: #16213e;
}
```

---

## Example Conversation Flow

**User**: Create a document carousel titled "The Complete Guide to Claude Creatives" — 9 pages, educational LinkedIn document with my Infinite X logo.

**Claude (Phase 1 — Gather)**:
- Title: The Complete Guide to Claude Creatives
- Pages: 9
- Purpose: Educational LinkedIn document
- Logo: `images/logos/infinitex.png`
- Brand colors: [asks user or uses existing brand guide]

**Claude (Phase 2 — Outline)**:
- Creates 9-page outline
- Presents for approval

**Claude (Phase 3 — Write & Design)**:
- Generates full HTML with embedded CSS
- Brand colors, logo, professional layout
- Saves HTML to `outputs/documents/claude-creatives-guide/document.html`

**Claude (Phase 4 — Generate PDF)**:
- Converts HTML to PDF
- Saves to `outputs/documents/claude-creatives-guide/document.pdf`
- Reports: "9-page PDF generated successfully"

**Claude (Phase 5 — Review & Evolve)**:
- Shares file location
- Asks for feedback
- Iterates if needed
