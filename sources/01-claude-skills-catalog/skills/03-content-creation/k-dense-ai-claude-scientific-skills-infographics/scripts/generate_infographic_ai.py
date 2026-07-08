#!/usr/bin/env python3
"""
AI-powered infographic generation using Nano Banana Pro.

This script uses a smart iterative refinement approach:
1. (Optional) Research phase - gather facts and data using Perplexity Sonar
2. Generate initial infographic with Nano Banana Pro
3. AI quality review using Gemini 3 Pro for infographic critique
4. Only regenerate if quality is below threshold for document type
5. Repeat until quality meets standards (max iterations)

Requirements:
    - OPENROUTER_API_KEY environment variable
    - requests library

Usage:
    python generate_infographic_ai.py "5 benefits of exercise" -o benefits.png --type list
    python generate_infographic_ai.py "Global AI market size" -o ai_market.png --type statistical --research
    python generate_infographic_ai.py "Company history 2010-2025" -o timeline.png --type timeline --style corporate
"""

import argparse
import base64
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Optional, Dict, Any, List, Tuple

try:
    import requests
except ImportError:
    print("Error: requests library not found. Install with: pip install requests")
    sys.exit(1)


def _load_env_file():
    """Load .env file from current directory, parent directories, or package directory."""
    try:
        from dotenv import load_dotenv
    except ImportError:
        return False
    
    # Try current working directory first
    env_path = Path.cwd() / ".env"
    if env_path.exists():
        load_dotenv(dotenv_path=env_path, override=False)
        return True
        
    # Try parent directories (up to 5 levels)
    cwd = Path.cwd()
    for _ in range(5):
        env_path = cwd / ".env"
        if env_path.exists():
            load_dotenv(dotenv_path=env_path, override=False)
            return True
        cwd = cwd.parent
        if cwd == cwd.parent:
            break
    
    # Try the package's parent directory
    script_dir = Path(__file__).resolve().parent
    for _ in range(5):
        env_path = script_dir / ".env"
        if env_path.exists():
            load_dotenv(dotenv_path=env_path, override=False)
            return True
        script_dir = script_dir.parent
        if script_dir == script_dir.parent:
            break
            
    return False


# Infographic type configurations with detailed prompting
INFOGRAPHIC_TYPES = {
    "statistical": {
        "name": "Statistical/Data-Driven",
        "guidelines": """
STATISTICAL INFOGRAPHIC — EDITORIAL DATA VISUALIZATION:

LAYOUT:
- Large bold serif headline at top stating the key finding as a complete sentence
- 2-4 data cards arranged in a clean grid (2x2 or 1-column stack)
- Each card: light-colored rounded rectangle with one large bold number, a thin-line icon above, and a short label below
- One optional simple bar chart or proportional illustration at the bottom half
- Source citation line in small italic text at the very bottom

TYPOGRAPHY:
- Headline: bold serif font, 2-3 lines max, navy or dark color
- Hero numbers: extra-bold sans-serif, at least 3x larger than body text
- Labels and descriptions: clean sans-serif, regular weight
- NO ALL-CAPS except for very short labels (2-3 words)

DATA PRESENTATION:
- Numbers are the visual. Make them the largest element on the card.
- Use dollar signs, percentage symbols, and abbreviations naturally (e.g., "$3,100/oz", "15% YTD")
- Trend arrows (up/down) in green/red next to numbers where relevant
- Keep descriptive text to 5-8 words per data point

VISUAL RULES:
- Light background (white, #F5F7FA, or soft blue #E8F0FE)
- Cards use slightly different shade from background (light blue, light cream)
- Thin 1px borders or subtle shadows on cards — never thick borders
- Maximum 2-3 colors plus neutral grays
- Simple monochrome line icons (not filled, not 3D, not emoji)
"""
    },
    "timeline": {
        "name": "Timeline/Chronological",
        "guidelines": """
TIMELINE INFOGRAPHIC — EDITORIAL CHRONOLOGICAL:

LAYOUT:
- Bold serif headline at top
- Vertical timeline with a thin center line
- Alternating left-right event cards along the line
- Small circle nodes on the center line at each event
- Clean date labels aligned with each node

TYPOGRAPHY:
- Year/date markers: bold sans-serif
- Event titles: semi-bold, slightly larger than descriptions
- Event descriptions: 1-2 lines of regular weight text

VISUAL RULES:
- Light background (#F5F7FA or white)
- Event cards are light-colored rounded rectangles
- Thin connecting line in navy or dark gray
- Circle nodes filled with accent color
- Simple icon per event (optional, monochrome line style)
- Source citation at bottom in small italic text
"""
    },
    "process": {
        "name": "Process/How-To",
        "guidelines": """
PROCESS INFOGRAPHIC — EDITORIAL STEP-BY-STEP:

LAYOUT:
- Bold serif headline at top
- Numbered steps in a vertical flow or horizontal row
- Each step: large number, line icon, short title, 1-line description
- Thin directional arrows or connecting lines between steps
- Clean separation between steps with generous whitespace

TYPOGRAPHY:
- Step numbers: extra-bold, large, in accent color
- Step titles: semi-bold sans-serif
- Descriptions: regular weight, 1 line only

VISUAL RULES:
- Light background
- Each step in its own card or defined area
- Thin arrows connecting steps (not heavy or decorative)
- Monochrome line icons per step
- 3-5 steps maximum for readability
"""
    },
    "comparison": {
        "name": "Comparison",
        "guidelines": """
COMPARISON INFOGRAPHIC — EDITORIAL SIDE-BY-SIDE:

LAYOUT:
- Bold serif headline at top (e.g., "Gold IRA vs. Traditional IRA")
- Two columns, one per item being compared
- Each column has a distinct header with its own background color
- 3-4 comparison rows below, each row spanning both columns
- Each row: category label on left, comparison values side-by-side
- Thin horizontal separator lines between rows

TYPOGRAPHY:
- Column headers: bold, white text on colored background (navy for one, gold/accent for other)
- Category labels: semi-bold sans-serif
- Comparison values: regular weight with checkmarks, icons, or short phrases
- NO paragraph text in comparison cells

VISUAL RULES:
- Light background (white or #F5F7FA)
- Column header backgrounds: two distinct brand colors
- Row backgrounds alternate very subtly (white / #F8F9FA)
- Simple monochrome icons (checkmark, shield, coin, chart) per row
- Thin vertical divider line between columns
- Generous vertical spacing between rows
- Source citation at bottom in small italic
"""
    },
    "list": {
        "name": "List/Informational",
        "guidelines": """
LIST INFOGRAPHIC — EDITORIAL NUMBERED LIST:

LAYOUT:
- Bold serif headline at top
- Items in a clean vertical list or 2-column grid of cards
- Each item: large number or bullet, line icon, title, 1-line description
- Consistent card sizing and spacing for all items
- Brief summary or takeaway at the bottom

TYPOGRAPHY:
- Numbers/bullets: extra-bold in accent color, large
- Item titles: semi-bold sans-serif
- Descriptions: regular weight, 1 line

VISUAL RULES:
- Light background
- Each item in its own light-colored card
- Monochrome line icons
- 5-7 items maximum
- Uniform card height and alignment
"""
    },
    "geographic": {
        "name": "Geographic/Map-Based",
        "guidelines": """
GEOGRAPHIC INFOGRAPHIC — EDITORIAL MAP:

LAYOUT:
- Bold serif headline at top
- Clean, simplified map as center element
- Color-coded regions with clear legend
- Data callouts with leader lines to regions
- Source citation at bottom

VISUAL RULES:
- Simplified flat map style (no 3D, no textures)
- 3-5 color scale with clear legend
- Clean sans-serif labels
- Light background
"""
    },
    "hierarchical": {
        "name": "Hierarchical/Pyramid",
        "guidelines": """
HIERARCHICAL INFOGRAPHIC — EDITORIAL PYRAMID:

LAYOUT:
- Bold serif headline at top
- Clean pyramid or stacked structure, centered
- Distinct levels with labels inside or beside each tier
- Size progression from base to apex

VISUAL RULES:
- Light background
- Each tier a different shade of the primary color (darkest at top/most important)
- Clean sans-serif labels
- Thin borders between tiers
- Brief description for each level
"""
    },
    "anatomical": {
        "name": "Anatomical/Visual Metaphor",
        "guidelines": """
ANATOMICAL INFOGRAPHIC — EDITORIAL DIAGRAM:

LAYOUT:
- Bold serif headline at top
- Central illustration as the metaphor
- Clean callout lines connecting labels to parts
- Brief descriptions beside each label

VISUAL RULES:
- Light background
- Flat, editorial illustration style (not photorealistic)
- Thin leader lines with small circles at endpoints
- Consistent label styling throughout
"""
    },
    "resume": {
        "name": "Resume/Professional",
        "guidelines": """
RESUME INFOGRAPHIC — EDITORIAL PROFILE:

LAYOUT:
- Name and title as large bold header
- Photo placeholder area (circle)
- Skills as clean horizontal bars or ratings
- Experience as mini-timeline
- Contact info with small line icons

VISUAL RULES:
- Light background, professional color scheme
- Clean grid alignment
- Consistent icon style
"""
    },
    "social": {
        "name": "Social Media",
        "guidelines": """
SOCIAL MEDIA INFOGRAPHIC — EDITORIAL SOCIAL:

LAYOUT:
- One bold headline statement, large and centered
- One hero number or key visual below
- Brand logo in bottom corner
- Minimal supporting text (2-3 lines max)

VISUAL RULES:
- Can use bolder background color than other types
- Maximum visual impact with minimum elements
- Square format (1:1 aspect ratio)
- Bold, high-contrast typography
"""
    },
}

