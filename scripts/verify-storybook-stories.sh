#!/bin/bash
# Verify Storybook stories for a component follow GeekShop conventions
# Usage: ./scripts/verify-storybook-stories.sh <component-dir>
# Example: ./scripts/verify-storybook-stories.sh src/components/product/DesktopProductCard

COMP_DIR=$1
COMP_NAME=$(basename "$COMP_DIR")
EVIDENCE_DIR="${RTPL_EVIDENCE_DIR:-/tmp/consilium/current/evidence/raw}"
ERRORS=""

if [ -z "$COMP_DIR" ] || [ ! -d "$COMP_DIR" ]; then
    echo "Usage: $0 <component-directory>"
    exit 1
fi

STORY_FILE="$COMP_DIR/${COMP_NAME}.stories.tsx"
COMP_FILE="$COMP_DIR/${COMP_NAME}.tsx"

# Check story file exists
if [ ! -f "$STORY_FILE" ]; then
    echo "FAIL: No story file at $STORY_FILE"
    exit 1
fi

# Check autodocs tag
if ! grep -q "autodocs" "$STORY_FILE"; then
    ERRORS="$ERRORS\nFAIL: $STORY_FILE missing tags: ['autodocs']"
fi

# Check satisfies Meta pattern
if ! grep -q "satisfies Meta" "$STORY_FILE"; then
    ERRORS="$ERRORS\nFAIL: $STORY_FILE not using 'satisfies Meta<typeof $COMP_NAME>' pattern"
fi

# Check story count (minimum 2 per CLAUDE.md)
STORY_COUNT=$(grep -c "^export const " "$STORY_FILE" 2>/dev/null)
if [ "$STORY_COUNT" -lt 2 ]; then
    ERRORS="$ERRORS\nFAIL: $STORY_FILE has only $STORY_COUNT stories (minimum 2, target 8+)"
fi

# Check Desktop title convention
if [[ "$COMP_NAME" == Desktop* ]]; then
    if ! grep -qE "title:\s*['\"].*\(Desktop\)" "$STORY_FILE"; then
        ERRORS="$ERRORS\nFAIL: Desktop component $COMP_NAME story missing (Desktop) in title"
    fi
fi

# Check 'use client' on component file
if [ -f "$COMP_FILE" ]; then
    FIRST_LINE=$(head -1 "$COMP_FILE")
    if [[ "$FIRST_LINE" != *"use client"* ]]; then
        ERRORS="$ERRORS\nWARN: $COMP_FILE first line is not 'use client': $FIRST_LINE"
    fi
fi

# Check named exports (no default export)
if [ -f "$COMP_FILE" ]; then
    if grep -q "export default" "$COMP_FILE"; then
        ERRORS="$ERRORS\nFAIL: $COMP_FILE uses export default (must use named exports)"
    fi
fi

if [ -n "$ERRORS" ]; then
    echo -e "STORYBOOK VERIFICATION: ISSUES FOUND$ERRORS"
    exit 1
fi

echo "PASS: $COMP_NAME — $STORY_COUNT stories, conventions OK"
exit 0
