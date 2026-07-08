# WebsitePilot Media Decision

Scope: large `.mp4` files from the stage 1 size report.

Stage 2 did not remove or move any `.mp4` file.

## Large Media Files

Together these eight files are about 63.35 MB.

| Size | Path |
|---:|---|
| 14.04 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DVrWYGPEhs3.mp4` |
| 8.85 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DBcBorsy_iN.mp4` |
| 7.61 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/src/assets/rocking-s-about.mp4` |
| 7.37 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-3.mp4` |
| 6.75 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-1.mp4` |
| 6.68 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/videos/hero-2.mp4` |
| 6.54 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DUl8QZAEzaT.mp4` |
| 5.51 MB | `sources/07-proofpilot-agents/websitepilot/templates/sources/austinrockinshauling/public/instagram/DUTKBQsjw1A.mp4` |

## Option A: Keep In Git

Best if WebsitePilot should stay as a fully runnable template collection and the
repository can tolerate large binary blobs.

Tradeoff: simplest for local reproducibility, but keeps ordinary Git history
heavy.

## Option B: Move To Git LFS

Best if WebsitePilot should remain runnable while reducing normal Git blob
pressure.

Tradeoff: requires Git LFS setup and contributor awareness.

## Option C: Replace With Metadata Or External Links

Best if WebsitePilot templates are reference-only and do not need bundled video
assets.

Tradeoff: repository becomes smaller, but templates may no longer run exactly as
imported without external assets.

## Recommendation

Do not touch the `.mp4` files yet. Decide first whether WebsitePilot should be a
runnable template source or only reference material. Until that decision is made,
status is `do ręcznego sprawdzenia`.
