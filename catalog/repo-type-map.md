# Repository Type Map

Stage: 4

Purpose: classify the imported repository by working type before anything is
copied into `active/`.

This is a conservative map. It does not promote, move, or delete imported
content.

## Type Counts

| Type | Count | Notes |
|---|---:|---|
| Skills | 1176 | `SKILL.md` files, mostly under `sources/01`, `sources/03`, and `sources/07`. |
| Agent-like files | 656 | Agent folders, agent markdown, and ProofPilot pilot doctrine. |
| Prompt-like files | 78 | Prompt folders and prompt markdown. |
| Node app/template packages | 20 | `package.json` files under marketing assets, WebsitePilot templates, and generated demo output. |
| Media/assets | 293 | Images, fonts, SVGs, icons, and videos. |
| Generated output | 42 | Archived WebsitePilot generated workspace output. |
| Imported workflow files | 7 | Archived GitHub workflow/reference files. |

## Working Types

### Skills

Primary locations:

- `sources/01-claude-skills-catalog/skills`
- `sources/03-awesome-claude-skills`
- `sources/05-claude-elementor-skill`
- `sources/07-proofpilot-agents/*/skill`

Use:

- Promote only one reviewed skill at a time.
- Normalize names to lowercase hyphen-case.
- Add source, validation, status, and tool requirements before promotion.

### Agents

Primary locations:

- `sources/01-claude-skills-catalog/agents`
- `sources/02-Claude-content-agent`
- `sources/07-proofpilot-agents`

Use:

- Treat imported agents as doctrine/reference until adapted.
- Prefer practical RaFish agents before broad generic agent catalogs.
- Do not run agent workflows that require unavailable tools or secrets.

### Prompts

Primary locations:

- `sources/06-marketing-assets/prompts`
- `sources/08-awesome-nano-banana-pro-prompts`
- prompt folders inside `sources/07-proofpilot-agents`

Use:

- Good candidate area for RaFish marketing, product descriptions, graphics, and
  label briefs.
- Deduplicate by purpose, not filename alone.
- Keep provenance and license notes.

### Workflows

Primary locations:

- `archive/imported-github-workflows`
- workflow-like instructions in imported skills and agents

Use:

- Reference-only until security reviewed.
- Do not copy into root `.github/workflows/` during classification stages.

### Templates

Primary locations:

- `sources/07-proofpilot-agents/websitepilot/templates`
- `archive/generated-output/proofpilot-agents/websitepilot-workspaces/.../demo`
- `sources/05-claude-elementor-skill`

Use:

- WebsitePilot templates are useful but heavy.
- Elementor skill is small and more directly reusable.
- Generated demos are reference/provenance, not active templates.

### Assets

Primary locations:

- WebsitePilot template media under `sources/07-proofpilot-agents/websitepilot/templates`
- image prompt gallery assets under `sources/06-marketing-assets/prompts/public`
- fonts under `sources/03-awesome-claude-skills/canvas-design`

Use:

- Keep as reference until an asset policy is decided.
- Large videos need the WebsitePilot policy decision before any move.

### Generated Or Cache

Primary locations:

- `archive/generated-output`
- generated/build metadata such as `tsconfig*.tsbuildinfo`

Use:

- Do not treat as active source.
- Keep until the user decides fixture/provenance value.

## Next Action

Use `catalog/usefulness-matrix.md` to decide which category gets a small stage 5
promotion pass.
