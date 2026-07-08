#!/usr/bin/env node
// Amped Lead Gen - Program Overview Generator
// Matches the Pelican Coast Electric document exactly
// Uses ProofPilot brand system (Bebas Neue, Dark Blue / Electric Blue / Neon Green)
//
// Usage: node generate-overview.js '{"company":"X","owner":"Y","location":"City, ST","serviceArea":"20-30 mile radius from Newport Beach","coverageNotes":"Coastal coverage including Manhattan Beach, Redondo, Torrance area","email":"info@company.com","monthlyFee":1200}' [output-path]

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, PageNumber, BorderStyle, WidthType,
        ShadingType, PageBreak } = require('docx');
const fs = require('fs');

// ── Config ──────────────────────────────────────────────────────────────────
const config = JSON.parse(process.argv[2]);
const { company, owner, location, serviceArea, coverageNotes, email, monthlyFee } = config;
const outputPath = process.argv[3] || '/tmp/amped-overview-output.docx';

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const now = new Date();
const currentDate = `${months[now.getMonth()]} ${now.getFullYear()}`;

// Projections (hardcoded $65 CPL for both EV and panel leads)
const CPL = 65;
const estLeads = Math.round(monthlyFee / CPL);
const estEstimates = Math.round(estLeads * 0.6);
const jobsLow = Math.max(1, Math.floor(estLeads * 0.10));
const jobsHigh = Math.max(1, Math.floor(estLeads * 0.15));
const avgJobLow = 4000;
const avgJobHigh = 5000;
const revLow = jobsLow * 4500;
const revHigh = jobsHigh * 4500;
const roiLow = Math.floor(revLow / monthlyFee);
const roiHigh = Math.floor(revHigh / monthlyFee);
function fmt(n) { return '$' + n.toLocaleString(); }

// ── Brand Colors (ProofPilot) ───────────────────────────────────────────────
const ELECTRIC_BLUE = "0051FF";
const DARK_BLUE = "00184D";
const NEON_GREEN = "C8FF00";
const BLACK = "000000";
const MEDIUM_GRAY = "666666";
const WHITE = "FFFFFF";

// ── Table Helpers ───────────────────────────────────────────────────────────
const bdr = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: bdr, bottom: bdr, left: bdr, right: bdr };

function hdrRow(texts, widths, bg) {
  return new TableRow({
    children: texts.map((t, i) => new TableCell({
      borders, shading: { fill: bg, type: ShadingType.CLEAR },
      width: { size: widths[i], type: WidthType.DXA },
      children: [new Paragraph({ spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: t, bold: true, color: WHITE, font: "Calibri", size: 24 })]
      })]
    }))
  });
}

function dataRow(texts, widths, opts = {}) {
  const { bg = WHITE, color = BLACK, bold = false } = opts;
  return new TableRow({
    children: texts.map((t, i) => new TableCell({
      borders, shading: { fill: bg, type: ShadingType.CLEAR },
      width: { size: widths[i], type: WidthType.DXA },
      children: [new Paragraph({ spacing: { before: 80, after: 80 },
        children: [new TextRun({ text: t, color, font: "Calibri", size: 24, bold })]
      })]
    }))
  });
}

function tbl(rows, widths) {
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: widths, rows });
}

// Typography matched to Pelican Coast doc (EMU-verified sizes in half-points)
function h1(text) {
  return new Paragraph({ spacing: { before: 350, after: 150 },
    children: [new TextRun({ text, bold: true, color: DARK_BLUE, font: "Bebas Neue", size: 46 })]
  });
}

function h2(text) {
  return new Paragraph({ spacing: { before: 250, after: 120 },
    children: [new TextRun({ text, bold: true, color: ELECTRIC_BLUE, font: "Bebas Neue", size: 38 })]
  });
}

function h3(text) {
  return new Paragraph({ spacing: { before: 180, after: 80 },
    children: [new TextRun({ text, bold: true, color: BLACK, font: "Bebas Neue", size: 32 })]
  });
}

