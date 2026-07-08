# Import Notes

The original import included a local `.mcp.json` file with a public-looking API
key. This cleanup branch removes that file and keeps only `.mcp.example.json`.

For local use, copy `.mcp.example.json` to `.mcp.json` on your own machine and
load real values from environment variables. The root `.gitignore` keeps
`.mcp.json` out of future commits.
