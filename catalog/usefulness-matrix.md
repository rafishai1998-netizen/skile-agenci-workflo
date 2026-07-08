# Usefulness Matrix

Stage: 4

This matrix answers: which files and folders are useful for RaFish, Codex, or
ChatGPT work, and what should happen next.

Status values:

- `promote-candidate` - useful and likely worth adapting into `active/`.
- `adapt-first` - useful, but not safe or compatible enough yet.
- `reference-only` - useful as background, examples, or provenance.
- `manual-review` - uncertain; keep and inspect later.
- `low-current-value` - little practical value for current RaFish/Codex goals.

## High-Value Promotion Candidates

| Path | Type | Usefulness | Status | Recommended Next Step |
|---|---|---|---|---|
| `sources/01-claude-skills-catalog/skills/01-seo` | skills | SEO audits, product/category SEO, schema, sitemap, content planning. | `promote-candidate` | Pick 1-3 SEO skills and adapt to Codex/ChatGPT with RaFish examples. |
| `sources/01-claude-skills-catalog/skills/03-content-creation` | skills | Product descriptions, content briefs, marketing copy. | `promote-candidate` | Review `home-service-seo-content`, `article-writing`, and `content-engine`. |
| `sources/01-claude-skills-catalog/skills/13-business-research` | skills | Supplier, product, and market research. | `promote-candidate` | Adapt `market-research` or `deep-research` into a RaFish research skill. |
| `sources/01-claude-skills-catalog/agents/marketing` | agents | Marketing and content roles. | `promote-candidate` | Select only roles matching RaFish work; do not copy the whole folder. |
| `sources/01-claude-skills-catalog/agents/support` | agents | Customer support summaries, reply drafting, service reporting. | `promote-candidate` | Create one RaFish support agent after reviewing all six files. |
| `sources/06-marketing-assets/prompts` | prompts/assets | Graphics, product visuals, marketing prompt examples. | `promote-candidate` | Curate a small RaFish prompt pack; keep license/provenance. |
| `sources/05-claude-elementor-skill` | skill/template | WordPress/Elementor page generation via WP-CLI. | `promote-candidate` | Adapt from Claude-specific wording to Codex and document staging safety. |
| `sources/07-proofpilot-agents/qapilot` | agent/QA doctrine | Quality review pattern for deliverables. | `promote-candidate` | Extract a small QA checklist agent for RaFish deliverables. |
| `sources/07-proofpilot-agents/_shared` | shared doctrine | Brand, doc delivery, Google Docs styling, SEO report patterns. | `promote-candidate` | Mine only reusable pieces; keep ProofPilot-specific material as reference. |

## Useful After Adaptation

| Path | Type | Usefulness | Status | Why Not Directly Active |
|---|---|---|---|---|
| `sources/03-awesome-claude-skills/baselinker-automation` | skill | BaseLinker task inspiration. | `adapt-first` | Depends on Rube MCP / Composio, not current native tooling. |
| `sources/03-awesome-claude-skills/gmail-automation` | skill | Gmail workflow inspiration. | `adapt-first` | Prefer current Gmail connector skills instead of Rube MCP. |
| `sources/03-awesome-claude-skills/google-drive-automation` | skill | Drive workflow inspiration. | `adapt-first` | Prefer current Google Drive connector skills instead of Rube MCP. |
| `sources/03-awesome-claude-skills/canva-automation` | skill | Canva design workflow inspiration. | `adapt-first` | Prefer current Canva connector skills instead of Rube MCP. |
| `sources/03-awesome-claude-skills/document-skills` | skills/scripts | PDF/DOCX processing patterns. | `adapt-first` | Needs tool/runtime review before use. |
| `sources/03-awesome-claude-skills/canvas-design` | skill/assets | Visual layout and font examples. | `adapt-first` | Includes many font assets; needs licensing and asset policy review. |
| `sources/07-proofpilot-agents/websitepilot` | agents/templates/assets | Website demo system and template doctrine. | `adapt-first` | Heavy and agency-specific; media policy pending. |
| `sources/07-proofpilot-agents/auditpilot` | agent | Website/sales audit workflow. | `adapt-first` | Useful pattern, but ProofPilot-specific and may require web tooling. |
| `sources/07-proofpilot-agents/strategypilot` | agent | SEO/content strategy workflow. | `adapt-first` | Good structure; needs RaFish-specific simplification. |
| `sources/07-proofpilot-agents/reportpilot` | agent | Reporting workflow. | `adapt-first` | Needs adaptation to RaFish reports and data sources. |

## Reference-Only For Now

| Path | Type | Usefulness | Status | Reason |
|---|---|---|---|---|
| `sources/01-claude-skills-catalog/commands` | Claude commands | Reference for process patterns. | `reference-only` | Claude command format is not directly Codex/ChatGPT active content. |
| `sources/03-awesome-claude-skills` | broad skill catalog | Large inspiration catalog. | `reference-only` | 943 mostly Rube/Composio automation skills; too broad for direct use. |
| `archive/imported-github-workflows` | workflows | Workflow examples. | `reference-only` | Must not be activated without security review. |
| `archive/generated-output` | generated output | Provenance/demo evidence. | `reference-only` | Generated workspace output, not source doctrine. |
| `reference/` | working reference area | Destination for future reference classification. | `reference-only` | Stage 4 does not move imported files here yet. |

## Manual Review

| Path | Type | Status | Review Question |
|---|---|---|---|
| `sources/04-foxe-get-proof` | outlier | `manual-review` | Is the browser-console script useful or just provenance? |
| `sources/08-awesome-nano-banana-pro-prompts` | sparse source | `manual-review` | Keep as provenance, move to outliers, or remove later? |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling` | template/assets | `manual-review` | Keep videos in Git, move to LFS, or make reference-only? |
| Functional duplicates listed in `docs/functional-duplicates-review-table.md` | mixed | `manual-review` | Compare content before any merge or removal. |

## Low Current Value

| Path | Type | Status | Reason |
|---|---|---|---|
| Unselected `*-automation` folders in `sources/03-awesome-claude-skills` | skills | `low-current-value` | Keep as searchable reference, but do not adapt without a concrete RaFish need. |
| Build metadata such as `tsconfig*.tsbuildinfo` | generated/cache | `low-current-value` | Likely build cache; wait for template policy before cleanup. |

## Recommended Stage 5

Start with one practical RaFish lane:

1. `marketing-opisy` - curate 3-5 prompt/content skills.
2. `prestashop` - create a small Codex-ready agent/skill for PrestaShop work.
3. `obsluga-klienta` - create one customer-support reply agent.

Do not promote broad catalogs or whole folders.
