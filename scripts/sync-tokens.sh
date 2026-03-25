#!/bin/bash
# sync-tokens.sh — Verify SCSS tokens match TypeScript token constants
# Usage: bash scripts/sync-tokens.sh [--check]
#
# Without --check: prints mismatches
# With --check: exits 1 if any mismatch found (for CI)

set -euo pipefail

SCSS_FILE="src/theme/tokens.scss"
TS_FILE="src/theme/index.ts"

if [ ! -f "$SCSS_FILE" ]; then
  echo "ERROR: $SCSS_FILE not found"
  exit 1
fi

if [ ! -f "$TS_FILE" ]; then
  echo "ERROR: $TS_FILE not found"
  exit 1
fi

CHECK_MODE=false
if [ "${1:-}" = "--check" ]; then
  CHECK_MODE=true
fi

MISMATCHES=0

# Extract color tokens from SCSS: $color-xxx: #HEX;
while IFS= read -r line; do
  # Extract variable name and value
  VAR_NAME=$(echo "$line" | sed 's/\$\([a-zA-Z0-9_-]*\):.*/\1/')
  VAR_VALUE=$(echo "$line" | sed 's/.*: *\(#[A-Fa-f0-9]*\).*/\1/' | tr '[:lower:]' '[:upper:]')

  # Convert SCSS name to TS camelCase key
  # e.g., color-primary-light -> primaryLight (strip "color-" prefix)
  TS_KEY=$(echo "$VAR_NAME" | sed 's/^color-//' | sed 's/-\([a-z]\)/\U\1/g')

  # Check if this key exists in the TS file (exact match, not substring)
  TS_LINE=$(grep "  ${TS_KEY}: '" "$TS_FILE" 2>/dev/null | head -1 || true)

  if [ -n "$TS_LINE" ]; then
    TS_VALUE=$(echo "$TS_LINE" | sed "s/.*'\(#[A-Fa-f0-9]*\)'.*/\1/" | tr '[:lower:]' '[:upper:]')
    if [ "$VAR_VALUE" != "$TS_VALUE" ]; then
      echo "MISMATCH: \$$VAR_NAME = $VAR_VALUE (SCSS) vs $TS_KEY = $TS_VALUE (TS)"
      MISMATCHES=$((MISMATCHES + 1))
    fi
  fi
done < <(grep '^\$color-[a-zA-Z0-9_-]*: *#[A-Fa-f0-9]' "$SCSS_FILE")

if [ "$MISMATCHES" -eq 0 ]; then
  echo "TOKEN SYNC: PASS (all color tokens match)"
  exit 0
else
  echo "TOKEN SYNC: FAIL ($MISMATCHES mismatches)"
  if [ "$CHECK_MODE" = true ]; then
    exit 1
  fi
  exit 0
fi
