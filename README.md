# skile-agenci-workflo

This repository collects imported skill, agent, prompt, and marketing asset
repositories for later review and normalization.

## Branches

- `import/repos-merge` keeps the first raw import of the eight requested
  repositories.
- `cleanup/import-structure` organizes that import into a safer review shape.

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
file from `06-marketing-assets`. This cleanup branch removes that file and keeps
only `.mcp.example.json`, but any exposed key must still be revoked or rotated at
the provider. Do not treat the raw import branch as clean until it is deleted,
replaced, or history-rewritten.

## Recommended Next Pass

1. Review `catalog/` to decide which skills, agents, and prompts should become
   first-class project content.
2. Move large binary media to Git LFS or external storage before merging into a
   long-lived branch.
3. Normalize naming, metadata, licensing notes, and README files after the clean
   import is approved.
