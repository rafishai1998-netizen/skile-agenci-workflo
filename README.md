# skile-agenci-workflo

This repository collects imported skill, agent, prompt, and marketing asset
repositories for later review and normalization.

## Branches

- `main` contains the organized clean import.
- `import/repos-merge` was the temporary raw import branch and has been deleted
  from the remote. If it appears in a local clone, delete or prune it.
- `cleanup/import-structure` was the local staging branch used to prepare the
  clean tree before publishing it to `main`.

## Layout

- `sources/` contains the imported repositories in numbered folders.
- `archive/` contains generated output, tool cache data, and imported workflow
  definitions that should not be treated as active project automation.
- `catalog/` contains human-readable indexes for the imported material.
- `docs/` contains cleanup, security, and asset handling notes.
- `IMPORT_MANIFEST.md` records source repositories, branches, import sizes, and
  duplicate/system-file skips.
- `active/` is the future home for reviewed skills, agents, prompts, workflows,
  and templates. It is intentionally empty until items pass promotion rules.
- `rafish-use-cases/` groups practical RaFish work areas such as PrestaShop,
  Allegro/BaseLinker, Gmail/Drive, graphics, marketing, support, and research.
- `reference/` is for Claude-only, Rube/Composio, ProofPilot, template, asset,
  and outlier material that is useful but not active.
- `decisions/` records cleanup and promotion policy decisions.

## Current Classification

Stage 4 classifies the repo by working type before promotion:

- skills,
- agents,
- prompts,
- workflows,
- templates,
- assets,
- reference-only material,
- generated/cache material.

Start with:

- `catalog/repo-type-map.md`
- `catalog/usefulness-matrix.md`
- `catalog/promotion-candidates-stage-4.md`
- `docs/stage-4-usefulness-classification.md`

## Important Security Note

The raw import contained a public-looking provider API key in a local MCP config
file from `06-marketing-assets`. The published `main` branch removes that file
and keeps only `.mcp.example.json`, but any exposed key must still be revoked or
rotated at the provider. The temporary raw import branch has been deleted from
the remote; prune it from any local clones or forks if it appears there.

## Recommended Next Pass

1. Pick one RaFish use case.
2. Promote one small reviewed item into `active/`.
3. Add source, validation, status, tool requirements, license/provenance, and a
   usage example.
4. Keep broad imported catalogs in `sources/` until specific items are adapted.
5. Decide WebsitePilot media policy before promoting heavy templates.
