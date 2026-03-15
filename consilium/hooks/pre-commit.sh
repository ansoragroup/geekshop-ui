#!/bin/bash
# PreToolUse(Bash) hook: enforce consilium file boundaries on git commits
# Reads tool input from stdin JSON (Claude Code hook protocol)
# Only activates during consilium sessions when an agent runs git commit
# Exit 0 = ok, Exit 2 = violation (block the tool call)

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Only intercept git commit commands
if [[ ! "$COMMAND" =~ ^git\ commit ]]; then
  exit 0
fi

PLAN="/tmp/consilium/current/phase4/PLAN.md"
ERRORS=""

# Check file boundary violations (only during active consilium session)
if [ -f "$PLAN" ] && [ -n "$CLAUDE_CODE_AGENT_NAME" ]; then
    AGENT="$CLAUDE_CODE_AGENT_NAME"
    STAGED=$(git diff --cached --name-only 2>/dev/null)

    if [ -n "$STAGED" ]; then
        # Extract file ownership from plan
        OWNED_PATTERN=$(grep -A5 "owner: $AGENT" "$PLAN" 2>/dev/null | grep "files:" | sed 's/.*files: //')

        if [ -n "$OWNED_PATTERN" ]; then
            while IFS= read -r file; do
                MATCH=false
                for pattern in $OWNED_PATTERN; do
                    if [[ "$file" == $pattern ]]; then
                        MATCH=true
                        break
                    fi
                done
                if [ "$MATCH" = false ]; then
                    ERRORS="$ERRORS\nBOUNDARY VIOLATION: $AGENT modified $file (not in owned files)"
                fi
            done <<< "$STAGED"
        fi
    fi
fi

if [ -n "$ERRORS" ]; then
    echo -e "FILE BOUNDARY VIOLATIONS DETECTED:\n$ERRORS" >&2
    exit 2
fi

exit 0