function body(text) {
  return new Paragraph({ spacing: { before: 0, after: 150 },
    children: [new TextRun({ text, color: BLACK, font: "Calibri", size: 28 })]
  });
}

function tagline(text) {
  return new Paragraph({ spacing: { before: 0, after: 200 },
    children: [new TextRun({ text, italics: true, color: MEDIUM_GRAY, font: "Calibri", size: 30 })]
  });
}

function boldBody(boldText, normalText) {
  return new Paragraph({ spacing: { before: 0, after: 150 },
    children: [
      new TextRun({ text: boldText, bold: true, color: BLACK, font: "Calibri", size: 28 }),
      new TextRun({ text: ' ' + normalText, color: BLACK, font: "Calibri", size: 28 })
    ]
  });
}

function bullet(text) {
  return new Paragraph({ spacing: { before: 0, after: 80 }, indent: { left: 360 },
    children: [new TextRun({ text: `\u2022  ${text}`, color: BLACK, font: "Calibri", size: 28 })]
  });
}

function pb() { return new Paragraph({ children: [new PageBreak()] }); }

// Column widths (total = 9400 DXA for US Letter with 1" margins)
const w2 = [4700, 4700];
const w3 = [3000, 3200, 3200];
const wFull = [9400];

// ── Cover Section ───────────────────────────────────────────────────────────
const cover = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 800, after: 0 },
    children: [new TextRun({ text: "PREMIUM", bold: true, color: ELECTRIC_BLUE, font: "Bebas Neue", size: 50 })]
  }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 100 },
    children: [new TextRun({ text: "LEAD GENERATION PROGRAM", bold: true, color: DARK_BLUE, font: "Bebas Neue", size: 78 })]
  }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 400 },
    children: [new TextRun({ text: "High-Ticket Electrical Leads, Delivered Exclusively to You", italics: true, color: MEDIUM_GRAY, font: "Calibri", size: 30 })]
  }),
  // Info table
  tbl([
    dataRow(["Prepared For:", `  ${owner}, ${company}`], w2),
    dataRow(["Location:", `  ${location}`], w2),
    dataRow(["Date:", `  ${currentDate}`], w2),
    dataRow(["Prepared By:", "  Amped (Matthew Anderson)"], w2),
  ], w2),
  new Paragraph({ spacing: { before: 300, after: 0 }, children: [] }),
  // Value prop box
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: wFull,
    rows: [new TableRow({
      children: [new TableCell({
        borders, shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
        width: { size: 9400, type: WidthType.DXA },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 150 },
            children: [new TextRun({ text: "WHAT YOU GET", bold: true, color: NEON_GREEN, font: "Bebas Neue", size: 38 })]
          }),
          ...[
            "Exclusive, high-ticket EV charger leads for your territory",
            "Panel upgrade leads also available when you are ready to add them",
            "Real-time lead delivery via portal, email, and SMS",
            "Credit-based billing with full transparency",
            "No contracts, no commitments. Adjust your budget anytime.",
            "Dedicated support and monthly performance reviews"
          ].map(item => new Paragraph({ spacing: { before: 40, after: 40 }, indent: { left: 400 },
            children: [new TextRun({ text: `\u2713  ${item}`, color: WHITE, font: "Calibri", size: 28 })]
          })),
          new Paragraph({ spacing: { before: 100, after: 0 }, children: [] })
        ]
      })]
    })]
  })
];

