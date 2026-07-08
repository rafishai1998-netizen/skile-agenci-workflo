# Stage 3 Working Structure

Branch: `cleanup/working-structure-stage-3`

Stage 3 prepares the repository for practical Codex/ChatGPT and RaFish work
without aggressively deleting imported material and without promoting specific
skills, agents, prompts, or workflows.

## Created Structure

- `active/` - empty quality-gated area for future reviewed material.
- `rafish-use-cases/` - practical business-facing map for RaFish workflows.
- `reference/` - future home for reference-only material.
- `decisions/` - policy and decision notes for conservative cleanup.

## Created Documents

- `active/README.md`
- `rafish-use-cases/README.md`
- `rafish-use-cases/prestashop/README.md`
- `rafish-use-cases/allegro-baselinker/README.md`
- `rafish-use-cases/gmail-drive/README.md`
- `rafish-use-cases/grafiki-etykiety/README.md`
- `rafish-use-cases/marketing-opisy/README.md`
- `rafish-use-cases/obsluga-klienta/README.md`
- `rafish-use-cases/research-hurtownie/README.md`
- `reference/README.md`
- `reference/claude-only/README.md`
- `reference/imported-workflows/README.md`
- `reference/outliers/README.md`
- `decisions/README.md`
- `decisions/websitepilot-policy.md`
- `decisions/generated-output-policy.md`
- `decisions/sparse-sources-policy.md`
- `decisions/promotion-rules.md`

## Not Changed

- No file under `sources/` is intentionally changed.
- No content is moved from `sources/`.
- `archive/generated-output/proofpilot-agents/websitepilot-workspaces` is kept.
- Large WebsitePilot `.mp4` files are kept.
- No GitHub Actions are created.
- No imported skill is promoted to `active/`.

## Open Decisions

- Choose WebsitePilot policy: runnable template, Git LFS, or reference-only.
- Decide whether archived generated output has fixture or provenance value.
- Decide how to handle sparse source imports.
- Compare functional duplicate candidates before any merge or removal.
- Decide whether imported workflows have future reference value.

## Stage 4 Recommendation

Run a small manual review pass focused on one business use case at a time. The
recommended first pass is PrestaShop or marketing/descriptions because those are
practical RaFish areas and can be evaluated without changing imported folders.

Each stage 4 promotion should create a small reviewed item in `active/` with
provenance, validation, status, tool requirements, and a usage example.
