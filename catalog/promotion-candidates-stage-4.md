# Promotion Candidates Stage 4

This file lists the best candidates for future `active/` promotion. It is not a
promotion itself.

## First Wave Candidates

| Target `active/` Area | Candidate Source | Proposed Name | Status |
|---|---|---|---|
| `active/skills/` | `sources/01-claude-skills-catalog/skills/01-seo/seo-content` | `rafish-seo-content` | `candidate` |
| `active/skills/` | `sources/01-claude-skills-catalog/skills/01-seo/website-seo-audit` | `rafish-website-seo-audit` | `candidate` |
| `active/skills/` | `sources/01-claude-skills-catalog/skills/13-business-research/market-research` | `rafish-market-research` | `candidate` |
| `active/prompts/` | `sources/06-marketing-assets/prompts` | `rafish-visual-prompts` | `candidate` |
| `active/agents/` | `sources/01-claude-skills-catalog/agents/support` | `rafish-customer-support-agent` | `candidate` |
| `active/agents/` | `sources/07-proofpilot-agents/qapilot` | `rafish-qa-agent` | `candidate` |
| `active/templates/` | `sources/05-claude-elementor-skill` | `wordpress-elementor-page-template-workflow` | `candidate` |

## Integration Candidates

These are useful, but should not be promoted until they are rewritten around the
tools actually available in this Codex/ChatGPT environment.

| Source | Possible Active Name | Required Adaptation |
|---|---|---|
| `sources/03-awesome-claude-skills/baselinker-automation` | `baselinker-workflow-notes` | Remove Rube/Composio dependency or document it as optional. |
| `sources/03-awesome-claude-skills/gmail-automation` | `gmail-triage-workflow` | Use native Gmail connector skills instead of Rube. |
| `sources/03-awesome-claude-skills/google-drive-automation` | `drive-organization-workflow` | Use native Google Drive connector skills instead of Rube. |
| `sources/03-awesome-claude-skills/canva-automation` | `canva-design-workflow` | Use native Canva connector skills instead of Rube. |

## Do Not Promote Yet

- Whole `sources/03-awesome-claude-skills`.
- Whole `sources/07-proofpilot-agents`.
- Any `.github/workflows` content.
- WebsitePilot media-heavy templates.
- Generated output from `archive/generated-output`.
- Sparse/outlier sources without a provenance decision.
