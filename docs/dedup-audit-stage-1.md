# Stage 1 Repository Deduplication Audit

Branch: `cleanup/dedup-audit-stage-1`

Scope: audit only. No files in `sources/` were edited, moved, or deleted.

## Summary

The repository is an import warehouse, not a production codebase. `sources/`
contains raw imported repositories, `archive/` contains generated/cache/reference
material, and `catalog/` plus `docs/` contain review helpers.

Stage 1 found no exact duplicate files by SHA-256. The next-step risk is not a
simple duplicate purge; it is deciding which imported material is active,
reference-only, generated, or outside the repo goal. When certainty is low, this
report marks items for manual review rather than deletion.

## Counts

| Metric | Value |
|---|---:|
| Files audited, excluding `.git` | 3306 |
| Directories audited, excluding `.git` | 1607 |
| Repository working tree size, excluding `.git` | 189.81 MB |
| Exact duplicate groups by SHA-256 | 0 |
| Files larger than 5 MB | 8 |
| Files larger than 20 MB | 0 |

## Root Folder Structure

| Folder | Files | Size |
|---|---:|---:|
| `sources` | 3240 | 174.65 MB |
| `archive` | 55 | 15.15 MB |
| `catalog` | 4 | ~0 MB |
| `docs` | 2 before this audit | ~0 MB |

## Ten Largest Folders

| Folder | Files | Size |
|---|---:|---:|
| `sources` | 3239 | 174.65 MB |
| `sources/07-proofpilot-agents` | 1116 | 145.47 MB |
| `sources/07-proofpilot-agents/websitepilot` | 867 | 142.64 MB |
| `sources/07-proofpilot-agents/websitepilot/templates` | 729 | 142.08 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources` | 723 | 142.02 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling` | 276 | 126.72 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public` | 20 | 65.26 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src` | 237 | 61.08 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src/assets` | 141 | 60.57 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram` | 13 | 42.31 MB |

## Exact Duplicate Audit

Method: SHA-256 hash of every file outside `.git`.

Result: no exact duplicate groups were found.

| Hash | Copies | Paths | Recommendation |
|---|---:|---|---|
| n/a | 0 | n/a | No 1:1 deletion candidates from hash matching. |

## Potential Functional Duplicates

These are not exact duplicates. They are same-name or related-function candidates
for manual review before any deletion.

### Skill Candidates

| Name | Paths | Recommendation |
|---|---|---|
| `autopilot` | `sources/07-proofpilot-agents/autopilot/skill/SKILL.md`; `sources/07-proofpilot-agents/websitepilot/skill/related/autopilot/SKILL.md` | Compare scope. Keep one canonical source and mark the other as related/reference if still needed. |
| `pilot-company` | `sources/07-proofpilot-agents/pilotcore/skill/related/pilot-company/SKILL.md`; `sources/07-proofpilot-agents/_shared/skills/pilot-company/SKILL.md` | Prefer shared version if it is generic; keep related version only if WebsitePilot/PilotCore-specific. |
| `proofpilot-brand` | `sources/01-claude-skills-catalog/skills/14-proofpilot-ops/proofpilot-brand/SKILL.md`; `sources/07-proofpilot-agents/_shared/skills/proofpilot-brand/SKILL.md` | Pick canonical owner before promoting to Codex-ready catalog. |
| `website-seo-audit` | `sources/01-claude-skills-catalog/skills/01-seo/website-seo-audit/SKILL.md`; `sources/07-proofpilot-agents/auditpilot/skill/related/website-seo-audit/SKILL.md` | Manual comparison; likely one general SEO skill and one AuditPilot-related copy. |

### Agent Name Candidates