// ── Section 1: Program Overview ─────────────────────────────────────────────
const section1 = [
  pb(),
  h1("SECTION 1: PROGRAM OVERVIEW"),
  tagline("How our premium lead generation engine works for you."),
  body("We build high-converting advertising funnels for specific high-ticket electrical services. We capture leads from homeowners actively searching for EV charger installations and deliver them directly to you in real time."),
  body("This is not a shared lead marketplace. Every lead we send you is exclusive to your territory. No other electrician receives the same lead. You get first contact, every time."),

  h2("HOW IT WORKS"),
  boldBody("We Run Targeted Ads on Meta (Facebook/Instagram)", "targeting homeowners in your service area who need EV charger installations."),
  boldBody("Homeowners Fill Out a Qualification Form", "with their project details, timeline, home ownership status, and contact info."),
  boldBody("You Receive the Lead Instantly", "via your portal dashboard, email notification, and SMS (once verified). Most leads come in during the evening hours."),
  boldBody("You Contact the Homeowner", "and close the deal. Your territory, your lead, your customer."),

  h2("LEAD QUALITY METRICS"),
  tagline("Based on current campaign data from our Southern California funnels."),
  tbl([
    hdrRow(["Metric", "Performance"], w2, DARK_BLUE),
    dataRow(["Lead-to-Estimate Rate", "~60% of leads book an estimate"], w2),
    dataRow(["Lead-to-Close Rate", "10-15% of leads convert to paid jobs"], w2),
    dataRow(["Average Job Value", "$4,000 - $5,000 per EV charger installation"], w2),
    dataRow(["Panel Upgrade Add-On", "~45% of EV jobs also need a panel upgrade"], w2),
    dataRow(["Lead Exclusivity", "100%. One electrician per territory."], w2),
  ], w2),
  body("In areas with older housing stock, the panel upgrade rate runs even higher. One of our electricians in LA averages $8,000 per EV charger lead because nearly every job includes a panel upgrade."),

  h2("PRICING"),
  tbl([
    hdrRow(["Item", "Details"], w2, ELECTRIC_BLUE),
    dataRow(["EV Charger Lead", "$65 per lead"], w2),
    dataRow(["Panel Upgrade Lead", "Available. Ask your account manager for details."], w2),
    dataRow(["Billing Model", "Credit-based (prepaid balance)"], w2),
    dataRow(["Minimum Budget", "None. Start with any amount."], w2),
    dataRow(["Contract Length", "None. Month-to-month, cancel anytime."], w2),
  ], w2),
];

// ── Section 2: Your Kickoff Plan ────────────────────────────────────────────
const section2 = [
  pb(),
  h1("SECTION 2: YOUR KICKOFF PLAN"),
  tagline("Everything agreed upon for your first month with Amped Leads."),

  h2("ACCOUNT DETAILS"),
  tbl([
    hdrRow(["Detail", "Your Setup"], w2, DARK_BLUE),
    dataRow(["Company", company], w2),
    dataRow(["Owner", owner], w2),
    dataRow(["Service Area", `${location} (${serviceArea})`], w2),
    ...(coverageNotes ? [dataRow(["Coverage Notes", coverageNotes], w2)] : []),
    dataRow(["Lead Type", "EV Charger Installations"], w2),
    dataRow(["Cost Per Lead", `$${CPL}`], w2),
    dataRow(["Starting Budget", fmt(monthlyFee)], w2),
    dataRow(["Expected Leads", `~${estLeads} leads in your first month`], w2),
  ], w2),

  h2("BUDGET BREAKDOWN"),
  body(`Your ${fmt(monthlyFee)} starting budget works like a prepaid account. Each lead delivered costs $${CPL}, deducted from your balance automatically. You can see your balance, lead history, and account activity in your portal at any time.`),
  tbl([
    hdrRow(["Item", "Amount", "Notes"], w3, ELECTRIC_BLUE),
    dataRow(["Starting Balance", fmt(monthlyFee), "Deposited to your account"], w3),
    dataRow(["Cost Per Lead", `$${CPL}`, "Deducted per lead delivered"], w3),
    dataRow(["Est. Leads (Month 1)", `~${estLeads}`, "Based on current campaign performance"], w3),
    dataRow(["Budget Adjustable?", "Yes", "Increase or decrease anytime"], w3),
  ], w3),

  h2("ROI PROJECTION"),
  tagline("Conservative estimate based on your service area and pricing."),
  tbl([
    hdrRow(["Scenario", "Numbers"], w2, DARK_BLUE),
    dataRow(["Leads Delivered", `~${estLeads}`], w2),
    dataRow(["Estimates Booked (60%)", `~${estEstimates} estimates`], w2),
    dataRow(["Jobs Closed (10-15%)", `${jobsLow}-${jobsHigh} jobs`], w2),
    dataRow(["Avg Job Value", "$4,500 (higher with panel upgrades)"], w2),
    dataRow(["Revenue from Leads", `${fmt(revLow)} - ${fmt(revHigh)}`], w2),
    dataRow(["Your Lead Spend", fmt(monthlyFee)], w2),
    dataRow(["Potential ROI", `${roiLow}X - ${roiHigh}X return on lead spend`], w2, { bold: true }),
  ], w2),

  h2("YOUR PORTAL ACCESS"),
  body("You have a dedicated lead portal where you track everything in real time. Here is what you get:"),
  bullet("Real-time lead dashboard showing every lead delivered to you"),
  bullet("Account balance tracker with full transaction history"),
  bullet(`Email notifications for every new lead (sent to ${email})`),
  bullet("SMS notifications (pending phone number verification)"),
  bullet("Lead details include: name, phone, email, address, project specifics"),
  new Paragraph({ spacing: { before: 150, after: 0 }, children: [] }),
  body("Important: Most leads come in during evening hours since homeowners fill out forms after work. Speed to contact is the single biggest factor in closing these leads. Respond as fast as possible when a new lead arrives."),
];