# Industry style configurations
STYLE_PRESETS = {
    "corporate": {
        "name": "Corporate/Business",
        "colors": "navy blue (#1E3A5F), steel blue (#4A90A4), gold (#F5A623) accents",
        "description": "Clean, professional, minimal design with structured layout. Light background, grid-based cards, serif headlines.",
    },
    "healthcare": {
        "name": "Healthcare/Medical",
        "colors": "medical blue (#0077B6), cyan (#00B4D8), light cyan (#90E0EF)",
        "description": "Trust-inducing, clinical, clean design with light backgrounds and simple icons.",
    },
    "technology": {
        "name": "Technology/Data",
        "colors": "tech blue (#2563EB), slate gray (#475569), violet (#7C3AED) accents",
        "description": "Modern, clean design with structured grid layout and monochrome icons.",
    },
    "nature": {
        "name": "Nature/Environmental",
        "colors": "forest green (#2D6A4F), mint (#95D5B2), earth brown (#8B4513)",
        "description": "Organic, natural, earth-toned design with clean layouts.",
    },
    "education": {
        "name": "Education/Academic",
        "colors": "academic blue (#3D5A80), light blue (#98C1D9), coral (#EE6C4D) accents",
        "description": "Friendly, approachable, educational design with clear visual hierarchy.",
    },
    "marketing": {
        "name": "Marketing/Creative",
        "colors": "coral (#FF6B6B), teal (#4ECDC4), yellow (#FFE66D)",
        "description": "Bold, vibrant design with strong headlines and clear data presentation.",
    },
    "finance": {
        "name": "Finance/Investment (Investopedia Style)",
        "colors": "navy (#14213D), teal (#0A7E8C), light blue (#E8F0FE) for card backgrounds, dark gray (#333) for body text",
        "description": """Investopedia editorial style. This is a SPECIFIC visual system:
- Background: white or very light gray (#F5F7FA)
- Headlines: bold serif font in navy, written as complete editorial sentences
- Data cards: light blue or light cream rounded rectangles in a clean grid
- Numbers: extra-bold sans-serif, 3x body text size, navy or teal
- Icons: simple thin monochrome line icons (not filled, not 3D)
- Typography-driven: data presented as large formatted text, not complex charts
- Source line: small italic text at bottom citing data source
- Maximum 2-3 colors. Lots of whitespace. No gradients. No shadows. No decorative elements.
- Think: Investopedia article header graphic or Visual Capitalist data card.""",
    },
    "cedar_gold": {
        "name": "Cedar Gold Group (Branded Finance)",
        "colors": "navy (#14213D), gold (#C9A84C), warm cream (#FDF8F0) for card backgrounds, dark charcoal (#2C2C2C) for body text",
        "description": """Cedar Gold Group branded editorial style. Follows the Investopedia design system with gold branding:
- Background: white or warm cream (#FDF8F0)
- Headlines: bold serif font in navy (#14213D), written as editorial statements
- Data cards: warm cream or light gold-tinted (#FBF3E0) rounded rectangles in a grid
- Numbers: extra-bold sans-serif in gold (#C9A84C) or navy
- Icons: simple thin monochrome line icons in navy or gold
- Brand element: small "Cedar Gold Group" text in bottom-right corner, navy color
- Source line: small italic text at bottom
- Color palette limited to navy, gold, cream, and one accent (forest green #2D6A4F for positive indicators)
- Elegant, trustworthy, premium feel. Think: high-end financial advisory firm.""",
    },
    "nonprofit": {
        "name": "Nonprofit/Cause",
        "colors": "warm orange (#E07A5F), sage green (#81B29A), sand (#F2CC8F)",
        "description": "Warm, human-centered, impactful design with clean layouts.",
    },
}

