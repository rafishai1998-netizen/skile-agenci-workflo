# Generated Output Policy

Status: `pending-user-decision`

Based on `docs/generated-output-review-stage-2.md`.

## What It Contains

`archive/generated-output/proofpilot-agents/websitepilot-workspaces` contains a
generated WebsitePilot workspace, including workspace READMEs, artifacts, a demo
app, extracted data, and QA screenshots.

The stage 2 report counted 42 files and about 14.99 MB in this directory.

## Why It Was Not Removed In Stage 2

The directory appears generated, but it may still have value as:

- provenance for a WebsitePilot example,
- a fixture for future tests,
- evidence for previous QA or design decisions,
- a demo sample of expected output.

Because that value was not disproven, stage 2 kept it.

## When It Can Be Removed

Remove it only after the user confirms that none of the above fixture,
provenance, evidence, or demo value is needed.

If removed, use a dedicated cleanup commit and document the decision.

## Risk

Removal risk: medium.

The content is likely generated, but deleting it too early could remove useful
review evidence.
