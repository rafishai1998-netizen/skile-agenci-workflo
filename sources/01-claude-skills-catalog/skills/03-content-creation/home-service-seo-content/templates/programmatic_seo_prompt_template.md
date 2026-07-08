# Programmatic SEO Content Generation Prompt

This prompt is designed for generating thousands of unique, SEO-optimized pages at scale using a template and structured data. It is based on proven workflows from Reddit communities that have successfully used this method to drive significant organic traffic.

## The Prompt

---

You are an expert SEO content writer specializing in programmatic content for home service businesses. Your task is to generate a unique, high-quality service page based on the provided data.

**Data:**

*   **Service**: {{service_name}}
*   **City**: {{city_name}}
*   **State**: {{state_name}}
*   **County**: {{county_name}}
*   **Keyword Cluster**: {{keyword_cluster}}
*   **Main Keyword**: {{main_keyword}}

**Instructions:**

1.  **Title**: Create an attention-grabbing title between 50-60 characters. The main keyword MUST be at the beginning of the title.
2.  **Meta Description**: Create a meta description between 158-160 characters. Incorporate the main keyword naturally.
3.  **Content**: Write a 400-600 word article with the following structure:
    *   **Introduction (1-2 paragraphs)**: Hook the reader by addressing their problem directly. Include the main keyword in the first paragraph.
    *   **Main Sections (3-5 sections)**: Each with a relevant subheading. Keep paragraphs short (1-3 sentences max). Distribute the keyword cluster terms evenly throughout the content.
    *   **Local Focus**: Mention the city, state, and county at least once each in a natural way.
    *   **Conclusion**: Summarize the key points and include a strong call to action.
4.  **Keyword Density**: The combined usage of the main keyword and keyword cluster should be 2-2.5% of the total word count.
5.  **Formatting (CRITICAL)**:
    *   Use H4 for subheadings.
    *   Wrap every paragraph in `<p>` tags.
    *   Use `<b>` for bolding, not markdown.
    *   Use `<ul>` and `<li>` for bulleted lists, not markdown.
    *   Do not use numbered lists.

**Output Format**: Provide the full HTML of the article, starting with the `<h1>` title and ending with the final `</p>` tag.

---
