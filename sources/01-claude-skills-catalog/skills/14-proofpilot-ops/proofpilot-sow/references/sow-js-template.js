/**
 * ProofPilot SOW Generator — Base Template
 * Adapt CLIENT_INFO, SCOPE, DELIVERABLES, TIMELINE, and PAYMENT for each engagement.
 * Run from ~/: node ~/sow-temp.js && rm ~/sow-temp.js
 *
 * Requires: docx@9+ installed at ~/node_modules
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, PageNumber, BorderStyle, WidthType,
        ShadingType, PageBreak, VerticalAlign } = require('docx');
const fs = require('fs');

// ── BRAND COLORS (exact hex — no substitutions) ──────────────────────────────
const EB = "0051FF";  // Electric Blue  — H2, even table headers
const DB = "00184D";  // Dark Blue      — H1, odd table headers, CTA bg
const NG = "C8FF00";  // Neon Green     — total amount, CTA headline
const BK = "000000";  // Black          — body text
const LG = "F4F4F4";  // Light Gray     — alternating rows, label cells
const MG = "666666";  // Medium Gray    — taglines, secondary text
const WH = "FFFFFF";  // White          — text on colored backgrounds

// ── BORDERS ───────────────────────────────────────────────────────────────────
const tb = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const nb = { style: BorderStyle.NONE,   size: 0, color: "FFFFFF" };
const borders   = { top: tb, bottom: tb, left: tb,  right: tb  };
const noBorders = { top: nb, bottom: nb, left: nb,  right: nb  };

// ═════════════════════════════════════════════════════════════════════════════
// CLIENT / ENGAGEMENT INFO — edit this block for each SOW
// ═════════════════════════════════════════════════════════════════════════════
const CLIENT = {
  name:        "Client Name",          // e.g. "The Wild Within"
  contact:     "Contact Name",         // e.g. "Alicia Wright"
  industry:    "Industry",             // e.g. "Mental Health / Therapy Services"
  email:       "",                     // optional
};

const ENGAGEMENT = {
  serviceTitle: "WEBSITE DESIGN",      // Cover prefix (Electric Blue). e.g. "SEO & CONTENT", "META ADS"
  packageName:  "Growth Site Package", // Italic subtitle
  effectiveDate:"March 6, 2026",
  timeline:     "4-6 Weeks",
  investment:   "$7,200 (paid in full)",
};

// Payment table rows: [milestone, due, amount]
const PAYMENT_SCHEDULE = [
  ["Project Kick-off (paid in full)", "Upon Signing", "$7,200.00"],
];

// Investment table rows: [description, amount]  — last row is auto-styled as TOTAL
const INVESTMENT_ROWS = [
  ["Growth Site (List Price)",   "$8,000.00"],
  ["Pay-in-Full Discount (10%)", "($800.00)"],
  ["TOTAL PROJECT INVESTMENT",   "$7,200.00"],  // last row → Dark Blue bg, Neon Green amount
];

// "What You Get" checkmarks — 9 items fills a clean 3x3 grid
const DELIVERABLES = [
  "Custom Homepage Design",  "About / Bio Page",        "8 Service Pages",
  "Up to 3 Location Pages",  "Blog + 3 Free Posts",     "Full SEO Foundation",
  "Contact + Booking",       "FAQs & Testimonials",     "Full Site Ownership",
];

// Timeline rows: [phase, timing, activities]
const TIMELINE = [
  ["Kickoff",     "Week 1",    "Brand direction confirmed; page topics and locations finalized; sitemap approved; brand assets collected"],
  ["Design",      "Weeks 1-2", "Homepage mockup and design system built; client review and approval; design applied to all templates; one revision round included"],
  ["Development", "Weeks 2-4", "Full WordPress build from approved design; all pages developed; booking integration configured; 3 blog posts drafted"],
  ["Launch",      "Weeks 4-6", "SEO optimization applied; QA testing across all devices; final client approval; site goes live; CMS handoff"],
];

// Output path
const OUTPUT = `/Users/matthewanderson/Downloads/${CLIENT.name.replace(/\s+/g, '-')}-Website-SOW.docx`;

// ═════════════════════════════════════════════════════════════════════════════
// HELPERS — do not edit below unless adding new patterns
// ═════════════════════════════════════════════════════════════════════════════

const br  = () => new Paragraph({ children: [new PageBreak()] });
const gap = (pts = 120) => new Paragraph({ spacing: { before: pts, after: 0 }, children: [] });

const run = (text, o = {}) => new TextRun({
  text, font: o.font || "Calibri", size: o.sz || 22,
  color: o.color || BK, bold: !!o.bold, italics: !!o.italic,
});

const para = (children, o = {}) => new Paragraph({
  alignment: o.align || AlignmentType.LEFT,
  spacing: { before: o.before || 60, after: o.after || 100 },
  indent: o.indent ? { left: o.indent } : undefined,
  children,
});

// Typography helpers
const h1 = t => para([run(t, { font:"Bebas Neue", sz:40, color:DB, bold:true })], { before:360, after:160 });
const h2 = t => para([run(t, { font:"Bebas Neue", sz:28, color:EB, bold:true })], { before:240, after:100 });
const body = (t, o={}) => para([run(t, o)], { before:40, after:100 });
const italic = (t, o={}) => para([run(t, { italic:true, color:MG, ...o })], { before:40, after:60 });

const bul = (label, text) => {
  const kids = label
    ? [run("  •  ", {color:EB}), run(label + ":  ", {bold:true}), run(text)]
    : [run("  •  ", {color:EB}), run(text)];
  return para(kids, { before:40, after:80, indent:360 });
};

// Cell paragraph — used inside tables
const cp = (text, o = {}) => new Paragraph({
  alignment: o.align || AlignmentType.LEFT,
  spacing: { before: o.before || 80, after: o.after || 80 },
  children: [run(text, { font: o.font || "Calibri", sz: o.sz || 20,
    color: o.color || BK, bold: !!o.bold, italic: !!o.italic })],
});

// Table cell
const cell = (children, o = {}) => new TableCell({
  borders: o.noBorder ? noBorders : borders,
  shading: o.bg ? { fill: o.bg, type: ShadingType.CLEAR } : undefined,
  verticalAlign: VerticalAlign.CENTER,
  width: o.w ? { size: o.w, type: WidthType.DXA } : undefined,
  columnSpan: o.span,
  children: Array.isArray(children) ? children : [children],
});

// ═════════════════════════════════════════════════════════════════════════════
// REUSABLE TABLE BUILDERS
// ═════════════════════════════════════════════════════════════════════════════

/** Two-column header row (label cell | value cell) used in cover info block */
function infoRow(label, value) {
  return new TableRow({ children: [
    cell(cp(label, { color:WH, bold:true }), { bg:DB, w:2200 }),
    cell(cp(value, { color:DB, bold:true }), { bg:LG, w:7200 }),
  ]});
}

