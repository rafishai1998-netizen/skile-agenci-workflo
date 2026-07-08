# Asset Policy

The import currently contains large image, video, and font files, mostly under
`sources/07-proofpilot-agents` and `archive/generated-output`.

## Current Rule

Keep imported media only as source reference until the project decides what must
remain in Git.

## Before Merging To Main

- Move video files and large images to Git LFS or external object storage.
- Keep only thumbnails or small examples in ordinary Git history.
- Remove generated screenshots, temporary workspaces, and cache output unless
  they are needed as fixtures.
- Document any asset that must stay in Git because it is required by a tested
  example.
