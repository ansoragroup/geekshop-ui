#!/bin/bash
# Verify component directories have corresponding exports in src/components/index.ts
# Usage: ./scripts/verify-barrel-exports.sh [component-names...]

BARREL="src/components/index.ts"
EVIDENCE_DIR="${RTPL_EVIDENCE_DIR:-/tmp/consilium/current/evidence/raw}"
OUTPUT="$EVIDENCE_DIR/barrel-export-check.txt"
MISSING=0

mkdir -p "$(dirname "$OUTPUT")"

echo "Barrel Export Check: $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$OUTPUT"

if [ $# -eq 0 ]; then
    # Check recently modified component directories
    COMPONENTS=$(git diff --name-only HEAD 2>/dev/null \
        | grep "^src/components/" \
        | sed 's|src/components/[^/]*/\([^/]*\)/.*|\1|' \
        | sort -u)
else
    COMPONENTS="$@"
fi

if [ -z "$COMPONENTS" ]; then
    echo "No components to check." >> "$OUTPUT"
    echo "BARREL EXPORT CHECK: PASS (nothing to check)"
    exit 0
fi

for comp in $COMPONENTS; do
    if ! grep -q "$comp" "$BARREL" 2>/dev/null; then
        echo "MISSING: $comp not exported from $BARREL" >> "$OUTPUT"
        MISSING=$((MISSING + 1))
    else
        echo "OK: $comp" >> "$OUTPUT"
    fi
done

echo "---" >> "$OUTPUT"
echo "Missing exports: $MISSING" >> "$OUTPUT"

if [ "$MISSING" -gt 0 ]; then
    echo "BARREL EXPORT CHECK: $MISSING components not exported"
    cat "$OUTPUT"
    exit 1
fi

echo "BARREL EXPORT CHECK: PASS"
exit 0
