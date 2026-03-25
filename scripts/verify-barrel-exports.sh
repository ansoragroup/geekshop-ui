#!/bin/bash
# Verify component directories have corresponding exports in src/components/index.ts
# Usage: ./scripts/verify-barrel-exports.sh [--changed-only] [component-names...]

BARREL="src/components/index.ts"
EVIDENCE_DIR="${RTPL_EVIDENCE_DIR:-/tmp/consilium/current/evidence/raw}"
OUTPUT="$EVIDENCE_DIR/barrel-export-check.txt"
MISSING=0

mkdir -p "$(dirname "$OUTPUT")"

echo "Barrel Export Check: $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$OUTPUT"

CHANGED_ONLY=false
if [ "$1" = "--changed-only" ]; then
    CHANGED_ONLY=true
    shift
fi

if [ $# -gt 0 ]; then
    COMPONENTS="$@"
elif [ "$CHANGED_ONLY" = true ]; then
    # Diff-based fast-path (opt-in)
    COMPONENTS=$(git diff --name-only HEAD 2>/dev/null \
        | grep "^src/components/" \
        | sed 's|src/components/[^/]*/\([^/]*\)/.*|\1|' \
        | sort -u)
    if [ -z "$COMPONENTS" ]; then
        echo "No changed components to check." >> "$OUTPUT"
        echo "BARREL EXPORT CHECK: PASS (nothing changed)"
        exit 0
    fi
else
    # Default: enumerate ALL component folders (one level: category/ComponentName)
    COMPONENTS=$(find src/components -mindepth 2 -maxdepth 2 -type d 2>/dev/null \
        | sed 's|src/components/[^/]*/||' \
        | sort -u)
fi

if [ -z "$COMPONENTS" ]; then
    echo "No component folders found." >> "$OUTPUT"
    echo "BARREL EXPORT CHECK: PASS (no components)"
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
