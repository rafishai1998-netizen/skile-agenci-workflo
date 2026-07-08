# Active

`active/` contains only reviewed material that is ready or nearly ready for
daily use with Codex, ChatGPT, and RaFish workflows.

Nothing should be promoted into `active/` unless it has:

- source/provenance notes,
- a short README,
- a validation checklist,
- required tools and secrets documented,
- a status of `ready`, `testing`, or `deprecated`.

Raw imported folders must not be copied here as-is. Each promoted skill, agent,
prompt, workflow, or template should be adapted, named, validated, and explained
as a small standalone unit.

Current stage 3 status: no imported item has been promoted yet.

Current stage 4 status: `active/` remains empty except README and placeholder
files. Subfolder README files now define the promotion expectations for skills,
agents, prompts, workflows, and templates.

## Folders

- `skills/` - reviewed skills only.
- `agents/` - reviewed agent instructions only.
- `prompts/` - reviewed prompt packs only.
- `workflows/` - reviewed workflows only; GitHub workflows require security
  review before any activation.
- `templates/` - reviewed reusable templates only.

First candidates are tracked in `catalog/promotion-candidates-stage-4.md`.
