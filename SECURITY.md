# Security Notes

## Exposed Provider Key

The raw import contained a public-looking Gemini API key in
`06-marketing-assets/.mcp.json`. The published `main` branch removes that file
and keeps only `sources/06-marketing-assets/.mcp.example.json`.

Required action outside this repository:

1. Revoke or rotate the exposed Gemini key at the provider.
2. Prune the deleted raw `import/repos-merge` branch from local clones or forks
   if it appears there.
3. Run a secret scan after future imports and before promoting new source
   material.

## Commit Rules

- Do not commit `.env`, `.env.local`, `.mcp.json`, API keys, tokens, cookies, or
  local machine configuration.
- Keep runnable local integrations as `.example` files and read secrets from
  environment variables.
- Treat imported workflows as reference material unless they are deliberately
  reviewed and promoted into the root `.github/workflows/` directory.