| Name | Paths | Recommendation |
|---|---|---|
| `arch-system-design` | `sources/01-claude-skills-catalog/agents/architecture/system-design/arch-system-design.md`; `sources/01-claude-skills-catalog/agents/architecture/arch-system-design.md` | Same role in nested and flat categories; keep one path after content review. |
| `data-ml-model` | `sources/01-claude-skills-catalog/agents/data/ml/data-ml-model.md`; `sources/01-claude-skills-catalog/agents/data/data-ml-model.md` | Same-name role; manual diff before deletion. |
| `dev-backend-api` | `sources/01-claude-skills-catalog/agents/development/backend/dev-backend-api.md`; `sources/01-claude-skills-catalog/agents/development/dev-backend-api.md` | Same-name role; likely category duplicate. |
| `docs-api-openapi` | `sources/01-claude-skills-catalog/agents/documentation/api-docs/docs-api-openapi.md`; `sources/01-claude-skills-catalog/agents/documentation/docs-api-openapi.md` | Same-name role; likely category duplicate. |
| `ops-cicd-github` | `sources/01-claude-skills-catalog/agents/devops/ci-cd/ops-cicd-github.md`; `sources/01-claude-skills-catalog/agents/devops/ops-cicd-github.md` | Same-name role; likely category duplicate. |
| `planner` | `sources/01-claude-skills-catalog/agents/core/planner.md`; `sources/01-claude-skills-catalog/agents/planner.md` | Compare generic planner vs core planner before promotion. |
| `spec-mobile-react-native` | `sources/01-claude-skills-catalog/agents/specialized/mobile/spec-mobile-react-native.md`; `sources/01-claude-skills-catalog/agents/specialized/spec-mobile-react-native.md` | Same-name role; manual review. |

### Prompt Pack Candidates

- `sources/06-marketing-assets/prompts` is the primary prompt pack.
- `sources/08-awesome-nano-banana-pro-prompts` now contains only
  `.env.example`; most prompt content was skipped as duplicate during the import.
- Recommendation: mark `sources/08-awesome-nano-banana-pro-prompts` for manual
  provenance review. Only remove or replace it with a provenance note after
  confirming no unique prompt content is expected there.

### Related Capability Clusters

| Cluster | Evidence | Recommendation |
|---|---|---|
| `skill-builder` / `skill-creator` | `skill-builder`: 1 file; `skill-creator`: 4 files | Review naming and keep Codex-compatible skill creation guidance only. |
| Firecrawl tools | `firecrawl-search`: 7 files; `firecrawl-scrape`: 10; `firecrawl-crawl`: 6; `firecrawl-map`: 5 | Likely related but not identical. Keep as separate tool concepts unless a later semantic review proves overlap. |
| WebsitePilot / AutoPilot / PilotCore | `websitepilot`: 39 files; `autopilot`: 27; `pilotcore`: 3 | Treat as a family. Do not delete by name; first decide whether this repo should keep WebsitePilot templates at all. |

## Large Files

All files larger than 5 MB are videos in
`sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling`.
No file is larger than 20 MB.

| Size | Type | Path | Recommendation |
|---:|---|---|---|
| 14.04 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DVrWYGPEhs3.mp4` | Git LFS or external storage if template is kept. |
| 8.85 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DBcBorsy_iN.mp4` | Git LFS or external storage if template is kept. |
| 7.61 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src/assets/rocking-s-about.mp4` | Git LFS or external storage if template is kept. |
| 7.37 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-3.mp4` | Git LFS or external storage if template is kept. |
| 6.75 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-1.mp4` | Git LFS or external storage if template is kept. |
| 6.68 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-2.mp4` | Git LFS or external storage if template is kept. |
| 6.54 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DUl8QZAEzaT.mp4` | Git LFS or external storage if template is kept. |
| 5.51 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DUTKBQsjw1A.mp4` | Git LFS or external storage if template is kept. |

## Cache And Generated Output

