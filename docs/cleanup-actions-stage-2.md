# Stage 2 Cleanup Plan

This is a plan only. Stage 1 did not delete, move, or edit imported source
content.

## Goals

1. Reduce obvious noise only after manual confirmation.
2. Separate Codex/ChatGPT-ready material from raw Claude-only imports.
3. Remove cache and generated output from normal Git history going forward.
4. Keep all destructive actions reviewable in a separate commit.

## Possible Removals After Manual Review

Recommended candidates after one final confirmation. If there is uncertainty,
keep the item and mark it for a later review pass.

- `archive/tool-cache/proofpilot-agents/firecrawl`
  - Reason: appears to be cache output, not source material.
  - Conservative check: confirm no docs or examples depend on these cached pages.
- `archive/generated-output/proofpilot-agents/websitepilot-workspaces`
  - Reason: appears to be generated workspaces, screenshots, artifacts, and demo
    output.
  - Conservative check: confirm it is not used as a fixture or provenance sample.
- `sources/08-awesome-nano-banana-pro-prompts`
  - Reason: currently only `.env.example`; prompt content appears to be already
    represented by `sources/06-marketing-assets/prompts`.
  - Conservative check: confirm no unique metadata was expected from this source.

## Move Or Reclassify

Recommended moves, if the project wants cleaner top-level semantics. These are
not required for stage 2 if the goal is only to remove confirmed noise.

- Move Claude-specific command collections from
  `sources/01-claude-skills-catalog/commands` to a reference namespace such as
  `reference/claude-only/commands`.
- Move `.claude-plugin` metadata from
  `sources/03-awesome-claude-skills/.claude-plugin` and
  `sources/03-awesome-claude-skills/connect-apps-plugin/.claude-plugin` to
  `reference/claude-only/plugin-metadata` only if marketplace metadata is not
  needed in place.
- Move imported workflow references from
  `archive/imported-github-workflows` to `reference/imported-workflows` or delete
  after review. Prefer keeping it as reference if uncertain. Do not promote to
  root `.github/workflows/` without separate security review.

## Keep For Now

- `sources/01-claude-skills-catalog`
- `sources/03-awesome-claude-skills`
- `sources/05-claude-elementor-skill`
- `sources/06-marketing-assets`
- `sources/07-proofpilot-agents`, excluding generated/cache material already in
  `archive/`

These folders contain useful material, but they are not yet Codex-ready as a
whole.

## Later Promote To `active/`

Create an `active/` or `codex-ready/` directory only after manual selection and
adaptation. Good first candidates:

- SEO skills from `sources/01-claude-skills-catalog/skills/01-seo`
- focused Elementor skill from `sources/05-claude-elementor-skill`
- reusable ProofPilot shared skills from `sources/07-proofpilot-agents/_shared/skills`
- selected prompt packs from `sources/06-marketing-assets/prompts`

Each promoted item should get:

- normalized lowercase hyphen-case name,
- Codex/ChatGPT-compatible instructions,
- source provenance,
- explicit tool and secret requirements,
- small validation checklist.

## Requires User Decision

- Keep WebsitePilot media in Git, move to Git LFS, or store externally.
- Decide whether `sources/04-foxe-get-proof` should remain as provenance, move
  to an outlier archive, or be removed later. If uncertain, keep it.
- Whether same-name skill/agent pairs should be merged, archived, or kept as
  variant implementations.
- Whether imported workflow definitions have any future value.

## Suggested Stage 2 Commit Shape

Use one focused cleanup branch:

`cleanup/remove-generated-and-cache-stage-2`

Suggested commit message:

`cleanup: remove generated output and cache imports`

Do not combine deletion cleanup with Codex-ready promotion in the same commit.
Do not optimize repo size for its own sake; prioritize accurate classification.
