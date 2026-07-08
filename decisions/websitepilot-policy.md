# WebsitePilot Policy

Status: `pending-user-decision`

Based on `docs/websitepilot-media-decision.md`.

Stage 2 kept all eight large `.mp4` files and did not decide the long-term
WebsitePilot asset policy.

## Option A: Runnable Template

Keep WebsitePilot templates and media in Git if the project needs exact local
reproducibility and runnable examples.

Impact:

- simplest local checkout experience,
- keeps Git history heavy,
- should include validation that the template still runs.

## Option B: Git LFS

Move large media to Git LFS if WebsitePilot should remain runnable but ordinary
Git blobs should stay smaller.

Impact:

- keeps reproducibility with lower normal Git pressure,
- requires Git LFS setup and contributor awareness,
- should be documented before migration.

## Option C: Reference-Only

Keep WebsitePilot material as reference and replace heavy media with metadata or
external links only after a user decision.

Impact:

- reduces repository size,
- may make templates no longer runnable exactly as imported,
- should preserve provenance and enough context for future review.

No option is selected in stage 3.
