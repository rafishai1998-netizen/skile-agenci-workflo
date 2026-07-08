#!/bin/bash
# Claude Skills Catalog Installer
# Usage:
#   ./install.sh --all --target ~/.claude/skills/
#   ./install.sh --categories "01-seo,02-paid-advertising" --target ~/.claude/skills/
#   ./install.sh --skill "seo-audit" --target ~/.claude/skills/

set -e

TARGET="${HOME}/.claude/skills"
CATEGORIES=""
SKILL=""
ALL=false
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

usage() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --all                    Install all skills"
    echo "  --categories \"01-seo,02-paid-advertising\"  Install specific categories"
    echo "  --skill \"seo-audit\"      Install a single skill"
    echo "  --target DIR             Target directory (default: ~/.claude/skills/)"
    echo "  --dry-run                Show what would be copied"
    echo "  -h, --help               Show this help"
    exit 0
}

DRY_RUN=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --all) ALL=true; shift ;;
        --categories) CATEGORIES="$2"; shift 2 ;;
        --skill) SKILL="$2"; shift 2 ;;
        --target) TARGET="$2"; shift 2 ;;
        --dry-run) DRY_RUN=true; shift ;;
        -h|--help) usage ;;
        *) echo "Unknown option: $1"; usage ;;
    esac
done

mkdir -p "$TARGET"

copy_skill() {
    local src="$1"
    local name="$(basename "$src")"
    local dest="$TARGET/$name"

    if [ "$DRY_RUN" = true ]; then
        echo "  [dry-run] Would copy $name"
        return
    fi

    rsync -a --exclude='.venv' --exclude='node_modules' --exclude='__pycache__' "$src/" "$dest/"
    echo "  Installed: $name"
}

installed=0

if [ "$ALL" = true ]; then
    echo "Installing all skills to $TARGET..."
    for category_dir in "$REPO_DIR"/skills/*/; do
        category="$(basename "$category_dir")"
        echo ""
        echo "Category: $category"
        for skill_dir in "$category_dir"*/; do
            [ -d "$skill_dir" ] || continue
            # Skip if it's just a README
            [ -f "$skill_dir/SKILL.md" ] || [ -f "$skill_dir/README.md" -a "$(basename "$skill_dir")" != "$(basename "$category_dir")" ] || continue
            if [ -f "$skill_dir/SKILL.md" ]; then
                copy_skill "$skill_dir"
                ((installed++))
            fi
        done
    done
elif [ -n "$CATEGORIES" ]; then
    echo "Installing categories: $CATEGORIES"
    IFS=',' read -ra CATS <<< "$CATEGORIES"
    for cat in "${CATS[@]}"; do
        cat="$(echo "$cat" | xargs)"  # trim whitespace
        category_dir="$REPO_DIR/skills/$cat"
        if [ ! -d "$category_dir" ]; then
            echo "Warning: Category '$cat' not found, skipping"
            continue
        fi
        echo ""
        echo "Category: $cat"
        for skill_dir in "$category_dir"*/; do
            [ -d "$skill_dir" ] || continue
            if [ -f "$skill_dir/SKILL.md" ]; then
                copy_skill "$skill_dir"
                ((installed++))
            fi
        done
    done
elif [ -n "$SKILL" ]; then
    echo "Installing skill: $SKILL"
    found=false
    for skill_dir in "$REPO_DIR"/skills/*/"$SKILL"; do
        if [ -d "$skill_dir" ]; then
            copy_skill "$skill_dir"
            ((installed++))
            found=true
            break
        fi
    done
    if [ "$found" = false ]; then
        echo "Error: Skill '$SKILL' not found in catalog"
        exit 1
    fi
else
    echo "No installation target specified. Use --all, --categories, or --skill"
    usage
fi

echo ""
echo "Done! Installed $installed skill(s) to $TARGET"
