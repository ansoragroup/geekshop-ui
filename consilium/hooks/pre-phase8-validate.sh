#!/bin/bash
# Pre-Phase 8 hook: validate RTPL evidence before retrospective
# Exit 0 = proceed, logs warnings for incomplete evidence

EVIDENCE_DIR="/tmp/consilium/current/evidence"
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SKILL_PATH="$HOME/.claude/skills/repo-task-proof-loop"

echo "╔══════════════════════════════════════╗"
echo "║  RTPL Pre-Phase 8 Validation         ║"
echo "╚══════════════════════════════════════╝"

# Check for evidence directory
if [ ! -d "$EVIDENCE_DIR" ]; then
    echo "  ⚠  No evidence directory at $EVIDENCE_DIR"
    echo "  → Phase 8 will proceed without RTPL metrics"
    exit 0
fi

# Check for evidence.json files
EVIDENCE_FILES=$(find /tmp/consilium/current/phase5 -name "evidence.json" 2>/dev/null)
if [ -z "$EVIDENCE_FILES" ]; then
    echo "  ⚠  No evidence.json found in phase5 directories"
    echo "  → Evidence packing may have been skipped"
    exit 0
fi

echo ""
echo "Evidence files found:"
for ef in $EVIDENCE_FILES; do
    ROLE=$(basename "$(dirname "$ef")" | sed 's/-evidence$//')
    STATUS=$(jq -r '.acceptance_criteria | map(.status) | group_by(.) | map({(.[0]): length}) | add // {}' "$ef" 2>/dev/null)
    OVERALL=$(jq -r '.automated_gates // "not captured"' "$ef" 2>/dev/null)
    echo "  → $ROLE: $STATUS"
done

# Check for raw artifacts
echo ""
echo "Raw artifacts:"
for dir in /tmp/consilium/current/phase5/*/raw 2>/dev/null; do
    [ -d "$dir" ] || continue
    ROLE=$(basename "$(dirname "$dir")" | sed 's/-evidence$//')
    ARTIFACT_COUNT=$(find "$dir" -type f | wc -l | tr -d ' ')
    SCREENSHOT_COUNT=$(find "$dir" -name "*.png" 2>/dev/null | wc -l | tr -d ' ')
    echo "  → $ROLE: $ARTIFACT_COUNT artifacts, $SCREENSHOT_COUNT screenshots"
done

# Check for stale evidence (> 10 minutes old)
NEWEST=$(find /tmp/consilium/current/phase5 -name "evidence.json" -exec stat -f %m {} \; 2>/dev/null | sort -rn | head -1)
if [ -n "$NEWEST" ]; then
    AGE=$(( $(date +%s) - NEWEST ))
    if [ "$AGE" -gt 600 ]; then
        echo ""
        echo "  ⚠  Newest evidence is ${AGE}s old (> 10 min). Consider re-verification."
    fi
fi

echo ""
echo "Validation complete. Proceeding to Phase 8."
exit 0