# Colorblind-safe palette options
PALETTE_PRESETS = {
    "wong": {
        "name": "Wong's Palette",
        "colors": "orange (#E69F00), sky blue (#56B4E9), bluish green (#009E73), blue (#0072B2), vermillion (#D55E00)",
    },
    "ibm": {
        "name": "IBM Colorblind-Safe",
        "colors": "ultramarine (#648FFF), indigo (#785EF0), magenta (#DC267F), orange (#FE6100), gold (#FFB000)",
    },
    "tol": {
        "name": "Tol's Qualitative",
        "colors": "indigo (#332288), cyan (#88CCEE), teal (#44AA99), green (#117733), sand (#DDCC77), rose (#CC6677)",
    },
}


class InfographicGenerator:
    """Generate infographics using AI with smart iterative refinement.
    
    Uses Gemini 3 Pro for quality review to determine if regeneration is needed.
    Multiple passes only occur if the generated infographic doesn't meet the
    quality threshold for the target document type.
    """
    
    # Quality thresholds by document type (score out of 10)
    QUALITY_THRESHOLDS = {
        "marketing": 8.5,     # Marketing materials - must be compelling
        "report": 8.0,        # Business reports - professional quality
        "presentation": 7.5,  # Slides/talks - clear and engaging
        "social": 7.0,        # Social media - eye-catching
        "internal": 7.0,      # Internal use - good quality
        "draft": 6.5,         # Draft/working - acceptable
        "default": 7.5,       # Default threshold
    }
    
    # Base infographic design guidelines — Investopedia Editorial Style
    INFOGRAPHIC_GUIDELINES = """
Create a publication-quality editorial infographic in the style of Investopedia and Visual Capitalist.

EDITORIAL DESIGN SYSTEM:

BACKGROUND:
- White (#FFFFFF) or very light gray (#F5F7FA) or soft pastel blue (#E8F0FE)
- Solid, flat color only. NO gradients. NO textures. NO patterns.

HEADLINE:
- Bold serif font (like Georgia, Playfair Display, or similar editorial serif)
- Navy (#14213D) or very dark color
- Written as a complete editorial statement, not a label (e.g., "Your Emergency Fund Should Be $35,000" not "Emergency Fund Data")
- Positioned at the top with generous space below
- 2-3 lines maximum

DATA PRESENTATION:
- Numbers are the HERO element. Make them the largest, boldest thing on the page.
- Format: extra-bold sans-serif, 3-4x larger than body text
- Include currency symbols, percentage signs naturally ($3,100/oz, 15% YTD)
- Each key number gets its own card or dedicated area
- Maximum 4-6 data points total

CARD LAYOUT:
- Data organized in light-colored rounded-rectangle cards
- Cards arranged in a clean grid (2x2, 2x3, or single column)
- Card backgrounds: light blue (#E8F0FE), light cream (#FBF3E0), or white with thin border
- Uniform card sizing and spacing
- 16-24px padding inside cards
- 12-16px gaps between cards

ICONS:
- Simple, thin, monochrome line icons (1-2px stroke weight)
- NOT filled icons, NOT 3D, NOT emoji, NOT detailed illustrations
- One icon per card or data point, positioned above or to the left of the number
- Icons in navy, dark gray, or the primary accent color
- Consistent icon style throughout — all from the same visual family

TYPOGRAPHY HIERARCHY:
1. Headline: bold serif, largest, navy
2. Hero numbers: extra-bold sans-serif, second largest
3. Card titles/labels: semi-bold sans-serif, medium
4. Descriptions: regular weight sans-serif, small, dark gray
5. Source citation: italic, smallest, light gray

COLOR RULES:
- Maximum 2-3 colors plus neutrals (white, light gray, dark gray)
- Primary: navy or dark blue
- Accent: teal, gold, or one warm color
- Positive indicators: muted green (#2D6A4F)
- Negative indicators: muted red (#C0392B)
- NO bright neon colors. NO rainbow palettes. NO heavy saturation.

FOOTER:
- Source citation in small italic text at the bottom (e.g., "Source: World Gold Council, March 2026")
- Optional brand name in bottom-right corner, small and unobtrusive

STRICT RULES:
- Do NOT include layout instructions, metadata, or descriptions in the image
- Do NOT repeat information across sections
- Do NOT use more than 3 icon styles
- Do NOT use gradients, drop shadows, or glossy effects
- Do NOT pack content tightly — generous whitespace is mandatory
- Do NOT use decorative borders, ornamental dividers, or clip art
- At least 25% of the image should be whitespace/breathing room
"""

    def __init__(self, api_key: Optional[str] = None, verbose: bool = False):
        """Initialize the generator."""
        self.api_key = api_key or os.getenv("OPENROUTER_API_KEY")
        
        if not self.api_key:
            _load_env_file()
            self.api_key = os.getenv("OPENROUTER_API_KEY")
        
        if not self.api_key:
            raise ValueError(
                "OPENROUTER_API_KEY not found. Please either:\n"
                "  1. Set the OPENROUTER_API_KEY environment variable\n"
                "  2. Add OPENROUTER_API_KEY to your .env file\n"
                "  3. Pass api_key parameter to the constructor\n"
                "Get your API key from: https://openrouter.ai/keys"
            )
        
        self.verbose = verbose
        self._last_error = None
        self.base_url = "https://openrouter.ai/api/v1"
        # Nano Banana 2 for image generation (latest Gemini image model)
        self.image_model = "google/gemini-3.1-flash-image-preview"
        # Nano Banana Pro as fallback (more reliable for image generation)
        self.fallback_image_model = "google/gemini-3-pro-image-preview"
        # Gemini 2.5 Flash for quality review (vision-capable for image analysis)
        self.review_model = "google/gemini-2.5-flash"
        
    def _log(self, message: str):
        """Log message if verbose mode is enabled."""
        if self.verbose:
            print(f"[{time.strftime('%H:%M:%S')}] {message}")
    
    # ========== RESEARCH METHODS ==========
    
    def research_topic(self, topic: str, infographic_type: Optional[str] = None) -> Dict[str, Any]:
        """
        Research a topic using Perplexity Sonar Pro to gather facts and data.
        
        Args:
            topic: The topic to research
            infographic_type: Type of infographic to tailor the research
            
        Returns:
            Dictionary with research results including facts, statistics, and sources
        """
        self._log(f"Researching topic: {topic}")
        
        # Build research query based on infographic type
        type_context = ""
        if infographic_type:
            if infographic_type == "statistical":
                type_context = "Focus on statistics, numbers, percentages, and quantitative data."
            elif infographic_type == "timeline":
                type_context = "Focus on key dates, milestones, and chronological events."
            elif infographic_type == "process":
                type_context = "Focus on steps, procedures, and sequential information."
            elif infographic_type == "comparison":
                type_context = "Focus on comparing different options, pros/cons, and differences."
            elif infographic_type == "list":
                type_context = "Focus on key points, tips, facts, and organized information."
            elif infographic_type == "geographic":
                type_context = "Focus on regional data, location-based statistics, and geographic distribution."
            elif infographic_type == "hierarchical":
                type_context = "Focus on levels, rankings, and hierarchical relationships."
        
        research_prompt = f"""You are a research assistant gathering information for an infographic.

TOPIC: {topic}

{type_context}

Please provide:
1. KEY FACTS: 5-8 key facts or statistics about this topic (with specific numbers where possible)
2. CONTEXT: Brief background context (2-3 sentences)
3. SOURCES: Mention any major sources or studies
4. DATA POINTS: Any specific data points that would make good visualizations

Format your response as structured data that can be easily incorporated into an infographic.
Be specific with numbers, percentages, and dates.
Prioritize recent information (2023-2026).
Include citation hints where possible."""

        messages = [
            {
                "role": "system",
                "content": "You are an expert research assistant. Provide accurate, well-sourced information formatted for infographic creation. Always include specific numbers, dates, and statistics."
            },
            {"role": "user", "content": research_prompt}
        ]
        
        try:
            # Use Perplexity Sonar Pro for research
            research_model = "perplexity/sonar-pro"
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://github.com/scientific-writer",
                "X-Title": "Infographic Research"
            }
            
            payload = {
                "model": research_model,
                "messages": messages,
                "max_tokens": 2000,
                "temperature": 0.1,
                "search_mode": "academic",
                "search_context_size": "high"
            }
            
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=60
            )
            
            if response.status_code != 200:
                self._log(f"Research request failed: {response.status_code}")
                return {"success": False, "error": f"API error: {response.status_code}"}
            
            result = response.json()
            
            if "choices" in result and len(result["choices"]) > 0:
                content = result["choices"][0].get("message", {}).get("content", "")
                
                # Extract any sources from the response
                sources = result.get("search_results", [])
                
                self._log(f"Research complete: {len(content)} chars")
                
                return {
                    "success": True,
                    "content": content,
                    "sources": sources,
                    "model": research_model
                }
            else:
                return {"success": False, "error": "No response from research model"}
                
        except Exception as e:
            self._log(f"Research failed: {str(e)}")
            return {"success": False, "error": str(e)}
    
    def web_search(self, query: str) -> Dict[str, Any]:
        """
        Perform a quick web search for current information.
        
        Args:
            query: Search query
            
        Returns:
            Dictionary with search results
        """
        self._log(f"Web search: {query}")
        
        search_prompt = f"""Search for current information about: {query}

Provide:
1. The most relevant and recent facts
2. Any statistics or numbers
3. Key dates if applicable
4. Brief source attribution

Be concise and factual. Focus on information useful for an infographic."""

        messages = [
            {
                "role": "system",
                "content": "You are a web search assistant. Provide accurate, current information with sources."
            },
            {"role": "user", "content": search_prompt}
        ]
        
        try:
            # Use Perplexity Sonar for web search
            search_model = "perplexity/sonar-pro"
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://github.com/scientific-writer",
                "X-Title": "Infographic Web Search"
            }
            
            payload = {
                "model": search_model,
                "messages": messages,
                "max_tokens": 1000,
                "temperature": 0.1
            }
            
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code != 200:
                return {"success": False, "error": f"API error: {response.status_code}"}
            
            result = response.json()
            
            if "choices" in result and len(result["choices"]) > 0:
                content = result["choices"][0].get("message", {}).get("content", "")
                return {
                    "success": True,
                    "content": content,
                    "sources": result.get("search_results", [])
                }
            else:
                return {"success": False, "error": "No response from search"}
                
        except Exception as e:
            self._log(f"Web search failed: {str(e)}")
            return {"success": False, "error": str(e)}
    
    def _enhance_prompt_with_research(self, user_prompt: str, research_data: Dict[str, Any]) -> str:
        """
        Enhance the user prompt with researched information.
        
        Args:
            user_prompt: Original user prompt
            research_data: Research results dictionary
            
        Returns:
            Enhanced prompt with research data
        """
        if not research_data.get("success") or not research_data.get("content"):
            return user_prompt
        
        enhanced = f"""{user_prompt}

RESEARCHED DATA AND FACTS (use these in the infographic):
{research_data['content']}

Use the above researched facts, statistics, and data points to create an accurate, informative infographic.
Incorporate specific numbers, percentages, and dates from the research."""
        
        return enhanced
    
    # ========== END RESEARCH METHODS ==========
    
    def _make_request(self, model: str, messages: List[Dict[str, Any]],
                     modalities: Optional[List[str]] = None,
                     max_tokens: int = 1000) -> Dict[str, Any]:
        """Make a request to OpenRouter API."""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/scientific-writer",
            "X-Title": "Infographic Generator"
        }

        payload = {
            "model": model,
            "messages": messages,
            "max_tokens": max_tokens
        }

        if modalities:
            payload["modalities"] = modalities
        
        self._log(f"Making request to {model}...")
        
        try:
            response = requests.post(
                f"{self.base_url}/chat/completions",
                headers=headers,
                json=payload,
                timeout=120
            )
            
            try:
                response_json = response.json()
            except json.JSONDecodeError:
                response_json = {"raw_text": response.text[:500]}
            
            if response.status_code != 200:
                error_detail = response_json.get("error", response_json)
                self._log(f"HTTP {response.status_code}: {error_detail}")
                raise RuntimeError(f"API request failed (HTTP {response.status_code}): {error_detail}")
            
            return response_json
        except requests.exceptions.Timeout:
            raise RuntimeError("API request timed out after 120 seconds")
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"API request failed: {str(e)}")
    
    def _extract_image_from_response(self, response: Dict[str, Any]) -> Optional[bytes]:
        """Extract base64-encoded image from API response."""
        try:
            choices = response.get("choices", [])
            if not choices:
                self._log("No choices in response")
                return None
            
            message = choices[0].get("message", {})
            
            # Nano Banana Pro returns images in 'images' field
            images = message.get("images", [])
            if images and len(images) > 0:
                self._log(f"Found {len(images)} image(s) in 'images' field")
                
                first_image = images[0]
                if isinstance(first_image, dict):
                    if first_image.get("type") == "image_url":
                        url = first_image.get("image_url", {})
                        if isinstance(url, dict):
                            url = url.get("url", "")
                        
                        if url and url.startswith("data:image"):
                            if "," in url:
                                base64_str = url.split(",", 1)[1]
                                base64_str = base64_str.replace('\n', '').replace('\r', '').replace(' ', '')
                                self._log(f"Extracted base64 data (length: {len(base64_str)})")
                                return base64.b64decode(base64_str)
            
            # Fallback: check content field
            content = message.get("content", "")
            
            if isinstance(content, str) and "data:image" in content:
                import re
                match = re.search(r'data:image/[^;]+;base64,([A-Za-z0-9+/=\n\r]+)', content, re.DOTALL)
                if match:
                    base64_str = match.group(1).replace('\n', '').replace('\r', '').replace(' ', '')
                    self._log(f"Found image in content field (length: {len(base64_str)})")
                    return base64.b64decode(base64_str)
            
            if isinstance(content, list):
                for i, block in enumerate(content):
                    if isinstance(block, dict) and block.get("type") == "image_url":
                        url = block.get("image_url", {})
                        if isinstance(url, dict):
                            url = url.get("url", "")
                        if url and url.startswith("data:image") and "," in url:
                            base64_str = url.split(",", 1)[1].replace('\n', '').replace('\r', '').replace(' ', '')
                            self._log(f"Found image in content block {i}")
                            return base64.b64decode(base64_str)
            
            # Debug: log what we DID get so we can diagnose empty responses
            if self.verbose:
                self._log(f"No image data found in response")
                if choices:
                    msg_keys = list(message.keys()) if message else []
                    self._log(f"  message keys: {msg_keys}")
                    # Log all diagnostic fields
                    refusal = message.get("refusal")
                    self._log(f"  refusal: {repr(refusal)[:300]}")
                    content = message.get("content", "")
                    if isinstance(content, str) and content:
                        self._log(f"  content: {content[:300]}")
                    reasoning = message.get("reasoning")
                    if reasoning:
                        self._log(f"  reasoning: {repr(reasoning)[:300]}")
                    text_content = message.get("content", "")
                    if isinstance(text_content, str) and text_content:
                        self._log(f"  text response: {text_content[:300]}")
            return None
            
        except Exception as e:
            self._log(f"Error extracting image: {str(e)}")
            return None
    
    def _image_to_base64(self, image_path: str) -> str:
        """Convert image file to base64 data URL."""
        with open(image_path, "rb") as f:
            image_data = f.read()
        
        ext = Path(image_path).suffix.lower()
        mime_type = {
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".gif": "image/gif",
            ".webp": "image/webp"
        }.get(ext, "image/png")
        
        base64_data = base64.b64encode(image_data).decode("utf-8")
        return f"data:{mime_type};base64,{base64_data}"
    
    def _build_generation_prompt(self, user_prompt: str, 
                                  infographic_type: Optional[str] = None,
                                  style: Optional[str] = None,
                                  palette: Optional[str] = None,
                                  background: str = "white") -> str:
        """Build the full generation prompt with all enhancements."""
        parts = [self.INFOGRAPHIC_GUIDELINES]
        
        # Add type-specific guidelines
        if infographic_type and infographic_type in INFOGRAPHIC_TYPES:
            type_config = INFOGRAPHIC_TYPES[infographic_type]
            parts.append(f"\nINFOGRAPHIC TYPE: {type_config['name']}")
            parts.append(type_config['guidelines'])
        
        # Add style preset
        if style and style in STYLE_PRESETS:
            style_config = STYLE_PRESETS[style]
            parts.append(f"\nSTYLE: {style_config['name']}")
            parts.append(f"Colors: {style_config['colors']}")
            parts.append(f"Design: {style_config['description']}")
        
        # Add colorblind-safe palette
        if palette and palette in PALETTE_PRESETS:
            palette_config = PALETTE_PRESETS[palette]
            parts.append(f"\nCOLORBLIND-SAFE PALETTE: {palette_config['name']}")
            parts.append(f"Use these colors: {palette_config['colors']}")
        
        # Add user request
        parts.append(f"\nUSER REQUEST: {user_prompt}")
        
        # Add background
        parts.append(f"\nBackground: {background} background")
        
        # Final instruction
        parts.append("\nGenerate a professional, publication-quality infographic that meets all the guidelines above.")
        
        return "\n".join(parts)
    
    def _try_generate_with_model(self, model: str, messages: List[Dict[str, Any]]) -> Optional[bytes]:
        """Attempt image generation with a specific model. Returns image bytes or None."""
        try:
            response = self._make_request(
                model=model,
                messages=messages,
                modalities=["image", "text"],
                max_tokens=500
            )

            if self.verbose:
                self._log(f"Response keys: {response.keys()}")
                if "error" in response:
                    self._log(f"API Error: {response['error']}")

            if "error" in response:
                error_msg = response["error"]
                if isinstance(error_msg, dict):
                    error_msg = error_msg.get("message", str(error_msg))
                self._last_error = f"API Error: {error_msg}"
                return None

            image_data = self._extract_image_from_response(response)
            if image_data:
                self._log(f"✓ Generated image ({len(image_data)} bytes)")
                return image_data
            else:
                self._last_error = "No image data in API response"
                self._log(f"✗ {self._last_error}")
                return None
        except RuntimeError as e:
            self._last_error = str(e)
            self._log(f"✗ {model} failed: {self._last_error}")
            return None
        except Exception as e:
            self._last_error = f"Unexpected error: {str(e)}"
            self._log(f"✗ {model} failed: {self._last_error}")
            return None

    def generate_image(self, prompt: str) -> Optional[bytes]:
        """Generate an image using Nano Banana 2, with Nano Banana Pro fallback."""
        self._last_error = None

        messages = [
            {
                "role": "user",
                "content": prompt
            }
        ]

        # Try primary model (Nano Banana 2)
        image_data = self._try_generate_with_model(self.image_model, messages)
        if image_data:
            return image_data

        # Fallback to Nano Banana Pro if primary returned no image
        if self.fallback_image_model:
            self._log(f"Falling back to {self.fallback_image_model}...")
            print(f"  ↳ Trying fallback model (Nano Banana Pro)...")
            image_data = self._try_generate_with_model(self.fallback_image_model, messages)
            if image_data:
                return image_data

        # Both failed
        if not self._last_error:
            self._last_error = "No image data from any model"
        print(f"✗ {self._last_error}")
        return None
    
    def review_image(self, image_path: str, original_prompt: str,
                    infographic_type: Optional[str],
                    iteration: int, doc_type: str = "default",
                    max_iterations: int = 3) -> Tuple[str, float, bool]:
        """
        Review generated infographic using Gemini 2.5 Flash for quality analysis.
        
        Evaluates the infographic on multiple criteria specific to good
        infographic design and determines if regeneration is needed.
        """
        image_data_url = self._image_to_base64(image_path)
        
        threshold = self.QUALITY_THRESHOLDS.get(doc_type.lower(), 
                                                 self.QUALITY_THRESHOLDS["default"])
        
        type_name = "general"
        if infographic_type and infographic_type in INFOGRAPHIC_TYPES:
            type_name = INFOGRAPHIC_TYPES[infographic_type]["name"]
        
        review_prompt = f"""You are an expert infographic designer reviewing a generated infographic for quality.

ORIGINAL REQUEST: {original_prompt}

INFOGRAPHIC TYPE: {type_name}
QUALITY THRESHOLD: {threshold}/10
ITERATION: {iteration}/{max_iterations}

Carefully evaluate this infographic on these criteria:

1. **Visual Hierarchy & Layout** (0-2 points)
   - Clear visual hierarchy (most important elements prominent)
   - Logical reading flow
   - Balanced composition
   - Adequate white space

2. **Typography & Readability** (0-2 points)
   - Text is readable and appropriately sized
   - Headlines are bold and attention-grabbing
   - No overlapping or cramped text
   - Consistent font usage

3. **Data Visualization** (0-2 points)
   - Numbers and statistics are prominent
   - Charts/icons are clear and accurate
   - Data is easy to understand at a glance
   - Labels are present where needed

4. **Color & Accessibility** (0-2 points)
   - Colors are harmonious and professional
   - Sufficient contrast for readability
   - Works for colorblind viewers
   - Colors support the content hierarchy

5. **Overall Impact & Professionalism** (0-2 points)
   - Looks professional and polished
   - Engaging and visually appealing
   - Free of visual bugs or artifacts
   - Achieves its communication goal

RESPOND IN THIS EXACT FORMAT:
SCORE: [total score 0-10]

STRENGTHS:
- [strength 1]
- [strength 2]

ISSUES:
- [issue 1 if any]
- [issue 2 if any]

SPECIFIC_IMPROVEMENTS:
- [specific improvement 1]
- [specific improvement 2]

VERDICT: [ACCEPTABLE or NEEDS_IMPROVEMENT]

If score >= {threshold}, the infographic is ACCEPTABLE.
If score < {threshold}, mark as NEEDS_IMPROVEMENT with specific suggestions."""

        messages = [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": review_prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_data_url
                        }
                    }
                ]
            }
        ]
        
        try:
            response = self._make_request(
                model=self.review_model,
                messages=messages,
                max_tokens=600  # Review response is structured text (score + critique): ~200-350 tokens
            )
            
            choices = response.get("choices", [])
            if not choices:
                return "Image generated successfully", 7.5, False
            
            message = choices[0].get("message", {})
            content = message.get("content", "")
            
            reasoning = message.get("reasoning", "")
            if reasoning and not content:
                content = reasoning
            
            if isinstance(content, list):
                text_parts = []
                for block in content:
                    if isinstance(block, dict) and block.get("type") == "text":
                        text_parts.append(block.get("text", ""))
                content = "\n".join(text_parts)
            
            # Extract score
            score = 7.5
            import re
            
            score_match = re.search(r'SCORE:\s*(\d+(?:\.\d+)?)', content, re.IGNORECASE)
            if score_match:
                score = float(score_match.group(1))
            else:
                score_match = re.search(r'(?:score|rating|quality)[:\s]+(\d+(?:\.\d+)?)\s*(?:/\s*10)?', content, re.IGNORECASE)
                if score_match:
                    score = float(score_match.group(1))
            
            # Determine if improvement is needed
            needs_improvement = False
            if "NEEDS_IMPROVEMENT" in content.upper():
                needs_improvement = True
            elif score < threshold:
                needs_improvement = True
            
            self._log(f"✓ Review complete (Score: {score}/10, Threshold: {threshold}/10)")
            self._log(f"  Verdict: {'Needs improvement' if needs_improvement else 'Acceptable'}")
            
            return (content if content else "Image generated successfully", 
                    score, 
                    needs_improvement)
        except Exception as e:
            self._log(f"Review skipped: {str(e)}")
            # When review fails, assign threshold score so it passes but doesn't
            # falsely inflate quality. This prevents a broken reviewer from
            # blocking all generation while still being honest about the score.
            return "Image generated successfully (review skipped)", threshold, False
    
    def improve_prompt(self, original_prompt: str, critique: str, 
                      infographic_type: Optional[str],
                      style: Optional[str],
                      palette: Optional[str],
                      background: str,
                      iteration: int) -> str:
        """Improve the generation prompt based on critique."""
        
        parts = [self.INFOGRAPHIC_GUIDELINES]
        
        # Add type-specific guidelines
        if infographic_type and infographic_type in INFOGRAPHIC_TYPES:
            type_config = INFOGRAPHIC_TYPES[infographic_type]
            parts.append(f"\nINFOGRAPHIC TYPE: {type_config['name']}")
            parts.append(type_config['guidelines'])
        
        # Add style preset
        if style and style in STYLE_PRESETS:
            style_config = STYLE_PRESETS[style]
            parts.append(f"\nSTYLE: {style_config['name']}")
            parts.append(f"Colors: {style_config['colors']}")
            parts.append(f"Design: {style_config['description']}")
        
        # Add palette
        if palette and palette in PALETTE_PRESETS:
            palette_config = PALETTE_PRESETS[palette]
            parts.append(f"\nCOLORBLIND-SAFE PALETTE: {palette_config['name']}")
            parts.append(f"Use these colors: {palette_config['colors']}")
        
        # Add original request
        parts.append(f"\nUSER REQUEST: {original_prompt}")
        parts.append(f"\nBackground: {background} background")
        
        # Extract only the actionable improvements from the critique
        # (full critique text can confuse image models or trigger refusals)
        improvements = []
        in_improvements = False
        for line in critique.split("\n"):
            stripped = line.strip()
            if "SPECIFIC_IMPROVEMENTS:" in stripped.upper():
                in_improvements = True
                continue
            elif stripped.upper().startswith("VERDICT:"):
                in_improvements = False
                continue
            elif in_improvements and stripped.startswith("- "):
                improvements.append(stripped)

        if not improvements:
            # Fallback: extract ISSUES section
            in_issues = False
            for line in critique.split("\n"):
                stripped = line.strip()
                if "ISSUES:" in stripped.upper():
                    in_issues = True
                    continue
                elif stripped.upper().startswith(("SPECIFIC_IMPROVEMENTS:", "VERDICT:")):
                    in_issues = False
                    continue
                elif in_issues and stripped.startswith("- "):
                    improvements.append(f"- Fix: {stripped[2:]}")

        improvement_text = "\n".join(improvements[:4]) if improvements else "- Improve overall visual quality and readability"

        parts.append(f"""
IMPORTANT DESIGN FIXES FOR THIS VERSION:
{improvement_text}

Generate the infographic with these fixes applied. Keep it clean, minimal, and professional.
""")
        
        return "\n".join(parts)
    
    def generate_iterative(self, user_prompt: str, output_path: str,
                          infographic_type: Optional[str] = None,
                          style: Optional[str] = None,
                          palette: Optional[str] = None,
                          background: str = "white",
                          iterations: int = 3,
                          doc_type: str = "default",
                          research: bool = False) -> Dict[str, Any]:
        """
        Generate infographic with smart iterative refinement.
        
        Only regenerates if the quality score is below the threshold.
        
        Args:
            user_prompt: Description of the infographic content
            output_path: Path to save final image
            infographic_type: Type preset (statistical, timeline, etc.)
            style: Industry style preset
            palette: Colorblind-safe palette
            background: Background color
            iterations: Maximum refinement iterations
            doc_type: Document type for quality threshold
            research: If True, research the topic first for better data
        """
        output_path = Path(output_path)
        output_dir = output_path.parent
        output_dir.mkdir(parents=True, exist_ok=True)
        
        base_name = output_path.stem
        extension = output_path.suffix or ".png"
        
        threshold = self.QUALITY_THRESHOLDS.get(doc_type.lower(), 
                                                 self.QUALITY_THRESHOLDS["default"])
        
        type_name = infographic_type if infographic_type else "general"
        style_name = style if style else "default"
        
        results = {
            "user_prompt": user_prompt,
            "infographic_type": infographic_type,
            "style": style,
            "palette": palette,
            "doc_type": doc_type,
            "quality_threshold": threshold,
            "research_enabled": research,
            "research_data": None,
            "iterations": [],
            "final_image": None,
            "final_score": 0.0,
            "success": False,
            "early_stop": False,
            "early_stop_reason": None
        }
        
        print(f"\n{'='*60}")
        print(f"Generating Infographic with Nano Banana 2")
        print(f"{'='*60}")
        print(f"Content: {user_prompt}")
        print(f"Type: {type_name}")
        print(f"Style: {style_name}")
        print(f"Research: {'Enabled' if research else 'Disabled'}")
        print(f"Quality Threshold: {threshold}/10")
        print(f"Max Iterations: {iterations}")
        print(f"Output: {output_path}")
        print(f"{'='*60}\n")
        
        # ===== RESEARCH PHASE =====
        enhanced_prompt = user_prompt
        if research:
            print(f"\n[Research Phase]")
            print("-" * 40)
            print(f"Researching topic for accurate data...")
            
            research_result = self.research_topic(user_prompt, infographic_type)
            
            if research_result.get("success"):
                print(f"✓ Research complete - gathered facts and statistics")
                results["research_data"] = research_result
                
                # Enhance the prompt with researched data
                enhanced_prompt = self._enhance_prompt_with_research(user_prompt, research_result)
                
                # Save research data to file
                research_path = output_dir / f"{base_name}_research.json"
                with open(research_path, "w") as f:
                    json.dump(research_result, f, indent=2)
                print(f"✓ Research saved: {research_path}")
            else:
                print(f"⚠ Research failed: {research_result.get('error', 'Unknown error')}")
                print(f"  Proceeding with original prompt...")
        
        # Build initial prompt (using enhanced prompt if research was done)
        current_prompt = self._build_generation_prompt(
            enhanced_prompt, infographic_type, style, palette, background
        )
        
        # Track best successful result across all iterations
        best_image_path = None
        best_score = 0.0

        iteration_num = 0
        api_retries = 0
        max_api_retries = 2  # retry API failures up to 2 times per iteration slot

        while iteration_num < iterations:
            iteration_num += 1
            print(f"\n[Iteration {iteration_num}/{iterations}]")
            print("-" * 40)

            # Generate image
            print(f"Generating infographic with Nano Banana 2...")
            image_data = self.generate_image(current_prompt)

            if not image_data:
                error_msg = getattr(self, '_last_error', 'Generation failed')
                print(f"✗ Generation failed: {error_msg}")
                results["iterations"].append({
                    "iteration": iteration_num,
                    "success": False,
                    "error": error_msg
                })
                # Retry API failures without consuming an iteration slot
                if api_retries < max_api_retries:
                    api_retries += 1
                    iteration_num -= 1  # don't consume this iteration slot
                    wait_secs = 10 * api_retries
                    print(f"  API retry {api_retries}/{max_api_retries} — waiting {wait_secs}s...")
                    import time
                    time.sleep(wait_secs)
                else:
                    print(f"  Max API retries reached, moving on...")
                    api_retries = 0  # reset for next iteration
                continue

            # Reset API retry counter on success
            api_retries = 0

            # Save iteration image
            iter_path = output_dir / f"{base_name}_v{iteration_num}{extension}"
            with open(iter_path, "wb") as f:
                f.write(image_data)
            print(f"✓ Saved: {iter_path}")

            # Review image using Gemini 2.5 Flash
            print(f"Reviewing with Gemini 2.5 Flash...")
            critique, score, needs_improvement = self.review_image(
                str(iter_path), user_prompt, infographic_type, iteration_num, doc_type, iterations
            )
            print(f"✓ Score: {score}/10 (threshold: {threshold}/10)")

            # Track best result
            if score > best_score:
                best_score = score
                best_image_path = str(iter_path)

            # Save iteration results
            iteration_result = {
                "iteration": iteration_num,
                "image_path": str(iter_path),
                "prompt_length": len(current_prompt),
                "critique": critique,
                "score": score,
                "needs_improvement": needs_improvement,
                "success": True
            }
            results["iterations"].append(iteration_result)

            # Check if quality is acceptable
            if not needs_improvement:
                print(f"\n✓ Quality meets threshold ({score} >= {threshold})")
                print(f"  No further iterations needed!")
                results["final_image"] = str(iter_path)
                results["final_score"] = score
                results["success"] = True
                results["early_stop"] = True
                results["early_stop_reason"] = f"Quality score {score} meets threshold {threshold}"
                break

            # If this is the last iteration, we're done
            if iteration_num >= iterations:
                print(f"\n⚠ Maximum iterations reached")
                results["final_image"] = str(iter_path)
                results["final_score"] = score
                results["success"] = True
                break

            # Quality below threshold - append improvements to original prompt
            print(f"\n⚠ Quality below threshold ({score} < {threshold})")
            print(f"Improving prompt based on feedback...")

            # Extract specific improvements from critique
            improvements = []
            in_improvements = False
            for line in critique.split("\n"):
                stripped = line.strip()
                if "SPECIFIC_IMPROVEMENTS:" in stripped.upper():
                    in_improvements = True
                    continue
                elif stripped.upper().startswith("VERDICT:"):
                    in_improvements = False
                    continue
                elif in_improvements and stripped.startswith("- "):
                    improvements.append(stripped)

            if not improvements:
                # Fallback: extract ISSUES
                in_issues = False
                for line in critique.split("\n"):
                    stripped = line.strip()
                    if "ISSUES:" in stripped.upper():
                        in_issues = True
                        continue
                    elif stripped.upper().startswith(("SPECIFIC_IMPROVEMENTS:", "VERDICT:")):
                        in_issues = False
                        continue
                    elif in_issues and stripped.startswith("- "):
                        improvements.append(f"- Fix: {stripped[2:]}")

            fix_text = "\n".join(improvements[:4]) if improvements else "- Improve overall visual quality and readability"

            # Rebuild the same initial prompt but with fixes appended
            current_prompt = self._build_generation_prompt(
                user_prompt, infographic_type, style, palette, background
            )
            # Replace the generic final instruction with specific fixes
            current_prompt = current_prompt.replace(
                "\nGenerate a professional, publication-quality infographic that meets all the guidelines above.",
                f"\nVisual fixes for this version:\n{fix_text}\n\nGenerate this infographic with the above fixes applied."
            )

        # Fallback: if loop ended without setting final_image but we have a best result
        if not results["success"] and best_image_path:
            print(f"\n⚠ Using best result from earlier iteration (score: {best_score})")
            results["final_image"] = best_image_path
            results["final_score"] = best_score
            results["success"] = True
        
        # Copy final version to output path
        if results["success"] and results["final_image"]:
            final_iter_path = Path(results["final_image"])
            if final_iter_path != output_path:
                import shutil
                shutil.copy(final_iter_path, output_path)
                print(f"\n✓ Final image: {output_path}")
        
        # Save review log
        log_path = output_dir / f"{base_name}_review_log.json"
        with open(log_path, "w") as f:
            json.dump(results, f, indent=2)
        print(f"✓ Review log: {log_path}")
        
        print(f"\n{'='*60}")
        print(f"Generation Complete!")
        print(f"Final Score: {results['final_score']}/10")
        if results["early_stop"]:
            iterations_used = len([r for r in results['iterations'] if r.get('success')])
            print(f"Iterations Used: {iterations_used}/{iterations} (early stop)")
        print(f"{'='*60}\n")
        
        return results


