#!/bin/bash
# PreCompact hook: save consilium state before context compaction
# Writes checkpoint so context can be restored after compaction
# Only runs if a consilium session is active

SESSION_DIR="/tmp/consilium/current"
CHECKPOINT="$SESSION_DIR/checkpoint.md"
PROJECT_ROOT="$(pwd)"

# No active consilium session — nothing to save
if [ ! -d "$SESSION_DIR" ]; then
  exit 0
fi

# Collect current phase state
PHASES=""
for dir in "$SESSION_DIR"/phase*/; do
  [ -d "$dir" ] || continue
  count=$(find "$dir" -maxdepth 1 -type f 2>/dev/null | wc -l | tr -d ' ')
  if [ "$count" -gt 0 ]; then
    PHASES="$PHASES\n- $(basename "$dir"): $count artifacts"
  fi
done

# Build checkpoint
cat > "$CHECKPOINT" << CHECKPOINT_EOF
# Consilium Checkpoint (Pre-Compact)
Saved: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
Project: $(basename "$PROJECT_ROOT")

## Active Phases
$(echo -e "${PHASES:-No artifacts yet.}")

## Plan Summary
$(if [ -f "$SESSION_DIR/phase4/PLAN.md" ]; then
  head -60 "$SESSION_DIR/phase4/PLAN.md"
else
  echo "No plan created yet."
fi)

## Task Status
$(if [ -f "$SESSION_DIR/phase4/PLAN.md" ]; then
  grep -E "\- \[([ x~])\]" "$SESSION_DIR/phase4/PLAN.md" 2>/dev/null || echo "No tasks defined."
else
  echo "N/A"
fi)

## Git State
$(git status --short 2>/dev/null | head -20 || echo "Clean")

## Scratchpad
$(cat "$PROJECT_ROOT/.claude/scratchpad.md" 2>/dev/null || echo "Empty")
CHECKPOINT_EOF

echo "Consilium state checkpointed to $CHECKPOINT"
exit 0
