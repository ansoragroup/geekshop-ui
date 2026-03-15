#!/bin/bash
# PostCompact hook: re-inject critical context after context compaction
# Reads compact info from stdin JSON, outputs context for Claude to consume

INPUT=$(cat)
TRIGGER=$(echo "$INPUT" | jq -r '.trigger // "unknown"')

SESSION_DIR="/tmp/consilium/current"
CHECKPOINT="$SESSION_DIR/checkpoint.md"
PROJECT_ROOT="$(pwd)"

# No active consilium session
if [ ! -d "$SESSION_DIR" ]; then
  echo "Context compacted ($TRIGGER). No active consilium session."
  echo "Run /init to reload project state if needed."
  exit 0
fi

# Re-inject checkpoint state
if [ -f "$CHECKPOINT" ]; then
  echo "=== CONSILIUM STATE (restored after $TRIGGER compaction) ==="
  cat "$CHECKPOINT"
  echo ""
  echo "=== IMPORTANT: Re-read CLAUDE.md and current phase artifacts ==="
  echo "Session dir: $SESSION_DIR"
  echo "=== END RESTORED STATE ==="
else
  echo "Context compacted ($TRIGGER). Consilium session active at $SESSION_DIR."
  echo "No checkpoint found — run /init to reload project state."
  echo "Then check $SESSION_DIR for phase artifacts."
fi

exit 0