// ── Section 3: Available Lead Types ─────────────────────────────────────────
const section3 = [
  pb(),
  h1("SECTION 3: AVAILABLE LEAD TYPES"),
  tagline("Your starting lead type and additional options available now."),

  h3("EV Charger Installation Leads (Your Starting Lead Type)"),
  body("This is your primary lead type. Homeowners actively searching for EV charger installations in your territory. These leads convert at a high rate and frequently include panel upgrade work, increasing the average ticket value."),

  h3("Panel Upgrade Leads (Available Now)"),
  body("We also have panel upgrade leads available as a separate lead type. These are homeowners specifically searching for electrical panel upgrades, 200-amp service, or main panel replacements. If you want to add panel upgrade leads to your account, reach out and we will set it up. You can run both lead types at the same time with separate budgets."),

  h3("Coming Soon: Appointment Booking Service"),
  body("We are building a sales team to call your leads and book confirmed appointments directly onto your calendar. This removes the follow-up work from your plate. Instead of receiving a raw lead and chasing it down, you get a confirmed appointment with a homeowner who is ready for an estimate."),
  body("This service will be available as an optional add-on. We will share pricing and details once it launches."),

  h3("Coming Soon: Additional Lead Types"),
  body("We are building funnels for additional high-ticket electrical services including whole-home generators and residential rewiring. As new funnels go live, you will have the option to add them to your account."),
];

// ── Section 4: Terms & Conditions ───────────────────────────────────────────
const section4 = [
  pb(),
  h1("SECTION 4: TERMS & CONDITIONS"),
  tagline("Clear, straightforward terms. No fine print."),

  h2("LEAD DELIVERY & BILLING"),
  tbl([
    hdrRow(["Term", "Details"], w2, DARK_BLUE),
    dataRow(["Billing Model", "Prepaid credit system. Leads deducted from your balance as delivered."], w2),
    dataRow(["Lead Cost", `$${CPL} per EV charger lead.`], w2),
    dataRow(["Lead Delivery", "Real-time via portal, email, and SMS."], w2),
    dataRow(["Lead Info", "Name, phone, email, address, and project details when available."], w2),
    dataRow(["Payment", "Invoice sent for deposit. Paid like your existing SEO invoice."], w2),
  ], w2),

  h2("TERRITORY & EXCLUSIVITY"),
  tbl([
    hdrRow(["Term", "Details"], w2, ELECTRIC_BLUE),
    dataRow(["Your Territory", `${serviceArea} (${location}).`], w2),
    dataRow(["Exclusivity", "All leads in your territory go to you. No sharing."], w2),
    dataRow(["Territory Changes", "Request adjustments anytime. We will dial it in as data comes in."], w2),
  ], w2),

  h2("DISPUTES & REFUNDS"),
  tbl([
    hdrRow(["Term", "Details"], w2, DARK_BLUE),
    dataRow(["Dispute Window", "48 hours from lead delivery to flag a bad lead."], w2),
    dataRow(["Valid Disputes", "Fake info or duplicate lead."], w2),
    dataRow(["Resolution", "Verified bad leads are credited back to your balance."], w2),
    dataRow(["How to Dispute", "Flag directly in your portal or contact your account manager."], w2),
  ], w2),

  h2("COMMITMENT & CANCELLATION"),
  tbl([
    hdrRow(["Term", "Details"], w2, ELECTRIC_BLUE),
    dataRow(["Contract", "None. No long-term commitment required."], w2),
    dataRow(["Budget Changes", "Increase or decrease your budget at any time."], w2),
    dataRow(["Pause Service", "Pause lead delivery anytime. Your balance carries over."], w2),
    dataRow(["Cancel", "Cancel anytime. Remaining balance is refundable."], w2),
  ], w2),
];

