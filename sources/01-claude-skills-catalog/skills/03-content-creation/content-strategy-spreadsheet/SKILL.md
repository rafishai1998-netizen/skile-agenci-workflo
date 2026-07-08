---
name: content-strategy-spreadsheet
description: Create comprehensive content strategy spreadsheets with strategic thinking methodology. Builds complete content ecosystems including Strategy Overview, Customer Psychographic Profiles (with 8-factor scoring matrices), Content Hub (pillar/supporting/research/tool categorization), Interactive Tools inventory, E-books & Guides library, and Implementation Roadmap. Triggers on requests for content strategy, content planning, topic clusters, hub-and-spoke content, audience psychographics, conversion funnels, or editorial calendars. Creates professionally styled .xlsx files with conditional color-coding, type badges, funnel stage indicators, and search volume visualization.
---

# Content Strategy Spreadsheet Creator

Build comprehensive content strategy spreadsheets for any business.

## When to Use This Skill

Trigger phrases:
- "Create a content strategy for..."
- "Build a content plan..."
- "Topic cluster strategy..."
- "Hub and spoke content..."
- "Content calendar for..."
- "Audience psychographics..."
- "Conversion funnel content..."

## Workflow

### Phase 1: Discovery

Before building, gather this information from the user:

1. Business name and what they sell
2. Primary conversion action (buy, sign up, book call, etc.)
3. 2-4 target audience segments
4. 3-5 main topic areas to cover
5. Current content assets (if any)

Ask these questions conversationally. Do not ask all at once.

### Phase 2: Strategic Planning

Read references/strategic-framework.md for methodology.

For each audience segment, map:
- Pain points (what frustrates them)
- Motivations (what they want to achieve)
- Objections (what holds them back)
- Psychographic factors (scored 1-5)

For content planning:
- Pillar content: comprehensive topic guides (1 per cluster)
- Supporting content: specific subtopics (10-20 per pillar)
- Research content: original data and insights
- Tools: calculators, assessments, quizzes

### Phase 3: Build the Spreadsheet

Create JSON data file, then run the builder script.

## JSON Data Structure

