# Vibe Marketing OS

Turn ideas into shippable marketing assets in a single session.

## Setup (one-time)

1. Set your Gemini API key:
   ```
   export GEMINI_API_KEY="your-key-here"
   ```
   Or add `GEMINI_API_KEY` to `.mcp.json` env block.
2. Install dependencies:
   ```
   npm install
   ```

## Bundled repos

Both reference repos are included in this repository:

- **`./skills/`** — Awesome Claude Skills (execution layer)
  - Use for: hook banks, script-to-caption pipelines, repurposing workflows, consistent Marketing OS outputs
- **`./prompts/`** — Awesome Nano Banana Pro Prompts (creative layer, 9,400+ prompts)
  - Use for: reel covers, carousel backgrounds, ad creative styles, consistent visual house style

## Campaign Workflow (3 phases)

### Phase 1 — Copy Generation
Output these assets:
- 25 hooks (scroll-stopping openers)
- 3 angles (unique positioning perspectives)
- 1 short script (15-30s Reel/TikTok)
- 1 carousel outline (slide-by-slide breakdown)
- 5 caption variants (different tones/lengths)

### Phase 2 — Visual Generation
Use the MCP tools:
1. `nano_banana_search_prompts` — search the prompt library for matching styles
2. Pick the best 3 prompts and rewrite them to match the brand
3. `gemini_generate_image` — generate the final visual with the best prompt

Target visuals: thumbnail style, carousel style, proof slide visuals.

### Phase 3 — Campaign Assembly
Ship a mini-campaign:
- 1 Reel + cover image
- 1 carousel (5-10 slides)
- 3 story frames
- 1 email (subject + body)
- 5 tweets

## Example Usage Prompt

```
Use nano_banana_search_prompts for: "carousel cover image for a healthcare practice,
clean infographic style, high contrast, minimal"

Then pick the best 3 prompts.
Rewrite them to match my brand: premium, systems, OperatorOS.
Then call gemini_generate_image on the best one.

Return:
- 3 final prompts
- 1 recommended prompt (best)
- 1 short caption for the image
```

## Pro Tips

- Keep a "Prompt Winners" file with only the top 20 prompts you actually shipped — that becomes your house style library.
- Pick one house style and version it. Consistency beats random aesthetics.
- Swap the Gemini model in `server.js` (`getGenerativeModel(...)`) if your endpoint differs.
