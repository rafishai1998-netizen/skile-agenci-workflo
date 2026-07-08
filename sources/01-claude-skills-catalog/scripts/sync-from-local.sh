#!/bin/bash
# Sync local ~/.claude/ skills back into the catalog repo
# Run this after making local changes to update the repo

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
LOCAL_SKILLS="${HOME}/.claude/skills"
LOCAL_COMMANDS="${HOME}/.claude/commands"
LOCAL_AGENTS="${HOME}/.claude/agents"

echo "Syncing from local Claude Code config to repo..."
echo ""

# Sync skills
if [ -d "$LOCAL_SKILLS" ]; then
    echo "Scanning local skills..."
    for skill_dir in "$LOCAL_SKILLS"/*/; do
        name="$(basename "$skill_dir")"
        # Find where this skill lives in the repo
        found=$(find "$REPO_DIR/skills" -maxdepth 2 -name "$name" -type d 2>/dev/null | head -1)
        if [ -n "$found" ]; then
            rsync -a --exclude='.venv' --exclude='node_modules' --exclude='__pycache__' "$skill_dir/" "$found/"
            echo "  Updated: $name"
        else
            echo "  New skill (not in catalog): $name"
        fi
    done
fi

# Sync commands
if [ -d "$LOCAL_COMMANDS" ]; then
    echo ""
    echo "Syncing commands..."
    rsync -a "$LOCAL_COMMANDS/" "$REPO_DIR/commands/" --exclude='*.pyc'
    echo "  Commands synced"
fi

# Sync agents
if [ -d "$LOCAL_AGENTS" ]; then
    echo ""
    echo "Syncing agents..."
    rsync -a "$LOCAL_AGENTS/" "$REPO_DIR/agents/" --exclude='*.pyc'
    echo "  Agents synced"
fi

echo ""
echo "Sync complete. Review changes with: cd $REPO_DIR && git diff --stat"