| Path | Finding | Stage 2 Recommendation |
|---|---|---|
| `archive/generated-output/proofpilot-agents/websitepilot-workspaces` | 42 files, 14.99 MB; generated WebsitePilot workspace, artifacts, demo, screenshots | Do ręcznego sprawdzenia before deletion. Confirm no fixture/provenance value is needed. |
| `archive/tool-cache/proofpilot-agents/firecrawl` | 6 files, 0.14 MB; cached Firecrawl output | Do ręcznego sprawdzenia; likely cache, but verify no report depends on it. |
| `archive/imported-github-workflows/08-awesome-nano-banana-pro-prompts/.github` | 7 files; imported workflow definitions, not active root workflows | Do ręcznego sprawdzenia. Keep as reference unless intentionally removed. Do not promote without security review. |
| `archive/generated-output/.../qa-screenshots` | screenshots under generated workspace | Do ręcznego sprawdzenia as part of generated workspace review. |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/*/package-lock.json` | template dependency locks | Keep for runnable templates, or remove only if templates become reference-only. |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/*/tsconfig*.tsbuildinfo` | build cache files in imported templates | Do ręcznego sprawdzenia after template policy decision. |

No `node_modules/`, `.next/`, `coverage/`, or root `dist/` directories were
found in the current working tree.

## Suspicious Secrets And Private Configuration

No active-looking real secret was found by high-signal patterns for OpenAI-style
keys, GitHub PATs, Google API keys, or private-key blocks.

Findings to track:

| Path | Type | Masked Fragment | Recommendation |
|---|---|---|---|
| `sources/06-marketing-assets/prompts/docs/LOCAL_DEVELOPMENT.md:56` | placeholder GitHub token example | `ghp_...token` | Keep as documentation or rewrite in stage 2 to an obviously invalid placeholder. |
| `sources/02-Claude-content-agent/.env.example` | env template with placeholders | `KIE_API_KEY=your_...here`, `IMGBB_API_KEY=your_...here` | Keep `.env.example`; `.gitignore` should allow examples but ignore real `.env`. |
| `sources/08-awesome-nano-banana-pro-prompts/.env.example` | env template with placeholder | `CMS_API_KEY=your...here` | Do ręcznego sprawdzenia with the sparse source folder. |
| `archive/tool-cache/proofpilot-agents/firecrawl/anomalypoolservices.io.md` | cached page text includes a token error message, not a token value | `access token: session invalidated` | Prefer deleting cache in stage 2. |
| `sources/06-marketing-assets/.mcp.example.json` | safe MCP example file | `${GEMINI_API_KEY}` | Keep; real `.mcp.json` is ignored. |

`.gitignore` was safely updated to ignore `.env.*`, `.mcp.json`,
`credentials.json`, `token.json`, `.next/`, `coverage/`, `tmp/`, and `temp/`
while keeping `!.env.example`.

## Active Vs Reference Classification

| Path | Classification | Reason |
|---|---|---|
| `README.md`, `IMPORT_MANIFEST.md`, `SECURITY.md`, `docs/`, `catalog/` | active repo governance | These describe and govern the imported warehouse. |
| `sources/01-claude-skills-catalog` | imported without selection; valuable reference | Broad skill/agent catalog with some Codex-adaptable content and many Claude-specific command patterns. |
| `sources/03-awesome-claude-skills` | imported without selection; valuable reference | 943 `SKILL.md` files, many automation skills. Needs selection before Codex promotion. |
| `sources/05-claude-elementor-skill` | focused reference | Likely useful after Codex/ChatGPT adaptation. |
| `sources/06-marketing-assets` | prompt/reference source | Contains primary prompt pack and safe MCP example. |
| `sources/07-proofpilot-agents` | mixed reference plus heavy templates/assets | Contains useful agent/skill material but dominates repo size through WebsitePilot media. |
| `sources/04-foxe-get-proof` | outlier/manual review | One README with browser-console script; direct Codex/ChatGPT value is unclear. |
| `sources/08-awesome-nano-banana-pro-prompts` | redundant/sparse import | Only `.env.example` remains after duplicate skipping. |
| `archive/generated-output` | generated | Do ręcznego sprawdzenia in stage 2. |
| `archive/tool-cache` | cache | Do ręcznego sprawdzenia in stage 2. |
| `archive/imported-github-workflows` | reference-only automation | Keep only if workflows will be reviewed as reference material. |

## Conservative Stage 2 Candidates

Do not execute in stage 1. These are candidates only, and each should be checked
manually before any removal:

- `archive/tool-cache/proofpilot-agents/firecrawl`
- `archive/generated-output/proofpilot-agents/websitepilot-workspaces`
- `sources/08-awesome-nano-banana-pro-prompts` if manual review confirms the
  `.env.example` is not needed as provenance.
- Generated `tsconfig*.tsbuildinfo` files inside WebsitePilot template folders,
  after deciding whether templates stay runnable.

## Manual Review Required

- Whether WebsitePilot templates under `sources/07-proofpilot-agents/websitepilot/templates`
  should remain in Git, move to Git LFS, move to external storage, or become a
  small curated sample.
- Whether `sources/04-foxe-get-proof` has any value beyond historical import
  provenance.
- Same-name skill and agent pairs listed above.
- Claude-only commands in `sources/01-claude-skills-catalog/commands` before any
  Codex/ChatGPT promotion.
- Any proposed deletion where provenance, fixture value, or future reuse is not
  obvious.
