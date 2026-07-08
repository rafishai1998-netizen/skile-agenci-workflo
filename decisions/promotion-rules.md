# Promotion Rules

These rules define how material can move from raw `sources/` imports into
`active/`.

1. Do not copy whole folders without review.
2. Every promoted skill, agent, prompt, workflow, or template must include:
   - `README.md`,
   - `source.md`,
   - `validation.md`,
   - `status.md` or a clear status section in `README.md`.
3. Names must use lowercase hyphen-case.
4. Secrets must be removed or masked before promotion.
5. Required tools must be documented.
6. License and provenance must be documented.
7. Add at least one usage example.
8. Do not promote GitHub workflows without security review.

Recommended statuses:

- `ready` - reviewed and usable.
- `testing` - adapted but still being validated.
- `deprecated` - kept for compatibility or history, not recommended for new use.
- `pending-review` - not eligible for active use yet.

Promotion should be done in small commits so each item can be reviewed on its
own.
