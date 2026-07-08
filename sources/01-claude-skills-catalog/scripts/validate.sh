#!/bin/bash
# Validate all SKILL.md files have required frontmatter

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

echo "Validating SKILL.md files..."
echo ""

total=0
valid=0
missing_name=0
missing_desc=0
errors=()

while IFS= read -r -d '' file; do
    ((total++))

    # Check for frontmatter
    if ! head -1 "$file" | grep -q "^---"; then
        errors+=("$file: Missing YAML frontmatter")
        continue
    fi

    # Check for name field
    if ! grep -q "^name:" "$file"; then
        ((missing_name++))
        errors+=("$file: Missing 'name' field")
    fi

    # Check for description field
    if ! grep -q "^description:" "$file" && ! grep -q "^description: >" "$file"; then
        ((missing_desc++))
        errors+=("$file: Missing 'description' field")
    fi

    ((valid++))
done < <(find "$REPO_DIR/skills" -name "SKILL.md" -print0)

echo "Results:"
echo "  Total SKILL.md files: $total"
echo "  Valid: $valid"
echo "  Missing name: $missing_name"
echo "  Missing description: $missing_desc"
echo ""

if [ ${#errors[@]} -gt 0 ]; then
    echo "Issues found:"
    for err in "${errors[@]}"; do
        echo "  - $err"
    done
fi

echo ""
echo "Validation complete."
