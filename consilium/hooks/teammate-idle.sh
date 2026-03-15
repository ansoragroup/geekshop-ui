#!/bin/bash
# consilium/hooks/teammate-idle.sh
# Auto-assigns work when a teammate goes idle.

AGENT="$CLAUDE_CODE_AGENT_NAME"
PLAN="/tmp/consilium/current/phase4/PLAN.md"
SESSION_DIR="/tmp/consilium/current"

# Check if there's a plan with unassigned tasks
if [ -f "$PLAN" ]; then
    UNASSIGNED=$(grep -c "\- \[ \]" "$PLAN" 2>/dev/null || echo "0")
    if [ "$UNASSIGNED" -gt 0 ]; then
        echo "IDLE: $AGENT has no active task. $UNASSIGNED unassigned tasks available."
        echo "Lead should assign next task to $AGENT."
        exit 0
    fi
fi

# Check if cross-review is pending
PHASE6_DIR="$SESSION_DIR/phase6"
if [ -d "$PHASE6_DIR" ]; then
    REVIEWS_DONE=$(ls "$PHASE6_DIR/"*-review-of-*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "IDLE: $AGENT completed their tasks. $REVIEWS_DONE reviews done so far."
    echo "If Phase 6 (cross-review) is active, assign a review to $AGENT."
fi

exit 0
