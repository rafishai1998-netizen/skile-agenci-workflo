---
name: home-service-seo-content
description: "Create SEO-optimized articles for electricians, plumbers, and home service businesses with brand voice training, humanization, AEO optimization, and E-E-A-T implementation. Use when asked to write blog posts, service pages, or SEO content for home service companies. Triggers include: 'write an article', 'create SEO content', 'blog post for electrician', 'service page', or requests for content with schema markup, E-E-A-T, or local SEO focus."
---

# Home Service SEO Content (Upgraded)

This skill provides a complete, research-backed workflow for creating high-quality, SEO-optimized articles for home service businesses. It is designed to produce content that is indistinguishable from human writing and avoids common AI tells. It incorporates advanced techniques for brand voice training, humanization, AI Engine Optimization (AEO), and programmatic SEO.

## Core Principles (Upgraded)

1.  **Anti-AI Writing Style**: All content MUST adhere to the `anti_ai_writing_style_guide.txt`. This means no em dashes, no semicolons, no unnecessary colons, and no banned words. The goal is to create content that is clear, direct, and human.

1.  **Topical Authority & AEO**: The goal is to be the source of truth for AI-generated answers, not just to rank on a search results page. This is achieved through comprehensive topic clusters and structured data.
2.  **Authentic Brand Voice**: The content should sound like it was written by the business owner, not a generic AI. This is achieved by training the AI on the client's actual writing.
3.  **Help, Don't Sell**: The primary goal is to help the reader solve their problem. The sale is a natural byproduct of building trust and demonstrating expertise.

## The Upgraded 8-Step Workflow

### Step 1: Discovery & Brand Voice Corpus Creation

-   Gather client info (Name, City, Keyword, etc.).
-   **NEW**: Create a `brand_voice_corpus.md` file for the client using the provided template. Populate it with 5-10 of their best writing samples (About Us page, blog posts, etc.). This is the most critical step for achieving an authentic voice.

### Step 2: AEO & Competitor Analysis

-   **National SERP Analysis**: Analyze the top 3-5 ranking articles for content format, headings, and topics.
-   **"People Also Ask" & Reddit Research**: Identify the real questions and pain points.
-   **NEW: AEO Focus**: Pay close attention to the structure and content of AI-generated summaries for the target keyword.

### Step 3: Generate Content Blueprint (Automated)

-   Run the `content_blueprint_generator.py` script to automatically generate a content blueprint based on the client brief and competitor analysis. Review and refine the blueprint as needed.
-   **NEW: FAQ Section First**: Prioritize the FAQ section to directly target "People Also Ask" questions and feed AI summaries.
-   Plan for local SEO integration, trust signals, and CTAs.

### Step 4: Write the First Draft

-   Use the `brand_voice_corpus.md` as a one-shot or few-shot prompt to generate the first draft in the client's voice.

### Step 5: Apply the "Chaos Prompt" for Humanization

-   **NEW**: Use the `chaos_prompt_template.md` to apply a second layer of edits to the first draft. This will add human-like imperfections and make the content less predictable.

### Step 6: Generate the Featured Image

-   Use the `featured_image_guide_template.md` to create an authentic, high-quality featured image.

### Step 7: Generate Local Business & FAQ Schema

-   Use the `schema_generator.py` script to create a `LocalBusiness` schema block.
-   **NEW**: Add an `FAQPage` schema block based on the FAQ section of the article.

### Step 8: Deliver the Final Package

-   Provide the complete article, featured image, and both JSON-LD schema blocks.

## Programmatic SEO Workflow

For generating content at scale (e.g., for multiple service areas):

1.  **Create a Database**: Use Airtable or a similar tool to create a database of services, cities, states, counties, and keyword clusters.
2.  **Use the Programmatic SEO Prompt**: Use the `programmatic_seo_prompt_template.md` with an automation tool like Make.com to generate thousands of unique pages.

## Bundled Resources (Upgraded)

### `scripts/`

-   `schema_generator.py`: Generates `LocalBusiness` and `FAQPage` JSON-LD schema.
-   `content_blueprint_generator.py`: Automates content blueprint creation based on client brief and competitor analysis.

### `templates/`

-   `voice_guide_template.md`: A template for creating a client-specific voice and style guide.
-   `featured_image_guide_template.md`: A guide for creating authentic, high-quality featured images.
-   **NEW**: `brand_voice_corpus_template.md`: A template for creating a brand voice training document.
-   **NEW**: `chaos_prompt_template.md`: A prompt for adding human-like imperfections to AI-generated content.
-   **NEW**: `programmatic_seo_prompt_template.md`: A prompt for generating programmatic SEO content at scale.
-   **NEW**: `eeat_checklist_template.md`: A checklist for ensuring content meets E-E-A-T guidelines.
-   **NEW**: `internal_linking_planner_template.md`: A template for planning a strategic internal linking structure.
-   **NEW**: `fact_checking_prompt_template.md`: A multi-step prompt for verifying the accuracy of AI-generated content.
-   **NEW**: `anti_ai_writing_style_guide_template.txt`: A strict style guide to prevent AI-like writing patterns in writing.
