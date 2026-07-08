# Sparse Sources Policy

Status: `pending-user-decision`

Based on `docs/sparse-sources-review-stage-2.md`.

## Current Case

`sources/08-awesome-nano-banana-pro-prompts` currently contains only
`.env.example`. The import manifest explains that most prompt files from that
repository were skipped as duplicates of already imported material.

## How To Treat Sparse Sources

Sparse source folders should be kept until their provenance value is reviewed.
They may represent:

- a real source repository that mostly duplicated another import,
- a placeholder that documents origin,
- a useful pointer to related prompt material,
- an import outlier with little active value.

## Future Placement Options

- Keep in `sources/` as provenance.
- Move to `reference/outliers/` with a short source note.
- Move to an archive/reference-only area.
- Remove only after the user confirms that provenance is not needed.

No sparse source is removed or moved in stage 3.
