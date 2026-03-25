#!/bin/bash
# Scan SCSS modules for hardcoded hex values in theme-sensitive properties
# Usage: ./scripts/scss-token-audit.sh [files...]
# If no files given, scans all .module.scss files in src/

EVIDENCE_DIR="${RTPL_EVIDENCE_DIR:-/tmp/consilium/current/evidence/raw}"
OUTPUT="$EVIDENCE_DIR/scss-token-audit.txt"
VIOLATIONS=0

mkdir -p "$(dirname "$OUTPUT")"

if [ $# -eq 0 ]; then
    FILES=$(find src -name "*.module.scss" -type f -not -path "src/pages/*" 2>/dev/null)
else
    FILES="$@"
fi

echo "SCSS Token Audit: $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$OUTPUT"
echo "Files scanned: $(echo "$FILES" | wc -w | tr -d ' ')" >> "$OUTPUT"
echo "---" >> "$OUTPUT"

for file in $FILES; do
    [ -f "$file" ] || continue

    # Match hex colors in color-related CSS properties.
    # Uses grep -E (ERE) with explicit character repetition instead of
    # interval quantifiers ({3,8}) which BSD grep on macOS silently ignores.
    # Pattern: property-name colon ... #HHH (3+ hex chars)
    HITS=$(grep -nE '(background|color|border-color|fill|stroke)[^;]*#[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]' "$file" 2>/dev/null \
        | grep -v '//' \
        | grep -v 'var(--' \
        | grep -v '\$color-' \
        | grep -v '\$bg-' \
        | grep -v '@use' \
        | grep -v 'scss-audit-ignore')

    if [ -n "$HITS" ]; then
        echo "VIOLATION: $file" >> "$OUTPUT"
        echo "$HITS" >> "$OUTPUT"
        echo "" >> "$OUTPUT"
        VIOLATIONS=$((VIOLATIONS + 1))
    fi
done

echo "---" >> "$OUTPUT"
echo "Total files with violations: $VIOLATIONS" >> "$OUTPUT"

if [ "$VIOLATIONS" -gt 0 ]; then
    echo "SCSS TOKEN AUDIT: $VIOLATIONS files with hardcoded hex values"
    cat "$OUTPUT"
    exit 1
fi

echo "SCSS TOKEN AUDIT: PASS (0 violations)"
exit 0
