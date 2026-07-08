# Marketing Assets — Vibe Marketing Quick Setup

Turn ideas into shippable marketing assets fast using Claude Code + Nano Banana prompts + Gemini.

## Quick Start

```bash
# 1. Clone this repo
git clone <this-repo-url> && cd marketing-assets

# 2. Install dependencies
npm install

# 3. Set your Gemini API key
export GEMINI_API_KEY="your-key-here"

# 4. Open in Claude Code — MCP and workflows are auto-configured
```

## What's Included

| File / Dir | Purpose |
|------------|---------|
| `server.js` | MCP server with prompt search + Gemini image generation |
| `.mcp.json` | Auto-configures the MCP server for Claude Code |
| `CLAUDE.md` | 3-phase campaign workflow loaded automatically by Claude Code |
| `prompts/` | Awesome Nano Banana Pro Prompts — 9,400+ curated image prompts |
| `skills/` | Awesome Claude Skills — repeatable workflow library (hook banks, pipelines) |

## MCP Tools

- **`nano_banana_search_prompts`** — Search 9,400+ curated image prompts by keyword
- **`gemini_generate_image`** — Send a prompt to Gemini for image generation

## What You Can Ship in 1 Session

1. **Copy**: 25 hooks, 3 angles, 1 short script, 1 carousel outline, 5 caption variants
2. **Visuals**: Thumbnail, carousel, and proof slide styles via Nano Banana + Gemini
3. **Campaign**: 1 Reel + cover, 1 carousel, 3 story frames, 1 email, 5 tweets
