# Cleanup Plan

This branch turns the first raw repository merge into a reviewable structure.

## Completed In This Pass

- Moved imported repositories into `sources/`.
- Moved generated workspaces, cache data, and imported workflow definitions into
  `archive/`.
- Replaced a secret-bearing MCP config with a safe example file.
- Added a root README, import manifest, security notes, and catalog indexes.

## Next Review Pass

1. Classify each useful item as a skill, agent, prompt pack, template, asset, or
   reference-only import.
2. Remove duplicates across `sources/01-claude-skills-catalog`,
   `sources/03-awesome-claude-skills`, and `sources/06-marketing-assets/prompts`.
3. Normalize metadata names, descriptions, frontmatter, and directory naming.
4. Decide whether WebsitePilot templates and media assets should stay in this
   repository or move to Git LFS or external storage.
5. Promote only reviewed automation into root-level `.github/workflows/`.