/** Alternating data row for deliverables / scope tables */
function dataRow(c1, c2, w1, w2, rowIndex) {
  const bg = rowIndex % 2 === 0 ? LG : WH;
  return new TableRow({ children: [
    cell(cp(c1, { bold:true }), { bg, w:w1 }),
    cell(cp(c2),                 { bg, w:w2 }),
  ]});
}

/** Dark Blue header row for any table */
function hdrRow(labels, widths, bg = DB) {
  return new TableRow({ children: labels.map((lbl, i) =>
    cell(cp(lbl, { color:WH, bold:true, font:"Bebas Neue", sz:22 }), { bg, w: widths[i] })
  )});
}

// ═════════════════════════════════════════════════════════════════════════════
// DOCUMENT
// ═════════════════════════════════════════════════════════════════════════════
const doc = new Document({
  styles: { default: { document: { run: { font:"Calibri", size:22 } } } },
  sections: [{
    properties: {
      page: { size:{ width:12240, height:15840 },
              margin:{ top:1080, right:1260, bottom:1080, left:1260 } }
    },

    // ── HEADER ───────────────────────────────────────────────────────────────
    headers: { default: new Header({ children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [
        run("PROOFPILOT", { bold:true, color:DB, sz:18 }),
        run(`  |  ${ENGAGEMENT.serviceTitle} SOW — ${CLIENT.name.toUpperCase()}`, { color:MG, sz:18 }),
      ],
    })]})},

    // ── FOOTER ───────────────────────────────────────────────────────────────
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        run("Page ", { color:MG, sz:16 }),
        new TextRun({ children:[PageNumber.CURRENT], size:16, color:MG }),
        run(" of ", { color:MG, sz:16 }),
        new TextRun({ children:[PageNumber.TOTAL_PAGES], size:16, color:MG }),
      ],
    })]})},

    children: [

      // ════════════════════════════════════════════════════════════════════
      // COVER PAGE
      // ════════════════════════════════════════════════════════════════════

      // Title
      para([run(ENGAGEMENT.serviceTitle, { font:"Bebas Neue", sz:44, color:EB, bold:true })],
           { before:400, after:0 }),
      para([run("STATEMENT OF WORK & SERVICE AGREEMENT",
                { font:"Bebas Neue", sz:64, color:DB, bold:true })],
           { before:0, after:80 }),
      italic(`${ENGAGEMENT.packageName}  |  ${CLIENT.name}`, { sz:22 }),
      gap(280),

      // CLIENT | PROVIDER block
      new Table({
        width: { size:100, type:WidthType.PERCENTAGE },
        columnWidths: [4700, 4700],
        rows: [
          new TableRow({ children: [
            cell(cp("CLIENT",   { color:WH, bold:true, font:"Bebas Neue", sz:24 }), { bg:DB, w:4700 }),
            cell(cp("PROVIDER", { color:WH, bold:true, font:"Bebas Neue", sz:24 }), { bg:EB, w:4700 }),
          ]}),
          new TableRow({ children: [
            cell([
              cp(CLIENT.name,    { bold:true, sz:22, color:DB }),
              cp(`Contact: ${CLIENT.contact}`, { sz:20 }),
              ...(CLIENT.email ? [cp(CLIENT.email, { sz:20 })] : []),
            ], { bg:LG, w:4700 }),
            cell([
              cp("ProofPilot",               { bold:true, sz:22, color:DB }),
              cp("Digital Marketing Agency", { sz:20 }),
              cp("marcos@getproofpilot.com", { sz:20 }),
              cp("matthew@getproofpilot.com",{ sz:20 }),
            ], { bg:WH, w:4700 }),
          ]}),
        ],
      }),

      gap(200),

      // Key details row
      new Table({
        width: { size:100, type:WidthType.PERCENTAGE },
        columnWidths: [2350, 2350, 2350, 2350],
        rows: [
          new TableRow({ children: [
            cell(cp("EFFECTIVE DATE", { color:WH, bold:true, font:"Bebas Neue", sz:18 }), { bg:DB }),
            cell(cp("PACKAGE",        { color:WH, bold:true, font:"Bebas Neue", sz:18 }), { bg:DB }),
            cell(cp("TIMELINE",       { color:WH, bold:true, font:"Bebas Neue", sz:18 }), { bg:DB }),
            cell(cp("INVESTMENT",     { color:WH, bold:true, font:"Bebas Neue", sz:18 }), { bg:DB }),
          ]}),
          new TableRow({ children: [
            cell(cp(ENGAGEMENT.effectiveDate, { sz:20, color:DB, bold:true }), { bg:LG }),
            cell(cp(ENGAGEMENT.packageName.split(" ").slice(0,2).join(" "), { sz:20, color:DB, bold:true }), { bg:LG }),
            cell(cp(ENGAGEMENT.timeline,  { sz:20, color:DB, bold:true }), { bg:LG }),
            cell(cp(ENGAGEMENT.investment,{ sz:20, color:DB, bold:true }), { bg:LG }),
          ]}),
        ],
      }),

      gap(240),

      // WHAT YOU GET box
      new Table({
        width: { size:100, type:WidthType.PERCENTAGE },
        columnWidths: [9400],
        rows: [new TableRow({ children: [cell([
          cp("WHAT YOU GET", { color:NG, bold:true, font:"Bebas Neue", sz:30, before:160, after:120 }),
          // 3-column inner checklist table
          new Table({
            width: { size:100, type:WidthType.PERCENTAGE },
            columnWidths: [3100, 3100, 3100],
            borders: { insideH:{style:BorderStyle.NONE}, insideV:{style:BorderStyle.NONE},
                       top:{style:BorderStyle.NONE}, bottom:{style:BorderStyle.NONE},
                       left:{style:BorderStyle.NONE}, right:{style:BorderStyle.NONE} },
            rows: [0, 1, 2].map(row =>
              new TableRow({ children: [0, 1, 2].map(col => {
                const idx = row * 3 + col;
                return cell(
                  cp(`\u2713  ${DELIVERABLES[idx] || ""}`, { color:WH, sz:20 }),
                  { noBorder:true }
                );
              })})
            ),
          }),
          cp("", { before:120, after:0 }),
        ], { bg:DB })]})],
      }),

      // ════════════════════════════════════════════════════════════════════
      // 1. SCOPE OF WORK
      // ════════════════════════════════════════════════════════════════════
      br(),
      h1("1. SCOPE OF WORK"),
      body("Provider agrees to deliver the following services as part of the engagement:"),

      // — WEBSITE SCOPE EXAMPLE — replace or remove sections as needed —
      gap(100),
      h2("1.1  CUSTOM WEBSITE DESIGN"),
      bul(null, "Custom visual design built around the client brand — direction confirmed at kickoff"),
      bul(null, "Mobile-responsive layout tested across all major devices and browsers"),
      bul(null, "WordPress build — client owns the site outright upon completion"),

      gap(60),
      h2("1.2  WEBSITE PAGES"),
      body("Final page topics confirmed at kickoff. Included page types:"),
      bul("Homepage",            "Custom hero, value proposition, services overview, and CTA"),
      bul("About / Bio Page",    "Credentials, background, and what clients can expect"),
      bul("Service Pages",       "One dedicated, keyword-optimized page per service — topics confirmed at kickoff"),
      bul("Location Pages",      "Geo-targeted pages — locations confirmed at kickoff"),
      bul("Contact / Booking",   "Intake form and scheduling integration"),
      bul("FAQs Page",           "Common questions about the practice and process"),
      bul("Testimonials Page",   "Client testimonials"),
      bul("Blog Index Page",     "Blog section integrated and ready to publish"),

      gap(60),
      h2("1.3  FUNCTIONAL FEATURES"),
      bul(null, "Contact form with intake fields"),
      bul(null, "Scheduling integration (client provides account login or embed code)"),
      bul(null, "Google Maps embed on Contact and Location pages"),
      bul(null, "Social media links and SSL certificate configuration"),

      gap(60),
      h2("1.4  SEO FOUNDATION"),
      bul(null, "Keyword research for all service and location pages"),
      bul(null, "Optimized title tags, meta descriptions, and heading structure"),
      bul(null, "SEO-friendly URL structure, internal linking, and image alt text"),
      bul(null, "Schema markup, Google Search Console, and Google Analytics setup"),

      gap(60),
      h2("1.5  BLOG SETUP + 3 FREE POSTS"),
      bul(null, "Blog section built into the site and ready to publish at launch"),
      bul(null, "3 SEO-optimized posts written by ProofPilot — topics confirmed at kickoff"),

      gap(60),
      h2("1.6  LAUNCH & HANDOFF"),
      bul(null, "Cross-device and cross-browser QA testing"),
      bul(null, "Final client review and approval before go-live"),
      bul(null, "Site launched on client-controlled hosting"),
      bul(null, "WordPress CMS walkthrough and full credential handoff"),

      // ════════════════════════════════════════════════════════════════════
      // 2. INVESTMENT AND PAYMENT TERMS
      // ════════════════════════════════════════════════════════════════════
      br(),
      h1("2. INVESTMENT AND PAYMENT TERMS"),
      gap(80),

      // Investment table
      (() => {
        const widths = [7200, 2200];
        const rows = [hdrRow(["DESCRIPTION", "AMOUNT"], widths)];
        INVESTMENT_ROWS.forEach((row, i) => {
          const isTotal = i === INVESTMENT_ROWS.length - 1;
          rows.push(new TableRow({ children: [
            cell(cp(row[0], { bold:isTotal, color:isTotal?WH:BK,
                              font: isTotal ? "Bebas Neue" : "Calibri", sz: isTotal ? 24 : 20 }),
                 { bg: isTotal ? DB : (i%2===0 ? LG : WH), w:widths[0] }),
            cell(cp(row[1], { bold:isTotal, color:isTotal?NG:BK,
                              font: isTotal ? "Bebas Neue" : "Calibri", sz: isTotal ? 24 : 20,
                              align: AlignmentType.RIGHT }),
                 { bg: isTotal ? DB : (i%2===0 ? LG : WH), w:widths[1] }),
          ]}));
        });
        return new Table({ width:{size:100,type:WidthType.PERCENTAGE}, columnWidths:widths, rows });
      })(),

      gap(200),
      h2("2.1  PAYMENT SCHEDULE"),
      gap(80),

      // Payment schedule table
      (() => {
        const widths = [600, 4800, 2400, 1600];
        return new Table({
          width: { size:100, type:WidthType.PERCENTAGE },
          columnWidths: widths,
          rows: [
            hdrRow(["#", "MILESTONE", "DUE", "AMOUNT"], widths, EB),
            ...PAYMENT_SCHEDULE.map(([milestone, due, amount], i) =>
              new TableRow({ children: [
                cell(cp(String(i+1), { bold:true, color:DB, sz:20 }), { bg:LG, w:widths[0] }),
                cell(cp(milestone, { sz:20 }),  { bg:LG, w:widths[1] }),
                cell(cp(due, { sz:20 }),        { bg:LG, w:widths[2] }),
                cell(cp(amount, { sz:20, bold:true }), { bg:LG, w:widths[3] }),
              ]})
            ),
          ],
        });
      })(),

      gap(120),
      body("Payment is accepted via ACH, wire transfer, or credit card. Work begins upon receipt of payment. ProofPilot will issue an invoice upon signing."),

      // ════════════════════════════════════════════════════════════════════
      // 3. PROJECT TIMELINE
      // ════════════════════════════════════════════════════════════════════
      br(),
      h1("3. PROJECT TIMELINE"),
      gap(80),

      (() => {
        const widths = [1600, 1600, 6200];
        return new Table({
          width: { size:100, type:WidthType.PERCENTAGE },
          columnWidths: widths,
          rows: [
            hdrRow(["PHASE", "TIMING", "ACTIVITIES"], widths),
            ...TIMELINE.map(([phase, timing, activities], i) => {
              const bg = i % 2 === 0 ? LG : WH;
              return new TableRow({ children: [
                cell(cp(phase,      { bold:true, color:DB, sz:20 }), { bg, w:widths[0] }),
                cell(cp(timing,     { sz:20 }),                       { bg, w:widths[1] }),
                cell(cp(activities, { sz:20 }),                       { bg, w:widths[2] }),
              ]});
            }),
          ],
        });
      })(),

      // ════════════════════════════════════════════════════════════════════
      // 4. TERMS AND CONDITIONS
      // ════════════════════════════════════════════════════════════════════
      br(),
      h1("4. TERMS AND CONDITIONS"),

      h2("4.1  CLIENT RESPONSIBILITIES"),
      body("Client agrees to:"),
      bul(null, "Provide feedback within 3 business days of receiving deliverables"),
      bul(null, "Provide all required content, images, logos, and brand assets within 5 business days of signing"),
      bul(null, "Designate a single point of contact for project communications"),
      bul(null, "Provide access to hosting, domain, scheduling platform, and any relevant accounts"),

      gap(80),
      h2("4.2  PROVIDER RESPONSIBILITIES"),
      body("Provider agrees to:"),
      bul(null, "Deliver all services outlined in the Scope of Work"),
      bul(null, "Maintain regular communication and provide progress updates throughout the project"),
      bul(null, "Meet agreed-upon deadlines, barring delays caused by Client"),

      gap(80),
      h2("4.3  ACCEPTANCE CRITERIA"),
      body("Client has 7 business days to review and approve each deliverable. If no response is received within 7 business days, the deliverable will be considered approved. Revision requests must be submitted in writing within this period."),

      gap(80),
      h2("4.4  REVISIONS AND CHANGES"),
      body("This agreement includes one round of revisions per major project phase. Additional revisions or scope changes require a written change order and will be quoted separately before work begins."),

      gap(80),
      h2("4.5  CONTENT DELAYS"),
      body("If missing client materials cause the project to stall for more than 30 consecutive days, the project will be placed on hold. Restarting a paused project may incur a $500 restart fee and a revised timeline."),

      gap(80),
      h2("4.6  INTELLECTUAL PROPERTY"),
      body("Upon final payment, Client owns all custom code, designs, and content created for this project. Provider retains ownership of its proprietary tools, frameworks, and methodologies. Provider retains the right to reference this work in its portfolio unless Client requests otherwise in writing."),

      gap(80),
      h2("4.7  CONFIDENTIALITY"),
      body("Both parties agree to keep confidential any proprietary information shared during the project, including business strategies, client data, and technical implementations."),

      gap(80),
      h2("4.8  LIMITATION OF LIABILITY"),
      body("Provider's total liability under this agreement shall not exceed the total amount paid by Client. Provider is not liable for any indirect, incidental, or consequential damages. Provider does not guarantee specific search rankings, traffic volumes, or client acquisition outcomes."),

      gap(80),
      h2("4.9  TERMINATION"),
      body("Either party may terminate this agreement with 14 days written notice. Upon termination: Client pays for all work completed to date; Provider delivers all completed work and assets to Client."),

      gap(80),
      h2("4.10  DISPUTE RESOLUTION"),
      body("Any disputes will first be addressed through good-faith negotiation. If unresolved, disputes will be settled through binding arbitration."),

      // ════════════════════════════════════════════════════════════════════
      // 5. SIGNATURES
      // ════════════════════════════════════════════════════════════════════
      br(),
      h1("5. AGREEMENT AND SIGNATURES"),
      body("By signing below, both parties agree to the terms outlined in this Statement of Work and Service Agreement."),
      gap(160),

      new Table({
        width: { size:100, type:WidthType.PERCENTAGE },
        columnWidths: [4600, 200, 4600],
        rows: [
          new TableRow({ children: [
            cell(cp(`CLIENT: ${CLIENT.name.toUpperCase()}`, { color:WH, bold:true, font:"Bebas Neue", sz:26 }), { bg:DB }),
            cell(cp(""), { bg:WH, noBorder:true }),
            cell(cp("PROVIDER: PROOFPILOT",               { color:WH, bold:true, font:"Bebas Neue", sz:26 }), { bg:EB }),
          ]}),
          ...["Signature:", "Printed Name:", "Title:", "Date:"].map((label, i) =>
            new TableRow({ children: [
              cell([cp(label, { color:MG, bold:true, sz:18 }),
                    cp("_________________________________", { color:LG, sz:20 })],
                   { bg: i%2===0 ? LG : WH }),
              cell(cp(""), { bg:WH, noBorder:true }),
              cell([cp(label, { color:MG, bold:true, sz:18 }),
                    cp("_________________________________", { color:LG, sz:20 })],
                   { bg: i%2===0 ? LG : WH }),
            ]})
          ),
        ],
      }),

      gap(400),

      // Final CTA bar
      new Table({
        width: { size:100, type:WidthType.PERCENTAGE },
        columnWidths: [9400],
        rows: [new TableRow({ children: [cell([
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before:160, after:60 },
            children: [
              run("PAYMENT DUE UPON SIGNING  ", { font:"Bebas Neue", sz:32, color:NG, bold:true }),
              run("|",  { font:"Bebas Neue", sz:32, color:WH }),
              run(`  ${INVESTMENT_ROWS[INVESTMENT_ROWS.length - 1][1]}`,
                  { font:"Bebas Neue", sz:32, color:NG, bold:true }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before:0, after:160 },
            children: [run(
              "Sign and return to get started. Invoice and kickoff questionnaire follow within one business day.",
              { color:WH, sz:20 }
            )],
          }),
        ], { bg:DB })]})],
      }),

    ],
  }],
});

// ── WRITE FILE ────────────────────────────────────────────────────────────────
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT, buf);
  console.log("Saved:", OUTPUT);
});
