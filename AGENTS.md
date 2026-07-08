# AGENTS.md — Agent Selection Guide

Use this file to choose the right operating pattern for repository work.

## Default maintenance pattern

For repository cleanup, indexing, refactoring, and governance:

- `gsd-planner` — break the work into conservative phases.
- `gsd-executor` — implement only the agreed scope.
- `gsd-verifier` — verify the goal and check that scope was not exceeded.
- `repo-architect` — optional, for folder structure and naming decisions.

## Task mapping

| Task area | Recommended agents / patterns | Notes |
|---|---|---|
| Repository cleanup | `gsd-planner`, `gsd-executor`, `gsd-verifier`, optional `repo-architect` | Do not use WebsitePilot or AutoPilot. |
| PrestaShop / SQL | `gsd-planner`, `gsd-executor`, `gsd-verifier`, optional `repo-architect` | Treat production database work as high-risk. Require dry-run examples. |
| Gmail / Google Apps Script | `gsd-planner`, `gsd-executor`, `gsd-verifier` | Keep secret handling and folder IDs documented. |
| Allegro / BaseLinker | Planner/executor/verifier pattern | Prefer small workflow specs and examples. |
| Graphics / labels | Prompt workflow and validation checklist | Do not use WebsitePilot unless explicitly requested. |
| Marketing / product descriptions | Selected prompt packs after review | Use RaFish tone and product constraints. |
| Customer support | Selected prompt packs after review | Keep messages factual and non-escalatory. |
| Supplier / wholesaler research | Research and web-scraping skills after security/tool review | Do not run scraping tools without rate and legal review. |

## Do not use for technical repo cleanup

- WebsitePilot
- AutoPilot
- AuditPilot marketing workflows
- StrategyPilot
- ReportPilot
- RedditPilot
- GBPPilot

Those pilots are specialized for websites, marketing, reporting, strategy, or social discovery. They are not the default tools for repository maintenance.

## Verification requirements

Before declaring work complete:

1. Confirm whether `sources/` changed.
2. Confirm whether any files were deleted.
3. Confirm whether generated output or large media were touched.
4. Confirm whether secrets were introduced.
5. List created or updated files.
6. Recommend the next phase.
