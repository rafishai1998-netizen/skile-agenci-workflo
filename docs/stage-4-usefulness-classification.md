# Stage 4 Usefulness Classification

Branch: `cleanup/classify-usefulness-stage-4`

Stage 4 classifies repository content into working types and usefulness levels.
It does not move, delete, or promote imported files.

## Process Roles Used

- Planner: split the stage into a narrow documentation-only scope.
- Executor: added type and usefulness catalogs.
- Verifier: checked that `sources/` stayed untouched and no active workflows were
  created.

No unreviewed imported agent workflow was executed.

## Created Or Updated

- `catalog/repo-type-map.md`
- `catalog/usefulness-matrix.md`
- `catalog/promotion-candidates-stage-4.md`
- `catalog/workflows-index.md`
- `catalog/templates-index.md`
- `catalog/assets-index.md`
- README updates for repository governance and completed classification areas.

## Main Findings

| Category | Finding |
|---|---|
| Skills | 1176 `SKILL.md` files exist; the best practical source is `sources/01-claude-skills-catalog`. |
| Agents | 656 agent-like files exist; useful candidates are marketing, support, product, QA, and selected ProofPilot doctrine. |
| Prompts | `sources/06-marketing-assets/prompts` is the strongest prompt source for RaFish graphics and marketing. |
| Workflows | Imported GitHub workflows remain archived/reference-only. |
| Templates | WebsitePilot templates are useful but heavy; Elementor is smaller and more direct. |
| Assets | Large WebsitePilot media still needs a policy decision. |
| Generated output | Archived WebsitePilot output is provenance/reference, not active source. |

## Practical Recommendations

1. Do not divide by original repository as the long-term working model.
2. Divide by working type: agents, skills, prompts, workflows, templates, assets,
   reference-only, generated/cache.
3. Use `rafish-use-cases/` to decide business priority.
4. Promote one small item at a time into `active/`.
5. Keep broad imported catalogs in `sources/` until selected items are adapted.

## Suggested Stage 5

Run one small promotion pass:

- Option A: `marketing-opisy` prompt/content pack.
- Option B: `obsluga-klienta` customer support agent.
- Option C: `prestashop` working skill/agent shell.

The safest first choice is `marketing-opisy`, because it can reuse useful prompt
and content material without touching heavy templates, workflow automation, or
external APIs.
