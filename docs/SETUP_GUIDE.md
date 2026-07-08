# 🚀 Skills Repository Setup & Maintenance Guide

## Quick Start

### Prerequisites
- Node.js 18+
- Git
- Git LFS (for large binary files)

### Installation

```bash
# Clone the repository
git clone https://github.com/rafishai1998-netizen/skile-agenci-workflo.git
cd skile-agenci-workflo

# Install Git LFS
git lfs install

# Install dependencies
npm install

# Validate the repository
npm run validate
```

## Build & Validation Scripts

### Available Commands

```bash
# Validate all skills metadata and structure
npm run validate

# Check for duplicate files (dry-run mode, safe)
node scripts/deduplicate-content.js --dry-run

# Actually remove duplicates (careful!)
node scripts/deduplicate-content.js

# Normalize metadata format across all skills
npm run normalize

# Run all checks
npm run lint

# Build/verify (same as lint currently)
npm run build
```

## Security & Best Practices

### ✅ What to DO:
- ✅ Store API keys in environment variables
- ✅ Use `.example` files for configuration templates
- ✅ Run security checks before committing
- ✅ Keep `.mcp.json` in `.gitignore`
- ✅ Use Git LFS for large binary files

### ❌ What NOT to DO:
- ❌ Never commit `.env` or `.env.local`
- ❌ Never commit actual `.mcp.json` (use `.mcp.example.json` instead)
- ❌ Never commit API keys or tokens
- ❌ Never commit large binary files without LFS
- ❌ Never commit `node_modules/`

## Git LFS Management

### Why Git LFS?

Repository currently contains ~189 MB of files:
- `07-proofpilot-agents`: 160 MB (too large!)
- Media files, images, videos, PDFs

Git LFS moves these large files to separate storage.

### Enabling Git LFS

```bash
# Install Git LFS
git lfs install

# Track large file types
git lfs track "*.psd"
git lfs track "*.ai"
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.pdf"
git lfs track "*.mp4"

# Commit the .gitattributes update
git add .gitattributes
git commit -m "chore: Enable Git LFS for large binary files"

# Push to remote (first time may take longer)
git push origin main
```

## Skill Metadata Format

All skills should follow this YAML frontmatter format in their `SKILL.md`:

```markdown
---
name: "My Amazing Skill"
description: "What this skill does and why it's awesome"
category: "development-workflow"
tags: ["ai", "automation", "coding"]
version: "1.0.0"
author: "ProofPilot Team"
license: "MIT"
---

# Skill Documentation

Your skill documentation goes here...
```

### Required Fields
- `name` - Unique identifier for the skill
- `description` - Brief explanation of functionality

### Optional Fields
- `category` - Skill category (see categories list)
- `tags` - Array of tags for search/discovery
- `version` - Semantic version number
- `author` - Skill creator/maintainer
- `license` - License type (MIT, Apache-2.0, etc.)

## Deduplication Process

### Finding Duplicates

```bash
# Dry-run (shows what would be deleted)
node scripts/deduplicate-content.js --dry-run
```

### Removing Duplicates

```bash
# Actually remove duplicates
node scripts/deduplicate-content.js
```

Current duplicate counts (from IMPORT_MANIFEST.md):
- `06-marketing-assets`: 1,245 duplicates
- `07-proofpilot-agents`: 487 duplicates
- `03-awesome-claude-skills`: 58 duplicates

### What Gets Kept?
- First occurrence of each file (by hash)
- Original source if identifiable
- Highest quality version (you may need to manually verify)

## GitHub Actions CI/CD Pipeline

The repository includes automated validation:

### `.github/workflows/validate.yml`

Runs on:
- Every push to `main` or `develop`
- Every pull request

Validates:
- ✅ Skills metadata format
- ✅ No exposed secrets/API keys
- ✅ Git LFS configuration
- ✅ Repository structure integrity
- ✅ Duplicate file detection

### Viewing Workflow Results

1. Go to: `https://github.com/rafishai1998-netizen/skile-agenci-workflo/actions`
2. Click on the latest run
3. View detailed validation report

## Troubleshooting

### Issue: `npm run validate` fails

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Run validation again
npm run validate
```

### Issue: Large files in Git (not in LFS)

**Solution:**
```bash
# Check what's tracked by LFS
git lfs ls-files

# Track new file types
git lfs track "*.psd"
git add .gitattributes
git commit -m "chore: Track .psd files with Git LFS"
```

### Issue: Merge conflicts in automation

**Solution:**
```bash
# Don't manually edit generated files in archive/
# Run normalization instead
npm run normalize

# Then commit normalized changes
git add .
git commit -m "chore: normalize metadata"
```

## Next Steps

1. **Run validation**: `npm run validate`
2. **Check for duplicates**: `node scripts/deduplicate-content.js --dry-run`
3. **Review Git LFS**: Check `.gitattributes` is correct
4. **Normalize metadata**: `npm run normalize`
5. **Verify CI/CD**: Check GitHub Actions passing

## Support & Questions

- 📖 Read the main [README.md](../README.md)
- 🔒 Check [SECURITY.md](../SECURITY.md) for security notes
- 📋 See [IMPORT_MANIFEST.md](../IMPORT_MANIFEST.md) for source details

---

**Last updated**: 2026-07-08
**Version**: 1.0.0