```json
{
  "brand_name": "Company Name",
  "subtitle": "Content Strategy for [Goal]",
  "opportunity": "2-3 sentence market opportunity description",
  
  "funnel": [
    {
      "stage": "AWARENESS",
      "goal": "Attract qualified prospects",
      "content": "Educational content, how-to guides, industry basics",
      "cta": "Subscribe / Download Guide"
    },
    {
      "stage": "CONSIDERATION", 
      "goal": "Build trust and demonstrate expertise",
      "content": "Comparison content, case studies, detailed guides",
      "cta": "Book Consultation / Free Trial"
    },
    {
      "stage": "DECISION",
      "goal": "Convert to customers",
      "content": "Product demos, pricing guides, testimonials",
      "cta": "Buy Now / Get Started"
    }
  ],
  
  "audiences": [
    {
      "name": "Segment Name",
      "percentage": "40%",
      "description": "Brief description of this audience",
      "content_needs": "What content they need most"
    }
  ],
  
  "pillars": [
    {
      "name": "Topic Pillar Name",
      "topics": "Subtopics covered",
      "product": "Related product/service",
      "conversion": "How this leads to conversion"
    }
  ],
  
  "profiles": [
    {
      "name": "Audience Persona Name",
      "percentage": "40%",
      "description": "Detailed description of this persona",
      "demographics": "Age 35-50 | Income $75K+ | Urban professionals",
      "pain_points": [
        "Pain point 1",
        "Pain point 2",
        "Pain point 3"
      ],
      "motivations": [
        "Motivation 1",
        "Motivation 2"
      ],
      "objections": [
        "Common objection 1",
        "Common objection 2"
      ],
      "psychographic_factors": [
        {"factor": "Risk Tolerance", "score": 3, "notes": "Moderate risk appetite"},
        {"factor": "Educational Investment", "score": 5, "notes": "Values learning"},
        {"factor": "Available Resources", "score": 4, "notes": "Has budget"},
        {"factor": "Self-Direction", "score": 4, "notes": "Prefers DIY"},
        {"factor": "Time Availability", "score": 2, "notes": "Very busy"},
        {"factor": "Patience Level", "score": 3, "notes": "Wants results"},
        {"factor": "Technical Comfort", "score": 4, "notes": "Tech savvy"},
        {"factor": "Decision Speed", "score": 3, "notes": "Researches first"}
      ],
      "authority_hook": "What proof or data converts this audience"
    }
  ],
  
  "content_sections": [
    {
      "name": "Topic Cluster Name",
      "volume": "15,000+",
      "description": "Description of this content cluster",
      "items": [
        {
          "type": "Pillar",
          "title": "Ultimate Guide to [Topic]",
          "url": "/topic-guide",
          "primary_keyword": "main keyword",
          "secondary_keywords": "related, keywords, here",
          "est_volume": 5400,
          "topical_volume": "15K+",
          "stage": "Awareness",
          "profile": "Target Persona"
        },
        {
          "type": "Supporting",
          "title": "How to [Specific Subtopic]",
          "url": "/subtopic-guide",
          "primary_keyword": "subtopic keyword",
          "secondary_keywords": "more, keywords",
          "est_volume": 1200,
          "topical_volume": "",
          "stage": "Consideration",
          "profile": "Target Persona"
        }
      ]
    }
  ],
  
  "tools": [
    {
      "type": "Calculator",
      "name": "ROI Calculator",
      "url": "/roi-calculator",
      "primary_keyword": "roi calculator",
      "volume": 2400,
      "stage": "Consideration",
      "target_profile": "Target Persona",
      "purpose": "Helps prospects calculate potential returns"
    },
    {
      "type": "Assessment",
      "name": "Readiness Assessment",
      "url": "/assessment",
      "primary_keyword": "readiness quiz",
      "volume": 880,
      "stage": "Awareness",
      "target_profile": "Target Persona",
      "purpose": "Segments leads by readiness level"
    }
  ],
  
  "ebooks": [
    {
      "type": "E-book",
      "title": "Complete Guide to [Topic]",
      "url": "/ebook-download",
      "related_articles": "Pillar Article, Supporting Article 1",
      "primary_keyword": "topic guide",
      "volume": 720,
      "target_profile": "Target Persona",
      "lead_magnet_for": "Pillar content cluster"
    },
    {
      "type": "Checklist",
      "title": "[Action] Checklist",
      "url": "/checklist-download",
      "related_articles": "How-To Article",
      "primary_keyword": "action checklist",
      "volume": 320,
      "target_profile": "Target Persona",
      "lead_magnet_for": "How-to content"
    }
  ],
  
  "phases": [
    {
      "name": "Phase 1: Foundation",
      "description": "Build core infrastructure and pillar content",
      "deliverables": [
        {
          "priority": "P1",
          "name": "Main Pillar Article",
          "type": "Article",
          "why_it_matters": "Central hub for topic cluster",
          "dependencies": "None",
          "success_metric": "Rank top 10 for primary keyword",
          "owner": "Content Team"
        },
        {
          "priority": "P1",
          "name": "Lead Capture Form",
          "type": "Infrastructure",
          "why_it_matters": "Required for lead generation",
          "dependencies": "None",
          "success_metric": "3%+ conversion rate",
          "owner": "Dev Team"
        }
      ]
    },
    {
      "name": "Phase 2: Core Content",
      "description": "Build out supporting content ecosystem",
      "deliverables": [
        {
          "priority": "P2",
          "name": "Supporting Article Set",
          "type": "Article",
          "why_it_matters": "Captures long-tail traffic",
          "dependencies": "Pillar content complete",
          "success_metric": "10 articles published",
          "owner": "Content Team"
        }
      ]
    },
    {
      "name": "Phase 3: Lead Magnets",
      "description": "Create conversion assets",
      "deliverables": [
        {
          "priority": "P2",
          "name": "Primary E-book",
          "type": "E-book",
          "why_it_matters": "Main lead magnet",
          "dependencies": "Pillar content complete",
          "success_metric": "500 downloads/month",
          "owner": "Content Team"
        }
      ]
    },
    {
      "name": "Phase 4: Optimization",
      "description": "Refine and expand based on data",
      "deliverables": [
        {
          "priority": "P3",
          "name": "Content Refresh",
          "type": "Optimization",
          "why_it_matters": "Maintain rankings",
          "dependencies": "6 months of data",
          "success_metric": "Maintain/improve rankings",
          "owner": "Content Team"
        }
      ]
    }
  ]
}
```

## Running the Builder

```bash
python scripts/build_content_strategy.py --data strategy_data.json --output Brand_Content_Strategy.xlsx
```

## Output Sheets

The script generates 6 sheets:

1. **Strategy Overview**: Brand, opportunity, funnel structure, audiences, pillars
2. **Customer Profiles**: Deep psychographic profiles with 8-factor scoring matrix
3. **Content Hub**: Complete content inventory with type badges and stage colors
4. **Interactive Tools**: Calculators, assessments, quizzes with lead magnet strategy
5. **E-books & Guides**: Downloadable resources tied to content clusters
6. **Roadmap**: Phased implementation plan with priority badges

## Color Reference

### Primary Colors
| Color | Hex | Use |
|-------|-----|-----|
| Blue | 151F6D | Headers, titles |
| Orange | EF6430 | CTAs, highlights |
| Gray | F1F0F0 | Alternating rows |

### Stage Colors
| Stage | Hex |
|-------|-----|
| Awareness | E8F5E9 |
| Consideration | FFF8E1 |
| Decision | FBE9E7 |

### Score Colors (1-5)
| Score | Hex |
|-------|-----|
| 4-5 (High) | C8E6C9 |
| 3 (Medium) | FFF9C4 |
| 1-2 (Low) | FFCDD2 |

### Priority Colors
| Priority | Hex |
|----------|-----|
| P1 | FFCDD2 |
| P2 | FFF9C4 |
| P3 | C8E6C9 |
| P4 | BBDEFB |

## Strategic Framework Reference

Read references/strategic-framework.md for:
- Pain-Motivation-Objection Triangle
- Hub-and-Spoke Model
- Content Type Selection
- Lead Magnet Archetypes
- Prioritization Framework
- 8-Factor Psychographic Matrix

## Checklist Before Delivery

- All 6 sheets populated
- Psychographic scores color-coded
- Content types have badges
- Funnel stages colored
- Volume indicators applied
- Priority badges on roadmap
- Column widths set correctly
