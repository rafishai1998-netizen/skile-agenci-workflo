# Import Manifest

Raw import branch: `import/repos-merge` (temporary; deleted from the remote after
cleanup)

Published branch: `main`

Cleanup staging branch: `cleanup/import-structure`

The first import copied files from eight repositories into numbered folders.
System files and exact duplicate files were skipped during the import. The
published branch moves those numbered folders under `sources/` and separates
generated or tool-specific material under `archive/`.

| # | Source repository | Source branch | Target folder | Copied files | Duplicate skips | System skips | Size |
|---|---|---|---|---:|---:|---:|---:|
| 01 | `get-proofpilot/claude-skills-catalog` | `main` | `sources/01-claude-skills-catalog` | 875 | 3 | 1 | 7.50 MB |
| 02 | `get-proofpilot/Claude-content-agent` | `claude/build-from-video-tutorial-QKLOz` | `sources/02-Claude-content-agent` | 11 | 6 | 1 | 0.05 MB |
| 03 | `get-proofpilot/awesome-claude-skills` | `master` | `sources/03-awesome-claude-skills` | 1188 | 58 | 0 | 11.00 MB |
| 04 | `simple-YoungBadBoy/foxe-get-proof` | `main` | `sources/04-foxe-get-proof` | 1 | 0 | 0 | 0.00 MB |
| 05 | `get-proofpilot/claude-elementor-skill` | `main` | `sources/05-claude-elementor-skill` | 10 | 0 | 1 | 0.03 MB |
| 06 | `get-proofpilot/marketing-assets` | `claude/vibe-marketing-setup-Z8DJP` | `sources/06-marketing-assets` | 37 | 1245 | 1 | 10.11 MB |
| 07 | `get-proofpilot/proofpilot-agents` | `main` | `sources/07-proofpilot-agents` | 1164 | 487 | 7 | 160.47 MB |
| 08 | `get-proofpilot/awesome-nano-banana-pro-prompts` | `main` | `sources/08-awesome-nano-banana-pro-prompts` | 8 | 31 | 1 | 0.02 MB |

Total copied: 3294 files, about 189.19 MB.

## Cleanup Changes

- Replaced `sources/06-marketing-assets/.mcp.json` with
  `sources/06-marketing-assets/.mcp.example.json`.
- Moved WebsitePilot workspaces from
  `sources/07-proofpilot-agents/websitepilot/workspaces` to
  `archive/generated-output/proofpilot-agents/websitepilot-workspaces`.
- Moved Firecrawl cache data from `sources/07-proofpilot-agents/.firecrawl` to
  `archive/tool-cache/proofpilot-agents/firecrawl`.
- Moved imported GitHub workflow definitions from
  `sources/08-awesome-nano-banana-pro-prompts/.github` to
  `archive/imported-github-workflows/08-awesome-nano-banana-pro-prompts/.github`.

## Notes

- `sources/04-foxe-get-proof` is an outlier: it imported as a single README with
  a browser-console script.
- `sources/08-awesome-nano-banana-pro-prompts` is intentionally sparse because
  most prompt files were exact duplicates of content already imported from
  `sources/06-marketing-assets/prompts`.
