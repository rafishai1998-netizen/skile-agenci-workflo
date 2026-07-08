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

## Important Security Note

The raw import contained a public-looking provider API key in a local MCP config
file from `06-marketing-assets`. The published `main` branch removes that file
and keeps only `.mcp.example.json`, but any exposed key must still be revoked or
rotated at the provider. The temporary raw import branch has been deleted from
the remote; prune it from any local clones or forks if it appears there.

## Recommended Next Pass

1. Review `catalog/` to decide which skills, agents, and prompts should become
   first-class project content.
2. Move large binary media to Git LFS or external storage before merging into a
   long-lived branch.
3. Normalize naming, metadata, licensing notes, and README files after the clean
   import is approved.
