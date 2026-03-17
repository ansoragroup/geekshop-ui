#!/bin/bash
# PreToolUse(Bash) hook: block git push to main/master
# Exit 0 = allow, output JSON with decision=block to deny

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Only check git push commands
if [[ ! "$COMMAND" =~ ^git\ push ]]; then
  exit 0
fi

# Block push to main or master
if echo "$COMMAND" | grep -qE 'git push.*(\s|/)(main|master)(\s|$)'; then
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"BLOCKED: git push to main/master is not allowed. Push to a feature branch instead (e.g., v0.5.0, feat/*, bugfix/*)."}}'
  exit 0
fi

exit 0
