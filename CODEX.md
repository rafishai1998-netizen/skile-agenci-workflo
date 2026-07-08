# CODEX.md — Repository Instructions

This repository is an imported knowledge warehouse plus a working layer for RaFish AI operations.

## Read first

Before making non-trivial changes, read:

1. `README.md`
2. `IMPORT_MANIFEST.md`
3. `CODEX.md`
4. `AGENTS.md`
5. `decisions/promotion-rules.md`
6. `SECURITY.md`

## Directory meaning

- `sources/` — raw imported repositories. Do not edit unless the user explicitly asks for source cleanup.
- `archive/` — generated output, cache, and imported workflow references. Treat as inactive unless reviewed.
- `catalog/` — human-readable indexes over imported material.
- `docs/` — audit reports, cleanup reports, and operational notes.
- `decisions/` — durable repository policies and architectural decisions.
- `active/` — only reviewed and approved skills, agents, prompts, workflows, or templates.
- `rafish-use-cases/` — practical RaFish work areas and candidate lists.
- `reference/` — useful but non-active material.

## Hard rules

1. Do not edit, move, or delete files in `sources/` without explicit user instruction.
2. Do not copy material into `active/` unless it follows `decisions/promotion-rules.md`.
3. Do not add secrets, tokens, `.env`, real `.mcp.json`, credentials, cookies, or private keys.
4. Do not promote GitHub workflows without security review.
5. Do not run destructive scripts unless they default to dry-run and require explicit `--apply` or equivalent.
6. Keep large binaries and media out of normal Git unless a storage policy explicitly allows them.
7. Use small branches and focused commits.
8. When uncertain, document the item as `do ręcznego sprawdzenia` rather than deleting or promoting it.

## Working model

For repo maintenance:

1. Plan the change.
2. Use a branch.
3. Avoid touching `sources/`.
4. Create or update documentation.
5. Verify scope.
6. Summarize what changed and what remains.

For RaFish work:

1. Start in `rafish-use-cases/`.
2. Use `catalog/rafish-index.md` to find candidates.
3. Promote to `active/` only after validation.
4. Keep provenance and validation notes with every promoted item.