def main():
    """Command-line interface."""
    parser = argparse.ArgumentParser(
        description="Generate infographics using Nano Banana Pro with smart iterative refinement",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Generate a list infographic
  python generate_infographic_ai.py "5 benefits of meditation" -o benefits.png --type list
  
  # Generate a timeline with corporate style
  python generate_infographic_ai.py "Company history 2010-2025" -o timeline.png --type timeline --style corporate
  
  # Generate with colorblind-safe palette
  python generate_infographic_ai.py "Heart disease stats" -o stats.png --type statistical --palette wong
  
  # Generate with RESEARCH for accurate data (uses Perplexity Sonar)
  python generate_infographic_ai.py "Global AI market 2025" -o ai_market.png --type statistical --research
  
  # Verbose output
  python generate_infographic_ai.py "Process diagram" -o process.png --type process -v

Infographic Types:
  statistical   - Data-driven with charts and numbers
  timeline      - Chronological events
  process       - Step-by-step instructions
  comparison    - Side-by-side comparison
  list          - Tips, facts, key points
  geographic    - Map-based visualization
  hierarchical  - Pyramid or tree structure
  anatomical    - Visual metaphor
  resume        - Professional/CV style
  social        - Social media optimized

Style Presets:
  corporate, healthcare, technology, nature, education, marketing, finance, nonprofit

Colorblind-Safe Palettes:
  wong, ibm, tol

Document Types (quality thresholds):
  marketing     8.5/10  - Marketing materials
  report        8.0/10  - Business reports
  presentation  7.5/10  - Slides/talks
  social        7.0/10  - Social media
  internal      7.0/10  - Internal use
  draft         6.5/10  - Working drafts
  default       7.5/10  - General purpose

Environment:
  OPENROUTER_API_KEY    OpenRouter API key (required)
        """
    )
    
    parser.add_argument("prompt", help="Description of the infographic content")
    parser.add_argument("-o", "--output", required=True, 
                       help="Output image path (e.g., infographic.png)")
    parser.add_argument("--type", "-t", choices=list(INFOGRAPHIC_TYPES.keys()),
                       help="Infographic type preset")
    parser.add_argument("--style", "-s", choices=list(STYLE_PRESETS.keys()),
                       help="Industry style preset")
    parser.add_argument("--palette", "-p", choices=list(PALETTE_PRESETS.keys()),
                       help="Colorblind-safe palette")
    parser.add_argument("--background", "-b", default="white",
                       help="Background color (default: white)")
    parser.add_argument("--iterations", type=int, default=3,
                       help="Maximum refinement iterations (default: 3)")
    parser.add_argument("--doc-type", default="default",
                       choices=["marketing", "report", "presentation", "social", 
                               "internal", "draft", "default"],
                       help="Document type for quality threshold (default: default)")
    parser.add_argument("--api-key", help="OpenRouter API key (or set OPENROUTER_API_KEY)")
    parser.add_argument("-v", "--verbose", action="store_true",
                       help="Verbose output")
    parser.add_argument("--research", "-r", action="store_true",
                       help="Research the topic first using Perplexity Sonar for accurate data")
    
    args = parser.parse_args()
    
    # Check for API key
    api_key = args.api_key or os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        print("Error: OPENROUTER_API_KEY environment variable not set")
        print("\nSet it with:")
        print("  export OPENROUTER_API_KEY='your_api_key'")
        print("\nOr provide via --api-key flag")
        sys.exit(1)
    
    try:
        generator = InfographicGenerator(api_key=api_key, verbose=args.verbose)
        results = generator.generate_iterative(
            user_prompt=args.prompt,
            output_path=args.output,
            infographic_type=args.type,
            style=args.style,
            palette=args.palette,
            background=args.background,
            iterations=args.iterations,
            doc_type=args.doc_type,
            research=args.research
        )
        
        if results["success"]:
            print(f"\n✓ Success! Infographic saved to: {args.output}")
            if results.get("early_stop"):
                iterations_used = len([r for r in results['iterations'] if r.get('success')])
                print(f"  (Completed in {iterations_used} iteration(s) - quality threshold met)")
            sys.exit(0)
        else:
            print(f"\n✗ Generation failed. Check review log for details.")
            sys.exit(1)
    except Exception as e:
        print(f"\n✗ Error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