// ── Section 5: Getting Started ──────────────────────────────────────────────
const section5 = [
  pb(),
  h1("SECTION 5: GETTING STARTED"),
  tagline("Your next steps to start receiving leads."),
  boldBody("Fund Your Account", `with your ${fmt(monthlyFee)} starting budget. You will receive an invoice to pay, same as your SEO invoices.`),
  boldBody("Verify Your Phone Number", "for SMS lead notifications so you never miss a lead."),
  boldBody("Check Your Portal", "to confirm your account is active and notifications are working."),
  boldBody("Respond Fast", "when leads arrive. Speed to contact is the biggest factor in closing. Most leads come in during the evening."),
  boldBody("Give Us Feedback", "on lead quality so we can optimize your campaigns and dial in your territory."),
  boldBody("Scale When Ready", "by increasing your budget or adding panel upgrade leads to your account."),
  new Paragraph({ spacing: { before: 400, after: 0 }, children: [] }),
  // CTA box
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE }, columnWidths: wFull,
    rows: [new TableRow({
      children: [new TableCell({
        borders, shading: { fill: DARK_BLUE, type: ShadingType.CLEAR },
        width: { size: 9400, type: WidthType.DXA },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 150 },
            children: [new TextRun({ text: "READY TO START GETTING LEADS?", bold: true, color: NEON_GREEN, font: "Bebas Neue", size: 46 })]
          }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 80 },
            children: [new TextRun({ text: "Your account is set up and ready to go.", color: WHITE, font: "Calibri", size: 28 })]
          }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 80 },
            children: [new TextRun({ text: "Fund your balance and leads start flowing.", color: WHITE, font: "Calibri", size: 28 })]
          }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 150, after: 80 },
            children: [new TextRun({ text: "Questions? Reach out anytime.", color: WHITE, font: "Calibri", size: 28 })]
          }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 200 },
            children: [new TextRun({ text: "matthew@getproofpilot.com", color: WHITE, font: "Calibri", size: 28 })]
          }),
        ]
      })]
    })]
  }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 0 },
    children: [new TextRun({ text: "Amped | Premium Lead Generation for Home Service Businesses", color: MEDIUM_GRAY, font: "Calibri", size: 26, italics: true })]
  }),
];

// ── Document Assembly ───────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 28 } } },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: "AMPED", bold: true, color: DARK_BLUE, font: "Bebas Neue", size: 22 }),
            new TextRun({ text: " | Lead Gen Program Overview", color: MEDIUM_GRAY, font: "Calibri", size: 22 })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 22, color: MEDIUM_GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], size: 22, color: MEDIUM_GRAY }),
            new TextRun({ text: " of ", size: 22, color: MEDIUM_GRAY }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 22, color: MEDIUM_GRAY })
          ]
        })]
      })
    },
    children: [...cover, ...section1, ...section2, ...section3, ...section4, ...section5]
  }]
});

// ── Export ───────────────────────────────────────────────────────────────────
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created: ${outputPath}`);
}).catch(err => {
  console.error('Error generating document:', err.message);
  process.exit(1);
});
