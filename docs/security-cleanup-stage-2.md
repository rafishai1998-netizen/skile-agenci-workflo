# Security Cleanup Stage 2

Stage 2 did not edit any file in `sources/`.

## Checked File

`sources/06-marketing-assets/prompts/docs/LOCAL_DEVELOPMENT.md`

## Finding

The file contains a GitHub token-shaped placeholder in an environment example:

`GITHUB_TOKEN=ghp_...token`

This appears to be example text, not a real credential, but the `ghp_` prefix can
trigger secret scanners and can be visually confused with a real token.

## Stage 2 Decision

Do not edit the imported source file in this stage.

## Later Recommendation

In a later docs-only cleanup, rewrite the placeholder to an obviously false
value such as:

```env
GITHUB_TOKEN=<your-github-token>
```

This should be done only if the project decides to normalize imported docs in
`sources/`.

## Other Security Notes

The previously exposed Gemini key from the raw import should still be considered
compromised and rotated at the provider, even though the current tree no longer
contains the raw `.mcp.json`.
