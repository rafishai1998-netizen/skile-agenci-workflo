# Stage 1 Security Findings

Scope: current working tree on `cleanup/dedup-audit-stage-1`, excluding `.git`.

## Summary

No active-looking real secret was found by high-signal patterns for:

- OpenAI-style `sk-...` keys,
- GitHub personal access tokens,
- Google API keys beginning with `AIza...`,
- `github_pat_...` tokens,
- PEM private key blocks.

The previous raw import issue remains operationally important: any exposed
Gemini key from the old raw branch should be considered compromised and rotated
at the provider, even though the current `main` tree no longer contains the raw
`.mcp.json`.

## Findings

| Path | Finding Type | Masked Fragment | Risk | Recommendation |
|---|---|---|---|---|
| `sources/06-marketing-assets/prompts/docs/LOCAL_DEVELOPMENT.md:56` | placeholder GitHub token example | `ghp_...token` | Low; appears to be example text | Optionally rewrite to `GITHUB_TOKEN=<your-token>` in a later docs-only cleanup. |
| `sources/02-Claude-content-agent/.env.example` | placeholder API key template | `KIE_API_KEY=your_...here`; `IMGBB_API_KEY=your_...here` | Low | Keep `.env.example`; ensure real `.env` stays ignored. |
| `sources/08-awesome-nano-banana-pro-prompts/.env.example` | placeholder API key template | `CMS_API_KEY=your...here` | Low | Do ręcznego sprawdzenia with the sparse source folder. |
| `archive/tool-cache/proofpilot-agents/firecrawl/anomalypoolservices.io.md` | cached page text mentioning invalidated access token | `access token: session invalidated` | Medium as cache/reference noise; no token value found | Do ręcznego sprawdzenia. Delete only if cache provenance is not needed. |
| `sources/06-marketing-assets/.mcp.example.json` | example MCP config using env vars | `${GEMINI_API_KEY}` | Low | Keep. Do not commit a real `.mcp.json`. |

## `.gitignore` Review

Stage 1 safely updated `.gitignore` to include:

- `.env.*`
- `!.env.example`
- `.mcp.json`
- `credentials.json`
- `token.json`
- `.next/`
- `coverage/`
- `tmp/`
- `temp/`

Existing useful ignores were kept, including `node_modules/`, `venv/`, `.venv/`,
`__pycache__/`, `.cache/`, `dist/`, `build/`, `*.log`, `.DS_Store`, and
`Thumbs.db`.

## Required External Action

Rotate/revoke the previously exposed Gemini key at the provider. Removing the
raw branch and current-tree secret is not enough if the key was ever public.

## Conservative Handling Rule

Do not remove security-adjacent examples only because they contain words such as
`token`, `secret`, or `api_key`. Remove or rewrite only items that contain a real
secret, confusing placeholder, or private local configuration.

## Verification Notes

The report masks examples and does not include full secret values. No real secret
value was copied into this report.
