# Stage 1 Repository Size Report

Scope: current working tree, excluding `.git`.

## Summary

The repository is about 189.81 MB in the working tree. The size is dominated by
WebsitePilot template assets under `sources/07-proofpilot-agents`, especially
video files in the `austinrockinshauling` template.

## Root Folder Sizes

| Folder | Files | Size |
|---|---:|---:|
| `sources` | 3240 | 174.65 MB |
| `archive` | 55 | 15.15 MB |
| `catalog` | 4 | ~0 MB |
| `docs` | 2 before this audit | ~0 MB |

## Largest Folders

| Folder | Files | Size |
|---|---:|---:|
| `sources/07-proofpilot-agents` | 1116 | 145.47 MB |
| `sources/07-proofpilot-agents/websitepilot` | 867 | 142.64 MB |
| `sources/07-proofpilot-agents/websitepilot/templates` | 729 | 142.08 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources` | 723 | 142.02 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling` | 276 | 126.72 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public` | 20 | 65.26 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src` | 237 | 61.08 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src/assets` | 141 | 60.57 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram` | 13 | 42.31 MB |
| `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos` | 3 | 20.80 MB |
| `archive/generated-output/proofpilot-agents/websitepilot-workspaces` | 42 | 14.99 MB |

## Files Larger Than 5 MB

| Size | Type | Path |
|---:|---|---|
| 14.04 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DVrWYGPEhs3.mp4` |
| 8.85 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DBcBorsy_iN.mp4` |
| 7.61 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src/assets/rocking-s-about.mp4` |
| 7.37 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-3.mp4` |
| 6.75 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-1.mp4` |
| 6.68 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-2.mp4` |
| 6.54 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DUl8QZAEzaT.mp4` |
| 5.51 MB | video | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DUTKBQsjw1A.mp4` |

Files larger than 20 MB: none.

## Type Summary For Files Larger Than 5 MB

| Type | Count | Size |
|---|---:|---:|
| video | 8 | 63.35 MB |

## Git LFS / External Storage Recommendations

- If `austinrockinshauling` stays as a runnable WebsitePilot template, move the
  eight `.mp4` files to Git LFS or external object storage.
- If WebsitePilot templates become reference-only, replace videos with small
  metadata entries or external URLs in a later cleanup.
- Keep only thumbnails or tiny fixtures in ordinary Git history.
- Review `archive/generated-output` in stage 2 and remove only if no fixture or
  provenance value is confirmed.

## Conservative Size Opportunities For Stage 2

- Reviewing `archive/generated-output/proofpilot-agents/websitepilot-workspaces`
  could identify about 14.99 MB of generated material, but delete it only after
  confirming no fixture/provenance value is needed.
- Moving the eight large `.mp4` files to LFS/external storage could avoid about
  63.35 MB of ordinary Git blobs going forward, if the template must remain
  runnable and the team wants to keep the media.
- A later WebsitePilot template policy could evaluate the largest folder,
  `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling`,
  which currently accounts for about 126.72 MB.

The goal of stage 1 is reliable reporting, not maximum size reduction.
