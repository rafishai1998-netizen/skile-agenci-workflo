# Installation & Usage Guide

## What Is This?

This repo is a centralized catalog of Claude Code skills, commands, and agents. It's organized into categories so you can find the right tool for any task.

**Skills** are invoked with `/skill-name` in Claude Code. They provide specialized knowledge and workflows.

**Commands** are slash commands (`/gsd:plan-phase`, `/sparc:architect`) that trigger specific actions.

**Agents** are specialized sub-agents that Claude Code spawns for focused tasks (code review, planning, testing, etc).

---

## Quick Start

### Browse the Catalog

Start with the [README.md](README.md) — it has a full navigation table of all 18 skill categories, command suites, and agent groups.

### Install Skills to Your Machine

**Option A: Install everything**
```bash
git clone git@github.com:get-proofpilot/claude-skills-catalog.git
cd claude-skills-catalog
./scripts/install.sh --all --target ~/.claude/skills/
```

**Option B: Install specific categories**
```bash
./scripts/install.sh --categories "01-seo,02-paid-advertising,05-development-workflow" --target ~/.claude/skills/
```

**Option C: Install a single skill**
```bash
cp -r skills/01-seo/seo-audit ~/.claude/skills/seo-audit
```

**Option D: Symlink (for developers who want live updates)**
```bash
ln -s /path/to/claude-skills-catalog/skills/01-seo/seo ~/.claude/skills/seo
```

---

## How to Use Skills in Claude Code

Once installed, skills are available via slash commands:

```
/seo-audit          # Run a full SEO audit
/ads                # Run an ad platform audit
/firecrawl-search   # Search the web
/pair-programming   # Start a pair programming session
/tdd-workflow       # Start test-driven development
```

Some skills accept arguments:
```
/ads audit          # Full multi-platform audit
/ads google         # Google Ads deep analysis
/firecrawl-scrape https://example.com
```

---

## How to Use Commands

Commands are organized in suites. The most useful:

### GSD (Get Stuff Done)
```
/gsd:new-project     # Start a new project
/gsd:plan-phase      # Plan a development phase
/gsd:execute-phase   # Execute the plan
/gsd:progress        # Check project progress
/gsd:debug           # Systematic debugging
```

### SPARC (Development Methodology)
```
/sparc:architect     # Architecture mode
/sparc:coder         # Coding mode
/sparc:tester        # Testing mode
/sparc:reviewer      # Review mode
```

### GitHub
```
/github:code-review  # Review a PR
/github:pr-manager   # Manage pull requests
/github:issue-triage # Triage issues
```

---

## Skill Difficulty Levels

| Level | Meaning | Example |
|-------|---------|---------|
| Beginner | Just type the trigger phrase | `/seo-audit`, `/firecrawl-search` |
| Intermediate | May need arguments or context | `/ads google`, `/pair-programming tdd` |
| Advanced | Requires setup or domain knowledge | `/swarm-orchestration`, `/v3-core-implementation` |

---

## Adding New Skills

1. Create a directory: `skills/{category}/{skill-name}/`
2. Add a `SKILL.md` with YAML frontmatter:

```yaml
---
name: my-skill
description: What this skill does
---

# My Skill

Instructions for Claude Code when this skill is invoked...
```

3. Copy to `~/.claude/skills/my-skill/` to make it active
4. Test with `/my-skill` in Claude Code

---

## Syncing Updates

Pull the latest from this repo and re-install:

```bash
cd claude-skills-catalog
git pull
./scripts/install.sh --all --target ~/.claude/skills/
```

Or sync your local changes back to the repo:
```bash
./scripts/sync-from-local.sh
```

---

## Repository Structure

```
skills/          # 200+ skills in 18 categories
commands/        # 120+ slash commands in 12 suites
agents/          # 267+ agent definitions in 39 categories
scripts/         # Installation and sync utilities
README.md        # Master catalog (the "drive")
GUIDE.md         # This file
```
